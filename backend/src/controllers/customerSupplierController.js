import Customer from '../models/Customer.js';
import Supplier from '../models/Supplier.js';
import AppError, { catchAsyncErrors } from '../utils/errorHandler.js';

// Customer Controllers
export const getCustomers = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;
  const { page = 1, limit = 20, search } = req.query;

  let query = { organization: organizationId, isActive: true };

  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];
  }

  const customers = await Customer.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Customer.countDocuments(query);

  res.status(200).json({
    success: true,
    customers,
    pagination: { total, page, pages: Math.ceil(total / limit) },
  });
});

export const createCustomer = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;
  const { firstName, lastName, email, phone, address, city, state, postalCode, country, customerType, notes } = req.body;

  if (!firstName || !lastName || !phone) {
    return next(new AppError('Please provide required fields', 400));
  }

  const customer = await Customer.create({
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    postalCode,
    country,
    customerType: customerType || 'retail',
    notes,
    organization: organizationId,
  });

  res.status(201).json({
    success: true,
    message: 'Customer created successfully',
    customer,
  });
});

export const updateCustomer = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, customerId } = req.params;

  const customer = await Customer.findByIdAndUpdate(customerId, req.body, { new: true });

  res.status(200).json({
    success: true,
    message: 'Customer updated successfully',
    customer,
  });
});

export const getCustomerDetails = catchAsyncErrors(async (req, res, next) => {
  const { customerId } = req.params;

  const customer = await Customer.findById(customerId).populate('purchaseHistory.saleId');

  res.status(200).json({
    success: true,
    customer,
  });
});

// Supplier Controllers
export const getSuppliers = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;
  const { page = 1, limit = 20 } = req.query;

  const suppliers = await Supplier.find({ organization: organizationId, isActive: true })
    .populate('products')
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Supplier.countDocuments({ organization: organizationId, isActive: true });

  res.status(200).json({
    success: true,
    suppliers,
    pagination: { total, page, pages: Math.ceil(total / limit) },
  });
});

export const createSupplier = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;
  const { name, email, phone, website, address, city, state, postalCode, country, contactPerson, paymentTerms, notes } = req.body;

  if (!name || !phone) {
    return next(new AppError('Please provide required fields', 400));
  }

  const supplier = await Supplier.create({
    name,
    email,
    phone,
    website,
    address,
    city,
    state,
    postalCode,
    country,
    contactPerson,
    paymentTerms,
    notes,
    organization: organizationId,
  });

  res.status(201).json({
    success: true,
    message: 'Supplier created successfully',
    supplier,
  });
});

export const updateSupplier = catchAsyncErrors(async (req, res, next) => {
  const { supplierId } = req.params;

  const supplier = await Supplier.findByIdAndUpdate(supplierId, req.body, { new: true });

  res.status(200).json({
    success: true,
    message: 'Supplier updated successfully',
    supplier,
  });
});
