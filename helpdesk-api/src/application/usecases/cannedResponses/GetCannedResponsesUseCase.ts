import { CannedResponseRepository } from '../../../domain/repositories/CannedResponseRepository';
import { CannedResponseResponseDto } from '../../dtos/CannedResponseDto';
import { CannedResponseStatus } from '../../../domain/entities/CannedResponse';

export class GetCannedResponsesUseCase {
  constructor(private readonly cannedResponseRepository: CannedResponseRepository) {}

  async execute(options?: {
    status?: CannedResponseStatus;
    page?: number;
    limit?: number;
  }): Promise<{ cannedResponses: CannedResponseResponseDto[]; total: number }> {
    const { cannedResponses, total } = await this.cannedResponseRepository.findAll(options);
    
    const cannedResponseDtos = cannedResponses.map(cannedResponse => ({
      id: cannedResponse.id,
      title: cannedResponse.title,
      emailResponse: cannedResponse.emailResponse,
      smsResponse: cannedResponse.smsResponse,
      status: cannedResponse.status,
      createdAt: cannedResponse.createdAt,
      updatedAt: cannedResponse.updatedAt,
    }));

    return { cannedResponses: cannedResponseDtos, total };
  }
}
