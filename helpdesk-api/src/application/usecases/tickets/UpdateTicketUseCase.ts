import { TicketRepository } from '../../../domain/repositories/TicketRepository';
import { UpdateTicketDto, TicketResponseDto, toTicketResponseDto } from '../../dtos/TicketDto';
import { NotFoundError } from '../../errors/NotFoundError';
import { ForbiddenError } from '../../errors/ForbiddenError';

export class UpdateTicketUseCase {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(id: string, dto: UpdateTicketDto, userId: string, isAdmin: boolean): Promise<TicketResponseDto> {
    // Find the ticket
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket) {
      throw new NotFoundError(`Ticket with ID ${id} not found`);
    }

    // Check permissions (only creator, assignee, or admin can update)
    if (!isAdmin && ticket.createdById !== userId && ticket.assignedToId !== userId) {
      throw new ForbiddenError('You do not have permission to update this ticket');
    }

    // Update fields
    if (dto.title !== undefined) {
      ticket.title = dto.title;
    }

    if (dto.description !== undefined) {
      ticket.description = dto.description;
    }

    if (dto.status !== undefined) {
      ticket.updateStatus(dto.status);
    }

    if (dto.priority !== undefined) {
      ticket.updatePriority(dto.priority);
    }

    if (dto.assignedToId !== undefined) {
      if (dto.assignedToId === null) {
        ticket.assignedToId = null;
      } else {
        ticket.assign(dto.assignedToId);
      }
    }

    ticket.updatedAt = new Date();

    // Save to repository
    const updatedTicket = await this.ticketRepository.update(ticket);

    // Return response DTO
    return toTicketResponseDto(updatedTicket);
  }
}
