import { Router } from 'express';
import { createHelpTopicController } from '../controllers/HelpTopicController';
import { GetHelpTopicsUseCase } from '../../application/usecases/helpTopics/GetHelpTopicsUseCase';
import { GetHelpTopicByIdUseCase } from '../../application/usecases/helpTopics/GetHelpTopicByIdUseCase';
import { CreateHelpTopicUseCase } from '../../application/usecases/helpTopics/CreateHelpTopicUseCase';
import { UpdateHelpTopicUseCase } from '../../application/usecases/helpTopics/UpdateHelpTopicUseCase';
import { DeleteHelpTopicUseCase } from '../../application/usecases/helpTopics/DeleteHelpTopicUseCase';
import { TypeOrmHelpTopicRepository } from '../../infrastructure/persistence/repositories/TypeOrmHelpTopicRepository';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Dependencies
const helpTopicRepository = new TypeOrmHelpTopicRepository();

// Use cases
const getHelpTopicsUseCase = new GetHelpTopicsUseCase(helpTopicRepository);
const getHelpTopicByIdUseCase = new GetHelpTopicByIdUseCase(helpTopicRepository);
const createHelpTopicUseCase = new CreateHelpTopicUseCase(helpTopicRepository);
const updateHelpTopicUseCase = new UpdateHelpTopicUseCase(helpTopicRepository);
const deleteHelpTopicUseCase = new DeleteHelpTopicUseCase(helpTopicRepository);

// Create controller functions
const helpTopicController = createHelpTopicController(
  getHelpTopicsUseCase,
  getHelpTopicByIdUseCase,
  createHelpTopicUseCase,
  updateHelpTopicUseCase,
  deleteHelpTopicUseCase
);

// Routes
router.get('/', helpTopicController.getAllHelpTopics);
router.get('/:id', helpTopicController.getHelpTopicById);
router.post('/', authenticate, helpTopicController.createHelpTopic);
router.put('/:id', authenticate, helpTopicController.updateHelpTopic);
router.delete('/:id', authenticate, helpTopicController.deleteHelpTopic);

export default router;
