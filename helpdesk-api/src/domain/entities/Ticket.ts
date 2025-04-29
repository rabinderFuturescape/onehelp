export class Ticket {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: TicketStatus,
    public priority: TicketPriority,
    public createdById: string,
    public assignedToId: string | null,
    public attachments: string[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    title: string,
    description: string,
    createdById: string,
    priority: TicketPriority = TicketPriority.MEDIUM,
  ): Ticket {
    const now = new Date();
    return new Ticket(
      '', // ID will be assigned by the repository
      title,
      description,
      TicketStatus.OPEN,
      priority,
      createdById,
      null, // Not assigned initially
      [],
      now,
      now,
    );
  }

  public assign(userId: string): void {
    this.assignedToId = userId;
    this.updatedAt = new Date();
  }

  public updateStatus(status: TicketStatus): void {
    this.status = status;
    this.updatedAt = new Date();
  }

  public updatePriority(priority: TicketPriority): void {
    this.priority = priority;
    this.updatedAt = new Date();
  }

  public addAttachment(attachmentUrl: string): void {
    this.attachments.push(attachmentUrl);
    this.updatedAt = new Date();
  }
}

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}
