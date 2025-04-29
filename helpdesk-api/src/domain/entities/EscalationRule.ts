import { TicketPriority } from './Ticket';

export class EscalationRule {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public priority: TicketPriority,
    public timeThresholdMinutes: number,
    public escalationTiers: EscalationTier[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    name: string,
    description: string,
    priority: TicketPriority,
    timeThresholdMinutes: number,
  ): EscalationRule {
    const now = new Date();
    return new EscalationRule(
      '', // ID will be assigned by the repository
      name,
      description,
      priority,
      timeThresholdMinutes,
      [],
      now,
      now,
    );
  }

  public addTier(tier: EscalationTier): void {
    this.escalationTiers.push(tier);
    this.updatedAt = new Date();
  }

  public removeTier(tierId: string): void {
    this.escalationTiers = this.escalationTiers.filter((tier) => tier.id !== tierId);
    this.updatedAt = new Date();
  }
}

export class EscalationTier {
  constructor(
    public id: string,
    public level: number,
    public assigneeIds: string[],
    public timeThresholdMinutes: number,
  ) {}

  static create(level: number, assigneeIds: string[], timeThresholdMinutes: number): EscalationTier {
    return new EscalationTier(
      '', // ID will be assigned by the repository
      level,
      assigneeIds,
      timeThresholdMinutes,
    );
  }

  public addAssignee(userId: string): void {
    if (!this.assigneeIds.includes(userId)) {
      this.assigneeIds.push(userId);
    }
  }

  public removeAssignee(userId: string): void {
    this.assigneeIds = this.assigneeIds.filter((id) => id !== userId);
  }
}
