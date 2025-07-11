import express from 'express';
import {createOrder,recordTransaction,handleWebhook,fetchBookings, saveBooking, updateBooking, deleteBooking} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/record-transaction', recordTransaction);


router.get('/my-bookings/:userId', fetchBookings)
router.post('/save-order', saveBooking);
router.patch('/update-booking/:bookingId', updateBooking);
router.delete('/delete-booking/:bookingId', deleteBooking);






router.post('/webhook', express.json({ type: '*/*' }), handleWebhook);

export default router;
