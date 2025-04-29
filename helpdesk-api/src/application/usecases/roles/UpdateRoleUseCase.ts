import { RoleRepository } from '../../../domain/repositories/RoleRepository';
import { UpdateRoleDto, RoleResponseDto } from '../../dtos/RoleDto';
import { NotFoundError } from '../../errors/NotFoundError';
import { ConflictError } from '../../errors/ConflictError';

export class UpdateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string, dto: UpdateRoleDto): Promise<RoleResponseDto> {
    const role = await this.roleRepository.findById(id);
    
    if (!role) {
      throw new NotFoundError(`Role with ID ${id} not found`);
    }
    
    // If name is being updated, check for conflicts
    if (dto.name && dto.name !== role.name) {
      const existingRole = await this.roleRepository.findByName(dto.name);
      if (existingRole && existingRole.id !== id) {
        throw new ConflictError(`Role with name '${dto.name}' already exists`);
      }
      role.name = dto.name;
    }
    
    if (dto.description) {
      role.description = dto.description;
    }
    
    if (dto.permissions) {
      role.permissions = [...dto.permissions];
    }
    
    role.updatedAt = new Date();
    
    const updatedRole = await this.roleRepository.update(role);
    
    return {
      id: updatedRole.id,
      name: updatedRole.name,
      description: updatedRole.description,
      permissions: updatedRole.permissions,
      createdAt: updatedRole.createdAt,
      updatedAt: updatedRole.updatedAt,
    };
  }
}
