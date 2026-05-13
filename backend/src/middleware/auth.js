import User from '../models/User.js';
import { verifyToken } from '../utils/jwt.js';
import AppError, { catchAsyncErrors } from '../utils/errorHandler.js';

// Middleware to verify JWT and attach user
export const authenticate = catchAsyncErrors(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new AppError('No token provided', 401));
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).populate('organization');

    if (!user) {
      return next(new AppError('Unauthorized', 401));
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return next(new AppError('Invalid or expired token', 401));
  }
});

// Middleware to check if user has specific role(s)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Unauthorized', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(`Access denied. Required role: ${roles.join(', ')}`, 403));
    }

    next();
  };
};

// Middleware to check specific permissions
export const requirePermission = (...permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Unauthorized', 401));
    }

    const hasPermission = permissions.some(perm => req.user.permissions.includes(perm));

    if (!hasPermission) {
      return next(new AppError(`Access denied. Missing permissions: ${permissions.join(', ')}`, 403));
    }

    next();
  };
};

// Middleware to verify organization access
export const verifyOrganization = catchAsyncErrors(async (req, res, next) => {
  const orgId = req.params.organizationId || req.body.organizationId;

  if (!orgId) {
    return next(new AppError('Organization ID required', 400));
  }

  if (req.user.organization._id.toString() !== orgId) {
    return next(new AppError('You do not have access to this organization', 403));
  }

  req.organizationId = orgId;
  next();
});
