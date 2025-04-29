import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';
import { GetCommentsByTicketIdUseCase } from '../../application/usecases/comments/GetCommentsByTicketIdUseCase';
import { CreateCommentUseCase } from '../../application/usecases/comments/CreateCommentUseCase';
import { UpdateCommentUseCase } from '../../application/usecases/comments/UpdateCommentUseCase';
import { DeleteCommentUseCase } from '../../application/usecases/comments/DeleteCommentUseCase';
import { TypeOrmCommentRepository } from '../../infrastructure/persistence/repositories/TypeOrmCommentRepository';
import { TypeOrmTicketRepository } from '../../infrastructure/persistence/repositories/TypeOrmTicketRepository';
import { TypeOrmUserRepository } from '../../infrastructure/persistence/repositories/TypeOrmUserRepository';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Dependencies
const commentRepository = new TypeOrmCommentRepository();
const ticketRepository = new TypeOrmTicketRepository();
const userRepository = new TypeOrmUserRepository();

// Use cases
const getCommentsByTicketIdUseCase = new GetCommentsByTicketIdUseCase(commentRepository, userRepository);
const createCommentUseCase = new CreateCommentUseCase(commentRepository, ticketRepository, userRepository);
const updateCommentUseCase = new UpdateCommentUseCase(commentRepository, userRepository);
const deleteCommentUseCase = new DeleteCommentUseCase(commentRepository);

// Controller
const commentController = new CommentController(
  getCommentsByTicketIdUseCase,
  createCommentUseCase,
  updateCommentUseCase,
  deleteCommentUseCase,
);

// Routes
router.get('/ticket/:ticketId', commentController.getCommentsByTicketId);
router.post('/', authenticate, commentController.createComment);
router.put('/:id', authenticate, commentController.updateComment);
router.delete('/:id', authenticate, commentController.deleteComment);

export default router;
