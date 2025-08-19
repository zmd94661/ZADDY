import Course from '../models/Course.js';

export async function listCourses(req, res) {
  const q = {};
  if (req.query.level) q.level = req.query.level;
  q.isPublished = true;
  const items = await Course.find(q).sort({ createdAt: -1 });
  res.json(items);
}

export async function createCourse(req, res) {
  const doc = await Course.create(req.body);
  res.status(201).json(doc);
}
