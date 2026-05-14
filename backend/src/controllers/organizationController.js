import Organization from '../models/Organization.js';
import User from '../models/User.js';
import Branch from '../models/Branch.js';
import AppError, { catchAsyncErrors } from '../utils/errorHandler.js';
import { USER_ROLES, PERMISSIONS } from '../config/constants.js';

// Get Organization Details
export const getOrganization = catchAsyncErrors(async (req, res, next) => {
  const orgId = req.params.organizationId;

  if (req.user.organization._id.toString() !== orgId) {
    return next(new AppError('Unauthorized', 403));
  }

  const organization = await Organization.findById(orgId).populate('owner');

  if (!organization) {
    return next(new AppError('Organization not found', 404));
  }

  res.status(200).json({
    success: true,
    organization,
  });
});

// Update Organization Settings
export const updateOrganizationSettings = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;
  const { settings, theme, name, email, businessType, modules } = req.body;

  if (req.user.organization._id.toString() !== organizationId) {
    return next(new AppError('Unauthorized', 403));
  }

  const updateData = {};
  if (settings) updateData.settings = settings;
  if (theme) updateData.theme = theme;
  if (modules) updateData.modules = modules;
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (businessType) updateData.businessType = businessType;

  const organization = await Organization.findByIdAndUpdate(
    organizationId,
    updateData,
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'Organization settings updated',
    organization,
  });
});

// Get Organization Users
export const getOrganizationUsers = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (req.user.organization._id.toString() !== organizationId) {
    return next(new AppError('Unauthorized', 403));
  }

  const users = await User.find({ organization: organizationId })
    .populate('branch')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments({ organization: organizationId });

  res.status(200).json({
    success: true,
    users,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});

// Invite User to Organization
export const inviteUser = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;
  const { firstName, lastName, email, role, branch } = req.body;

  if (req.user.organization._id.toString() !== organizationId) {
    return next(new AppError('Unauthorized', 403));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email, organization: organizationId });
  if (existingUser) {
    return next(new AppError('User already exists in organization', 400));
  }

  // Create new user (password should be set by user on first login)
  const tempPassword = Math.random().toString(36).substr(2, 9);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: tempPassword,
    organization: organizationId,
    branch: branch || null,
    role: role || 'staff',
  });

  // TODO: Send invitation email with password reset link

  res.status(201).json({
    success: true,
    message: 'User invited successfully',
    user,
  });
});

// Update User Role
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, userId } = req.params;
  const { role, permissions } = req.body;

  if (req.user.organization._id.toString() !== organizationId) {
    return next(new AppError('Unauthorized', 403));
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      role: role || user.role,
      permissions: permissions || user.permissions,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'User role updated',
    user,
  });
});

// Deactivate User
export const deactivateUser = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, userId } = req.params;

  if (req.user.organization._id.toString() !== organizationId) {
    return next(new AppError('Unauthorized', 403));
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { isActive: false },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'User deactivated',
    user,
  });
});

// Get Organization Branches
export const getOrganizationBranches = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;

  if (req.user.organization._id.toString() !== organizationId) {
    return next(new AppError('Unauthorized', 403));
  }

  const branches = await Branch.find({ organization: organizationId }).populate('manager');

  res.status(200).json({
    success: true,
    branches,
  });
});

// Create Branch
export const createBranch = catchAsyncErrors(async (req, res, next) => {
  const { organizationId } = req.params;
  const { name, address, city, state, postalCode, country, phone, email, manager } = req.body;

  if (req.user.organization._id.toString() !== organizationId) {
    return next(new AppError('Unauthorized', 403));
  }

  const branch = await Branch.create({
    name,
    organization: organizationId,
    address,
    city,
    state,
    postalCode,
    country,
    phone,
    email,
    manager: manager || null,
  });

  res.status(201).json({
    success: true,
    message: 'Branch created successfully',
    branch,
  });
});

// Update Branch
export const updateBranch = catchAsyncErrors(async (req, res, next) => {
  const { organizationId, branchId } = req.params;
  const updates = req.body;

  if (req.user.organization._id.toString() !== organizationId) {
    return next(new AppError('Unauthorized', 403));
  }

  const branch = await Branch.findByIdAndUpdate(branchId, updates, { new: true });

  res.status(200).json({
    success: true,
    message: 'Branch updated successfully',
    branch,
  });
});
