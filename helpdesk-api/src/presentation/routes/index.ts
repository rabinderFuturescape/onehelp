import { Router } from 'express';
import authRoutes from './authRoutes';
import helpTopicRoutes from './helpTopicRoutes';
import cannedResponseRoutes from './cannedResponseRoutes';
import roleRoutes from './roleRoutes';
import commentRoutes from './commentRoutes';
import verificationRoutes from './verificationRoutes';
// Import other routes as they are implemented

const router = Router();

router.use('/auth', authRoutes);
router.use('/help-topics', helpTopicRoutes);
router.use('/canned-responses', cannedResponseRoutes);
router.use('/roles', roleRoutes);
router.use('/comments', commentRoutes);
router.use('/verifications', verificationRoutes);
// Add other routes here as they are implemented

export default router;
