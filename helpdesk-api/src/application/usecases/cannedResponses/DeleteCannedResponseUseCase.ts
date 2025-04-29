import { CannedResponseRepository } from '../../../domain/repositories/CannedResponseRepository';
import { NotFoundError } from '../../errors/NotFoundError';

export class DeleteCannedResponseUseCase {
  constructor(private readonly cannedResponseRepository: CannedResponseRepository) {}

  async execute(id: string): Promise<void> {
    const cannedResponse = await this.cannedResponseRepository.findById(id);
    
    if (!cannedResponse) {
      throw new NotFoundError(`Canned response with ID ${id} not found`);
    }
    
    await this.cannedResponseRepository.delete(id);
  }
}
