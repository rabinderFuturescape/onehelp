import { Ticket, TicketPriority, TicketStatus } from '../../domain/entities/Ticket';

export interface CreateTicketDto {
  title: string;
  description: string;
  priority?: TicketPriority;
}

export interface UpdateTicketDto {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedToId?: string | null;
}

export interface TicketResponseDto {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdById: string;
  assignedToId: string | null;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketListResponseDto {
  tickets: TicketResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function toTicketResponseDto(ticket: Ticket): TicketResponseDto {
  return {
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    createdById: ticket.createdById,
    assignedToId: ticket.assignedToId,
    attachments: ticket.attachments,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
  };
}
