import express from 'express';
import { 
  createSkillExchange, 
  getMyExchanges, 
  updateExchangeStatus, 
  addFeedback, 
  getExchangeById 
} from '../controllers/exchangeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createSkillExchange);
router.get('/my', protect, getMyExchanges);
router.put('/:exchangeId', protect, updateExchangeStatus);
router.post('/:exchangeId/feedback', protect, addFeedback);
router.get('/:exchangeId', protect, getExchangeById);

export default router;
