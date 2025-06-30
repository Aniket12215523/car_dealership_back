import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  phone: { type: String },
  googleId: { type: String },
  profileImage: { type: String },
  location: { type: String, default: '' },
  timezone: { type: String, default: '' },
  language: { type: String, default: '' },
  gender: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
