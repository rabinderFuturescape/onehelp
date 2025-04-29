import { TicketRepository } from '../../../domain/repositories/TicketRepository';
import { Ticket } from '../../../domain/entities/Ticket';
import { CreateTicketDto, TicketResponseDto, toTicketResponseDto } from '../../dtos/TicketDto';
import { ValidationError } from '../../errors/ValidationError';

export class CreateTicketUseCase {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(dto: CreateTicketDto, userId: string): Promise<TicketResponseDto> {
    // Validate input
    if (!dto.title || dto.title.trim() === '') {
      throw new ValidationError('Title is required');
    }

    if (!dto.description || dto.description.trim() === '') {
      throw new ValidationError('Description is required');
    }

    // Create ticket entity
    const ticket = Ticket.create(
      dto.title,
      dto.description,
      userId,
      dto.priority
    );

    // Save to repository
    const savedTicket = await this.ticketRepository.create(ticket);

    // Return response DTO
    return toTicketResponseDto(savedTicket);
  }
}
