import { z } from 'zod';

// Zod schemas for validation
export const RoleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Role name is required'),
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1, 'At least one permission is required'),
});

export const RoleResponseSchema = z.object({
  ...RoleSchema.shape,
  id: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()).optional(),
});

// TypeScript types derived from Zod schemas
export type RoleInput = z.infer<typeof RoleSchema>;
export type Role = z.infer<typeof RoleResponseSchema>;

// Permission options
export const PERMISSION_OPTIONS = [
  { value: 'create', label: 'Create' },
  { value: 'read', label: 'Read' },
  { value: 'update', label: 'Update' },
  { value: 'delete', label: 'Delete' },
];
