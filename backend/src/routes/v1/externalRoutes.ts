import { Router } from 'express';
import carRoutes from './carRoutes';
import contactRoutes from './contactRoutes';

const router = Router();

// --- INTEGRATION POINT FOR EXTERNAL (PUBLIC) FEATURE ROUTES ---
router.use('/cars', carRoutes);
router.use('/contact', contactRoutes);

export default router;
