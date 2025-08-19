# ZADDY Backend (Express + MongoDB + Razorpay)

Production-ready starter for your site.

## Quick Start
```bash
cd zaddy-backend
cp .env.example .env
# edit .env (MONGO_URI, RAZORPAY keys, etc.)
npm install
npm run dev
# API: http://localhost:$PORT (default 5000)
```

## API Endpoints
- `POST /auth/register` { name, email, phone?, password }
- `POST /auth/login` { email, password } -> sets httpOnly cookie `token`
- `POST /auth/logout`
- `GET /users/me` (auth)

- `GET /packages` (public)
- `POST /packages` (admin) body: { code, name, priceINR, features[], billingCycle }

- `POST /orders` (auth) body: { packageCode: 'ALPHA'|'BETA'|'GAMMA'|'OMEGA' }
  - creates DB order + Razorpay order; returns { razorpayOrderId, amount, currency, keyId }

- `POST /orders/verify` (auth) body: { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature }
  - verifies signature, marks paid, creates 30-day Subscription

- `POST /orders/webhook/razorpay` (no auth; set WEBHOOK_SECRET)
  - Accepts Razorpay webhooks (optional)

## Connect Frontend
Use `/orders` to create order and open Razorpay Checkout with `keyId` + `razorpayOrderId`. After success, call `/orders/verify`.

## Notes
- JWT in httpOnly cookie for browser safety.
- Adjust CORS for your domain.
- Add Admin role to your user manually in DB for creating packages.
