import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema, UserInput, User, USER_STATUS_OPTIONS } from '@/types/users';
import { Button } from '@/components/ui/Button';
import { FormField, FormLabel, FormMessage, Input, Select } from '@/components/ui/Form';

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: UserInput) => void;
  isSubmitting: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInput>({
    resolver: zodResolver(UserSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      role: '',
      status: 'active',
    },
  });

  // Mock roles for the dropdown
  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'agent', label: 'Agent' },
    { value: 'user', label: 'User' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full max-w-full overflow-x-hidden p-4 sm:p-6">
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 p-4 sm:p-6 md:p-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-3">User Information</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter user's full name"
            />
            {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
          </FormField>

          <FormField>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter email address"
            />
            {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
          </FormField>

          <FormField>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Select id="role" {...register('role')}>
              <option value="">Select a role</option>
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.role && <FormMessage>{errors.role.message}</FormMessage>}
          </FormField>

          <FormField>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Select id="status" {...register('status')}>
              {USER_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.status && <FormMessage>{errors.status.message}</FormMessage>}
          </FormField>
        </div>
      </div>

      {!initialData && (
        <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 p-4 sm:p-6 md:p-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-3">Password</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="Enter password"
              />
              {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <FormMessage>{errors.confirmPassword.message}</FormMessage>
              )}
            </FormField>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 sticky bottom-0 bg-white p-4 border-t border-gray-200 rounded-b-lg shadow-sm">
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
};
