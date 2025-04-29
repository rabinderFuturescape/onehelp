import jwt from 'jsonwebtoken';
import { TokenService, TokenPayload } from '../../application/services/TokenService';
import { config } from '../config/env';
import { ApplicationError } from '../../application/errors/ApplicationError';

export class JwtTokenService implements TokenService {
  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, config.jwt.secret) as TokenPayload;
    } catch (error) {
      throw new ApplicationError('Invalid token', 401);
    }
  }
}
