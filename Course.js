import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ['ALPHA','BETA','GAMMA'], default: 'ALPHA' },
  description: String,
  priceINR: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
