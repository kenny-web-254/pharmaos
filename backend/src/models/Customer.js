import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: String,
    phone: {
      type: String,
      required: true,
    },
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
    customerType: {
      type: String,
      enum: ['retail', 'wholesale', 'corporate'],
      default: 'retail',
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    totalPurchases: {
      type: Number,
      default: 0,
    },
    notes: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    purchaseHistory: [
      {
        saleId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Sale',
        },
        amount: Number,
        date: Date,
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

export default mongoose.model('Customer', customerSchema);
