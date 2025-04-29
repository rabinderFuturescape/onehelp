import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { LoginUseCase } from '../../application/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../application/usecases/auth/RegisterUseCase';
import { TypeOrmUserRepository } from '../../infrastructure/persistence/repositories/TypeOrmUserRepository';
import { BcryptPasswordService } from '../../infrastructure/services/BcryptPasswordService';
import { JwtTokenService } from '../../infrastructure/services/JwtTokenService';

const router = Router();

// Dependencies
const userRepository = new TypeOrmUserRepository();
const passwordService = new BcryptPasswordService();
const tokenService = new JwtTokenService();

// Use cases
const loginUseCase = new LoginUseCase(userRepository, passwordService, tokenService);
const registerUseCase = new RegisterUseCase(userRepository, passwordService, tokenService);

// Controller
const authController = new AuthController(loginUseCase, registerUseCase);

// Routes
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
