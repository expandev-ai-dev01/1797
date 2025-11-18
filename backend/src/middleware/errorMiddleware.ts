import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
  status?: number;
}

export const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(
    `[ERROR] ${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    error: {
      code: statusCode,
      message:
        process.env.NODE_ENV === 'production' && statusCode === 500
          ? 'Internal Server Error'
          : message,
    },
    timestamp: new Date().toISOString(),
  });
};
