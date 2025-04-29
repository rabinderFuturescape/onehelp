import { Ticket, TicketStatus, TicketPriority } from '../entities/Ticket';

export interface TicketRepository {
  findById(id: string): Promise<Ticket | null>;
  findAll(options?: {
    status?: TicketStatus;
    priority?: TicketPriority;
    createdById?: string;
    assignedToId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ tickets: Ticket[]; total: number }>;
  create(ticket: Ticket): Promise<Ticket>;
  update(ticket: Ticket): Promise<Ticket>;
  delete(id: string): Promise<void>;
}
