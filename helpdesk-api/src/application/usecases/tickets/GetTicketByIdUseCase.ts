import { TicketRepository } from '../../../domain/repositories/TicketRepository';
import { TicketResponseDto, toTicketResponseDto } from '../../dtos/TicketDto';
import { NotFoundError } from '../../errors/NotFoundError';

export class GetTicketByIdUseCase {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(id: string): Promise<TicketResponseDto> {
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket) {
      throw new NotFoundError(`Ticket with ID ${id} not found`);
    }

    return toTicketResponseDto(ticket);
  }
}
