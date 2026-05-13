import mongoose from 'mongoose';

const inventoryLogSchema = new mongoose.Schema(
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
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
    type: {
      type: String,
      enum: ['purchase', 'sale', 'adjustment', 'transfer', 'return', 'damage'],
      required: true,
    },
    quantityBefore: Number,
    quantityAfter: Number,
    quantityChanged: Number,
    reference: String, // Sale ID, PO ID, etc.
    notes: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('InventoryLog', inventoryLogSchema);
