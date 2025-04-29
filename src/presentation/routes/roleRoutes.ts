import { Router } from 'express';
import { RoleController } from '../controllers/RoleController';
import { authenticate } from '../middlewares/authMiddleware';
import { JwtTokenService } from '../../infrastructure/services/JwtTokenService';

const router = Router();

// Dependencies
const tokenService = new JwtTokenService();

// Controller
const roleController = new RoleController();

// Routes
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);

export default router;
