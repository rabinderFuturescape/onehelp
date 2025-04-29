import { Role } from '../../../domain/entities/Role';
import { RoleRepository } from '../../../domain/repositories/RoleRepository';
import { CreateRoleDto, RoleResponseDto } from '../../dtos/RoleDto';
import { ConflictError } from '../../errors/ConflictError';

export class CreateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(dto: CreateRoleDto): Promise<RoleResponseDto> {
    // Check if role with the same name already exists
    const existingRole = await this.roleRepository.findByName(dto.name);
    if (existingRole) {
      throw new ConflictError(`Role with name '${dto.name}' already exists`);
    }
    
    const role = Role.create(
      dto.name,
      dto.description,
      dto.permissions || [],
    );
    
    const createdRole = await this.roleRepository.create(role);
    
    return {
      id: createdRole.id,
      name: createdRole.name,
      description: createdRole.description,
      permissions: createdRole.permissions,
      createdAt: createdRole.createdAt,
      updatedAt: createdRole.updatedAt,
    };
  }
}
