'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { useTicket, useUpdateTicket } from '@/hooks/useTickets.mock';
import { TicketDialog } from '@/components/tickets/TicketDialog';
import { TicketInput, STATUS_OPTIONS, PRIORITY_OPTIONS } from '@/types/tickets';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PencilIcon, ArrowLeftIcon, PaperClipIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function TicketDetailClient({ id }: { id: string }) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // State for dialogs
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Queries and mutations
  const { data: ticket, isLoading, error } = useTicket(id);
  const updateMutation = useUpdateTicket();

  // Handlers
  const handleUpdateTicket = (data: TicketInput) => {
    if (ticket) {
      updateMutation.mutate(
        { id: ticket.id, ticket: data },
        {
          onSuccess: () => {
            setIsEditDialogOpen(false);
          },
        }
      );
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusLabel = (status: string) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === status);
    return option ? option.label : status;
  };

  const getPriorityLabel = (priority: string) => {
    const option = PRIORITY_OPTIONS.find((opt) => opt.value === priority);
    return option ? option.label : priority;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'reopened':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
              { label: 'Tickets', href: '/tickets' },
              { label: ticket ? `#${ticket.ticketNumber}` : 'Loading...' },
            ]}
          />
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/tickets">
                <Button variant="ghost" className="mr-4">
                  <ArrowLeftIcon className="h-5 w-5 mr-1" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {isLoading ? 'Loading...' : `Ticket #${ticket?.ticketNumber}`}
              </h1>
            </div>
            {ticket && (
              <Button
                onClick={() => setIsEditDialogOpen(true)}
                className="flex items-center"
              >
                <PencilIcon className="h-5 w-5 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-500">Loading ticket details...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
            Error loading ticket: {error.message}
          </div>
        ) : ticket ? (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex flex-wrap items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {ticket.subject}
                  </h3>
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {getStatusLabel(ticket.status)}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {getPriorityLabel(ticket.priority)}
                    </span>
                    {ticket.isOverdue && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                        Overdue
                      </span>
                    )}
                    {ticket.isEscalated && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Escalated
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Help Topic</dt>
                    <dd className="mt-1 text-sm text-gray-900">{ticket.helpTopic.name}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(ticket.createdAt)}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Member</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {ticket.member.name}
                      {ticket.member.email && (
                        <span className="block text-gray-500">{ticket.member.email}</span>
                      )}
                      {ticket.member.unitNumber && (
                        <span className="block text-gray-500">Unit: {ticket.member.unitNumber}</span>
                      )}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {ticket.assignedTo?.name || 'Unassigned'}
                    </dd>
                  </div>
                  {ticket.dueDate && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatDate(ticket.dueDate)}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="prose prose-sm max-w-none text-gray-900">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
                  <div dangerouslySetInnerHTML={{ __html: ticket.description }} />
                </div>
              </div>
              {ticket.attachments && ticket.attachments.length > 0 && (
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Attachments</h4>
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {ticket.attachments.map((attachment) => (
                      <li
                        key={attachment.id || attachment.fileName}
                        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                      >
                        <div className="w-0 flex-1 flex items-center">
                          <PaperClipIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2 flex-1 w-0 truncate">
                            {attachment.fileName}
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          {attachment.url && (
                            <a
                              href={attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:text-blue-500"
                            >
                              Download
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
            Ticket not found
          </div>
        )}

        {/* Edit Ticket Dialog */}
        {ticket && (
          <TicketDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            onSubmit={handleUpdateTicket}
            initialData={ticket}
            isSubmitting={updateMutation.isPending}
          />
        )}
      </div>
    </MainLayout>
  );
}
