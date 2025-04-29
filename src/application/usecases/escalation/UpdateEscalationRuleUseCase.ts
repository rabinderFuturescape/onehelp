import { EscalationTier } from '../../../domain/entities/EscalationRule';
import { EscalationRuleRepository } from '../../../domain/repositories/EscalationRuleRepository';
import { EscalationRuleDto, UpdateEscalationRuleDto, toEscalationRuleDto } from '../../dtos/EscalationRuleDto';
import { ApplicationError } from '../../errors/ApplicationError';
import { TicketPriority } from '../../../domain/entities/Ticket';

export class UpdateEscalationRuleUseCase {
  constructor(private escalationRuleRepository: EscalationRuleRepository) {}

  async execute(id: string, dto: UpdateEscalationRuleDto): Promise<EscalationRuleDto> {
    // Find the existing rule
    const existingRule = await this.escalationRuleRepository.findById(id);
    
    if (!existingRule) {
      throw new ApplicationError(`Escalation rule with ID ${id} not found`, 404);
    }
    
    // Update basic properties
    if (dto.name !== undefined) {
      existingRule.name = dto.name;
    }
    
    if (dto.description !== undefined) {
      existingRule.description = dto.description;
    }
    
    if (dto.priority !== undefined) {
      existingRule.priority = dto.priority as TicketPriority;
    }
    
    if (dto.timeThresholdMinutes !== undefined) {
      existingRule.timeThresholdMinutes = dto.timeThresholdMinutes;
    }
    
    // Update tiers if provided
    if (dto.tiers) {
      // Clear existing tiers
      existingRule.escalationTiers = [];
      
      // Add new tiers
      dto.tiers.forEach(tierDto => {
        const tier = EscalationTier.create(
          tierDto.level,
          [tierDto.assigneeRoleId], // Simplification for demo
          tierDto.slaHours * 60 // Convert hours to minutes
        );
        existingRule.addTier(tier);
      });
    }
    
    // Update timestamp
    existingRule.updatedAt = new Date();
    
    // Save the updated rule
    const updatedRule = await this.escalationRuleRepository.update(existingRule);
    
    return toEscalationRuleDto(updatedRule);
  }
}
