import Razorpay from 'razorpay';
import Transaction from '../models/Transaction.js';
import Booking from '../models/Booking.js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});


export const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    const options = {
      amount: amount * 100,
      currency,
      receipt: receipt || `receipt_order_${Date.now()}`
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};


export const recordTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({ success: true, transaction });
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ error: 'Failed to log transaction' });
  }
};


export const handleWebhook = (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers['x-razorpay-signature'];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  if (signature === expectedSignature) {
    console.log('Valid Razorpay Webhook:', req.body);
    res.status(200).json({ status: 'ok' });

   
  } else {
    console.warn('❌ Invalid Razorpay Webhook Signature');
    res.status(400).json({ error: 'Invalid signature' });
  }
};

export const saveBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Failed to save booking.' });
  }
};

export const fetchOrders =  async (req, res) => {
  try {
    const orders = await Transaction.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updates = req.body;

    await Transaction.findByIdAndUpdate(req.params.orderId, {
      $set: {
        'bookingDetails.date': updates.date,
        'bookingDetails.time': updates.time,
        'customer.address': updates.address,
        'customer.phone': updates.phone,
        status: updates.status
      }
    });

    res.status(200).json({ success: true, message: 'Order updated.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order.' });
  }
};