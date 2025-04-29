import { z } from 'zod';

// Zod schemas for validation
export const HelpTopicSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Topic name is required'),
  description: z.string().optional(),
  parentId: z.string().nullable().optional(),
  autoAssignRoleId: z.string().nullable().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  dueHours: z.number().int().positive(),
  visibility: z.enum(['public', 'private', 'registered']),
  status: z.enum(['active', 'inactive']),
});

export const HelpTopicResponseSchema = HelpTopicSchema.extend({
  id: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  parent: z.object({
    id: z.string(),
    name: z.string(),
  }).nullable().optional(),
  autoAssignRole: z.object({
    id: z.string(),
    name: z.string(),
  }).nullable().optional(),
});

// TypeScript types derived from Zod schemas
export type HelpTopicInput = z.infer<typeof HelpTopicSchema>;
export type HelpTopic = z.infer<typeof HelpTopicResponseSchema>;

// Priority options
export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

// Visibility options
export const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'registered', label: 'Registered Users Only' },
];

// Status options
export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
