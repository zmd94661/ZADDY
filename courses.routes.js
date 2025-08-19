import { Router } from 'express';
import { listCourses, createCourse } from '../controllers/courses.controller.js';
import { auth } from '../middleware/auth.js';

const router = Router();
router.get('/', listCourses);
router.post('/', auth('admin'), createCourse);

export default router;
