import express from 'express';
import { 
  sendConnectionRequest, 
  acceptConnection, 
  rejectConnection, 
  getMyConnections, 
  getPendingRequests, 
  removeConnection 
} from '../controllers/connectionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/request', protect, sendConnectionRequest);
router.put('/:connectionId/accept', protect, acceptConnection);
router.put('/:connectionId/reject', protect, rejectConnection);
router.get('/my', protect, getMyConnections);
router.get('/pending', protect, getPendingRequests);
router.delete('/:connectionId', protect, removeConnection);

export default router;
