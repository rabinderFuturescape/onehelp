import { z } from 'zod';

// Zod schemas for validation
export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  status: z.enum(['active', 'inactive']),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  // If password is provided, confirmPassword must match
  if (data.password && data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const UserResponseSchema = z.object({
  ...UserSchema.shape,
  id: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()).optional(),
}).omit({ password: true, confirmPassword: true });

// TypeScript types derived from Zod schemas
export type UserInput = z.infer<typeof UserSchema>;
export type User = z.infer<typeof UserResponseSchema>;

// Status options
export const USER_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
