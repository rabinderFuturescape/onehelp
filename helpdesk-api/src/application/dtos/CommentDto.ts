export interface CreateCommentDto {
  ticketId: string;
  content: string;
  attachments?: string[];
}

export interface UpdateCommentDto {
  content?: string;
  attachments?: string[];
}

export interface CommentResponseDto {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
