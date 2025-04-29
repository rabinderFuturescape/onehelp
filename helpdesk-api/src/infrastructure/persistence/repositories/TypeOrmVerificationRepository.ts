import { Repository } from 'typeorm';
import { Verification, VerificationStatus } from '../../../domain/entities/Verification';
import { VerificationRepository } from '../../../domain/repositories/VerificationRepository';
import { VerificationEntity } from '../entities/VerificationEntity';
import { AppDataSource } from '../../config/database';

export class TypeOrmVerificationRepository implements VerificationRepository {
  private repository: Repository<VerificationEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(VerificationEntity);
  }

  async findById(id: string): Promise<Verification | null> {
    const verificationEntity = await this.repository.findOne({ where: { id } });
    return verificationEntity ? verificationEntity.toDomain() : null;
  }

  async findByTicketId(ticketId: string): Promise<Verification | null> {
    const verificationEntity = await this.repository.findOne({ where: { ticketId } });
    return verificationEntity ? verificationEntity.toDomain() : null;
  }

  async findByStatus(status: VerificationStatus): Promise<Verification[]> {
    const verificationEntities = await this.repository.find({ where: { status } });
    return verificationEntities.map(entity => entity.toDomain());
  }

  async create(verification: Verification): Promise<Verification> {
    const verificationEntity = VerificationEntity.fromDomain(verification);
    const savedEntity = await this.repository.save(verificationEntity);
    return savedEntity.toDomain();
  }

  async update(verification: Verification): Promise<Verification> {
    const verificationEntity = VerificationEntity.fromDomain(verification);
    const savedEntity = await this.repository.save(verificationEntity);
    return savedEntity.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
