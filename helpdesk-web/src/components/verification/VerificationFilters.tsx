import React from 'react';
import {
  VERIFICATION_STATUS_OPTIONS,
  VERIFICATION_TYPE_OPTIONS,
  APPROVAL_METHOD_OPTIONS
} from '@/types/verification';
import { VerificationFilters as FiltersType } from '@/hooks/useVerifications';
import { FilterPanel, FilterOption } from '@/components/shared/FilterPanel';

interface VerificationFiltersProps {
  filters: FiltersType;
  onFilterChange: (filters: FiltersType) => void;
}

export const VerificationFilters: React.FC<VerificationFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  // Mock ticket options
  const ticketOptions = [
    { value: '', label: 'All Tickets' },
    { value: 'TKT-001', label: 'TKT-001: Cannot login to my account' },
    { value: 'TKT-002', label: 'TKT-002: Billing discrepancy' },
    { value: 'TKT-003', label: 'TKT-003: Application crashes on startup' },
    { value: 'TKT-004', label: 'TKT-004: Payment failed but amount deducted' },
    { value: 'TKT-005', label: 'TKT-005: Feature request for mobile app' },
  ];

  const filterOptions: FilterOption[] = [
    {
      id: 'ticketId',
      name: 'ticketId',
      type: 'select',
      label: 'Ticket',
      options: ticketOptions,
    },
    {
      id: 'type',
      name: 'type',
      type: 'select',
      label: 'Verification Type',
      options: [
        { value: '', label: 'All Types' },
        ...VERIFICATION_TYPE_OPTIONS,
      ],
    },
    {
      id: 'status',
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { value: '', label: 'All Statuses' },
        ...VERIFICATION_STATUS_OPTIONS,
      ],
    },
    {
      id: 'approvalMethod',
      name: 'approvalMethod',
      type: 'select',
      label: 'Approval Method',
      options: [
        { value: '', label: 'All Methods' },
        ...APPROVAL_METHOD_OPTIONS,
      ],
    },
    {
      id: 'creatorApproved',
      name: 'creatorApproved',
      type: 'checkbox',
      label: 'Creator Approved',
    },
    {
      id: 'managerApproved',
      name: 'managerApproved',
      type: 'checkbox',
      label: 'Manager Approved',
    },
    {
      id: 'from',
      name: 'from',
      type: 'date',
      label: 'From Date',
    },
    {
      id: 'to',
      name: 'to',
      type: 'date',
      label: 'To Date',
    },
  ];

  return (
    <FilterPanel
      filters={filters}
      onFilterChange={onFilterChange}
      filterOptions={filterOptions}
      title="Verification Filters"
    />
  );
};
