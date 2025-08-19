import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
  amountINR: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['created','paid','failed','refunded','pending'], default: 'created' },
  purpose: { type: String, enum: ['subscription','course','other'], default: 'subscription' },
  gatewayOrderId: String
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
