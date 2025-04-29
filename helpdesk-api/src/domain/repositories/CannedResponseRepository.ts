import { CannedResponse, CannedResponseStatus } from '../entities/CannedResponse';

export interface CannedResponseRepository {
  findById(id: string): Promise<CannedResponse | null>;
  findAll(options?: {
    status?: CannedResponseStatus;
    page?: number;
    limit?: number;
  }): Promise<{ cannedResponses: CannedResponse[]; total: number }>;
  create(cannedResponse: CannedResponse): Promise<CannedResponse>;
  update(cannedResponse: CannedResponse): Promise<CannedResponse>;
  delete(id: string): Promise<void>;
}
