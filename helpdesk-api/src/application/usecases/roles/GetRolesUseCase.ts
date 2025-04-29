import { RoleRepository } from '../../../domain/repositories/RoleRepository';
import { RoleResponseDto } from '../../dtos/RoleDto';

export class GetRolesUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(options?: {
    page?: number;
    limit?: number;
  }): Promise<{ roles: RoleResponseDto[]; total: number }> {
    const { roles, total } = await this.roleRepository.findAll(options);
    
    const roleDtos = roles.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    }));

    return { roles: roleDtos, total };
  }
}
