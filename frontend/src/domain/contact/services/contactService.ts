import { apiClient } from '@/core/lib/api';
import type { CreateContactData, ContactSuccessResponse } from '../types';

/**
 * @service contactService
 * @summary Provides methods for contact form submissions.
 * @domain contact
 * @type rest-service
 */
export const contactService = {
  /**
   * @endpoint POST /external/contact
   * @summary Submits the contact form data.
   * @param {CreateContactData} data - The contact form data.
   * @returns {Promise<{data: ContactSuccessResponse}>} The success response with a protocol number.
   */
  async createContact(data: CreateContactData): Promise<{ data: ContactSuccessResponse }> {
    return apiClient.post('/external/contact', data);
  },
};
