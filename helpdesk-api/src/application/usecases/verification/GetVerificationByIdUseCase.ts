import { VerificationRepository } from '../../../domain/repositories/VerificationRepository';
import { VerificationResponseDto } from '../../dtos/VerificationDto';
import { NotFoundError } from '../../errors/NotFoundError';
import { TicketRepository } from '../../../domain/repositories/TicketRepository';
import { UserRepository } from '../../../domain/repositories/UserRepository';

export class GetVerificationByIdUseCase {
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<VerificationResponseDto> {
    const verification = await this.verificationRepository.findById(id);
    
    if (!verification) {
      throw new NotFoundError(`Verification with ID ${id} not found`);
    }
    
    const ticket = await this.ticketRepository.findById(verification.ticketId);
    const user = await this.userRepository.findById(verification.userId);
    
    return {
      id: verification.id,
      ticketId: verification.ticketId,
      userId: verification.userId,
      status: verification.status,
      rating: verification.rating,
      feedback: verification.feedback,
      createdAt: verification.createdAt,
      updatedAt: verification.updatedAt,
      ticket: ticket ? {
        id: ticket.id,
        title: ticket.title,
      } : undefined,
      user: user ? {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      } : undefined,
    };
  }
}
