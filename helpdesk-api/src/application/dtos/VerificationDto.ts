import { VerificationStatus } from '../../domain/entities/Verification';

export interface CreateVerificationDto {
  ticketId: string;
  userId: string;
}

export interface UpdateVerificationDto {
  status?: VerificationStatus;
  rating?: number;
  feedback?: string;
}

export interface VerificationResponseDto {
  id: string;
  ticketId: string;
  userId: string;
  status: VerificationStatus;
  rating: number | null;
  feedback: string | null;
  createdAt: Date;
  updatedAt: Date;
  ticket?: {
    id: string;
    title: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
