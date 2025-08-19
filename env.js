import dotenv from 'dotenv';
dotenv.config();

export const env = {
  node: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'devsecret',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || ''
  },
  webhookSecret: process.env.WEBHOOK_SECRET || ''
};
