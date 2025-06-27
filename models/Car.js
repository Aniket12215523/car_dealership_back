import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  specs: {
    engine: String,
    horsepower: String,
    topSpeed: String,
    acceleration: String,
  },
  videoUrl: String
});

export default mongoose.model('Car', carSchema);
