import { VerificationRepository } from '../../../domain/repositories/VerificationRepository';
import { TicketRepository } from '../../../domain/repositories/TicketRepository';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UpdateVerificationDto, VerificationResponseDto } from '../../dtos/VerificationDto';
import { NotFoundError } from '../../errors/NotFoundError';
import { ValidationError } from '../../errors/ValidationError';

export class UpdateVerificationUseCase {
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, dto: UpdateVerificationDto): Promise<VerificationResponseDto> {
    const verification = await this.verificationRepository.findById(id);
    
    if (!verification) {
      throw new NotFoundError(`Verification with ID ${id} not found`);
    }
    
    if (dto.status) {
      verification.status = dto.status;
    }
    
    if (dto.rating !== undefined) {
      if (dto.rating < 1 || dto.rating > 5) {
        throw new ValidationError('Rating must be between 1 and 5');
      }
      verification.rating = dto.rating;
    }
    
    if (dto.feedback !== undefined) {
      verification.feedback = dto.feedback;
    }
    
    verification.updatedAt = new Date();
    
    const updatedVerification = await this.verificationRepository.update(verification);
    
    const ticket = await this.ticketRepository.findById(updatedVerification.ticketId);
    const user = await this.userRepository.findById(updatedVerification.userId);
    
    return {
      id: updatedVerification.id,
      ticketId: updatedVerification.ticketId,
      userId: updatedVerification.userId,
      status: updatedVerification.status,
      rating: updatedVerification.rating,
      feedback: updatedVerification.feedback,
      createdAt: updatedVerification.createdAt,
      updatedAt: updatedVerification.updatedAt,
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
