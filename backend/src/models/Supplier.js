import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter supplier name'],
      trim: true,
    },
    email: String,
    phone: {
      type: String,
      required: true,
    },
    website: String,
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
    contactPerson: String,
    paymentTerms: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    notes: String,
    totalDeliveries: {
      type: Number,
      default: 0,
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
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

export default mongoose.model('Supplier', supplierSchema);
