import { z } from 'zod';

export const VERIFICATION_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export const VERIFICATION_TYPE_OPTIONS = [
  { value: 'ticket_closure', label: 'Ticket Closure Verification' },
  { value: 'escalation_approval', label: 'Escalation Approval' },
  { value: 'solution_verification', label: 'Solution Verification' },
];

export const APPROVAL_METHOD_OPTIONS = [
  { value: 'creator', label: 'Ticket Creator' },
  { value: 'manager', label: 'Manager' },
  { value: 'both', label: 'Both Creator and Manager' },
];

export const EVIDENCE_TYPE_OPTIONS = [
  { value: 'email', label: 'Email Confirmation' },
  { value: 'signature', label: 'Digital Signature' },
  { value: 'survey', label: 'Satisfaction Survey' },
  { value: 'call_recording', label: 'Call Recording' },
  { value: 'document', label: 'Document' },
  { value: 'other', label: 'Other' },
];

export const VerificationSchema = z.object({
  id: z.string().optional(),
  ticketId: z.string().min(1, 'Ticket is required'),
  type: z.string().min(1, 'Verification type is required'),
  status: z.string().min(1, 'Status is required'),
  approvalMethod: z.string().min(1, 'Approval method is required'),
  evidenceType: z.string().min(1, 'Evidence type is required'),
  evidenceDescription: z.string().min(1, 'Evidence description is required'),
  requestedAt: z.string().or(z.date()).optional(),
  completedAt: z.string().or(z.date()).optional().nullable(),
  notes: z.string().optional(),
  evidenceFiles: z.array(z.string()).optional(),
  verifiedBy: z.string().optional().nullable(),
  creatorApproval: z.boolean().optional(),
  managerApproval: z.boolean().optional(),
});

export type Verification = z.infer<typeof VerificationSchema> & {
  id: string;
  requestedAt: string;
  ticket: {
    id: string;
    ticketNumber: string;
    subject: string;
    status: string;
    member: {
      id: string;
      name: string;
      email: string;
      unitNumber?: string;
    };
  };
};

export type VerificationInput = z.infer<typeof VerificationSchema>;
