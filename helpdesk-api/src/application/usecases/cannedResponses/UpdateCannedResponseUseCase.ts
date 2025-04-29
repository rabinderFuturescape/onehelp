import { CannedResponseRepository } from '../../../domain/repositories/CannedResponseRepository';
import { UpdateCannedResponseDto, CannedResponseResponseDto } from '../../dtos/CannedResponseDto';
import { NotFoundError } from '../../errors/NotFoundError';

export class UpdateCannedResponseUseCase {
  constructor(private readonly cannedResponseRepository: CannedResponseRepository) {}

  async execute(id: string, dto: UpdateCannedResponseDto): Promise<CannedResponseResponseDto> {
    const cannedResponse = await this.cannedResponseRepository.findById(id);
    
    if (!cannedResponse) {
      throw new NotFoundError(`Canned response with ID ${id} not found`);
    }
    
    if (dto.title) {
      cannedResponse.title = dto.title;
    }
    
    if (dto.emailResponse) {
      cannedResponse.emailResponse = dto.emailResponse;
    }
    
    if (dto.smsResponse !== undefined) {
      cannedResponse.smsResponse = dto.smsResponse;
    }
    
    if (dto.status) {
      cannedResponse.updateStatus(dto.status);
    }
    
    cannedResponse.updatedAt = new Date();
    
    const updatedCannedResponse = await this.cannedResponseRepository.update(cannedResponse);
    
    return {
      id: updatedCannedResponse.id,
      title: updatedCannedResponse.title,
      emailResponse: updatedCannedResponse.emailResponse,
      smsResponse: updatedCannedResponse.smsResponse,
      status: updatedCannedResponse.status,
      createdAt: updatedCannedResponse.createdAt,
      updatedAt: updatedCannedResponse.updatedAt,
    };
  }
}
