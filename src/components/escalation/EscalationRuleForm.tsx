import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EscalationRuleSchema, EscalationRuleInput, EscalationRule, PRIORITY_OPTIONS } from '@/types/escalation';
import { Button } from '@/components/ui/Button';
import { FormField, FormLabel, FormMessage, Input, Select } from '@/components/ui/Form';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRoles } from '@/hooks/useRoles';

interface EscalationRuleFormProps {
  initialData?: EscalationRule;
  onSubmit: (data: EscalationRuleInput) => void;
  isSubmitting: boolean;
}

export const EscalationRuleForm: React.FC<EscalationRuleFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EscalationRuleInput>({
    resolver: zodResolver(EscalationRuleSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      priority: 'medium',
      timeThresholdMinutes: 60,
      tiers: [
        {
          level: 1,
          assigneeRoleId: '',
          slaHours: 4,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tiers',
  });

  const { data: roles, isLoading: isLoadingRoles } = useRoles();

  const addTier = () => {
    append({
      level: fields.length + 1,
      assigneeRoleId: '',
      slaHours: 4,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField>
        <FormLabel htmlFor="name">Rule Name</FormLabel>
        <Input id="name" {...register('name')} />
        <FormMessage>{errors.name?.message}</FormMessage>
      </FormField>

      <FormField>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input id="description" {...register('description')} />
        <FormMessage>{errors.description?.message}</FormMessage>
      </FormField>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField>
          <FormLabel htmlFor="priority">Priority</FormLabel>
          <Select id="priority" {...register('priority')}>
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormMessage>{errors.priority?.message}</FormMessage>
        </FormField>

        <FormField>
          <FormLabel htmlFor="timeThresholdMinutes">Time Threshold (minutes)</FormLabel>
          <Input
            id="timeThresholdMinutes"
            type="number"
            min="1"
            {...register('timeThresholdMinutes', { valueAsNumber: true })}
          />
          <FormMessage>{errors.timeThresholdMinutes?.message}</FormMessage>
        </FormField>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Escalation Tiers</h3>
          <Button
            type="button"
            onClick={addTier}
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Tier
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 border border-gray-200 rounded-md bg-gray-50"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">
                  Tier {index + 1}
                </h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField>
                  <FormLabel htmlFor={`tiers.${index}.assigneeRoleId`}>
                    Assignee Role
                  </FormLabel>
                  <Select
                    id={`tiers.${index}.assigneeRoleId`}
                    {...register(`tiers.${index}.assigneeRoleId`)}
                    disabled={isLoadingRoles}
                  >
                    <option value="">Select a role</option>
                    {roles?.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </Select>
                  <FormMessage>
                    {errors.tiers?.[index]?.assigneeRoleId?.message}
                  </FormMessage>
                </FormField>

                <FormField>
                  <FormLabel htmlFor={`tiers.${index}.slaHours`}>
                    SLA Hours
                  </FormLabel>
                  <Input
                    id={`tiers.${index}.slaHours`}
                    type="number"
                    min="1"
                    step="0.5"
                    {...register(`tiers.${index}.slaHours`, { valueAsNumber: true })}
                  />
                  <FormMessage>
                    {errors.tiers?.[index]?.slaHours?.message}
                  </FormMessage>
                </FormField>
              </div>

              <input
                type="hidden"
                {...register(`tiers.${index}.level`)}
                value={index + 1}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? 'Update Rule' : 'Create Rule'}
        </Button>
      </div>
    </form>
  );
};
