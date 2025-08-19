import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: String,
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  status: { type: String, enum: ['active','blocked','deleted'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
