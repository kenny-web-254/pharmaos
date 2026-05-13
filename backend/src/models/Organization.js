import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter organization name'],
      trim: true,
      maxLength: [100, 'Name should not exceed 100 characters'],
    },
    businessType: {
      type: String,
      enum: ['pharmacy', 'retail', 'restaurant', 'hardware', 'beauty', 'electronics', 'warehouse', 'clinic', 'supermarket', 'salon', 'cafe'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    logo: {
      type: String,
      default: null,
    },
    theme: {
      primaryColor: {
        type: String,
        default: '#10b981', // emerald
      },
      secondaryColor: {
        type: String,
        default: '#06b6d4', // cyan
      },
    },
    subscription: {
      plan: {
        type: String,
        enum: ['free', 'pro', 'enterprise'],
        default: 'free',
      },
      status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active',
      },
      startDate: Date,
      renewalDate: Date,
    },
    settings: {
      currency: {
        type: String,
        default: 'USD',
      },
      timezone: {
        type: String,
        default: 'UTC',
      },
      dateFormat: {
        type: String,
        default: 'DD-MM-YYYY',
      },
      taxType: {
        type: String,
        default: 'VAT',
      },
      taxRate: {
        type: Number,
        default: 0,
      },
      enableInventory: {
        type: Boolean,
        default: true,
      },
      enablePOS: {
        type: Boolean,
        default: true,
      },
      enableOnline: {
        type: Boolean,
        default: false,
      },
    },
    modules: {
      inventory: { type: Boolean, default: true },
      pos: { type: Boolean, default: true },
      orders: { type: Boolean, default: true },
      customers: { type: Boolean, default: true },
      suppliers: { type: Boolean, default: true },
      analytics: { type: Boolean, default: true },
      reports: { type: Boolean, default: true },
      pharmacy: { type: Boolean, default: false },
      prescriptions: { type: Boolean, default: false },
      appointments: { type: Boolean, default: false },
      menuManagement: { type: Boolean, default: false },
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
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

export default mongoose.model('Organization', organizationSchema);
