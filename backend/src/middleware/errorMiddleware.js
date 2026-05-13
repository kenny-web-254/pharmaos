import AppError from '../utils/errorHandler.js';

// Rate limiting middleware
export const rateLimit = (req, res, next) => {
  next();
};

// Error handling middleware
export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

// Not found middleware
export const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};
