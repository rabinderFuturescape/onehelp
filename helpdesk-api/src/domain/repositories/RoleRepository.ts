import { Role } from '../entities/Role';

export interface RoleRepository {
  findById(id: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findAll(options?: {
    page?: number;
    limit?: number;
  }): Promise<{ roles: Role[]; total: number }>;
  create(role: Role): Promise<Role>;
  update(role: Role): Promise<Role>;
  delete(id: string): Promise<void>;
}
