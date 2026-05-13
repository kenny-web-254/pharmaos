import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter branch name'],
      trim: true,
    },
    organization: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organization',
      required: true,
    },
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phone: String,
    email: String,
    manager: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    inventory: {
      type: Map,
      of: {
        quantity: Number,
        minStockLevel: Number,
      },
      default: new Map(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    settings: {
      storeName: String,
      storeCode: String,
      taxId: String,
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

export default mongoose.model('Branch', branchSchema);
