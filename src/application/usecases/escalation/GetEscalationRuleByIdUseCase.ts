import { EscalationRuleRepository } from '../../../domain/repositories/EscalationRuleRepository';
import { EscalationRuleDto, toEscalationRuleDto } from '../../dtos/EscalationRuleDto';
import { ApplicationError } from '../../errors/ApplicationError';

export class GetEscalationRuleByIdUseCase {
  constructor(private escalationRuleRepository: EscalationRuleRepository) {}

  async execute(id: string): Promise<EscalationRuleDto> {
    const rule = await this.escalationRuleRepository.findById(id);
    
    if (!rule) {
      throw new ApplicationError(`Escalation rule with ID ${id} not found`, 404);
    }
    
    return toEscalationRuleDto(rule);
  }
}
