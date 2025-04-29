export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface TokenService {
  generateToken(payload: TokenPayload): string;
  verifyToken(token: string): TokenPayload;
}
