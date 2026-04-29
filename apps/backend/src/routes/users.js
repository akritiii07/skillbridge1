import express from 'express';
import { getAllUsers, getUsersBySkill, getRecommendedUsers, getTrendingSkills, getStats } from '../controllers/usersController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', getAllUsers);
router.get('/trending', getTrendingSkills);
router.get('/stats', getStats);

// Protected
router.get('/recommended', protect, getRecommendedUsers);
router.get('/by-skill', getUsersBySkill);

export default router;
