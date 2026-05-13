import Sale from '../models/Sale.js';
import Product from '../models/Product.js';
import InventoryLog from '../models/InventoryLog.js';
import Customer from '../models/Customer.js';
import { v4 as uuidv4 } from 'uuid';
import AppError, { catchAsyncErrors } from '../utils/errorHandler.js';

// Create Sale (POS Transaction)
export const createSale = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, branchId } = req.params;
  const { items, customer, discount = 0, paymentMethod = 'cash', notes } = req.body;

  if (!items || items.length === 0) {
    return next(new AppError('Please add at least one item', 400));
  }

  let subtotal = 0;
  let totalTax = 0;
  const processedItems = [];

  // Process items and update inventory
  for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product) {
      return next(new AppError(`Product ${item.product} not found`, 404));
    }

    if (product.quantity < item.quantity) {
      return next(new AppError(`Insufficient stock for ${product.name}`, 400));
    }

    const itemTotal = item.quantity * item.unitPrice;
    const itemTax = (itemTotal * (product.tax || 0)) / 100;

    processedItems.push({
      product: item.product,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: item.discount || 0,
      tax: itemTax,
      total: itemTotal + itemTax,
    });

    subtotal += itemTotal;
    totalTax += itemTax;

    // Update product inventory
    product.quantity -= item.quantity;
    await product.save();

    // Log inventory change
    await InventoryLog.create({
      organization: organizationId,
      branch: branchId,
      product: item.product,
      type: 'sale',
      quantityBefore: product.quantity + item.quantity,
      quantityAfter: product.quantity,
      quantityChanged: -item.quantity,
      notes: `Sale transaction`,
      user: req.user._id,
    });
  }

  const total = subtotal + totalTax - discount;
  const receiptNumber = `RCP-${Date.now()}-${uuidv4().split('-')[0].toUpperCase()}`;

  const sale = await Sale.create({
    organization: organizationId,
    branch: branchId,
    receiptNumber,
    items: processedItems,
    customer: customer || null,
    subtotal,
    discount,
    tax: totalTax,
    total,
    paymentMethod,
    cashier: req.user._id,
    notes,
  });

  // Update customer loyalty and purchase history
  if (customer) {
    await Customer.findByIdAndUpdate(
      customer,
      {
        $inc: { totalPurchases: total, loyaltyPoints: Math.floor(total / 10) },
        $push: { purchaseHistory: { saleId: sale._id, amount: total, date: new Date() } },
      },
      { new: true }
    );
  }

  res.status(201).json({
    success: true,
    message: 'Sale completed successfully',
    sale: await Sale.findById(sale._id).populate('items.product').populate('customer').populate('cashier'),
  });
});

// Get Sales History
export const getSalesHistory = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, branchId } = req.params;
  const { page = 1, limit = 20, startDate, endDate } = req.query;

  let query = {
    organization: organizationId,
    branch: branchId,
  };

  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const sales = await Sale.find(query)
    .populate('items.product')
    .populate('customer')
    .populate('cashier')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Sale.countDocuments(query);

  res.status(200).json({
    success: true,
    sales,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});

// Get Sale Details
export const getSaleDetails = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, saleId } = req.params;

  const sale = await Sale.findById(saleId)
    .populate('items.product')
    .populate('customer')
    .populate('cashier');

  if (!sale || sale.organization.toString() !== organizationId) {
    return next(new AppError('Sale not found', 404));
  }

  res.status(200).json({
    success: true,
    sale,
  });
});

// Void Sale
export const voidSale = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, saleId } = req.params;
  const { reason } = req.body;

  const sale = await Sale.findById(saleId);

  if (!sale || sale.organization.toString() !== organizationId) {
    return next(new AppError('Sale not found', 404));
  }

  // Restore inventory
  for (const item of sale.items) {
    const product = await Product.findById(item.product);
    product.quantity += item.quantity;
    await product.save();

    // Log inventory restoration
    await InventoryLog.create({
      organization: organizationId,
      branch: sale.branch,
      product: item.product,
      type: 'return',
      quantityBefore: product.quantity - item.quantity,
      quantityAfter: product.quantity,
      quantityChanged: item.quantity,
      notes: `Sale voided - ${reason}`,
      user: req.user._id,
    });
  }

  sale.status = 'cancelled';
  await sale.save();

  res.status(200).json({
    success: true,
    message: 'Sale voided successfully',
    sale,
  });
});

// Get Daily Sales Report
export const getDailySalesReport = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, branchId } = req.params;
  const { date } = req.query;

  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  const sales = await Sale.find({
    organization: organizationId,
    branch: branchId,
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  }).populate('items.product').populate('cashier');

  const report = {
    date,
    totalSales: sales.length,
    totalRevenue: sales.reduce((sum, s) => sum + s.total, 0),
    totalItems: sales.reduce((sum, s) => sum + s.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0),
    paymentMethods: {},
    topProducts: [],
  };

  // Calculate payment methods
  sales.forEach(sale => {
    report.paymentMethods[sale.paymentMethod] = (report.paymentMethods[sale.paymentMethod] || 0) + 1;
  });

  // Calculate top products
  const productSales = {};
  sales.forEach(sale => {
    sale.items.forEach(item => {
      const productId = item.product._id.toString();
      if (!productSales[productId]) {
        productSales[productId] = { product: item.product, quantity: 0, revenue: 0 };
      }
      productSales[productId].quantity += item.quantity;
      productSales[productId].revenue += item.total;
    });
  });

  report.topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  res.status(200).json({
    success: true,
    report,
  });
});
