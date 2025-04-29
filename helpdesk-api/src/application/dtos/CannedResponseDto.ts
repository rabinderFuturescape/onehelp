import { CannedResponseStatus } from '../../domain/entities/CannedResponse';

export interface CreateCannedResponseDto {
  title: string;
  emailResponse: string;
  smsResponse?: string | null;
  status?: CannedResponseStatus;
}

export interface UpdateCannedResponseDto {
  title?: string;
  emailResponse?: string;
  smsResponse?: string | null;
  status?: CannedResponseStatus;
}

export interface CannedResponseResponseDto {
  id: string;
  title: string;
  emailResponse: string;
  smsResponse: string | null;
  status: CannedResponseStatus;
  createdAt: Date;
  updatedAt: Date;
}
