import { HelpTopicRepository } from '../../../domain/repositories/HelpTopicRepository';
import { UpdateHelpTopicDto, HelpTopicResponseDto } from '../../dtos/HelpTopicDto';
import { NotFoundError } from '../../errors/NotFoundError';

export class UpdateHelpTopicUseCase {
  constructor(private readonly helpTopicRepository: HelpTopicRepository) {}

  async execute(id: string, dto: UpdateHelpTopicDto): Promise<HelpTopicResponseDto> {
    const helpTopic = await this.helpTopicRepository.findById(id);
    
    if (!helpTopic) {
      throw new NotFoundError(`Help topic with ID ${id} not found`);
    }
    
    if (dto.name) {
      helpTopic.name = dto.name;
    }
    
    if (dto.description) {
      helpTopic.description = dto.description;
    }
    
    if (dto.parentId !== undefined) {
      helpTopic.setParent(dto.parentId);
    }
    
    if (dto.autoAssignRoleId !== undefined) {
      helpTopic.setAutoAssignRole(dto.autoAssignRoleId);
    }
    
    if (dto.priority) {
      helpTopic.priority = dto.priority;
    }
    
    if (dto.dueHours) {
      helpTopic.dueHours = dto.dueHours;
    }
    
    if (dto.visibility) {
      helpTopic.visibility = dto.visibility;
    }
    
    if (dto.status) {
      helpTopic.updateStatus(dto.status);
    }
    
    helpTopic.updatedAt = new Date();
    
    const updatedHelpTopic = await this.helpTopicRepository.update(helpTopic);
    
    return {
      id: updatedHelpTopic.id,
      name: updatedHelpTopic.name,
      description: updatedHelpTopic.description,
      parentId: updatedHelpTopic.parentId,
      autoAssignRoleId: updatedHelpTopic.autoAssignRoleId,
      priority: updatedHelpTopic.priority,
      dueHours: updatedHelpTopic.dueHours,
      visibility: updatedHelpTopic.visibility,
      status: updatedHelpTopic.status,
      createdAt: updatedHelpTopic.createdAt,
      updatedAt: updatedHelpTopic.updatedAt,
    };
  }
}
