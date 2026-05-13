import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter category name'],
      trim: true,
    },
    description: String,
    organization: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organization',
      required: true,
    },
    icon: String,
    color: String,
    isActive: {
      type: Boolean,
      default: true,
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

export default mongoose.model('ProductCategory', productCategorySchema);
