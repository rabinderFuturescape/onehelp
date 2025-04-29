import bcrypt from 'bcrypt';
import { PasswordService } from '../../application/services/PasswordService';

export class BcryptPasswordService implements PasswordService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
