import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../../application/errors/ApplicationError';
import { NotFoundError } from '../../application/errors/NotFoundError';
import { ValidationError } from '../../application/errors/ValidationError';
import { UnauthorizedError } from '../../application/errors/UnauthorizedError';
import { ForbiddenError } from '../../application/errors/ForbiddenError';
import { ConflictError } from '../../application/errors/ConflictError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error('Error:', err);

  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        details: err.details,
      },
    });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).json({
      error: {
        message: err.message,
      },
    });
    return;
  }

  if (err instanceof ValidationError) {
    res.status(400).json({
      error: {
        message: err.message,
      },
    });
    return;
  }

  if (err instanceof UnauthorizedError) {
    res.status(401).json({
      error: {
        message: err.message,
      },
    });
    return;
  }

  if (err instanceof ForbiddenError) {
    res.status(403).json({
      error: {
        message: err.message,
      },
    });
    return;
  }

  if (err instanceof ConflictError) {
    res.status(409).json({
      error: {
        message: err.message,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      message: 'Internal server error',
    },
  });
};
