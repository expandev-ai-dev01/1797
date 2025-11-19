import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validateRequest = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Assign parsed (and coerced) values back to the request object
      req.body = parsed.body;
      req.query = parsed.query;
      req.params = parsed.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        res.status(400).json({
          success: false,
          error: {
            code: 400,
            message: 'Invalid request data',
            details: errorMessages,
          },
        });
      } else {
        res.status(500).json({
          success: false,
          error: {
            code: 500,
            message: 'Internal Server Error',
          },
        });
      }
    }
  };
};
