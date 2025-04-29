import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ticket, TicketStatus, TicketPriority } from '../../../domain/entities/Ticket';
import { UserEntity } from './UserEntity';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
  })
  priority: TicketPriority;

  @Column()
  createdById: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'createdById' })
  createdBy: UserEntity;

  @Column({ nullable: true })
  assignedToId: string | null;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo: UserEntity;

  @Column('simple-array', { default: '' })
  attachments: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toDomain(): Ticket {
    return new Ticket(
      this.id,
      this.title,
      this.description,
      this.status,
      this.priority,
      this.createdById,
      this.assignedToId,
      this.attachments,
      this.createdAt,
      this.updatedAt,
    );
  }

  static fromDomain(ticket: Ticket): TicketEntity {
    const entity = new TicketEntity();
    entity.id = ticket.id;
    entity.title = ticket.title;
    entity.description = ticket.description;
    entity.status = ticket.status;
    entity.priority = ticket.priority;
    entity.createdById = ticket.createdById;
    entity.assignedToId = ticket.assignedToId;
    entity.attachments = ticket.attachments;
    entity.createdAt = ticket.createdAt;
    entity.updatedAt = ticket.updatedAt;
    return entity;
  }
}
