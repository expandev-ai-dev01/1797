import { Router } from 'express';
import * as carController from '@/api/v1/external/cars/controller';
import { validateRequest } from '@/middleware/validationMiddleware';
import { listCarsQuerySchema, getCarByIdSchema } from '@/api/v1/external/cars/carValidation';

const router = Router();

router.get('/', validateRequest(listCarsQuerySchema), carController.listCarsHandler);

router.get('/filters', carController.getFiltersHandler);

// This route must be placed after specific routes like '/filters'
router.get('/:id', validateRequest(getCarByIdSchema), carController.getCarByIdHandler);

export default router;
