'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { DataTable, Column } from '@/components/shared/DataTable';
import { FilterPanel, FilterOption } from '@/components/shared/FilterPanel';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';

// Mock escalations data
const mockEscalations = [
  {
    id: '1',
    ticketNumber: 'TKT-001',
    subject: 'Cannot login to my account',
    currentLevel: 2,
    nextEscalationAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    escalatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'open',
    assignedTo: 'Jane Smith',
  },
  {
    id: '2',
    ticketNumber: 'TKT-003',
    subject: 'Application crashes on startup',
    currentLevel: 3,
    nextEscalationAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    escalatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    priority: 'urgent',
    status: 'in_progress',
    assignedTo: 'Mike Johnson',
  },
  {
    id: '3',
    ticketNumber: 'TKT-007',
    subject: 'Payment failed but amount deducted',
    currentLevel: 1,
    nextEscalationAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    escalatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'open',
    assignedTo: 'Sarah Williams',
  },
];

interface EscalationFilters {
  ticketNumber?: string;
  priority?: string;
  status?: string;
  level?: string;
}

export default function EscalationsPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // State for filters
  const [filters, setFilters] = useState<EscalationFilters>({});
  const [filteredEscalations, setFilteredEscalations] = useState(mockEscalations);

  // Filter options
  const filterOptions: FilterOption[] = [
    {
      id: 'ticketNumber',
      name: 'ticketNumber',
      type: 'text',
      label: 'Ticket Number',
      placeholder: 'Enter ticket number',
    },
    {
      id: 'priority',
      name: 'priority',
      type: 'select',
      label: 'Priority',
      options: [
        { value: '', label: 'All Priorities' },
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' },
      ],
    },
    {
      id: 'status',
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { value: '', label: 'All Statuses' },
        { value: 'open', label: 'Open' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'closed', label: 'Closed' },
      ],
    },
    {
      id: 'level',
      name: 'level',
      type: 'select',
      label: 'Escalation Level',
      options: [
        { value: '', label: 'All Levels' },
        { value: '1', label: 'Level 1' },
        { value: '2', label: 'Level 2' },
        { value: '3', label: 'Level 3' },
      ],
    },
  ];

  // Table columns
  const columns: Column<any>[] = [
    {
      key: 'ticketNumber',
      header: 'Ticket No',
      className: 'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-6',
      render: (escalation) => (
        <a href={`/tickets/${escalation.id}`} className="hover:underline">
          {escalation.ticketNumber}
        </a>
      ),
    },
    {
      key: 'subject',
      header: 'Subject',
      className: 'text-gray-500 max-w-xs truncate',
      render: (escalation) => escalation.subject,
    },
    {
      key: 'currentLevel',
      header: 'Level',
      className: 'whitespace-nowrap text-gray-500',
      render: (escalation) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            escalation.currentLevel === 3
              ? 'bg-red-100 text-red-800'
              : escalation.currentLevel === 2
              ? 'bg-orange-100 text-orange-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          Level {escalation.currentLevel}
        </span>
      ),
    },
    {
      key: 'nextEscalationAt',
      header: 'Next Escalation',
      className: 'whitespace-nowrap text-gray-500',
      render: (escalation) => {
        const date = new Date(escalation.nextEscalationAt);
        return date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
    {
      key: 'priority',
      header: 'Priority',
      className: 'whitespace-nowrap text-gray-500',
      render: (escalation) => {
        const priorityColors: Record<string, string> = {
          low: 'bg-green-100 text-green-800',
          medium: 'bg-blue-100 text-blue-800',
          high: 'bg-orange-100 text-orange-800',
          urgent: 'bg-red-100 text-red-800',
        };

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              priorityColors[escalation.priority] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {escalation.priority.charAt(0).toUpperCase() + escalation.priority.slice(1)}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      className: 'whitespace-nowrap text-gray-500',
      render: (escalation) => {
        const statusColors: Record<string, string> = {
          open: 'bg-blue-100 text-blue-800',
          in_progress: 'bg-yellow-100 text-yellow-800',
          resolved: 'bg-green-100 text-green-800',
          closed: 'bg-gray-100 text-gray-800',
        };

        const statusLabel = escalation.status === 'in_progress' ? 'In Progress' :
          escalation.status.charAt(0).toUpperCase() + escalation.status.slice(1);

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[escalation.status] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {statusLabel}
          </span>
        );
      },
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      className: 'whitespace-nowrap text-gray-500',
      render: (escalation) => escalation.assignedTo,
    },
  ];

  // Handlers
  const handleFilterChange = (newFilters: EscalationFilters) => {
    setFilters(newFilters);

    // Apply filters
    let filtered = [...mockEscalations];

    if (newFilters.ticketNumber) {
      filtered = filtered.filter((escalation) =>
        escalation.ticketNumber.toLowerCase().includes(newFilters.ticketNumber!.toLowerCase())
      );
    }

    if (newFilters.priority) {
      filtered = filtered.filter((escalation) => escalation.priority === newFilters.priority);
    }

    if (newFilters.status) {
      filtered = filtered.filter((escalation) => escalation.status === newFilters.status);
    }

    if (newFilters.level) {
      filtered = filtered.filter((escalation) => escalation.currentLevel.toString() === newFilters.level);
    }

    setFilteredEscalations(filtered);
  };

  const handleViewEscalation = (escalation: any) => {
    router.push(`/tickets/${escalation.id}`);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <MainLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Escalations' },
            ]}
          />
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-900">Escalated Tickets</h1>
          </div>
        </div>

      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
        title="Escalation Filters"
      />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <DataTable
          items={filteredEscalations}
          columns={columns}
          onView={handleViewEscalation}
          keyExtractor={(escalation) => escalation.id}
          actionButtons={{ view: true, edit: false, delete: false }}
        />
      </div>
      </div>
    </MainLayout>
  );
}
