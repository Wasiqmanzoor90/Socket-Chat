import express from 'express';
import { checkAuth, login, register } from '../controller/authController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();
//auth routers
router.post('/', login)
router.post('/register', register);
router.post('/check-auth', checkAuth, authMiddleware);

export default router;


