import { CommentRepository } from '../../../domain/repositories/CommentRepository';
import { NotFoundError } from '../../errors/NotFoundError';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { UserRole } from '../../../domain/entities/User';

export class DeleteCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(id: string, userId: string, userRole: UserRole): Promise<void> {
    const comment = await this.commentRepository.findById(id);
    
    if (!comment) {
      throw new NotFoundError(`Comment with ID ${id} not found`);
    }
    
    // Only the comment creator or an admin can delete it
    if (comment.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenError('You do not have permission to delete this comment');
    }
    
    await this.commentRepository.delete(id);
  }
}
