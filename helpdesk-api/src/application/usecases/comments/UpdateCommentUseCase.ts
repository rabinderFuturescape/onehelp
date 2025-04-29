import { CommentRepository } from '../../../domain/repositories/CommentRepository';
import { UpdateCommentDto, CommentResponseDto } from '../../dtos/CommentDto';
import { NotFoundError } from '../../errors/NotFoundError';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { UserRepository } from '../../../domain/repositories/UserRepository';

export class UpdateCommentUseCase {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, userId: string, dto: UpdateCommentDto): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(id);
    
    if (!comment) {
      throw new NotFoundError(`Comment with ID ${id} not found`);
    }
    
    // Only the comment creator can update it
    if (comment.userId !== userId) {
      throw new ForbiddenError('You do not have permission to update this comment');
    }
    
    if (dto.content) {
      comment.content = dto.content;
    }
    
    if (dto.attachments) {
      // Replace attachments
      comment.attachments = [...dto.attachments];
    }
    
    comment.updatedAt = new Date();
    
    const updatedComment = await this.commentRepository.update(comment);
    
    const user = await this.userRepository.findById(userId);
    
    return {
      id: updatedComment.id,
      ticketId: updatedComment.ticketId,
      userId: updatedComment.userId,
      content: updatedComment.content,
      attachments: updatedComment.attachments,
      createdAt: updatedComment.createdAt,
      updatedAt: updatedComment.updatedAt,
      user: user ? {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      } : undefined,
    };
  }
}
