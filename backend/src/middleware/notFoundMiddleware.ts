import { Request, Response } from 'express';

export const notFoundMiddleware = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      code: 404,
      message: `Not Found - ${req.method} ${req.originalUrl}`,
    },
    timestamp: new Date().toISOString(),
  });
};
