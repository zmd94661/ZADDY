import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';

export function auth(requiredRole = null) {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
      if (!token) return res.status(401).json({ error: 'Unauthorized' });
      const payload = jwt.verify(token, env.jwtSecret);
      const user = await User.findById(payload.id).select('-passwordHash');
      if (!user) return res.status(401).json({ error: 'Unauthorized' });
      if (requiredRole && user.role !== requiredRole) return res.status(403).json({ error: 'Forbidden' });
      req.user = user;
      next();
    } catch (e) {
      console.error(e);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
}
