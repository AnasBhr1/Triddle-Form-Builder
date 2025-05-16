import { Router } from 'express';
import { FormController } from '../controllers/formController';
import { authenticate, authorize } from '../middleware/auth';
import { validate, formSchemas } from '../middleware/validation';
import { UserRole } from '../types';

const router = Router();

// Public routes
router.get('/public/:slug', FormController.getFormBySlug);

// Protected routes - require authentication
router.use(authenticate);

// Form CRUD operations
router.post('/', validate(formSchemas.createForm), FormController.createForm);
router.get('/', FormController.getForms);
router.get('/:id', FormController.getForm);
router.put('/:id', validate(formSchemas.updateForm), FormController.updateForm);
router.delete('/:id', FormController.deleteForm);

// Form status management
router.patch('/:id/toggle-status', FormController.toggleFormStatus);
router.post('/:id/duplicate', FormController.duplicateForm);

export default router;