import { Repository } from 'typeorm';
import { Comment } from '../../../domain/entities/Comment';
import { CommentRepository } from '../../../domain/repositories/CommentRepository';
import { CommentEntity } from '../entities/CommentEntity';
import { AppDataSource } from '../../config/database';

export class TypeOrmCommentRepository implements CommentRepository {
  private repository: Repository<CommentEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(CommentEntity);
  }

  async findById(id: string): Promise<Comment | null> {
    const commentEntity = await this.repository.findOne({ where: { id } });
    return commentEntity ? commentEntity.toDomain() : null;
  }

  async findByTicketId(ticketId: string): Promise<Comment[]> {
    const commentEntities = await this.repository.find({
      where: { ticketId },
      order: { createdAt: 'ASC' },
    });
    return commentEntities.map(entity => entity.toDomain());
  }

  async create(comment: Comment): Promise<Comment> {
    const commentEntity = CommentEntity.fromDomain(comment);
    const savedEntity = await this.repository.save(commentEntity);
    return savedEntity.toDomain();
  }

  async update(comment: Comment): Promise<Comment> {
    const commentEntity = CommentEntity.fromDomain(comment);
    const savedEntity = await this.repository.save(commentEntity);
    return savedEntity.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
