import { Router } from 'express';
import authRoutes from './authRoutes';
import escalationRuleRoutes from './escalationRuleRoutes';
import roleRoutes from './roleRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/escalation-rules', escalationRuleRoutes);
router.use('/roles', roleRoutes);

export default router;
