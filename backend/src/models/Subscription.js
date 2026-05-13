import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organization',
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: ['free', 'pro', 'enterprise'],
      default: 'free',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled', 'past_due'],
      default: 'active',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    renewalDate: Date,
    cancelledAt: Date,
    trialEndsAt: Date,
    limits: {
      branches: { type: Number, default: 1 },
      users: { type: Number, default: 3 },
      products: { type: Number, default: 100 },
      storage: { type: Number, default: 100 }, // MB
    },
    usage: {
      branches: { type: Number, default: 0 },
      users: { type: Number, default: 0 },
      products: { type: Number, default: 0 },
      storage: { type: Number, default: 0 }, // MB
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'paypal', 'bank'],
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
  },
  { timestamps: true }
);

subscriptionSchema.virtual('isExpired').get(function () {
  return this.renewalDate && this.renewalDate < new Date();
});

subscriptionSchema.virtual('inTrial').get(function () {
  return this.trialEndsAt && this.trialEndsAt > new Date();
});

export default mongoose.model('Subscription', subscriptionSchema);