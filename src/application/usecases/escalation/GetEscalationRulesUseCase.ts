import { EscalationRuleRepository } from '../../../domain/repositories/EscalationRuleRepository';
import { EscalationRuleDto, toEscalationRuleDto } from '../../dtos/EscalationRuleDto';

export class GetEscalationRulesUseCase {
  constructor(private escalationRuleRepository: EscalationRuleRepository) {}

  async execute(): Promise<EscalationRuleDto[]> {
    const rules = await this.escalationRuleRepository.findAll();
    return rules.map(toEscalationRuleDto);
  }
}
