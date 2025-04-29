import { Repository } from 'typeorm';
import { Ticket, TicketStatus, TicketPriority } from '../../../domain/entities/Ticket';
import { TicketRepository } from '../../../domain/repositories/TicketRepository';
import { TicketEntity } from '../entities/TicketEntity';
import { AppDataSource } from '../../config/database';

export class TypeOrmTicketRepository implements TicketRepository {
  private repository: Repository<TicketEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(TicketEntity);
  }

  async findById(id: string): Promise<Ticket | null> {
    const ticketEntity = await this.repository.findOne({ where: { id } });
    return ticketEntity ? ticketEntity.toDomain() : null;
  }

  async findAll(options?: {
    status?: TicketStatus;
    priority?: TicketPriority;
    createdById?: string;
    assignedToId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ tickets: Ticket[]; total: number }> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.repository.createQueryBuilder('ticket');

    if (options?.status) {
      queryBuilder.andWhere('ticket.status = :status', { status: options.status });
    }

    if (options?.priority) {
      queryBuilder.andWhere('ticket.priority = :priority', { priority: options.priority });
    }

    if (options?.createdById) {
      queryBuilder.andWhere('ticket.createdById = :createdById', { createdById: options.createdById });
    }

    if (options?.assignedToId) {
      queryBuilder.andWhere('ticket.assignedToId = :assignedToId', { assignedToId: options.assignedToId });
    }

    const [ticketEntities, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('ticket.updatedAt', 'DESC')
      .getManyAndCount();

    const tickets = ticketEntities.map((entity) => entity.toDomain());

    return { tickets, total };
  }

  async create(ticket: Ticket): Promise<Ticket> {
    const ticketEntity = TicketEntity.fromDomain(ticket);
    const savedEntity = await this.repository.save(ticketEntity);
    return savedEntity.toDomain();
  }

  async update(ticket: Ticket): Promise<Ticket> {
    const ticketEntity = TicketEntity.fromDomain(ticket);
    const savedEntity = await this.repository.save(ticketEntity);
    return savedEntity.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
