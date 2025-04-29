import { RoleRepository } from '../../../domain/repositories/RoleRepository';
import { NotFoundError } from '../../errors/NotFoundError';

export class DeleteRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<void> {
    const role = await this.roleRepository.findById(id);
    
    if (!role) {
      throw new NotFoundError(`Role with ID ${id} not found`);
    }
    
    await this.roleRepository.delete(id);
  }
}
