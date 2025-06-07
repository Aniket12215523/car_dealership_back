import express from 'express';
import Car from '../models/Car.js';

const router = express.Router();

// GET all cars
router.get('/', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// GET single car
router.get('/:id', async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.json(car);
});

export default router;
