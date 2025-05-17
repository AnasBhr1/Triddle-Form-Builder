// src/routes/forms.ts
import { Router } from 'express';
import { FormController } from '../controllers/formController';
import { authenticate, authorize, validate, formSchemas } from '../middleware/validation';
import { UserRole } from '../types';

const router = Router();

// Public routes
router.get('/', FormController.getForms);
router.get('/:id', FormController.getFormById);
router.post('/:id/submit', validate(formSchemas.submitForm), FormController.submitForm);

// Protected routes - require authentication
router.post('/', authenticate, validate(formSchemas.createForm), FormController.createForm);
router.put('/:id', authenticate, validate(formSchemas.updateForm), FormController.updateForm);
router.delete('/:id', authenticate, FormController.deleteForm);

export default router;