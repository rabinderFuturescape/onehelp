import React from 'react';
import { TicketFilters as FiltersType } from '@/hooks/useTickets.mock';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '@/types/tickets';
import { useHelpTopics } from '@/hooks/useHelpTopics';
import { useRoles } from '@/hooks/useRoles';
import { FilterPanel, FilterOption } from '@/components/shared/FilterPanel';

interface TicketFiltersProps {
  filters: FiltersType;
  onFilterChange: (filters: FiltersType) => void;
}

export const TicketFilters: React.FC<TicketFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const { data: helpTopics } = useHelpTopics();
  const { data: roles } = useRoles();

  const filterOptions: FilterOption[] = [
    {
      id: 'ticketNumber',
      name: 'ticketNumber',
      type: 'text',
      label: 'Ticket Number',
      placeholder: 'Enter ticket number',
    },
    {
      id: 'subject',
      name: 'subject',
      type: 'text',
      label: 'Subject',
      placeholder: 'Enter subject',
    },
    {
      id: 'status',
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { value: '', label: 'All Statuses' },
        ...STATUS_OPTIONS,
      ],
    },
    {
      id: 'priority',
      name: 'priority',
      type: 'select',
      label: 'Priority',
      options: [
        { value: '', label: 'All Priorities' },
        ...PRIORITY_OPTIONS,
      ],
    },
    {
      id: 'helpTopicId',
      name: 'helpTopicId',
      type: 'select',
      label: 'Help Topic',
      options: [
        { value: '', label: 'All Help Topics' },
        ...(helpTopics?.map(topic => ({ value: topic.id, label: topic.name })) || []),
      ],
    },
    {
      id: 'assignedToId',
      name: 'assignedToId',
      type: 'select',
      label: 'Assigned To',
      options: [
        { value: '', label: 'All Assignees' },
        { value: 'unassigned', label: 'Unassigned' },
        ...(roles?.map(role => ({ value: role.id, label: role.name })) || []),
      ],
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
    {
      id: 'isOverdue',
      name: 'isOverdue',
      type: 'checkbox',
      label: 'Overdue',
    },
    {
      id: 'isEscalated',
      name: 'isEscalated',
      type: 'checkbox',
      label: 'Escalated',
    },
  ];

  return (
    <FilterPanel
      filters={filters}
      onFilterChange={onFilterChange}
      filterOptions={filterOptions}
      title="Ticket Filters"
    />
  );
};
