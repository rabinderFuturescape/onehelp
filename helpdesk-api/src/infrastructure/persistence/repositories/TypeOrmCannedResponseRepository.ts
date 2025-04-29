import { Repository } from 'typeorm';
import { CannedResponse, CannedResponseStatus } from '../../../domain/entities/CannedResponse';
import { CannedResponseRepository } from '../../../domain/repositories/CannedResponseRepository';
import { CannedResponseEntity } from '../entities/CannedResponseEntity';
import { AppDataSource } from '../../config/database';

export class TypeOrmCannedResponseRepository implements CannedResponseRepository {
  private repository: Repository<CannedResponseEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(CannedResponseEntity);
  }

  async findById(id: string): Promise<CannedResponse | null> {
    const cannedResponseEntity = await this.repository.findOne({ where: { id } });
    return cannedResponseEntity ? cannedResponseEntity.toDomain() : null;
  }

  async findAll(options?: {
    status?: CannedResponseStatus;
    page?: number;
    limit?: number;
  }): Promise<{ cannedResponses: CannedResponse[]; total: number }> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.repository.createQueryBuilder('cannedResponse');

    if (options?.status) {
      queryBuilder.andWhere('cannedResponse.status = :status', { status: options.status });
    }

    const [cannedResponseEntities, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('cannedResponse.title', 'ASC')
      .getManyAndCount();

    const cannedResponses = cannedResponseEntities.map(entity => entity.toDomain());

    return { cannedResponses, total };
  }

  async create(cannedResponse: CannedResponse): Promise<CannedResponse> {
    const cannedResponseEntity = CannedResponseEntity.fromDomain(cannedResponse);
    const savedEntity = await this.repository.save(cannedResponseEntity);
    return savedEntity.toDomain();
  }

  async update(cannedResponse: CannedResponse): Promise<CannedResponse> {
    const cannedResponseEntity = CannedResponseEntity.fromDomain(cannedResponse);
    const savedEntity = await this.repository.save(cannedResponseEntity);
    return savedEntity.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
