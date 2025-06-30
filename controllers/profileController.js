import User from '../models/User.js';
import multer from 'multer';
import path from 'path';

// Configure storage for profile images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

// Initialize multer with file filter
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -__v');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  const { name, phone, location, timezone, language, gender } = req.body;
  
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update fields
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.location = location || user.location;
    user.timezone = timezone || user.timezone;
    user.language = language || user.language;
    user.gender = gender || user.gender;

    // Handle image upload
    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.save();
    
    // Return updated profile (excluding sensitive fields)
    const profileData = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      profileImage: updatedUser.profileImage,
      location: updatedUser.location,
      timezone: updatedUser.timezone,
      language: updatedUser.language,
      gender: updatedUser.gender,
      createdAt: updatedUser.createdAt
    };

    res.json(profileData);
  } catch (err) {
    console.error(err);
    
   
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload error: ' + err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};
