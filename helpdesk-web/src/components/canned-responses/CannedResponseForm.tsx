import React from 'react';
import { CannedResponseSchema, CannedResponseInput, CannedResponse, STATUS_OPTIONS } from '@/types/canned-responses';
import { EntityForm, FormSection } from '@/components/shared/EntityForm';

interface CannedResponseFormProps {
  initialData?: CannedResponse;
  onSubmit: (data: CannedResponseInput) => void;
  isSubmitting: boolean;
}

export const CannedResponseForm: React.FC<CannedResponseFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  // Define form sections
  const sections: FormSection[] = [
    {
      title: 'Canned Response Details',
      fields: [
        {
          id: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          id: 'emailResponse',
          type: 'richtext',
          label: 'Email Response',
          required: true,
        },
        {
          id: 'smsResponse',
          type: 'textarea',
          label: 'SMS Response',
          placeholder: 'Enter SMS response (optional)...',
        },
        {
          id: 'status',
          type: 'select',
          label: 'Status',
          options: STATUS_OPTIONS,
          defaultValue: 'active',
        },
      ],
    },
  ];

  return (
    <EntityForm
      sections={sections}
      schema={CannedResponseSchema}
      initialData={initialData}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      submitLabel={initialData ? 'Update Response' : 'Create Response'}
    />
  );
};
