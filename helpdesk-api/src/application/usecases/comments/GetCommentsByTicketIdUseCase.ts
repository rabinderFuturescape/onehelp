import { CommentRepository } from '../../../domain/repositories/CommentRepository';
import { CommentResponseDto } from '../../dtos/CommentDto';
import { UserRepository } from '../../../domain/repositories/UserRepository';

export class GetCommentsByTicketIdUseCase {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(ticketId: string): Promise<CommentResponseDto[]> {
    const comments = await this.commentRepository.findByTicketId(ticketId);
    
    const commentDtos: CommentResponseDto[] = [];
    
    for (const comment of comments) {
      const user = await this.userRepository.findById(comment.userId);
      
      commentDtos.push({
        id: comment.id,
        ticketId: comment.ticketId,
        userId: comment.userId,
        content: comment.content,
        attachments: comment.attachments,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        user: user ? {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        } : undefined,
      });
    }
    
    return commentDtos;
  }
}
