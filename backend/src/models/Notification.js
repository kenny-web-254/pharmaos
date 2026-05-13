import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organization',
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['low_stock', 'expiry', 'system', 'order', 'user'],
      required: true,
    },
    title: String,
    message: {
      type: String,
      required: true,
    },
    actionUrl: String,
    isRead: {
      type: Boolean,
      default: false,
    },
    metadata: mongoose.Schema.Types.Mixed,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
