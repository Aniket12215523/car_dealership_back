import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String },
  userPhone: { type: String },
  carId: { type: String, required: true },
  carName: { type: String, required: true },
  carImage: { type: String },
  amountPaid: { type: Number, required: true },
  bookingDate: { type: String, required: true },
  bookingTime: { type: String, required: true },
  address: { type: String, required: true },
  paymentId: { type: String, required: true },
  status: { type: String, default: 'Confirmed' }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
