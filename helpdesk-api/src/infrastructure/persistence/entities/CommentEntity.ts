import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Comment } from '../../../domain/entities/Comment';
import { UserEntity } from './UserEntity';
import { TicketEntity } from './TicketEntity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ticketId: string;

  @ManyToOne(() => TicketEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticketId' })
  ticket: TicketEntity;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('text')
  content: string;

  @Column('simple-array', { default: '' })
  attachments: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toDomain(): Comment {
    return new Comment(
      this.id,
      this.ticketId,
      this.userId,
      this.content,
      this.attachments,
      this.createdAt,
      this.updatedAt,
    );
  }

  static fromDomain(comment: Comment): CommentEntity {
    const entity = new CommentEntity();
    entity.id = comment.id;
    entity.ticketId = comment.ticketId;
    entity.userId = comment.userId;
    entity.content = comment.content;
    entity.attachments = comment.attachments;
    entity.createdAt = comment.createdAt;
    entity.updatedAt = comment.updatedAt;
    return entity;
  }
}
