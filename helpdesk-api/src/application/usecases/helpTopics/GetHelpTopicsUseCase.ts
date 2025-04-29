import { HelpTopicRepository } from '../../../domain/repositories/HelpTopicRepository';
import { HelpTopicResponseDto } from '../../dtos/HelpTopicDto';
import { HelpTopicStatus, HelpTopicVisibility } from '../../../domain/entities/HelpTopic';

export class GetHelpTopicsUseCase {
  constructor(private readonly helpTopicRepository: HelpTopicRepository) {}

  async execute(options?: {
    status?: HelpTopicStatus;
    visibility?: HelpTopicVisibility;
    page?: number;
    limit?: number;
  }): Promise<{ helpTopics: HelpTopicResponseDto[]; total: number }> {
    const { helpTopics, total } = await this.helpTopicRepository.findAll(options);
    
    const helpTopicDtos = helpTopics.map(helpTopic => ({
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
    }));

    return { helpTopics: helpTopicDtos, total };
  }
}
