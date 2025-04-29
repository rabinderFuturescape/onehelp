import React from 'react';
import { 
  EscalationMatrixSchema, 
  EscalationMatrixInput, 
  EscalationMatrix,
  ESCALATION_LEVEL_OPTIONS,
  ESCALATION_TYPE_OPTIONS,
  ESCALATION_ACTION_OPTIONS
} from '@/types/escalation';
import { useHelpTopics } from '@/hooks/useHelpTopics';
import { useRoles } from '@/hooks/useRoles';
import { EntityForm, FormSection } from '@/components/shared/EntityForm';

interface EscalationMatrixFormProps {
  initialData?: EscalationMatrix;
  onSubmit: (data: EscalationMatrixInput) => void;
  isSubmitting: boolean;
}

export const EscalationMatrixForm: React.FC<EscalationMatrixFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const { data: helpTopics } = useHelpTopics();
  const { data: roles } = useRoles();

  // Prepare options for help topic select
  const helpTopicOptions = helpTopics
    ? [
        { value: '', label: 'All Help Topics' },
        ...helpTopics.map(topic => ({ value: topic.id, label: topic.name })),
      ]
    : [{ value: '', label: 'All Help Topics' }];

  // Prepare options for role select
  const roleOptions = roles
    ? [
        { value: '', label: 'None' },
        ...roles.map(role => ({ value: role.id, label: role.name })),
      ]
    : [{ value: '', label: 'None' }];

  // Define form sections
  const sections: FormSection[] = [
    {
      title: 'Escalation Matrix Details',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Matrix Name',
          required: true,
        },
        {
          id: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          id: 'helpTopicId',
          type: 'select',
          label: 'Help Topic',
          options: helpTopicOptions,
        },
        {
          id: 'isActive',
          type: 'checkbox',
          label: 'Active',
          defaultValue: true,
        },
      ],
    },
    {
      title: 'Escalation Rules',
      description: 'Define the rules for when and how tickets should be escalated.',
      fields: [
        {
          id: 'rules[0].name',
          type: 'text',
          label: 'Rule Name',
          required: true,
        },
        {
          id: 'rules[0].description',
          type: 'textarea',
          label: 'Rule Description',
        },
        {
          id: 'rules[0].level',
          type: 'select',
          label: 'Escalation Level',
          options: ESCALATION_LEVEL_OPTIONS,
          required: true,
        },
        {
          id: 'rules[0].type',
          type: 'select',
          label: 'Escalation Type',
          options: ESCALATION_TYPE_OPTIONS,
          required: true,
        },
        {
          id: 'rules[0].condition',
          type: 'text',
          label: 'Condition',
          placeholder: 'e.g., "24 hours", "status=open", "priority=high"',
          required: true,
        },
        {
          id: 'rules[0].action',
          type: 'select',
          label: 'Action',
          options: ESCALATION_ACTION_OPTIONS,
          required: true,
        },
        {
          id: 'rules[0].assignToRoleId',
          type: 'select',
          label: 'Assign To Role',
          options: roleOptions,
        },
        {
          id: 'rules[0].isActive',
          type: 'checkbox',
          label: 'Rule Active',
          defaultValue: true,
        },
      ],
    },
  ];

  return (
    <EntityForm
      sections={sections}
      schema={EscalationMatrixSchema}
      initialData={initialData}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      submitLabel={initialData ? 'Update Escalation Matrix' : 'Create Escalation Matrix'}
    />
  );
};
