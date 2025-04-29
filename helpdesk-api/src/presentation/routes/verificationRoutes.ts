import { Router } from 'express';
import { VerificationController } from '../controllers/VerificationController';
import { GetVerificationsUseCase } from '../../application/usecases/verification/GetVerificationsUseCase';
import { GetVerificationByIdUseCase } from '../../application/usecases/verification/GetVerificationByIdUseCase';
import { CreateVerificationUseCase } from '../../application/usecases/verification/CreateVerificationUseCase';
import { UpdateVerificationUseCase } from '../../application/usecases/verification/UpdateVerificationUseCase';
import { DeleteVerificationUseCase } from '../../application/usecases/verification/DeleteVerificationUseCase';
import { TypeOrmVerificationRepository } from '../../infrastructure/persistence/repositories/TypeOrmVerificationRepository';
import { TypeOrmTicketRepository } from '../../infrastructure/persistence/repositories/TypeOrmTicketRepository';
import { TypeOrmUserRepository } from '../../infrastructure/persistence/repositories/TypeOrmUserRepository';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Dependencies
const verificationRepository = new TypeOrmVerificationRepository();
const ticketRepository = new TypeOrmTicketRepository();
const userRepository = new TypeOrmUserRepository();

// Use cases
const getVerificationsUseCase = new GetVerificationsUseCase(verificationRepository, ticketRepository, userRepository);
const getVerificationByIdUseCase = new GetVerificationByIdUseCase(verificationRepository, ticketRepository, userRepository);
const createVerificationUseCase = new CreateVerificationUseCase(verificationRepository, ticketRepository, userRepository);
const updateVerificationUseCase = new UpdateVerificationUseCase(verificationRepository, ticketRepository, userRepository);
const deleteVerificationUseCase = new DeleteVerificationUseCase(verificationRepository);

// Controller
const verificationController = new VerificationController(
  getVerificationsUseCase,
  getVerificationByIdUseCase,
  createVerificationUseCase,
  updateVerificationUseCase,
  deleteVerificationUseCase,
);

// Routes
router.get('/', verificationController.getAllVerifications);
router.get('/:id', verificationController.getVerificationById);
router.post('/', authenticate, verificationController.createVerification);
router.put('/:id', authenticate, verificationController.updateVerification);
router.delete('/:id', authenticate, verificationController.deleteVerification);

export default router;
