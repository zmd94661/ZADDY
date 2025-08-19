import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import Package from '../models/Package.js';
import Subscription from '../models/Subscription.js';
import crypto from 'crypto';
import { getRazorpay } from '../utils/razorpay.js';
import { env } from '../config/env.js';

export async function createOrder(req, res) {
  try {
    const { packageCode } = req.body;
    const pkg = await Package.findOne({ code: packageCode });
    if (!pkg) return res.status(404).json({ error: 'Package not found' });
    const order = await Order.create({
      userId: req.user._id,
      packageId: pkg._id,
      amountINR: pkg.priceINR,
      purpose: 'subscription',
      status: 'created'
    });
    const rzp = getRazorpay();
    const rzpOrder = await rzp.orders.create({
      amount: pkg.priceINR * 100,
      currency: 'INR',
      receipt: String(order._id),
      notes: { userId: String(req.user._id), packageCode }
    });
    order.gatewayOrderId = rzpOrder.id;
    await order.save();
    await Payment.create({ orderId: order._id, gateway: 'razorpay', gatewayOrderId: rzpOrder.id, amountINR: pkg.priceINR, status: 'pending' });
    return res.json({ orderId: order._id, razorpayOrderId: rzpOrder.id, amount: pkg.priceINR, currency: 'INR', keyId: env.razorpay.keyId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create order' });
  }
}

export async function verifyPayment(req, res) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', env.razorpay.keySecret).update(body).digest('hex');
    const isValid = expectedSignature === razorpay_signature;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    const payment = await Payment.findOne({ orderId: order._id, gatewayOrderId: razorpay_order_id });
    if (!isValid) {
      order.status = 'failed'; await order.save();
      if (payment) { payment.status = 'failed'; await payment.save(); }
      return res.status(400).json({ error: 'Invalid signature' });
    }
    order.status = 'paid'; await order.save();
    if (payment) { payment.status = 'success'; payment.gatewayPaymentId = razorpay_payment_id; payment.captured = true; await payment.save(); }
    // start/extend subscription 30 days
    const start = new Date();
    const end = new Date(); end.setDate(start.getDate() + 30);
    await Subscription.create({ userId: order.userId, packageId: order.packageId, startDate: start, endDate: end, status: 'active' });
    return res.json({ message: 'Payment verified & subscription activated' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Verification failed' });
  }
}

export async function webhookRazorpay(req, res) {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const bodyStr = JSON.stringify(req.body);
    const expected = crypto.createHmac('sha256', env.webhookSecret).update(bodyStr).digest('hex');
    if (expected !== signature) return res.status(400).send('Invalid signature');
    // Handle events if needed (payment.captured etc)
    return res.status(200).send('ok');
  } catch (e) {
    console.error(e);
    res.status(500).send('error');
  }
}
