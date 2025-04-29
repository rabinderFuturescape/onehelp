import { HelpTopic } from '../../../domain/entities/HelpTopic';
import { HelpTopicRepository } from '../../../domain/repositories/HelpTopicRepository';
import { CreateHelpTopicDto, HelpTopicResponseDto } from '../../dtos/HelpTopicDto';

export class CreateHelpTopicUseCase {
  constructor(private readonly helpTopicRepository: HelpTopicRepository) {}

  async execute(dto: CreateHelpTopicDto): Promise<HelpTopicResponseDto> {
    const helpTopic = HelpTopic.create(
      dto.name,
      dto.description,
      dto.priority,
      dto.visibility,
    );
    
    if (dto.parentId) {
      helpTopic.setParent(dto.parentId);
    }
    
    if (dto.autoAssignRoleId) {
      helpTopic.setAutoAssignRole(dto.autoAssignRoleId);
    }
    
    if (dto.dueHours) {
      helpTopic.dueHours = dto.dueHours;
    }
    
    if (dto.status) {
      helpTopic.updateStatus(dto.status);
    }
    
    const createdHelpTopic = await this.helpTopicRepository.create(helpTopic);
    
    return {
      id: createdHelpTopic.id,
      name: createdHelpTopic.name,
      description: createdHelpTopic.description,
      parentId: createdHelpTopic.parentId,
      autoAssignRoleId: createdHelpTopic.autoAssignRoleId,
      priority: createdHelpTopic.priority,
      dueHours: createdHelpTopic.dueHours,
      visibility: createdHelpTopic.visibility,
      status: createdHelpTopic.status,
      createdAt: createdHelpTopic.createdAt,
      updatedAt: createdHelpTopic.updatedAt,
    };
  }
}
