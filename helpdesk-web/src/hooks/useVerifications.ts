import { useState } from 'react';
import { Verification, VerificationInput } from '@/types/verification';

// Mock data for verifications
const mockVerifications: Verification[] = [
  {
    id: '1',
    ticketId: 'TKT-001',
    type: 'ticket_closure',
    status: 'pending',
    approvalMethod: 'creator',
    evidenceType: 'email',
    evidenceDescription: 'Email confirmation from customer',
    requestedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
    notes: 'Waiting for customer to confirm issue resolution',
    evidenceFiles: ['email_screenshot.jpg'],
    verifiedBy: null,
    creatorApproval: false,
    managerApproval: false,
    ticket: {
      id: 'TKT-001',
      ticketNumber: 'TKT-001',
      subject: 'Cannot login to my account',
      status: 'resolved',
      member: {
        id: '101',
        name: 'John Doe',
        email: 'john.doe@example.com',
        unitNumber: 'A101',
      },
    },
  },
  {
    id: '2',
    ticketId: 'TKT-002',
    type: 'ticket_closure',
    status: 'approved',
    approvalMethod: 'both',
    evidenceType: 'signature',
    evidenceDescription: 'Digital signature on resolution form',
    requestedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Both customer and manager have approved the resolution',
    evidenceFiles: ['signature.pdf', 'manager_approval.pdf'],
    verifiedBy: '201',
    creatorApproval: true,
    managerApproval: true,
    ticket: {
      id: 'TKT-002',
      ticketNumber: 'TKT-002',
      subject: 'Billing discrepancy',
      status: 'closed',
      member: {
        id: '102',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        unitNumber: 'B202',
      },
    },
  },
  {
    id: '3',
    ticketId: 'TKT-003',
    type: 'solution_verification',
    status: 'rejected',
    approvalMethod: 'creator',
    evidenceType: 'survey',
    evidenceDescription: 'Customer satisfaction survey',
    requestedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Customer reported that the issue is still occurring',
    evidenceFiles: ['survey_response.pdf'],
    verifiedBy: '202',
    creatorApproval: false,
    managerApproval: true,
    ticket: {
      id: 'TKT-003',
      ticketNumber: 'TKT-003',
      subject: 'Application crashes on startup',
      status: 'reopened',
      member: {
        id: '103',
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
      },
    },
  },
  {
    id: '4',
    ticketId: 'TKT-004',
    type: 'escalation_approval',
    status: 'pending',
    approvalMethod: 'manager',
    evidenceType: 'document',
    evidenceDescription: 'Escalation approval document',
    requestedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
    notes: 'Awaiting manager approval for escalation',
    evidenceFiles: ['escalation_request.pdf'],
    verifiedBy: null,
    creatorApproval: true,
    managerApproval: false,
    ticket: {
      id: 'TKT-004',
      ticketNumber: 'TKT-004',
      subject: 'Payment failed but amount deducted',
      status: 'in_progress',
      member: {
        id: '104',
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        unitNumber: 'C303',
      },
    },
  },
];

// Filter type for verifications
export interface VerificationFilters {
  ticketId?: string;
  type?: string;
  status?: string;
  approvalMethod?: string;
  from?: string;
  to?: string;
  creatorApproved?: boolean;
  managerApproved?: boolean;
}

// Hook for fetching verifications
export const useVerifications = (filters: VerificationFilters = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Apply filters to mock data
  const filteredVerifications = mockVerifications.filter((verification) => {
    if (filters.ticketId && verification.ticketId !== filters.ticketId) {
      return false;
    }
    if (filters.type && verification.type !== filters.type) {
      return false;
    }
    if (filters.status && verification.status !== filters.status) {
      return false;
    }
    if (filters.approvalMethod && verification.approvalMethod !== filters.approvalMethod) {
      return false;
    }
    if (filters.creatorApproved !== undefined && verification.creatorApproval !== filters.creatorApproved) {
      return false;
    }
    if (filters.managerApproved !== undefined && verification.managerApproval !== filters.managerApproved) {
      return false;
    }
    if (filters.from) {
      const fromDate = new Date(filters.from);
      const requestedDate = new Date(verification.requestedAt);
      if (requestedDate < fromDate) {
        return false;
      }
    }
    if (filters.to) {
      const toDate = new Date(filters.to);
      const requestedDate = new Date(verification.requestedAt);
      if (requestedDate > toDate) {
        return false;
      }
    }
    return true;
  });

  return {
    data: filteredVerifications,
    isLoading,
    error,
  };
};

// Hook for creating a verification
export const useCreateVerification = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = (data: VerificationInput, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      console.log('Creating verification:', data);
      setIsPending(false);
      if (options?.onSuccess) {
        options.onSuccess();
      }
    }, 1000);
  };

  return {
    mutate,
    isPending,
    error,
  };
};

// Hook for updating a verification
export const useUpdateVerification = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = (
    data: { id: string; verification: VerificationInput },
    options?: { onSuccess?: () => void }
  ) => {
    setIsPending(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      console.log('Updating verification:', data);
      setIsPending(false);
      if (options?.onSuccess) {
        options.onSuccess();
      }
    }, 1000);
  };

  return {
    mutate,
    isPending,
    error,
  };
};

// Hook for deleting a verification
export const useDeleteVerification = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = (id: string, options?: { onSuccess?: () => void }) => {
    setIsPending(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      console.log('Deleting verification:', id);
      setIsPending(false);
      if (options?.onSuccess) {
        options.onSuccess();
      }
    }, 1000);
  };

  return {
    mutate,
    isPending,
    error,
  };
};
