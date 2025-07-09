import express from 'express';
import {createOrder,recordTransaction,handleWebhook,fetchOrders} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/record-transaction', recordTransaction);

router.get('/my-orders/:userId', fetchOrders);

router.patch('/update-order/:orderId', updateOrder);





router.post('/webhook', express.json({ type: '*/*' }), handleWebhook);

export default router;
