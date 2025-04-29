import { EscalationRule, EscalationTier } from '../../../domain/entities/EscalationRule';
import { EscalationRuleRepository } from '../../../domain/repositories/EscalationRuleRepository';
import { CreateEscalationRuleDto, EscalationRuleDto, toEscalationRuleDto } from '../../dtos/EscalationRuleDto';
import { TicketPriority } from '../../../domain/entities/Ticket';

export class CreateEscalationRuleUseCase {
  constructor(private escalationRuleRepository: EscalationRuleRepository) {}

  async execute(dto: CreateEscalationRuleDto): Promise<EscalationRuleDto> {
    // Create the escalation rule
    const rule = EscalationRule.create(
      dto.name,
      dto.description || '',
      dto.priority as TicketPriority,
      dto.timeThresholdMinutes
    );

    // Add tiers
    dto.tiers.forEach(tierDto => {
      const tier = EscalationTier.create(
        tierDto.level,
        [tierDto.assigneeRoleId], // Simplification for demo
        tierDto.slaHours * 60 // Convert hours to minutes
      );
      rule.addTier(tier);
    });

    // Save the rule
    const savedRule = await this.escalationRuleRepository.create(rule);
    
    return toEscalationRuleDto(savedRule);
  }
}
