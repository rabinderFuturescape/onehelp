import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Verification, VerificationStatus } from '../../../domain/entities/Verification';
import { UserEntity } from './UserEntity';
import { TicketEntity } from './TicketEntity';

@Entity('verifications')
export class VerificationEntity {
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

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
  })
  status: VerificationStatus;

  @Column('int', { nullable: true })
  rating: number | null;

  @Column('text', { nullable: true })
  feedback: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toDomain(): Verification {
    return new Verification(
      this.id,
      this.ticketId,
      this.userId,
      this.status,
      this.rating,
      this.feedback,
      this.createdAt,
      this.updatedAt,
    );
  }

  static fromDomain(verification: Verification): VerificationEntity {
    const entity = new VerificationEntity();
    entity.id = verification.id;
    entity.ticketId = verification.ticketId;
    entity.userId = verification.userId;
    entity.status = verification.status;
    entity.rating = verification.rating;
    entity.feedback = verification.feedback;
    entity.createdAt = verification.createdAt;
    entity.updatedAt = verification.updatedAt;
    return entity;
  }
}
