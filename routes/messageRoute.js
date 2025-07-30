import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createMessage, getLatestMessages, getRoomMessages } from '../controller/messageController.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/', createMessage);

//  Specific route first
router.get('/latest/:id', getLatestMessages);

//  Generic route last
router.get('/:roomId', getRoomMessages);

export default router;
