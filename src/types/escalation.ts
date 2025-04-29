import { z } from 'zod';

// Zod schemas for validation
export const TierInputSchema = z.object({
  id: z.string().optional(),
  level: z.number().int().positive(),
  assigneeRoleId: z.string().min(1, 'Assignee role is required'),
  slaHours: z.number().positive('SLA hours must be greater than 0'),
});

export const EscalationRuleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Rule name is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  timeThresholdMinutes: z.number().int().positive(),
  tiers: z.array(TierInputSchema).min(1, 'At least one tier is required'),
});

export const EscalationRuleResponseSchema = EscalationRuleSchema.extend({
  id: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

// TypeScript types derived from Zod schemas
export type TierInput = z.infer<typeof TierInputSchema>;

export type EscalationRuleInput = z.infer<typeof EscalationRuleSchema>;

export type EscalationRule = z.infer<typeof EscalationRuleResponseSchema>;

// Role type for the assignee dropdown
export const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export type Role = z.infer<typeof RoleSchema>;

// Priority options
export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];
