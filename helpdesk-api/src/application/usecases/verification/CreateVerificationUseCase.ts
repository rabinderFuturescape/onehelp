import { Verification } from '../../../domain/entities/Verification';
import { VerificationRepository } from '../../../domain/repositories/VerificationRepository';
import { TicketRepository } from '../../../domain/repositories/TicketRepository';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { CreateVerificationDto, VerificationResponseDto } from '../../dtos/VerificationDto';
import { NotFoundError } from '../../errors/NotFoundError';
import { ConflictError } from '../../errors/ConflictError';

export class CreateVerificationUseCase {
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateVerificationDto): Promise<VerificationResponseDto> {
    // Check if ticket exists
    const ticket = await this.ticketRepository.findById(dto.ticketId);
    if (!ticket) {
      throw new NotFoundError(`Ticket with ID ${dto.ticketId} not found`);
    }
    
    // Check if user exists
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new NotFoundError(`User with ID ${dto.userId} not found`);
    }
    
    // Check if verification already exists for this ticket
    const existingVerification = await this.verificationRepository.findByTicketId(dto.ticketId);
    if (existingVerification) {
      throw new ConflictError(`Verification already exists for ticket with ID ${dto.ticketId}`);
    }
    
    const verification = Verification.create(dto.ticketId, dto.userId);
    
    const createdVerification = await this.verificationRepository.create(verification);
    
    return {
      id: createdVerification.id,
      ticketId: createdVerification.ticketId,
      userId: createdVerification.userId,
      status: createdVerification.status,
      rating: createdVerification.rating,
      feedback: createdVerification.feedback,
      createdAt: createdVerification.createdAt,
      updatedAt: createdVerification.updatedAt,
      ticket: {
        id: ticket.id,
        title: ticket.title,
      },
      user: {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
    };
  }
}
