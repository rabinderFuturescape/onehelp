import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UserEntity } from '../entities/UserEntity';
import { AppDataSource } from '../../config/database';

export class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { id } });
    return userEntity ? userEntity.toDomain() : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { email } });
    return userEntity ? userEntity.toDomain() : null;
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.repository.find();
    return userEntities.map((entity) => entity.toDomain());
  }

  async create(user: User): Promise<User> {
    const userEntity = UserEntity.fromDomain(user);
    const savedEntity = await this.repository.save(userEntity);
    return savedEntity.toDomain();
  }

  async update(user: User): Promise<User> {
    const userEntity = UserEntity.fromDomain(user);
    const savedEntity = await this.repository.save(userEntity);
    return savedEntity.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
