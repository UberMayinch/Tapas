import { Router } from 'express';
import authController from '../controllers/authController';
import { authenticate } from '../middleware/firebaseAuthMiddleware';

const router = Router();

// Get current user profile (authenticated)
router.get('/me', authenticate, authController.getCurrentUser);

// Update user profile (authenticated)
router.patch('/profile', authenticate, authController.updateProfile);

export default router;