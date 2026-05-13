import { catchAsyncErrors } from '../utils/errorHandler.js';
import AppError from '../utils/errorHandler.js';
import Organization from '../models/Organization.js';

// Middleware to verify organization exists and user has access
export const verifyTenant = catchAsyncErrors(async (req, res, next) => {
  const orgId = req.params.orgId || req.params.organizationId || req.body.orgId;

  if (!orgId) {
    return next(new AppError('Organization ID is required', 400));
  }

  const organization = await Organization.findById(orgId);

  if (!organization) {
    return next(new AppError('Organization not found', 404));
  }

  if (organization.status !== 'active') {
    return next(new AppError('Organization is not active', 403));
  }

  // Check if user belongs to this organization
  if (req.user && req.user.organization.toString() !== orgId) {
    return next(new AppError('Access denied to this organization', 403));
  }

  req.organization = organization;
  req.orgId = orgId;
  next();
});

// Middleware to check branch access
export const verifyBranch = catchAsyncErrors(async (req, res, next) => {
  const branchId = req.params.branchId || req.body.branchId;

  if (branchId) {
    const Branch = (await import('../models/Branch.js')).default;
    const branch = await Branch.findById(branchId);

    if (!branch) {
      return next(new AppError('Branch not found', 404));
    }

    if (branch.organization.toString() !== req.orgId) {
      return next(new AppError('Branch does not belong to this organization', 403));
    }

    req.branch = branch;
  }
  next();
});

// Middleware to check plan limits
export const checkPlanLimit = (resource) => {
  return catchAsyncErrors(async (req, res, next) => {
    if (!req.organization) {
      return next();
    }

    const Subscription = (await import('../models/Subscription.js')).default;
    const subscription = await Subscription.findOne({ organization: req.orgId });

    if (!subscription && req.organization.subscription.plan !== 'free') {
      // Free plan defaults
      req.planLimits = {
        branches: 1,
        users: 1,
        products: 100,
      };
      return next();
    }

    req.planLimits = subscription?.limits || {
      branches: 1,
      users: 1,
      products: 100,
    };

    next();
  });
};