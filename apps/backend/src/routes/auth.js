import express from 'express';
import { signup, login, getProfile, updateProfile, getUserById, logout } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/logout', protect, logout);
router.get('/:id', protect, getUserById);

export default router;
