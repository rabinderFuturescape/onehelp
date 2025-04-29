import { EscalationRule } from '../../../domain/entities/EscalationRule';
import { TicketPriority } from '../../../domain/entities/Ticket';
import { EscalationRuleRepository } from '../../../domain/repositories/EscalationRuleRepository';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryEscalationRuleRepository implements EscalationRuleRepository {
  private rules: Map<string, EscalationRule> = new Map();

  constructor() {
    // Add some sample data
    this.initSampleData();
  }

  private initSampleData() {
    // Create a sample rule
    const rule1 = EscalationRule.create(
      'High Priority Issues',
      'Escalation rule for high priority issues',
      TicketPriority.HIGH,
      60
    );
    rule1.id = uuidv4();

    // Add tiers
    const tier1 = {
      id: uuidv4(),
      level: 1,
      assigneeIds: ['support_agent'],
      timeThresholdMinutes: 240, // 4 hours
    };
    
    const tier2 = {
      id: uuidv4(),
      level: 2,
      assigneeIds: ['team_lead'],
      timeThresholdMinutes: 480, // 8 hours
    };

    rule1.escalationTiers.push(tier1, tier2);
    
    // Add to map
    this.rules.set(rule1.id, rule1);

    // Create another sample rule
    const rule2 = EscalationRule.create(
      'Medium Priority Issues',
      'Escalation rule for medium priority issues',
      TicketPriority.MEDIUM,
      120
    );
    rule2.id = uuidv4();

    // Add tiers
    const tier3 = {
      id: uuidv4(),
      level: 1,
      assigneeIds: ['support_agent'],
      timeThresholdMinutes: 480, // 8 hours
    };
    
    const tier4 = {
      id: uuidv4(),
      level: 2,
      assigneeIds: ['team_lead'],
      timeThresholdMinutes: 960, // 16 hours
    };

    rule2.escalationTiers.push(tier3, tier4);
    
    // Add to map
    this.rules.set(rule2.id, rule2);
  }

  async findById(id: string): Promise<EscalationRule | null> {
    return this.rules.get(id) || null;
  }

  async findByPriority(priority: TicketPriority): Promise<EscalationRule[]> {
    return Array.from(this.rules.values()).filter(rule => rule.priority === priority);
  }

  async findAll(): Promise<EscalationRule[]> {
    return Array.from(this.rules.values());
  }

  async create(rule: EscalationRule): Promise<EscalationRule> {
    // Generate an ID if not provided
    if (!rule.id) {
      rule.id = uuidv4();
    }
    
    // Set timestamps
    rule.createdAt = new Date();
    rule.updatedAt = new Date();
    
    // Store the rule
    this.rules.set(rule.id, rule);
    
    return rule;
  }

  async update(rule: EscalationRule): Promise<EscalationRule> {
    // Check if the rule exists
    if (!this.rules.has(rule.id)) {
      throw new Error(`Escalation rule with ID ${rule.id} not found`);
    }
    
    // Update timestamp
    rule.updatedAt = new Date();
    
    // Update the rule
    this.rules.set(rule.id, rule);
    
    return rule;
  }

  async delete(id: string): Promise<void> {
    this.rules.delete(id);
  }
}
