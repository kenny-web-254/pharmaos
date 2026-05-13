import Product from '../models/Product.js';
import ProductCategory from '../models/ProductCategory.js';
import InventoryLog from '../models/InventoryLog.js';
import AppError, { catchAsyncErrors } from '../utils/errorHandler.js';

// Get All Products
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;
  const { page = 1, limit = 50, category, search } = req.query;

  let query = { organization: organizationId, isActive: true };

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { sku: { $regex: search, $options: 'i' } },
      { barcode: { $regex: search, $options: 'i' } },
    ];
  }

  const products = await Product.find(query)
    .populate('category')
    .populate('supplier')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(query);

  res.status(200).json({
    success: true,
    products,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});

// Get Product by ID
export const getProductById = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, productId } = req.params;

  const product = await Product.findById(productId)
    .populate('category')
    .populate('supplier');

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  if (product.organization.toString() !== organizationId) {
    return next(new AppError('Unauthorized', 403));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Create Product
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;
  const {
    name,
    description,
    sku,
    barcode,
    category,
    supplier,
    quantity,
    minStockLevel,
    buyingPrice,
    sellingPrice,
    unitType,
    genericName,
    strength,
    dosageForm,
    manufacturer,
    batchNumber,
    expiryDate,
  } = req.body;

  if (!name || !buyingPrice || !sellingPrice) {
    return next(new AppError('Please provide all required fields', 400));
  }

  const product = await Product.create({
    name,
    description,
    sku,
    barcode,
    category,
    supplier,
    organization: organizationId,
    quantity: quantity || 0,
    minStockLevel: minStockLevel || 10,
    buyingPrice,
    sellingPrice,
    unitType: unitType || 'pieces',
    genericName,
    strength,
    dosageForm,
    manufacturer,
    batchNumber,
    expiryDate,
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product,
  });
});

// Update Product
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, productId } = req.params;
  const updates = req.body;

  const product = await Product.findByIdAndUpdate(productId, updates, { new: true })
    .populate('category')
    .populate('supplier');

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  if (product.organization.toString() !== organizationId) {
    return next(new AppError('Unauthorized', 403));
  }

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product,
  });
});

// Delete Product
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, productId } = req.params;

  const product = await Product.findByIdAndUpdate(
    productId,
    { isActive: false },
    { new: true }
  );

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// Adjust Stock
export const adjustStock = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, productId } = req.params;
  const { quantity, type, notes } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  if (product.organization.toString() !== organizationId) {
    return next(new AppError('Unauthorized', 403));
  }

  const quantityBefore = product.quantity;
  product.quantity += quantity;

  await product.save();

  // Log the adjustment
  await InventoryLog.create({
    organization: organizationId,
    product: productId,
    type: type || 'adjustment',
    quantityBefore,
    quantityAfter: product.quantity,
    quantityChanged: quantity,
    notes,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    message: 'Stock adjusted successfully',
    product,
  });
});

// Get Low Stock Products
export const getLowStockProducts = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;

  const products = await Product.find({
    organization: organizationId,
    isActive: true,
    $expr: { $lte: ['$quantity', '$minStockLevel'] },
  })
    .populate('category');

  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product Categories
export const getProductCategories = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;

  const categories = await ProductCategory.find({
    organization: organizationId,
    isActive: true,
  });

  res.status(200).json({
    success: true,
    categories,
  });
});

// Create Product Category
export const createProductCategory = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;
  const { name, description, icon, color } = req.body;

  if (!name) {
    return next(new AppError('Please provide category name', 400));
  }

  const category = await ProductCategory.create({
    name,
    description,
    icon,
    color,
    organization: organizationId,
  });

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    category,
  });
});
