import { HelpTopicRepository } from '../../../domain/repositories/HelpTopicRepository';
import { HelpTopicResponseDto } from '../../dtos/HelpTopicDto';
import { NotFoundError } from '../../errors/NotFoundError';

export class GetHelpTopicByIdUseCase {
  constructor(private readonly helpTopicRepository: HelpTopicRepository) {}

  async execute(id: string): Promise<HelpTopicResponseDto> {
    const helpTopic = await this.helpTopicRepository.findById(id);
    
    if (!helpTopic) {
      throw new NotFoundError(`Help topic with ID ${id} not found`);
    }
    
    return {
      id: helpTopic.id,
      name: helpTopic.name,
      description: helpTopic.description,
      parentId: helpTopic.parentId,
      autoAssignRoleId: helpTopic.autoAssignRoleId,
      priority: helpTopic.priority,
      dueHours: helpTopic.dueHours,
      visibility: helpTopic.visibility,
      status: helpTopic.status,
      createdAt: helpTopic.createdAt,
      updatedAt: helpTopic.updatedAt,
    };
  }
}
