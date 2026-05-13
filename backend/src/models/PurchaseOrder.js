import mongoose from 'mongoose';

const purchaseOrderSchema = new mongoose.Schema(
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
    poNumber: {
      type: String,
      unique: true,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.ObjectId,
      ref: 'Supplier',
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
        total: Number,
      },
    ],
    subtotal: Number,
    tax: Number,
    total: Number,
    status: {
      type: String,
      enum: ['draft', 'pending', 'received', 'cancelled'],
      default: 'pending',
    },
    expectedDate: Date,
    receivedDate: Date,
    notes: String,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
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

export default mongoose.model('PurchaseOrder', purchaseOrderSchema);
