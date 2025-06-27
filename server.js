import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


import carRoutes from './routes/cars.js';
import bookingRoutes from './routes/booking.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT ;

app.use(cors({
  origin: 'https://car-dealership-front.vercel.app/' 
}));


app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);  


mongoose.connect(process.env.MONGO_URI,)
.then(() => {
  console.log('MongoDB connected');

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error(err));
