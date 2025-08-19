import { Router } from 'express';
import { listPackages, createPackage } from '../controllers/packages.controller.js';
import { auth } from '../middleware/auth.js';

const router = Router();
router.get('/', listPackages);
router.post('/', auth('admin'), createPackage);

export default router;
