import { TicketRepository } from '../../../domain/repositories/TicketRepository';
import { NotFoundError } from '../../errors/NotFoundError';
import { ForbiddenError } from '../../errors/ForbiddenError';

export class DeleteTicketUseCase {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(id: string, userId: string, isAdmin: boolean): Promise<void> {
    // Find the ticket
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket) {
      throw new NotFoundError(`Ticket with ID ${id} not found`);
    }

    // Check permissions (only creator or admin can delete)
    if (!isAdmin && ticket.createdById !== userId) {
      throw new ForbiddenError('You do not have permission to delete this ticket');
    }

    // Delete from repository
    await this.ticketRepository.delete(id);
  }
}
