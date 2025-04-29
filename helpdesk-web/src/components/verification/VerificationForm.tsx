import React from 'react';
import {
  VerificationSchema,
  VerificationInput,
  Verification,
  VERIFICATION_STATUS_OPTIONS,
  VERIFICATION_TYPE_OPTIONS,
  APPROVAL_METHOD_OPTIONS,
  EVIDENCE_TYPE_OPTIONS
} from '@/types/verification';
import { EntityForm, FormSection } from '@/components/shared/EntityForm';
import { useRoles } from '@/hooks/useRoles';

interface VerificationFormProps {
  initialData?: Verification;
  onSubmit: (data: VerificationInput) => void;
  isSubmitting: boolean;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const { data: roles } = useRoles();

  // Mock ticket options
  const ticketOptions = [
    { value: 'TKT-001', label: 'TKT-001: Cannot login to my account' },
    { value: 'TKT-002', label: 'TKT-002: Billing discrepancy' },
    { value: 'TKT-003', label: 'TKT-003: Application crashes on startup' },
    { value: 'TKT-004', label: 'TKT-004: Payment failed but amount deducted' },
    { value: 'TKT-005', label: 'TKT-005: Feature request for mobile app' },
  ];

  // Prepare options for verifier select
  const verifierOptions = roles
    ? [
        { value: '', label: 'None' },
        ...roles.map(role => ({ value: role.id, label: role.name })),
      ]
    : [{ value: '', label: 'None' }];

  // Define form sections
  const sections: FormSection[] = [
    {
      title: 'Ticket Information',
      fields: [
        {
          id: 'ticketId',
          type: 'select',
          label: 'Ticket',
          options: ticketOptions,
          required: true,
          gridSpan: 2,
        },
        {
          id: 'type',
          type: 'select',
          label: 'Verification Type',
          options: VERIFICATION_TYPE_OPTIONS,
          required: true,
        },
        {
          id: 'status',
          type: 'select',
          label: 'Status',
          options: VERIFICATION_STATUS_OPTIONS,
          required: true,
        },
      ],
    },
    {
      title: 'Approval Information',
      fields: [
        {
          id: 'approvalMethod',
          type: 'select',
          label: 'Approval Method',
          options: APPROVAL_METHOD_OPTIONS,
          required: true,
          gridSpan: 2,
        },
        {
          id: 'creatorApproval',
          type: 'checkbox',
          label: 'Creator Approved',
          defaultValue: false,
        },
        {
          id: 'managerApproval',
          type: 'checkbox',
          label: 'Manager Approved',
          defaultValue: false,
        },
        {
          id: 'verifiedBy',
          type: 'select',
          label: 'Verified By',
          options: verifierOptions,
          gridSpan: 2,
        },
      ],
    },
    {
      title: 'Evidence Information',
      fields: [
        {
          id: 'evidenceType',
          type: 'select',
          label: 'Evidence Type',
          options: EVIDENCE_TYPE_OPTIONS,
          required: true,
          gridSpan: 2,
        },
        {
          id: 'evidenceDescription',
          type: 'textarea',
          label: 'Evidence Description',
          required: true,
          gridSpan: 2,
        },
        {
          id: 'requestedAt',
          type: 'text',
          label: 'Requested Date',
          defaultValue: new Date().toISOString().split('T')[0],
          gridSpan: 1,
        },
        {
          id: 'completedAt',
          type: 'text',
          label: 'Completed Date',
          gridSpan: 1,
        },
        {
          id: 'notes',
          type: 'textarea',
          label: 'Additional Notes',
          gridSpan: 2,
        },
      ],
    },
  ];

  return (
    <EntityForm
      sections={sections}
      schema={VerificationSchema}
      initialData={initialData}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      submitLabel={initialData ? 'Update Verification' : 'Create Verification'}
    />
  );
};
