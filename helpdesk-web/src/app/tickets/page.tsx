'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { TicketTable } from '@/components/tickets/TicketTable';
import { TicketFilters } from '@/components/tickets/TicketFilters';
import { EnhancedTicketDialog } from '@/components/tickets/EnhancedTicketDialog';
import { DeleteConfirmationDialog } from '@/components/tickets/DeleteConfirmationDialog';
import { Ticket, TicketInput } from '@/types/tickets';
import { useTickets, useCreateTicket, useUpdateTicket, useDeleteTicket, TicketFilters as FiltersType } from '@/hooks/useTickets.mock';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function TicketsPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // State for filters
  const [filters, setFilters] = useState<FiltersType>({});

  // State for dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);

  // Queries and mutations
  const { data: tickets = [], isLoading, error } = useTickets(filters);
  const createMutation = useCreateTicket();
  const updateMutation = useUpdateTicket();
  const deleteMutation = useDeleteTicket();

  // Handlers
  const handleCreateTicket = (data: TicketInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      },
    });
  };

  const handleUpdateTicket = (data: TicketInput) => {
    if (selectedTicket) {
      updateMutation.mutate(
        { id: selectedTicket.id, ticket: data },
        {
          onSuccess: () => {
            setIsEditDialogOpen(false);
            setSelectedTicket(undefined);
          },
        }
      );
    }
  };

  const handleDeleteTicket = () => {
    if (selectedTicket) {
      deleteMutation.mutate(selectedTicket.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setSelectedTicket(undefined);
        },
      });
    }
  };

  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  const handleViewTicket = (ticket: Ticket) => {
    router.push(`/tickets/${ticket.id}`);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsEditDialogOpen(true);
  };

  const handleDeleteTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDeleteDialogOpen(true);
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
              { label: 'Tickets' },
            ]}
          />
          <div className="mt-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              New Ticket
            </Button>
          </div>
        </div>

      <TicketFilters filters={filters} onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading tickets...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          Error loading tickets: {error.message}
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No tickets found matching your filters.</p>
          <p className="text-gray-500 mt-1">
            Try adjusting your filters or click the &quot;New Ticket&quot; button to create a ticket.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <TicketTable
            tickets={tickets}
            onView={handleViewTicket}
            onEdit={handleEditTicket}
            onDelete={handleDeleteTicketClick}
          />
        </div>
      )}

      {/* Create Ticket Dialog */}
      <EnhancedTicketDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateTicket}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Ticket Dialog */}
      <EnhancedTicketDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedTicket(undefined);
        }}
        onSubmit={handleUpdateTicket}
        initialData={selectedTicket}
        isSubmitting={updateMutation.isPending}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedTicket(undefined);
        }}
        onConfirm={handleDeleteTicket}
        title="Delete Ticket"
        description={`Are you sure you want to delete the ticket "${selectedTicket?.subject}"? This action cannot be undone.`}
        isDeleting={deleteMutation.isPending}
      />
      </div>
    </MainLayout>
  );
}
