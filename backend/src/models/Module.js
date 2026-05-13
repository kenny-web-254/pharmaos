import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    icon: String,
    category: {
      type: String,
      enum: ['core', 'industry', 'analytics', 'integration'],
      default: 'core',
    },
    businessTypes: [String],
    features: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Module', moduleSchema);