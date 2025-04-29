'use client';

import React, { useState, Fragment } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { DataTable, Column, formatDate } from '@/components/shared/DataTable';
import { VerificationFilters } from '@/components/verification/VerificationFilters';
import { VerificationForm } from '@/components/verification/VerificationForm';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import { Verification, VerificationInput, VERIFICATION_TYPE_OPTIONS, VERIFICATION_STATUS_OPTIONS } from '@/types/verification';
import { useVerifications, useCreateVerification, useUpdateVerification, useDeleteVerification, VerificationFilters as FiltersType } from '@/hooks/useVerifications';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function VerificationsPage() {
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
  const [selectedVerification, setSelectedVerification] = useState<Verification | undefined>(undefined);

  // Queries and mutations
  const { data: verifications = [], isLoading, error } = useVerifications(filters);
  const createMutation = useCreateVerification();
  const updateMutation = useUpdateVerification();
  const deleteMutation = useDeleteVerification();

  // Handlers
  const handleCreateVerification = (data: VerificationInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      },
    });
  };

  const handleUpdateVerification = (data: VerificationInput) => {
    if (selectedVerification) {
      updateMutation.mutate(
        { id: selectedVerification.id, verification: data },
        {
          onSuccess: () => {
            setIsEditDialogOpen(false);
            setSelectedVerification(undefined);
          },
        }
      );
    }
  };

  const handleDeleteVerification = () => {
    if (selectedVerification) {
      deleteMutation.mutate(selectedVerification.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setSelectedVerification(undefined);
        },
      });
    }
  };

  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  const handleViewVerification = (verification: Verification) => {
    setSelectedVerification(verification);
    setIsEditDialogOpen(true);
  };

  const handleEditVerification = (verification: Verification) => {
    setSelectedVerification(verification);
    setIsEditDialogOpen(true);
  };

  const handleDeleteVerificationClick = (verification: Verification) => {
    setSelectedVerification(verification);
    setIsDeleteDialogOpen(true);
  };

  // Helper function to get type label
  const getTypeLabel = (type: string) => {
    const typeOption = VERIFICATION_TYPE_OPTIONS.find(option => option.value === type);
    return typeOption ? typeOption.label : type;
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Table columns
  const columns: Column<Verification>[] = [
    {
      key: 'ticket',
      header: 'Ticket',
      className: 'text-gray-900 w-40',
      render: (verification) => (
        <div className="flex flex-col space-y-1">
          <div className="font-medium text-blue-600">
            <a href={`/tickets/${verification.ticket.id}`} className="hover:underline">
              {verification.ticket.ticketNumber}
            </a>
          </div>
          <div className="text-xs text-gray-500 truncate max-w-[150px]">{verification.ticket.subject}</div>
          <div className="text-xs text-gray-500">
            <span className={`inline-block px-1.5 py-0.5 rounded text-xs ${getStatusColor(verification.ticket.status)}`}>
              {verification.ticket.status.charAt(0).toUpperCase() + verification.ticket.status.slice(1)}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'member',
      header: 'Member',
      className: 'text-gray-900 w-36',
      render: (verification) => (
        <div className="truncate max-w-[140px]">
          <div className="font-medium">{verification.ticket.member.name}</div>
          <div className="text-xs text-gray-500 truncate">{verification.ticket.member.email}</div>
          {verification.ticket.member.unitNumber && (
            <div className="text-xs text-gray-500">Unit: {verification.ticket.member.unitNumber}</div>
          )}
        </div>
      ),
    },
    {
      key: 'verification',
      header: 'Verification',
      className: 'text-gray-500 w-36',
      render: (verification) => (
        <div className="truncate max-w-[140px]">
          <div>{getTypeLabel(verification.type)}</div>
          <div className="mt-1">
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                verification.status
              )}`}
            >
              {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'approval',
      header: 'Approval',
      className: 'text-gray-500 w-36',
      render: (verification) => (
        <div>
          <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full mr-1 ${verification.creatorApproval ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            <span className="truncate">Creator: {verification.creatorApproval ? 'Approved' : 'Pending'}</span>
          </div>
          <div className="flex items-center mt-1">
            <span className={`w-3 h-3 rounded-full mr-1 ${verification.managerApproval ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            <span className="truncate">Manager: {verification.managerApproval ? 'Approved' : 'Pending'}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'evidence',
      header: 'Evidence',
      className: 'text-gray-500 w-32',
      render: (verification) => (
        <div className="truncate max-w-[120px]">
          <div className="text-sm truncate">{verification.evidenceType?.charAt(0).toUpperCase() + verification.evidenceType?.slice(1).replace('_', ' ')}</div>
          <div className="text-xs text-gray-500 mt-1">
            {verification.evidenceFiles?.length || 0} file(s)
          </div>
        </div>
      ),
    },
    {
      key: 'dates',
      header: 'Dates',
      className: 'text-gray-500 w-28',
      render: (verification) => (
        <div>
          <div className="text-xs">Requested: {formatDate(verification.requestedAt)}</div>
          {verification.completedAt && (
            <div className="text-xs mt-1">Completed: {formatDate(verification.completedAt)}</div>
          )}
        </div>
      ),
    },
  ];

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
              { label: 'Verifications' },
            ]}
          />
          <div className="mt-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Verifications</h1>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              New Verification
            </Button>
          </div>
        </div>

      <VerificationFilters filters={filters} onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading verifications...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          Error loading verifications: {error.message}
        </div>
      ) : verifications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No verifications found matching your filters.</p>
          <p className="text-gray-500 mt-1">
            Try adjusting your filters or click the &quot;New Verification&quot; button to create a verification.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <DataTable
            items={verifications}
            columns={columns}
            onView={handleViewVerification}
            onEdit={handleEditVerification}
            onDelete={handleDeleteVerificationClick}
            keyExtractor={(verification) => verification.id}
          />
        </div>
      )}

      {/* Create Verification Dialog */}
      {isCreateDialogOpen && (
        <Transition appear show={isCreateDialogOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsCreateDialogOpen(false)}>
            <DialogContent
              className="sm:max-w-4xl p-0"
              style={{
                margin: '24px'
              }}
              onClose={() => setIsCreateDialogOpen(false)}>
              <DialogTitle>Create Verification</DialogTitle>
              <VerificationForm
                onSubmit={handleCreateVerification}
                isSubmitting={createMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </Transition>
      )}

      {/* Edit Verification Dialog */}
      {isEditDialogOpen && (
        <Transition appear show={isEditDialogOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedVerification(undefined);
          }}>
            <DialogContent
              className="sm:max-w-4xl p-0"
              style={{
                margin: '24px'
              }}
              onClose={() => {
                setIsEditDialogOpen(false);
                setSelectedVerification(undefined);
              }}>
              <DialogTitle>Edit Verification</DialogTitle>
              <VerificationForm
                initialData={selectedVerification}
                onSubmit={handleUpdateVerification}
                isSubmitting={updateMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </Transition>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedVerification(undefined);
        }}
        onConfirm={handleDeleteVerification}
        title="Delete Verification"
        description={`Are you sure you want to delete this verification for ticket ${selectedVerification?.ticket.ticketNumber}? This action cannot be undone.`}
        isDeleting={deleteMutation.isPending}
      />
      </div>
    </MainLayout>
  );
}
