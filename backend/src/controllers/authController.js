import User from '../models/User.js';
import Organization from '../models/Organization.js';
import { generateToken } from '../utils/jwt.js';
import AppError, { catchAsyncErrors } from '../utils/errorHandler.js';
import { USER_ROLES } from '../config/constants.js';

// Register User
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password, businessType } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password || !businessType) {
    return next(new AppError('Please provide all required fields', 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  // Create organization
  const organization = await Organization.create({
    name: `${firstName} ${lastName}'s Business`,
    businessType,
    email,
  });

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    organization: organization._id,
    role: USER_ROLES.OWNER,
  });

  // Update organization owner
  organization.owner = user._id;
  await organization.save();

  // Generate token
  const token = generateToken(user._id, organization._id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      organization: organization._id,
    },
  });
});

// Login User
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password').populate('organization');

  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return next(new AppError('Invalid email or password', 401));
  }

  if (!user.isActive) {
    return next(new AppError('User account is inactive', 403));
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id, user.organization._id);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      organization: user.organization,
    },
  });
});

// Get Current User
export const getCurrentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('organization').populate('branch');

  res.status(200).json({
    success: true,
    user,
  });
});

// Update Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, phone, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      firstName: firstName || req.user.firstName,
      lastName: lastName || req.user.lastName,
      phone: phone || req.user.phone,
      avatar: avatar || req.user.avatar,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user,
  });
});

// Change Password
export const changePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new AppError('Please provide current and new password', 400));
  }

  const user = await User.findById(req.user._id).select('+password');

  const isPasswordValid = await user.comparePassword(currentPassword);

  if (!isPasswordValid) {
    return next(new AppError('Current password is incorrect', 401));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});

// Logout (optional - token-based auth doesn't require backend logout)
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});
