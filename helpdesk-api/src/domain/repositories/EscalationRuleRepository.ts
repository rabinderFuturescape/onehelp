import { EscalationRule } from '../entities/EscalationRule';
import { TicketPriority } from '../entities/Ticket';

export interface EscalationRuleRepository {
  findById(id: string): Promise<EscalationRule | null>;
  findByPriority(priority: TicketPriority): Promise<EscalationRule[]>;
  findAll(): Promise<EscalationRule[]>;
  create(rule: EscalationRule): Promise<EscalationRule>;
  update(rule: EscalationRule): Promise<EscalationRule>;
  delete(id: string): Promise<void>;
}
