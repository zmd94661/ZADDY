import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  code: { type: String, enum: ['ALPHA','BETA','GAMMA','OMEGA'], required: true, unique: true },
  name: { type: String, required: true },
  priceINR: { type: Number, required: true },
  billingCycle: { type: String, enum: ['monthly','quarterly','yearly'], default: 'monthly' },
  features: [String],
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Package', packageSchema);
