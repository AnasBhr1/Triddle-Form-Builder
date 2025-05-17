import { Router } from 'express';
import authRoutes from './auth';
import formRoutes from './forms';
import responseRoutes from './responses';
import uploadRoutes from '../uploads';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/forms', formRoutes);
router.use('/forms', responseRoutes); // Response routes are nested under forms
router.use('/uploads', uploadRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

export default router;