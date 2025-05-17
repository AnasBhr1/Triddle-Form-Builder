import { Router } from 'express';
import { ResponseController } from '../controllers/responseController';
import { authenticate, validate, formSchemas } from '../middleware/validation';

const router = Router();

// Public routes
router.post('/forms/:formId/submit', validate(formSchemas.submitResponse), ResponseController.submitResponse);

// Protected routes - require authentication
router.get('/', authenticate, ResponseController.getResponses);
router.get('/:id', authenticate, ResponseController.getResponseById);
router.put('/:id', authenticate, validate(formSchemas.submitResponse), ResponseController.updateResponse);
router.delete('/:id', authenticate, ResponseController.deleteResponse);

// Form-specific responses (for form owners/admins)
router.get('/forms/:formId', authenticate, ResponseController.getFormResponses);

export default router;