import { Router } from 'express';
import { authMiddleware } from '@/middleware/authMiddleware';

const router = Router();

// Apply a base authentication middleware for all internal routes
router.use(authMiddleware);

// --- INTEGRATION POINT FOR INTERNAL (PROTECTED) FEATURE ROUTES ---
// Example: router.use('/contact-forms', contactFormRoutes);

export default router;
