import { z } from 'zod';

// Zod schemas for validation
export const CannedResponseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  emailResponse: z.string().min(1, 'Email response is required'),
  smsResponse: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

export const CannedResponseResponseSchema = CannedResponseSchema.extend({
  id: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

// TypeScript types derived from Zod schemas
export type CannedResponseInput = z.infer<typeof CannedResponseSchema>;
export type CannedResponse = z.infer<typeof CannedResponseResponseSchema>;

// Status options
export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
