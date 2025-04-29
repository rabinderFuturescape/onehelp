import { TicketRepository } from '../../../domain/repositories/TicketRepository';
import { TicketStatus, TicketPriority } from '../../../domain/entities/Ticket';
import { TicketListResponseDto, toTicketResponseDto } from '../../dtos/TicketDto';

export class GetTicketsUseCase {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(options: {
    status?: TicketStatus;
    priority?: TicketPriority;
    createdById?: string;
    assignedToId?: string;
    page?: number;
    limit?: number;
  }): Promise<TicketListResponseDto> {
    const page = options.page || 1;
    const limit = options.limit || 10;

    const { tickets, total } = await this.ticketRepository.findAll({
      status: options.status,
      priority: options.priority,
      createdById: options.createdById,
      assignedToId: options.assignedToId,
      page,
      limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      tickets: tickets.map(toTicketResponseDto),
      total,
      page,
      limit,
      totalPages,
    };
  }
}
