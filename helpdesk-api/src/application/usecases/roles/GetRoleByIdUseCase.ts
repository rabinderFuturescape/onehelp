import { RoleRepository } from '../../../domain/repositories/RoleRepository';
import { RoleResponseDto } from '../../dtos/RoleDto';
import { NotFoundError } from '../../errors/NotFoundError';

export class GetRoleByIdUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<RoleResponseDto> {
    const role = await this.roleRepository.findById(id);
    
    if (!role) {
      throw new NotFoundError(`Role with ID ${id} not found`);
    }
    
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }
}
