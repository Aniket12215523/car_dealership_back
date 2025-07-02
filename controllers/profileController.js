import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -__v');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  const { name, phone, location, timezone, language, gender } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.location = location || user.location;
    user.timezone = timezone || user.timezone;
    user.language = language || user.language;
    user.gender = gender || user.gender;

    if (req.file) {
      user.profileImage = req.file.path;  
    }

    const updatedUser = await user.save();

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
    res.status(500).json({ message: 'Server error' });
  }
};
