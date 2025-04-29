import { Verification, VerificationStatus } from '../entities/Verification';

export interface VerificationRepository {
  findById(id: string): Promise<Verification | null>;
  findByTicketId(ticketId: string): Promise<Verification | null>;
  findByStatus(status: VerificationStatus): Promise<Verification[]>;
  create(verification: Verification): Promise<Verification>;
  update(verification: Verification): Promise<Verification>;
  delete(id: string): Promise<void>;
}
