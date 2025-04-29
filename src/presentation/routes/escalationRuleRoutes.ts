import { Router } from 'express';
import { EscalationRuleController } from '../controllers/EscalationRuleController';
import { GetEscalationRulesUseCase } from '../../application/usecases/escalation/GetEscalationRulesUseCase';
import { GetEscalationRuleByIdUseCase } from '../../application/usecases/escalation/GetEscalationRuleByIdUseCase';
import { CreateEscalationRuleUseCase } from '../../application/usecases/escalation/CreateEscalationRuleUseCase';
import { UpdateEscalationRuleUseCase } from '../../application/usecases/escalation/UpdateEscalationRuleUseCase';
import { DeleteEscalationRuleUseCase } from '../../application/usecases/escalation/DeleteEscalationRuleUseCase';
import { InMemoryEscalationRuleRepository } from '../../infrastructure/persistence/repositories/InMemoryEscalationRuleRepository';
import { authenticate } from '../middlewares/authMiddleware';
import { JwtTokenService } from '../../infrastructure/services/JwtTokenService';

const router = Router();

// Dependencies
const escalationRuleRepository = new InMemoryEscalationRuleRepository();
const tokenService = new JwtTokenService();

// Use cases
const getEscalationRulesUseCase = new GetEscalationRulesUseCase(escalationRuleRepository);
const getEscalationRuleByIdUseCase = new GetEscalationRuleByIdUseCase(escalationRuleRepository);
const createEscalationRuleUseCase = new CreateEscalationRuleUseCase(escalationRuleRepository);
const updateEscalationRuleUseCase = new UpdateEscalationRuleUseCase(escalationRuleRepository);
const deleteEscalationRuleUseCase = new DeleteEscalationRuleUseCase(escalationRuleRepository);

// Controller
const escalationRuleController = new EscalationRuleController(
  getEscalationRulesUseCase,
  getEscalationRuleByIdUseCase,
  createEscalationRuleUseCase,
  updateEscalationRuleUseCase,
  deleteEscalationRuleUseCase
);

// Routes
router.get('/', escalationRuleController.getAllRules);
router.get('/:id', escalationRuleController.getRuleById);
router.post('/', escalationRuleController.createRule);
router.put('/:id', escalationRuleController.updateRule);
router.delete('/:id', escalationRuleController.deleteRule);

export default router;
