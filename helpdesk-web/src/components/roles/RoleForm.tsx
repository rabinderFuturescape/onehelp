import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RoleSchema, RoleInput, Role, PERMISSION_OPTIONS } from '@/types/roles';
import { Button } from '@/components/ui/Button';
import { FormField, FormLabel, FormMessage, Input } from '@/components/ui/Form';

interface RoleFormProps {
  initialData?: Role;
  onSubmit: (data: RoleInput) => void;
  isSubmitting: boolean;
}

export const RoleForm: React.FC<RoleFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    initialData?.permissions || []
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoleInput>({
    resolver: zodResolver(RoleSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      permissions: [],
    },
  });

  // Handle permission checkbox changes
  const handlePermissionChange = (permission: string) => {
    setSelectedPermissions((prev) => {
      const newPermissions = prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission];

      // Update the form value
      setValue('permissions', newPermissions, { shouldValidate: true });

      return newPermissions;
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full max-w-full overflow-x-hidden p-4 sm:p-6">
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 p-4 sm:p-6 md:p-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-3">Role Information</h3>
        <div className="grid grid-cols-1 gap-6">
          <FormField>
            <FormLabel htmlFor="name">Role Name</FormLabel>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter role name"
            />
            {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
          </FormField>

          <FormField>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              id="description"
              {...register('description')}
              placeholder="Enter role description"
            />
            {errors.description && <FormMessage>{errors.description.message}</FormMessage>}
          </FormField>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 p-4 sm:p-6 md:p-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-3">Permissions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {PERMISSION_OPTIONS.map((permission) => (
            <div key={permission.value} className="flex items-center">
              <input
                type="checkbox"
                id={`permission-${permission.value}`}
                checked={selectedPermissions.includes(permission.value)}
                onChange={() => handlePermissionChange(permission.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`permission-${permission.value}`}
                className="ml-2 block text-sm text-gray-900"
              >
                {permission.label}
              </label>
            </div>
          ))}
          {errors.permissions && (
            <FormMessage>{errors.permissions.message}</FormMessage>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 sticky bottom-0 bg-white p-4 border-t border-gray-200 rounded-b-lg shadow-sm">
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? 'Update Role' : 'Create Role'}
        </Button>
      </div>
    </form>
  );
};
