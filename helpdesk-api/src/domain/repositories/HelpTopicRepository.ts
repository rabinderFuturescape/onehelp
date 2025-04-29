import { HelpTopic, HelpTopicStatus, HelpTopicVisibility } from '../entities/HelpTopic';

export interface HelpTopicRepository {
  findById(id: string): Promise<HelpTopic | null>;
  findByParentId(parentId: string): Promise<HelpTopic[]>;
  findAll(options?: {
    status?: HelpTopicStatus;
    visibility?: HelpTopicVisibility;
    page?: number;
    limit?: number;
  }): Promise<{ helpTopics: HelpTopic[]; total: number }>;
  create(helpTopic: HelpTopic): Promise<HelpTopic>;
  update(helpTopic: HelpTopic): Promise<HelpTopic>;
  delete(id: string): Promise<void>;
}
