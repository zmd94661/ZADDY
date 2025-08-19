import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';

import authRoutes from './routes/auth.routes.js';
import packageRoutes from './routes/packages.routes.js';
import orderRoutes from './routes/orders.routes.js';
import courseRoutes from './routes/courses.routes.js';
import userRoutes from './routes/users.routes.js';

export function createApp() {
  const app = express();
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: env.corsOrigin, credentials: true }));

  app.get('/', (req,res) => res.json({ ok: true, service: 'ZADDY API' }));

  app.use('/auth', authRoutes);
  app.use('/packages', packageRoutes);
  app.use('/orders', orderRoutes);
  app.use('/courses', courseRoutes);
  app.use('/users', userRoutes);

  // health
  app.get('/health', (req,res)=>res.json({ status:'ok' }));

  // 404
  app.use((req,res)=>res.status(404).json({ error: 'Not found' }));

  return app;
}
