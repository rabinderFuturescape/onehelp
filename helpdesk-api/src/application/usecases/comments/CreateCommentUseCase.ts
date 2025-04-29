import { Comment } from '../../../domain/entities/Comment';
import { CommentRepository } from '../../../domain/repositories/CommentRepository';
import { TicketRepository } from '../../../domain/repositories/TicketRepository';
import { CreateCommentDto, CommentResponseDto } from '../../dtos/CommentDto';
import { NotFoundError } from '../../errors/NotFoundError';
import { UserRepository } from '../../../domain/repositories/UserRepository';

export class CreateCommentUseCase {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, dto: CreateCommentDto): Promise<CommentResponseDto> {
    // Check if ticket exists
    const ticket = await this.ticketRepository.findById(dto.ticketId);
    if (!ticket) {
      throw new NotFoundError(`Ticket with ID ${dto.ticketId} not found`);
    }
    
    const comment = Comment.create(dto.ticketId, userId, dto.content);
    
    if (dto.attachments && dto.attachments.length > 0) {
      dto.attachments.forEach(attachment => {
        comment.addAttachment(attachment);
      });
    }
    
    const createdComment = await this.commentRepository.create(comment);
    
    const user = await this.userRepository.findById(userId);
    
    return {
      id: createdComment.id,
      ticketId: createdComment.ticketId,
      userId: createdComment.userId,
      content: createdComment.content,
      attachments: createdComment.attachments,
      createdAt: createdComment.createdAt,
      updatedAt: createdComment.updatedAt,
      user: user ? {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      } : undefined,
    };
  }
}
