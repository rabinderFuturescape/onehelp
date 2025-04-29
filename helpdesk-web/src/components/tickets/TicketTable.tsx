import React from 'react';
import { Ticket } from '@/types/tickets';
import Link from 'next/link';
import { DataTable, Column, getPriorityColor, getStatusColor, formatDate, getStatusLabel } from '@/components/shared/DataTable';

interface TicketTableProps {
  tickets: Ticket[];
  onView: (ticket: Ticket) => void;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}

export const TicketTable: React.FC<TicketTableProps> = ({
  tickets,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns: Column<Ticket>[] = [
    {
      key: 'ticketNumber',
      header: 'Ticket No',
      className: 'py-4 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-6 w-36',
      render: (ticket) => (
        <div className="flex flex-col space-y-1 w-full">
          <Link href={`/tickets/${ticket.id}`} className="text-blue-600 hover:text-blue-800">
            {ticket.ticketNumber}
          </Link>
          <div className="flex flex-wrap gap-1 mt-1">
            {ticket.isOverdue && (
              <span className="inline-block px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 whitespace-nowrap">
                Overdue
              </span>
            )}
            {ticket.isEscalated && (
              <span className="inline-block px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 whitespace-nowrap">
                Escalated
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      className: 'text-gray-500 w-28',
      render: (ticket) => formatDate(ticket.createdAt),
    },
    {
      key: 'helpTopic',
      header: 'Topic',
      className: 'text-gray-500 w-36',
      render: (ticket) => (
        <div className="truncate max-w-[140px]">
          {ticket.helpTopic.name}
        </div>
      ),
    },
    {
      key: 'subject',
      header: 'Subject',
      className: 'text-gray-500 w-64',
      render: (ticket) => (
        <div className="truncate max-w-[250px]">
          {ticket.subject}
        </div>
      ),
    },
    {
      key: 'member',
      header: 'From',
      className: 'text-gray-500 w-36',
      render: (ticket) => (
        <div className="truncate max-w-[140px]">
          <div className="font-medium">{ticket.member.name}</div>
          {ticket.member.unitNumber && (
            <div className="text-xs text-gray-400">
              Unit: {ticket.member.unitNumber}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      className: 'text-gray-500 w-32',
      render: (ticket) => (
        <div className="truncate max-w-[120px]">
          {ticket.assignedTo?.name || '-'}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      className: 'text-gray-500 w-28',
      render: (ticket) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            ticket.status
          )}`}
        >
          {getStatusLabel(ticket.status)}
        </span>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      className: 'text-gray-500 w-24',
      render: (ticket) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
            ticket.priority
          )}`}
        >
          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      items={tickets}
      columns={columns}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      getRowClassName={(ticket) => ticket.isOverdue ? 'bg-red-50' : ''}
      keyExtractor={(ticket) => ticket.id}
    />
  );
};
