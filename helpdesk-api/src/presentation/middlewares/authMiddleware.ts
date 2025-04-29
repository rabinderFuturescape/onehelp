import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../../application/services/TokenService';
import { ApplicationError } from '../../application/errors/ApplicationError';
import { UserRole } from '../../domain/entities/User';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticate = (tokenService: TokenService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApplicationError('Authentication required', 401);
      }

      const token = authHeader.split(' ')[1];
      const payload = tokenService.verifyToken(token);

      req.user = payload;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ApplicationError('Authentication required', 401);
      }

      if (!roles.includes(req.user.role as UserRole)) {
        throw new ApplicationError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
