import { Request, Response, NextFunction } from 'express';
import { LoginUseCase } from '../../application/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../application/usecases/auth/RegisterUseCase';
import { LoginDto, RegisterDto } from '../../application/dtos/AuthDto';

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginDto: LoginDto = req.body;
      const result = await this.loginUseCase.execute(loginDto);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const registerDto: RegisterDto = req.body;
      const result = await this.registerUseCase.execute(registerDto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
