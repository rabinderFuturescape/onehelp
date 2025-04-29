import { z } from 'zod';
import { Member } from './complaints';

// Zod schemas for validation
export const TicketSchema = z.object({
  id: z.string().optional(),
  ticketNumber: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().min(1, 'Description is required'),
  helpTopicId: z.string().min(1, 'Help topic is required'),
  memberId: z.string().min(1, 'Member is required'),
  assignedToId: z.string().optional(),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed', 'reopened']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
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

export const TicketResponseSchema = TicketSchema.extend({
  id: z.string(),
  ticketNumber: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  helpTopic: z.object({
    id: z.string(),
    name: z.string(),
  }),
  member: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    unitNumber: z.string().optional(),
  }),
  assignedTo: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email().optional(),
  }).nullable().optional(),
  dueDate: z.string().or(z.date()).nullable().optional(),
  isOverdue: z.boolean().optional(),
  isEscalated: z.boolean().optional(),
});

// TypeScript types derived from Zod schemas
export type TicketInput = z.infer<typeof TicketSchema>;
export type Ticket = z.infer<typeof TicketResponseSchema>;

// Status options
export const STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
  { value: 'reopened', label: 'Reopened' },
];

// Priority options
export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];
