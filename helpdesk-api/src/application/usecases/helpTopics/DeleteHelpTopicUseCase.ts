import { HelpTopicRepository } from '../../../domain/repositories/HelpTopicRepository';
import { NotFoundError } from '../../errors/NotFoundError';

export class DeleteHelpTopicUseCase {
  constructor(private readonly helpTopicRepository: HelpTopicRepository) {}

  async execute(id: string): Promise<void> {
    const helpTopic = await this.helpTopicRepository.findById(id);
    
    if (!helpTopic) {
      throw new NotFoundError(`Help topic with ID ${id} not found`);
    }
    
    await this.helpTopicRepository.delete(id);
  }
}
