import { Repository } from 'typeorm';
import { HelpTopic, HelpTopicStatus, HelpTopicVisibility } from '../../../domain/entities/HelpTopic';
import { HelpTopicRepository } from '../../../domain/repositories/HelpTopicRepository';
import { HelpTopicEntity } from '../entities/HelpTopicEntity';
import { AppDataSource } from '../../config/database';

export class TypeOrmHelpTopicRepository implements HelpTopicRepository {
  private repository: Repository<HelpTopicEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(HelpTopicEntity);
  }

  async findById(id: string): Promise<HelpTopic | null> {
    const helpTopicEntity = await this.repository.findOne({ where: { id } });
    return helpTopicEntity ? helpTopicEntity.toDomain() : null;
  }

  async findByParentId(parentId: string): Promise<HelpTopic[]> {
    const helpTopicEntities = await this.repository.find({ where: { parentId } });
    return helpTopicEntities.map(entity => entity.toDomain());
  }

  async findAll(options?: {
    status?: HelpTopicStatus;
    visibility?: HelpTopicVisibility;
    page?: number;
    limit?: number;
  }): Promise<{ helpTopics: HelpTopic[]; total: number }> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.repository.createQueryBuilder('helpTopic');

    if (options?.status) {
      queryBuilder.andWhere('helpTopic.status = :status', { status: options.status });
    }

    if (options?.visibility) {
      queryBuilder.andWhere('helpTopic.visibility = :visibility', { visibility: options.visibility });
    }

    const [helpTopicEntities, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('helpTopic.name', 'ASC')
      .getManyAndCount();

    const helpTopics = helpTopicEntities.map(entity => entity.toDomain());

    return { helpTopics, total };
  }

  async create(helpTopic: HelpTopic): Promise<HelpTopic> {
    const helpTopicEntity = HelpTopicEntity.fromDomain(helpTopic);
    const savedEntity = await this.repository.save(helpTopicEntity);
    return savedEntity.toDomain();
  }

  async update(helpTopic: HelpTopic): Promise<HelpTopic> {
    const helpTopicEntity = HelpTopicEntity.fromDomain(helpTopic);
    const savedEntity = await this.repository.save(helpTopicEntity);
    return savedEntity.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
