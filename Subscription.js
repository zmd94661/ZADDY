import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  status: { type: String, enum: ['active','expired','cancelled','pending'], default: 'pending' },
  externalSubId: String
}, { timestamps: true });

export default mongoose.model('Subscription', subscriptionSchema);
