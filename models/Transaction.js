import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  paymentId: String,
  orderId: String,
  bookingDetails: Object,
  customer: Object,
  amount: Number,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Transaction', transactionSchema);
