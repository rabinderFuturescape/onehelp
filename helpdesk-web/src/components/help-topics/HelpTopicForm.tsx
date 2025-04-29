import React from 'react';
import { HelpTopicSchema, HelpTopicInput, HelpTopic, PRIORITY_OPTIONS, VISIBILITY_OPTIONS, STATUS_OPTIONS } from '@/types/help-topics';
import { useHelpTopics } from '@/hooks/useHelpTopics';
import { useRoles } from '@/hooks/useRoles';
import { EntityForm, FormSection } from '@/components/shared/EntityForm';

interface HelpTopicFormProps {
  initialData?: HelpTopic;
  onSubmit: (data: HelpTopicInput) => void;
  isSubmitting: boolean;
}

export const HelpTopicForm: React.FC<HelpTopicFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const { data: helpTopics } = useHelpTopics();
  const { data: roles } = useRoles();

  // Prepare options for parent topic select
  const parentTopicOptions = helpTopics
    ? [
        { value: '', label: 'None' },
        ...helpTopics
          .filter(topic => topic.id !== initialData?.id)
          .map(topic => ({ value: topic.id, label: topic.name })),
      ]
    : [{ value: '', label: 'None' }];

  // Prepare options for auto-assign role select
  const roleOptions = roles
    ? [
        { value: '', label: 'None' },
        ...roles.map(role => ({ value: role.id, label: role.name })),
      ]
    : [{ value: '', label: 'None' }];

  // Define form sections
  const sections: FormSection[] = [
    {
      title: 'Help Topic Details',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Topic Name',
          required: true,
        },
        {
          id: 'description',
          type: 'richtext',
          label: 'Description',
          required: true,
        },
      ],
    },
    {
      title: 'Topic Configuration',
      fields: [
        {
          id: 'parentId',
          type: 'select',
          label: 'Parent Topic',
          options: parentTopicOptions,
          gridSpan: 2,
        },
        {
          id: 'autoAssignRoleId',
          type: 'select',
          label: 'Auto-Assign Role',
          options: roleOptions,
          gridSpan: 2,
        },
        {
          id: 'priority',
          type: 'select',
          label: 'Priority',
          options: PRIORITY_OPTIONS,
          defaultValue: 'medium',
          gridSpan: 1,
        },
        {
          id: 'dueHours',
          type: 'text',
          label: 'Due Hours',
          defaultValue: 24,
          gridSpan: 1,
        },
        {
          id: 'visibility',
          type: 'select',
          label: 'Visibility',
          options: VISIBILITY_OPTIONS,
          defaultValue: 'public',
          gridSpan: 1,
        },
        {
          id: 'status',
          type: 'select',
          label: 'Status',
          options: STATUS_OPTIONS,
          defaultValue: 'active',
          gridSpan: 1,
        },
      ],
    },
  ];

  return (
    <EntityForm
      sections={sections}
      schema={HelpTopicSchema}
      initialData={initialData}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      submitLabel={initialData ? 'Update Topic' : 'Create Topic'}
    />
  );
};
