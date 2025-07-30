import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { AllUser } from '../controller/userController.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', AllUser);

export default router;
