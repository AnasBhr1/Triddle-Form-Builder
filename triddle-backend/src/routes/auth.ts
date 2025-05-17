import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validate, authSchemas, authenticate } from '../middleware/validation';
import { authLimiter } from '../middleware';

const router = Router();

// Auth routes with rate limiting
router.post('/register', authLimiter, validate(authSchemas.register), AuthController.register);
router.post('/login', authLimiter, validate(authSchemas.login), AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/forgot-password', authLimiter, validate(authSchemas.forgotPassword), AuthController.forgotPassword);
router.post('/reset-password', authLimiter, validate(authSchemas.resetPassword), AuthController.resetPassword);

// Protected routes
router.get('/me', authenticate, AuthController.getMe);

export default router;