import { z } from 'zod';
import { Attachment } from './complaints';

// Zod schemas for validation
export const CommentSchema = z.object({
  id: z.string().optional(),
  ticketId: z.string(),
  content: z.string().min(1, 'Comment is required'),
  isInternal: z.boolean().default(false),
  attachments: z.array(
    z.object({
      id: z.string().optional(),
      fileName: z.string(),
      fileSize: z.number(),
      fileType: z.string(),
      url: z.string().optional(),
    })
  ).optional(),
});

export const CommentResponseSchema = CommentSchema.extend({
  id: z.string(),
  userId: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email().optional(),
    avatar: z.string().optional(),
    role: z.string().optional(),
  }),
});

// TypeScript types derived from Zod schemas
export type CommentInput = z.infer<typeof CommentSchema>;
export type Comment = z.infer<typeof CommentResponseSchema>;
