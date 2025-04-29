import { z } from 'zod';
import { ComplaintResponseSchema } from './complaints';

// Zod schemas for validation
export const ReportFiltersSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  ticketNumber: z.string().optional(),
  isOverdue: z.boolean().optional(),
  isEscalated: z.boolean().optional(),
});

export const ReportResponseSchema = z.object({
  complaints: z.array(ComplaintResponseSchema),
  summary: z.object({
    total: z.number(),
    open: z.number(),
    inProgress: z.number(),
    resolved: z.number(),
    closed: z.number(),
    reopened: z.number(),
    overdue: z.number(),
    escalated: z.number(),
  }),
});

// TypeScript types derived from Zod schemas
export type ReportFilters = z.infer<typeof ReportFiltersSchema>;
export type ReportResponse = z.infer<typeof ReportResponseSchema>;

// Export format options
export const EXPORT_FORMAT_OPTIONS = [
  { value: 'csv', label: 'CSV' },
  { value: 'pdf', label: 'PDF' },
];
