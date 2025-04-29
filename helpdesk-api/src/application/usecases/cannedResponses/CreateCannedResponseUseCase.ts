import { CannedResponse } from '../../../domain/entities/CannedResponse';
import { CannedResponseRepository } from '../../../domain/repositories/CannedResponseRepository';
import { CreateCannedResponseDto, CannedResponseResponseDto } from '../../dtos/CannedResponseDto';

export class CreateCannedResponseUseCase {
  constructor(private readonly cannedResponseRepository: CannedResponseRepository) {}

  async execute(dto: CreateCannedResponseDto): Promise<CannedResponseResponseDto> {
    const cannedResponse = CannedResponse.create(
      dto.title,
      dto.emailResponse,
      dto.smsResponse || null,
    );
    
    if (dto.status) {
      cannedResponse.updateStatus(dto.status);
    }
    
    const createdCannedResponse = await this.cannedResponseRepository.create(cannedResponse);
    
    return {
      id: createdCannedResponse.id,
      title: createdCannedResponse.title,
      emailResponse: createdCannedResponse.emailResponse,
      smsResponse: createdCannedResponse.smsResponse,
      status: createdCannedResponse.status,
      createdAt: createdCannedResponse.createdAt,
      updatedAt: createdCannedResponse.updatedAt,
    };
  }
}
