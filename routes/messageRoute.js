import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createMessage, getLatestMessages, getRoomMessages } from '../controller/messageController.js';

//routes
const router = express.Router();

router.use(authMiddleware);
router.post('/', createMessage);
router.get('/:roomId', getRoomMessages);
router.get('/latest/:id', getLatestMessages);

export default router;



