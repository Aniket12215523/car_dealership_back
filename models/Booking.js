import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  carName: String,
  carPrice: Number,
  image: String,
  date: String,
  time: String,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
