import { z } from 'zod';

// Escalation level options
export const ESCALATION_LEVEL_OPTIONS = [
  { value: '1', label: 'Level 1' },
  { value: '2', label: 'Level 2' },
  { value: '3', label: 'Level 3' },
];

// Escalation type options
export const ESCALATION_TYPE_OPTIONS = [
  { value: 'time', label: 'Time-based' },
  { value: 'status', label: 'Status-based' },
  { value: 'priority', label: 'Priority-based' },
];

// Escalation action options
export const ESCALATION_ACTION_OPTIONS = [
  { value: 'notify', label: 'Notify' },
  { value: 'reassign', label: 'Reassign' },
  { value: 'increase_priority', label: 'Increase Priority' },
];

// Priority options
export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

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

// New schema for the enhanced escalation matrix
export const EscalationMatrixRuleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  level: z.string().min(1, 'Level is required'),
  type: z.string().min(1, 'Type is required'),
  condition: z.string().min(1, 'Condition is required'),
  action: z.string().min(1, 'Action is required'),
  assignToRoleId: z.string().optional().nullable(),
  notifyRoleIds: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
});

export const EscalationMatrixSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  helpTopicId: z.string().optional().nullable(),
  rules: z.array(EscalationMatrixRuleSchema).min(1, 'At least one rule is required'),
  isActive: z.boolean().default(true),
});

// TypeScript types derived from Zod schemas
export type TierInput = z.infer<typeof TierInputSchema>;
export type EscalationRuleInput = z.infer<typeof EscalationRuleSchema>;
export type EscalationRule = z.infer<typeof EscalationRuleResponseSchema>;
export type EscalationMatrixRule = z.infer<typeof EscalationMatrixRuleSchema>;
export type EscalationMatrix = z.infer<typeof EscalationMatrixSchema>;
export type EscalationMatrixInput = z.infer<typeof EscalationMatrixSchema>;

// Role type for the assignee dropdown
export const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export type Role = z.infer<typeof RoleSchema>;
