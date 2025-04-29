export class HelpTopic {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public parentId: string | null,
    public autoAssignRoleId: string | null,
    public priority: HelpTopicPriority,
    public dueHours: number,
    public visibility: HelpTopicVisibility,
    public status: HelpTopicStatus,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    name: string,
    description: string,
    priority: HelpTopicPriority = HelpTopicPriority.MEDIUM,
    visibility: HelpTopicVisibility = HelpTopicVisibility.PUBLIC,
  ): HelpTopic {
    const now = new Date();
    return new HelpTopic(
      '', // ID will be assigned by the repository
      name,
      description,
      null, // No parent initially
      null, // No auto-assign role initially
      priority,
      24, // Default due hours
      visibility,
      HelpTopicStatus.ACTIVE,
      now,
      now,
    );
  }

  public setParent(parentId: string | null): void {
    this.parentId = parentId;
    this.updatedAt = new Date();
  }

  public setAutoAssignRole(roleId: string | null): void {
    this.autoAssignRoleId = roleId;
    this.updatedAt = new Date();
  }

  public updateStatus(status: HelpTopicStatus): void {
    this.status = status;
    this.updatedAt = new Date();
  }
}

export enum HelpTopicPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum HelpTopicVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  INTERNAL = 'internal',
}

export enum HelpTopicStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
