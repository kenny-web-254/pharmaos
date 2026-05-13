class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const catchAsyncErrors = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate Field Value: ${Object.keys(err.keyValue)}`;
    err = new AppError(message, 400);
  }

  // Invalid JWT Token
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid Token";
    err = new AppError(message, 401);
  }

  // JWT Expired
  if (err.name === "TokenExpiredError") {
    const message = "Token Expired";
    err = new AppError(message, 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default AppError;
