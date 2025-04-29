import { Request, Response, NextFunction } from 'express';
import { GetCommentsByTicketIdUseCase } from '../../application/usecases/comments/GetCommentsByTicketIdUseCase';
import { CreateCommentUseCase } from '../../application/usecases/comments/CreateCommentUseCase';
import { UpdateCommentUseCase } from '../../application/usecases/comments/UpdateCommentUseCase';
import { DeleteCommentUseCase } from '../../application/usecases/comments/DeleteCommentUseCase';
import { CreateCommentDto, UpdateCommentDto } from '../../application/dtos/CommentDto';
import { UnauthorizedError } from '../../application/errors/UnauthorizedError';
import { UserRole } from '../../domain/entities/User';

export class CommentController {
  constructor(
    private readonly getCommentsByTicketIdUseCase: GetCommentsByTicketIdUseCase,
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly updateCommentUseCase: UpdateCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
  ) {}

  getCommentsByTicketId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ticketId } = req.params;
      const comments = await this.getCommentsByTicketIdUseCase.execute(ticketId);
      res.status(200).json({ comments });
    } catch (error) {
      next(error);
    }
  };

  createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('User not authenticated');
      }
      
      const dto: CreateCommentDto = req.body;
      const comment = await this.createCommentUseCase.execute(req.user.id, dto);
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  };

  updateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('User not authenticated');
      }
      
      const { id } = req.params;
      const dto: UpdateCommentDto = req.body;
      const comment = await this.updateCommentUseCase.execute(id, req.user.id, dto);
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('User not authenticated');
      }
      
      const { id } = req.params;
      await this.deleteCommentUseCase.execute(id, req.user.id, req.user.role as UserRole);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
