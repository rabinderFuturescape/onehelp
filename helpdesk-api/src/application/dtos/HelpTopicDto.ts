import { HelpTopicPriority, HelpTopicVisibility, HelpTopicStatus } from '../../domain/entities/HelpTopic';

export interface CreateHelpTopicDto {
  name: string;
  description: string;
  parentId?: string | null;
  autoAssignRoleId?: string | null;
  priority?: HelpTopicPriority;
  dueHours?: number;
  visibility?: HelpTopicVisibility;
  status?: HelpTopicStatus;
}

export interface UpdateHelpTopicDto {
  name?: string;
  description?: string;
  parentId?: string | null;
  autoAssignRoleId?: string | null;
  priority?: HelpTopicPriority;
  dueHours?: number;
  visibility?: HelpTopicVisibility;
  status?: HelpTopicStatus;
}

export interface HelpTopicResponseDto {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  autoAssignRoleId: string | null;
  priority: HelpTopicPriority;
  dueHours: number;
  visibility: HelpTopicVisibility;
  status: HelpTopicStatus;
  createdAt: Date;
  updatedAt: Date;
}
