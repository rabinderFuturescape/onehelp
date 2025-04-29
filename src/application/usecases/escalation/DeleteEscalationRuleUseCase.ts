import { EscalationRuleRepository } from '../../../domain/repositories/EscalationRuleRepository';
import { ApplicationError } from '../../errors/ApplicationError';

export class DeleteEscalationRuleUseCase {
  constructor(private escalationRuleRepository: EscalationRuleRepository) {}

  async execute(id: string): Promise<void> {
    // Check if the rule exists
    const rule = await this.escalationRuleRepository.findById(id);
    
    if (!rule) {
      throw new ApplicationError(`Escalation rule with ID ${id} not found`, 404);
    }
    
    // Delete the rule
    await this.escalationRuleRepository.delete(id);
  }
}
