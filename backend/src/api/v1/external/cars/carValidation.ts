import { z } from 'zod';

// Helper to transform comma-separated string to array of strings
const stringToArray = z.preprocess((val) => {
  if (typeof val === 'string') {
    return val
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return val;
}, z.array(z.string()).optional());

export const listCarsQuerySchema = z.object({
  body: z.object({}).optional(), // No body expected for GET
  params: z.object({}).optional(), // No params expected for this route
  query: z.object({
    brand: stringToArray,
    model: stringToArray,
    transmission: stringToArray,
    yearMin: z.coerce.number().int().min(1900).optional(),
    yearMax: z.coerce
      .number()
      .int()
      .max(new Date().getFullYear() + 1)
      .optional(),
    priceMin: z.coerce.number().min(0).optional(),
    priceMax: z.coerce.number().min(0).optional(),
    sortBy: z.enum(['relevance', 'price', 'year', 'model']).optional().default('relevance'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(48).optional().default(12),
  }),
});

export const getCarByIdSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1, 'Car ID is required'),
  }),
});
