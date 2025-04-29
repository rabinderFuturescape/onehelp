import { VerificationRepository } from '../../../domain/repositories/VerificationRepository';
import { VerificationResponseDto } from '../../dtos/VerificationDto';
import { VerificationStatus } from '../../../domain/entities/Verification';
import { TicketRepository } from '../../../domain/repositories/TicketRepository';
import { UserRepository } from '../../../domain/repositories/UserRepository';

export class GetVerificationsUseCase {
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(status?: VerificationStatus): Promise<VerificationResponseDto[]> {
    let verifications;
    
    if (status) {
      verifications = await this.verificationRepository.findByStatus(status);
    } else {
      // Get all verifications (this would need to be implemented in the repository)
      const allStatuses = Object.values(VerificationStatus);
      verifications = [];
      
      for (const status of allStatuses) {
        const statusVerifications = await this.verificationRepository.findByStatus(status);
        verifications.push(...statusVerifications);
      }
    }
    
    const verificationDtos: VerificationResponseDto[] = [];
    
    for (const verification of verifications) {
      const ticket = await this.ticketRepository.findById(verification.ticketId);
      const user = await this.userRepository.findById(verification.userId);
      
      verificationDtos.push({
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
      });
    }
    
    return verificationDtos;
  }
}
