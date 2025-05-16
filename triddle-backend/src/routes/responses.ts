import { Router } from 'express';
import { ResponseController } from '../controllers/responseController';
import { authenticate, optionalAuthenticate } from '../middleware/auth';
import { validate, formSchemas } from '../middleware/validation';
import { formSubmissionLimiter } from '../middleware';

const router = Router();

// Public routes for form submissions
router.post('/:id/responses', formSubmissionLimiter, validate(formSchemas.submitResponse), ResponseController.submitResponse);

// Protected routes - require authentication
router.use(authenticate);

// Response management
router.get('/:id/responses', ResponseController.getResponses);
router.get('/:id/responses/:responseId', ResponseController.getResponse);
router.delete('/:id/responses/:responseId', ResponseController.deleteResponse);

// Analytics
router.get('/:id/analytics', ResponseController.getAnalytics);

export default router;