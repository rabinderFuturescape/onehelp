import { Router } from 'express';
import { CannedResponseController } from '../controllers/CannedResponseController';
import { GetCannedResponsesUseCase } from '../../application/usecases/cannedResponses/GetCannedResponsesUseCase';
import { GetCannedResponseByIdUseCase } from '../../application/usecases/cannedResponses/GetCannedResponseByIdUseCase';
import { CreateCannedResponseUseCase } from '../../application/usecases/cannedResponses/CreateCannedResponseUseCase';
import { UpdateCannedResponseUseCase } from '../../application/usecases/cannedResponses/UpdateCannedResponseUseCase';
import { DeleteCannedResponseUseCase } from '../../application/usecases/cannedResponses/DeleteCannedResponseUseCase';
import { TypeOrmCannedResponseRepository } from '../../infrastructure/persistence/repositories/TypeOrmCannedResponseRepository';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Dependencies
const cannedResponseRepository = new TypeOrmCannedResponseRepository();

// Use cases
const getCannedResponsesUseCase = new GetCannedResponsesUseCase(cannedResponseRepository);
const getCannedResponseByIdUseCase = new GetCannedResponseByIdUseCase(cannedResponseRepository);
const createCannedResponseUseCase = new CreateCannedResponseUseCase(cannedResponseRepository);
const updateCannedResponseUseCase = new UpdateCannedResponseUseCase(cannedResponseRepository);
const deleteCannedResponseUseCase = new DeleteCannedResponseUseCase(cannedResponseRepository);

// Controller
const cannedResponseController = new CannedResponseController(
  getCannedResponsesUseCase,
  getCannedResponseByIdUseCase,
  createCannedResponseUseCase,
  updateCannedResponseUseCase,
  deleteCannedResponseUseCase,
);

// Routes
router.get('/', cannedResponseController.getAllCannedResponses);
router.get('/:id', cannedResponseController.getCannedResponseById);
router.post('/', authenticate, cannedResponseController.createCannedResponse);
router.put('/:id', authenticate, cannedResponseController.updateCannedResponse);
router.delete('/:id', authenticate, cannedResponseController.deleteCannedResponse);

export default router;
