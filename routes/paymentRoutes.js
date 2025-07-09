import express from 'express';
import {createOrder,recordTransaction,handleWebhook} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/record-transaction', recordTransaction);


router.post('/webhook', express.json({ type: '*/*' }), handleWebhook);

export default router;
