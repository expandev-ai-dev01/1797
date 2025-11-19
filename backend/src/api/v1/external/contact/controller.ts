import { Request, Response, NextFunction } from 'express';
import * as contactService from '@/services/contact/contactService';
import { successResponse } from '@/utils/apiResponse';
import { CreateContactData } from '@/services/contact/contactTypes';

/**
 * @summary Handles the creation of a new contact submission.
 */
export const createContactHandler = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const contactData: CreateContactData = {
      ...req.body,
      ip_usuario: req.ip, // Get user IP from request
    };

    const result = contactService.createContact(contactData);

    if (!result.success) {
      const error: any = new Error(result.error);
      error.status = 404; // Vehicle not found
      return next(error);
    }

    res.status(201).json(successResponse({ protocolo: result.protocolo }));
  } catch (error) {
    next(error);
  }
};
