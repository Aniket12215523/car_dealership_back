import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';


import carRoutes from './routes/cars.js';
import bookingRoutes from './routes/booking.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT ;

app.use(cors({
  origin: ['http://localhost:5173', 'https://car-dealership-front.vercel.app'],
  credentials: true
}));

app.use(express.json());


app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/profile', profileRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads'))); 


mongoose.connect(process.env.MONGO_URI,)
.then(() => {
  console.log('MongoDB connected');

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error(err));
