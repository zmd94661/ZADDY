import Razorpay from 'razorpay';
import { env } from '../config/env.js';

export function getRazorpay() {
  if (!env.razorpay.keyId || !env.razorpay.keySecret) {
    throw new Error('Razorpay keys missing');
  }
  return new Razorpay({ key_id: env.razorpay.keyId, key_secret: env.razorpay.keySecret });
}
