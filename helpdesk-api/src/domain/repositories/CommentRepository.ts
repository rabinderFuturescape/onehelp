import { Comment } from '../entities/Comment';

export interface CommentRepository {
  findById(id: string): Promise<Comment | null>;
  findByTicketId(ticketId: string): Promise<Comment[]>;
  create(comment: Comment): Promise<Comment>;
  update(comment: Comment): Promise<Comment>;
  delete(id: string): Promise<void>;
}
