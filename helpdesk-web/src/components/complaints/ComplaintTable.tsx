import React from 'react';
import { Complaint } from '@/types/complaints';
import Link from 'next/link';
import { DataTable, Column, getPriorityColor, getStatusColor, formatDate, getStatusLabel } from '@/components/shared/DataTable';

interface ComplaintTableProps {
  complaints: Complaint[];
  onView: (complaint: Complaint) => void;
  onEdit: (complaint: Complaint) => void;
  onDelete: (complaint: Complaint) => void;
}

export const ComplaintTable: React.FC<ComplaintTableProps> = ({
  complaints,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns: Column<Complaint>[] = [
    {
      key: 'ticketNumber',
      header: 'Ticket No',
      className: 'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-6',
      render: (complaint) => (
        <>
          <Link href={`/helpdesk/complaints/${complaint.id}`}>
            {complaint.ticketNumber}
          </Link>
          {complaint.isOverdue && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
              Overdue
            </span>
          )}
          {complaint.isEscalated && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
              Escalated
            </span>
          )}
        </>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      className: 'whitespace-nowrap text-gray-500',
      render: (complaint) => formatDate(complaint.createdAt),
    },
    {
      key: 'helpTopic',
      header: 'Topic',
      className: 'whitespace-nowrap text-gray-500',
      render: (complaint) => complaint.helpTopic.name,
    },
    {
      key: 'subject',
      header: 'Subject',
      className: 'text-gray-500 max-w-xs truncate',
      render: (complaint) => complaint.subject,
    },
    {
      key: 'member',
      header: 'From',
      className: 'whitespace-nowrap text-gray-500',
      render: (complaint) => (
        <>
          {complaint.member.name}
          {complaint.member.unitNumber && (
            <span className="block text-xs text-gray-400">
              Unit: {complaint.member.unitNumber}
            </span>
          )}
        </>
      ),
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      className: 'whitespace-nowrap text-gray-500',
      render: (complaint) => complaint.assignedTo?.name || '-',
    },
    {
      key: 'status',
      header: 'Status',
      className: 'whitespace-nowrap text-gray-500',
      render: (complaint) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            complaint.status
          )}`}
        >
          {getStatusLabel(complaint.status)}
        </span>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      className: 'whitespace-nowrap text-gray-500',
      render: (complaint) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
            complaint.priority
          )}`}
        >
          {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      items={complaints}
      columns={columns}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      getRowClassName={(complaint) => complaint.isOverdue ? 'bg-red-50' : ''}
      keyExtractor={(complaint) => complaint.id}
    />
  );
};
