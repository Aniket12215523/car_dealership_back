import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from './models/Car.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const cars = [
  {
    name: 'Lamborghini Huracán EVO',
    price: 320000,
    image: '/images/lamborghini.jpg',
    description: 'The Huracán EVO combines state-of-the-art technology with outstanding design.',
    specs: {
      engine: '5.2L V10',
      horsepower: '631 HP',
      topSpeed: '325 km/h',
      acceleration: '2.9 sec (0-100 km/h)',
    },
  },
  {
    name: 'Ferrari F8 Tributo',
    price: 280000,
    image: '/images/ferrari.jpg',
    description: 'An homage to the most powerful V8 in Ferrari history.',
    specs: {
      engine: '3.9L Twin-Turbo V8',
      horsepower: '710 HP',
      topSpeed: '340 km/h',
      acceleration: '2.9 sec (0-100 km/h)',
    },
  },
  {
    name: 'Porsche 911 Turbo S',
    price: 220000,
    image: '/images/porsche.jpg',
    description: 'The iconic Porsche 911 reimagined with blistering performance.',
    specs: {
      engine: '3.8L Twin-Turbo Flat-6',
      horsepower: '640 HP',
      topSpeed: '330 km/h',
      acceleration: '2.7 sec (0-100 km/h)',
    },
  },
    {
        name: 'McLaren 720S',
        price: 300000,
        image: '/images/mclaren.jpg',
        description: 'A supercar that redefines the limits of performance and technology.',
        specs: {
        engine: '4.0L Twin-Turbo V8',
        horsepower: '710 HP',
        topSpeed: '341 km/h',
        acceleration: '2.7 sec (0-100 km/h)',
        },
    },
    {
        name: 'Aston Martin Vantage',
        price: 150000,
        image: '/images/astonmartin.jpg',
        description: 'A stunning sports car with a perfect blend of performance and luxury.',
        specs: {
        engine: '4.0L Twin-Turbo V8',
        horsepower: '503 HP',
        topSpeed: '314 km/h',
        acceleration: '3.6 sec (0-100 km/h)',
        },
    },
    {
  name: 'Koenigsegg Jesko',
  price: 3200000,
  image: '/images/jesko.jpg',
  description: 'Track-focused hypercar designed for record-breaking top speeds.',
  specs: {
    engine: '5.0L Twin-Turbo V8',
    horsepower: '1600 HP',
    topSpeed: '480+ km/h (theoretical)',
    acceleration: '2.5 sec (0-100 km/h)',
  },
},
{
  name: 'Mercedes-AMG GT Black Series',
  price: 325000,
  image: '/images/amggt.jpg',
  description: 'A street-legal race car delivering relentless track performance.',
  specs: {
    engine: '4.0L Twin-Turbo V8',
    horsepower: '720 HP',
    topSpeed: '325 km/h',
    acceleration: '3.2 sec (0-100 km/h)',
  },
},
{
  name: 'BMW M5 Competition',
  price: 135000,
  image: '/images/bmwm5.jpg',
  description: 'A high-performance luxury sedan blending everyday comfort with track-ready power.',
  specs: {
    engine: '4.4L Twin-Turbo V8',
    horsepower: '617 HP',
    topSpeed: '305 km/h',
    acceleration: '3.3 sec (0-100 km/h)',
  },
},
{
  name: 'Mercedes-Benz G63 AMG (G-Wagon)',
  price: 156000,
  image: '/images/gwagon.jpg',
  description: 'A luxury off-roader with aggressive styling and massive on-road presence.',
  specs: {
    engine: '4.0L Twin-Turbo V8',
    horsepower: '577 HP',
    topSpeed: '240 km/h',
    acceleration: '4.5 sec (0-100 km/h)',
  },
},
{
  name: 'Land Rover Defender 110 V8',
  price: 115000,
  image: '/images/defender.jpg',
  description: 'Modern ruggedness meets luxury in this reimagined off-road legend.',
  specs: {
    engine: '5.0L Supercharged V8',
    horsepower: '518 HP',
    topSpeed: '240 km/h',
    acceleration: '5.2 sec (0-100 km/h)',
  },
},
{
  name: 'Range Rover Autobiography',
  price: 160000,
  image: '/images/rangerover.jpg',
  description: 'The ultimate combination of luxury, comfort, and off-road capability.',
  specs: {
    engine: '4.4L Twin-Turbo V8',
    horsepower: '523 HP',
    topSpeed: '250 km/h',
    acceleration: '4.4 sec (0-100 km/h)',
  },
},
{
  name: 'Ford Mustang GT',
  price: 55000,
  image: '/images/mustang.jpg',
  description: 'An American muscle legend with modern tech and unmistakable character.',
  specs: {
    engine: '5.0L V8',
    horsepower: '450 HP',
    topSpeed: '250 km/h',
    acceleration: '4.3 sec (0-100 km/h)',
  },
},
{
  name: 'Rolls-Royce Ghost',
  price: 315000,
  image: '/images/rollsroyce.jpg',
  description: 'Supreme luxury saloon with whisper-quiet elegance and commanding road presence.',
  specs: {
    engine: '6.75L Twin-Turbo V12',
    horsepower: '563 HP',
    topSpeed: '250 km/h',
    acceleration: '4.8 sec (0-100 km/h)',
  },
},
{
  name: 'Audi A8 L 60 TFSI',
  price: 125000,
  image: '/images/audia8.jpg',
  description: 'Audi’s flagship luxury sedan combining advanced tech with refined performance.',
  specs: {
    engine: '4.0L Twin-Turbo V8',
    horsepower: '453 HP',
    topSpeed: '250 km/h',
    acceleration: '4.5 sec (0-100 km/h)',
  },
},
];

const importData = async () => {
  try {
    await Car.deleteMany();
    await Car.insertMany(cars);
    console.log('Cars Imported Successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
