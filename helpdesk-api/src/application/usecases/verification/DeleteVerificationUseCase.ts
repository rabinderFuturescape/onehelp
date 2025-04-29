import { VerificationRepository } from '../../../domain/repositories/VerificationRepository';
import { NotFoundError } from '../../errors/NotFoundError';

export class DeleteVerificationUseCase {
  constructor(private readonly verificationRepository: VerificationRepository) {}

  async execute(id: string): Promise<void> {
    const verification = await this.verificationRepository.findById(id);
    
    if (!verification) {
      throw new NotFoundError(`Verification with ID ${id} not found`);
    }
    
    await this.verificationRepository.delete(id);
  }
}
