import { Repository } from 'typeorm';
import { Role } from '../../../domain/entities/Role';
import { RoleRepository } from '../../../domain/repositories/RoleRepository';
import { RoleEntity } from '../entities/RoleEntity';
import { AppDataSource } from '../../config/database';

export class TypeOrmRoleRepository implements RoleRepository {
  private repository: Repository<RoleEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(RoleEntity);
  }

  async findById(id: string): Promise<Role | null> {
    const roleEntity = await this.repository.findOne({ where: { id } });
    return roleEntity ? roleEntity.toDomain() : null;
  }

  async findByName(name: string): Promise<Role | null> {
    const roleEntity = await this.repository.findOne({ where: { name } });
    return roleEntity ? roleEntity.toDomain() : null;
  }

  async findAll(options?: {
    page?: number;
    limit?: number;
  }): Promise<{ roles: Role[]; total: number }> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const [roleEntities, total] = await this.repository.findAndCount({
      skip,
      take: limit,
      order: { name: 'ASC' },
    });

    const roles = roleEntities.map(entity => entity.toDomain());

    return { roles, total };
  }

  async create(role: Role): Promise<Role> {
    const roleEntity = RoleEntity.fromDomain(role);
    const savedEntity = await this.repository.save(roleEntity);
    return savedEntity.toDomain();
  }

  async update(role: Role): Promise<Role> {
    const roleEntity = RoleEntity.fromDomain(role);
    const savedEntity = await this.repository.save(roleEntity);
    return savedEntity.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
