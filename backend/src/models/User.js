import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please enter last name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minlength: [6, 'Password should be at least 6 characters'],
      select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    phone: String,
    organization: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organization',
      required: true,
    },
    branch: {
      type: mongoose.Schema.ObjectId,
      ref: 'Branch',
      default: null,
    },
    role: {
      type: String,
      enum: ['super_admin', 'owner', 'manager', 'cashier', 'staff', 'pharmacist', 'storekeeper', 'branch_manager'],
      default: 'staff',
    },
    permissions: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
    loginHistory: [
      {
        timestamp: Date,
        ipAddress: String,
        userAgent: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
