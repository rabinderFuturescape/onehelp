import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CannedResponse, CannedResponseStatus } from '../../../domain/entities/CannedResponse';

@Entity('canned_responses')
export class CannedResponseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  emailResponse: string;

  @Column('text', { nullable: true })
  smsResponse: string | null;

  @Column({
    type: 'enum',
    enum: CannedResponseStatus,
    default: CannedResponseStatus.ACTIVE,
  })
  status: CannedResponseStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toDomain(): CannedResponse {
    return new CannedResponse(
      this.id,
      this.title,
      this.emailResponse,
      this.smsResponse,
      this.status,
      this.createdAt,
      this.updatedAt,
    );
  }

  static fromDomain(cannedResponse: CannedResponse): CannedResponseEntity {
    const entity = new CannedResponseEntity();
    entity.id = cannedResponse.id;
    entity.title = cannedResponse.title;
    entity.emailResponse = cannedResponse.emailResponse;
    entity.smsResponse = cannedResponse.smsResponse;
    entity.status = cannedResponse.status;
    entity.createdAt = cannedResponse.createdAt;
    entity.updatedAt = cannedResponse.updatedAt;
    return entity;
  }
}
