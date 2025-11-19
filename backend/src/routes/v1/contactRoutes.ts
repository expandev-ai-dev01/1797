import { Router } from 'express';
import * as contactController from '@/api/v1/external/contact/controller';
import { validateRequest } from '@/middleware/validationMiddleware';
import { createContactSchema } from '@/api/v1/external/contact/contactValidation';

const router = Router();

router.post('/', validateRequest(createContactSchema), contactController.createContactHandler);

export default router;
