import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
  gateway: { type: String, enum: ['razorpay','stripe'], default: 'razorpay' },
  gatewayPaymentId: String,
  gatewayOrderId: String,
  amountINR: Number,
  status: { type: String, enum: ['success','pending','failed','refunded'], default: 'pending' },
  method: String,
  captured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
