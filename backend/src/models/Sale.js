import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organization',
      required: true,
    },
    branch: {
      type: mongoose.Schema.ObjectId,
      ref: 'Branch',
      required: true,
    },
    receiptNumber: {
      type: String,
      unique: true,
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: Number,
        unitPrice: Number,
        discount: {
          type: Number,
          default: 0,
        },
        tax: {
          type: Number,
          default: 0,
        },
        total: Number,
      },
    ],
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Customer',
    },
    subtotal: Number,
    discount: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'online', 'check', 'other'],
      default: 'cash',
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'pending', 'failed'],
      default: 'paid',
    },
    cashier: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    notes: String,
    status: {
      type: String,
      enum: ['completed', 'cancelled', 'pending'],
      default: 'completed',
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

export default mongoose.model('Sale', saleSchema);
