import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { updateProfile, getProfile } from '../controllers/profileController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', protect, getProfile);
router.put('/', protect, upload.single('image'), updateProfile);

export default router;
