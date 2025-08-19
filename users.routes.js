import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { getMe } from '../controllers/users.controller.js';

const router = Router();
router.get('/me', auth(), getMe);

export default router;
