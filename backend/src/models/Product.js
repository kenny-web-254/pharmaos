import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    description: String,
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
    barcode: String,
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'ProductCategory',
    },
    organization: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organization',
      required: true,
    },
    supplier: {
      type: mongoose.Schema.ObjectId,
      ref: 'Supplier',
    },
    genericName: String, // For pharmacy
    strength: String, // For pharmacy (e.g., "500mg")
    dosageForm: String, // For pharmacy (e.g., "tablet", "syrup")
    manufacturer: String,
    batchNumber: String,
    expiryDate: Date,
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity cannot be negative'],
    },
    minStockLevel: {
      type: Number,
      default: 10,
    },
    maxStockLevel: {
      type: Number,
      default: 1000,
    },
    reorderLevel: {
      type: Number,
      default: 20,
    },
    unitType: {
      type: String,
      enum: ['pieces', 'kg', 'liter', 'meter', 'box', 'pack', 'dozen'],
      default: 'pieces',
    },
    buyingPrice: {
      type: Number,
      required: true,
      min: [0, 'Buying price cannot be negative'],
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: [0, 'Selling price cannot be negative'],
    },
    margin: Number,
    tax: {
      type: Number,
      default: 0,
    },
    images: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    branches: [
      {
        branch: {
          type: mongoose.Schema.ObjectId,
          ref: 'Branch',
        },
        quantity: Number,
        minStockLevel: Number,
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

// Calculate margin before save
productSchema.pre('save', function (next) {
  if (this.sellingPrice && this.buyingPrice) {
    this.margin = ((this.sellingPrice - this.buyingPrice) / this.buyingPrice * 100).toFixed(2);
  }
  next();
});

export default mongoose.model('Product', productSchema);
