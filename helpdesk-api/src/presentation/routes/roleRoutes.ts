import { Router } from 'express';
import { RoleController } from '../controllers/RoleController';
import { GetRolesUseCase } from '../../application/usecases/roles/GetRolesUseCase';
import { GetRoleByIdUseCase } from '../../application/usecases/roles/GetRoleByIdUseCase';
import { CreateRoleUseCase } from '../../application/usecases/roles/CreateRoleUseCase';
import { UpdateRoleUseCase } from '../../application/usecases/roles/UpdateRoleUseCase';
import { DeleteRoleUseCase } from '../../application/usecases/roles/DeleteRoleUseCase';
import { TypeOrmRoleRepository } from '../../infrastructure/persistence/repositories/TypeOrmRoleRepository';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Dependencies
const roleRepository = new TypeOrmRoleRepository();

// Use cases
const getRolesUseCase = new GetRolesUseCase(roleRepository);
const getRoleByIdUseCase = new GetRoleByIdUseCase(roleRepository);
const createRoleUseCase = new CreateRoleUseCase(roleRepository);
const updateRoleUseCase = new UpdateRoleUseCase(roleRepository);
const deleteRoleUseCase = new DeleteRoleUseCase(roleRepository);

// Controller
const roleController = new RoleController(
  getRolesUseCase,
  getRoleByIdUseCase,
  createRoleUseCase,
  updateRoleUseCase,
  deleteRoleUseCase,
);

// Routes
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.post('/', authenticate, roleController.createRole);
router.put('/:id', authenticate, roleController.updateRole);
router.delete('/:id', authenticate, roleController.deleteRole);

export default router;
