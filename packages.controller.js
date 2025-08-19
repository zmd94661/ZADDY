import Package from '../models/Package.js';

export async function listPackages(req, res) {
  const items = await Package.find({ active: true }).sort('priceINR');
  res.json(items);
}

export async function createPackage(req, res) {
  const doc = await Package.create(req.body);
  res.status(201).json(doc);
}
