import express from 'express';
import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { createOrder, verifyPayment, webhookRazorpay } from '../controllers/orders.controller.js';

const router = Router();
router.post('/', auth(), createOrder);
router.post('/verify', auth(), verifyPayment);
router.post('/webhook/razorpay', express.json({ type: '*/*' }), webhookRazorpay);

export default router;
