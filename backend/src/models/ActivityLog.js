import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organization',
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'created',
        'updated',
        'deleted',
        'login',
        'logout',
        'sale',
        'purchase',
        'stock_adjustment',
        'user_invited',
        'branch_created',
        'product_expiring',
        'low_stock',
      ],
    },
    entityType: {
      type: String,
      enum: ['product', 'sale', 'customer', 'supplier', 'user', 'branch', 'organization'],
    },
    entityId: mongoose.Schema.ObjectId,
    entityName: String,
    details: mongoose.Schema.Types.Mixed,
    ipAddress: String,
    userAgent: String,
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

activityLogSchema.index({ organization: 1, createdAt: -1 });

export default mongoose.model('ActivityLog', activityLogSchema);