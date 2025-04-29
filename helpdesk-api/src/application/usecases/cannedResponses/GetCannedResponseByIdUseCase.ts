import { CannedResponseRepository } from '../../../domain/repositories/CannedResponseRepository';
import { CannedResponseResponseDto } from '../../dtos/CannedResponseDto';
import { NotFoundError } from '../../errors/NotFoundError';

export class GetCannedResponseByIdUseCase {
  constructor(private readonly cannedResponseRepository: CannedResponseRepository) {}

  async execute(id: string): Promise<CannedResponseResponseDto> {
    const cannedResponse = await this.cannedResponseRepository.findById(id);
    
    if (!cannedResponse) {
      throw new NotFoundError(`Canned response with ID ${id} not found`);
    }
    
    return {
      id: cannedResponse.id,
      title: cannedResponse.title,
      emailResponse: cannedResponse.emailResponse,
      smsResponse: cannedResponse.smsResponse,
      status: cannedResponse.status,
      createdAt: cannedResponse.createdAt,
      updatedAt: cannedResponse.updatedAt,
    };
  }
}
