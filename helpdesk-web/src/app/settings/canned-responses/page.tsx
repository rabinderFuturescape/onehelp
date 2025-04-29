'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { CannedResponseCard } from '@/components/canned-responses/CannedResponseCard';
import { CannedResponseDialog } from '@/components/canned-responses/CannedResponseDialog';
import { CannedResponseViewDialog } from '@/components/canned-responses/CannedResponseViewDialog';
import { DeleteConfirmationDialog } from '@/components/canned-responses/DeleteConfirmationDialog';
import { CannedResponse, CannedResponseInput } from '@/types/canned-responses';
import { useCannedResponses, useCreateCannedResponse, useUpdateCannedResponse, useDeleteCannedResponse } from '@/hooks/useCannedResponses';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CannedResponsesPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router, user]);

  // State for dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<CannedResponse | undefined>(undefined);

  // Queries and mutations
  const { data: responses = [], isLoading, error } = useCannedResponses();
  const createMutation = useCreateCannedResponse();
  const updateMutation = useUpdateCannedResponse();
  const deleteMutation = useDeleteCannedResponse();

  // Handlers
  const handleCreateResponse = (data: CannedResponseInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      },
    });
  };

  const handleUpdateResponse = (data: CannedResponseInput) => {
    if (selectedResponse) {
      updateMutation.mutate(
        { id: selectedResponse.id, response: data },
        {
          onSuccess: () => {
            setIsEditDialogOpen(false);
            setSelectedResponse(undefined);
          },
        }
      );
    }
  };

  const handleDeleteResponse = () => {
    if (selectedResponse) {
      deleteMutation.mutate(selectedResponse.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setSelectedResponse(undefined);
        },
      });
    }
  };

  const openViewDialog = (response: CannedResponse) => {
    setSelectedResponse(response);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (response: CannedResponse) => {
    setSelectedResponse(response);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (response: CannedResponse) => {
    setSelectedResponse(response);
    setIsDeleteDialogOpen(true);
  };

  if (!isAuthenticated || (user?.role !== 'admin')) {
    return null;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Settings', href: '/settings' },
            { label: 'Canned Responses' },
          ]}
        />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Canned Responses</h1>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add New Response
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading canned responses...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          Error loading canned responses: {error.message}
        </div>
      ) : responses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No canned responses found.</p>
          <p className="text-gray-500 mt-1">
            Click the &quot;Add New Response&quot; button to create your first canned response.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {responses.map((response) => (
            <CannedResponseCard
              key={response.id}
              response={response}
              onView={openViewDialog}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
            />
          ))}
        </div>
      )}

      {/* Create Response Dialog */}
      <CannedResponseDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateResponse}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Response Dialog */}
      <CannedResponseDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedResponse(undefined);
        }}
        onSubmit={handleUpdateResponse}
        initialData={selectedResponse}
        isSubmitting={updateMutation.isPending}
      />

      {/* View Response Dialog */}
      <CannedResponseViewDialog
        isOpen={isViewDialogOpen}
        onClose={() => {
          setIsViewDialogOpen(false);
          setSelectedResponse(undefined);
        }}
        response={selectedResponse}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedResponse(undefined);
        }}
        onConfirm={handleDeleteResponse}
        title="Delete Canned Response"
        description={`Are you sure you want to delete the canned response "${selectedResponse?.title}"? This action cannot be undone.`}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
