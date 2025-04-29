'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { ComplaintTable } from '@/components/complaints/ComplaintTable';
import { ComplaintFilters } from '@/components/complaints/ComplaintFilters';
import { ComplaintDialog } from '@/components/complaints/ComplaintDialog';
import { DeleteConfirmationDialog } from '@/components/complaints/DeleteConfirmationDialog';
import { Complaint, ComplaintInput } from '@/types/complaints';
import { useComplaints, useCreateComplaint, useUpdateComplaint, useDeleteComplaint, ComplaintFilters as FiltersType } from '@/hooks/useComplaints';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ComplaintsPage() {
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
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | undefined>(undefined);

  // Queries and mutations
  const { data: complaints = [], isLoading, error } = useComplaints(filters);
  const createMutation = useCreateComplaint();
  const updateMutation = useUpdateComplaint();
  const deleteMutation = useDeleteComplaint();

  // Handlers
  const handleCreateComplaint = (data: ComplaintInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      },
    });
  };

  const handleUpdateComplaint = (data: ComplaintInput) => {
    if (selectedComplaint) {
      updateMutation.mutate(
        { id: selectedComplaint.id, complaint: data },
        {
          onSuccess: () => {
            setIsEditDialogOpen(false);
            setSelectedComplaint(undefined);
          },
        }
      );
    }
  };

  const handleDeleteComplaint = () => {
    if (selectedComplaint) {
      deleteMutation.mutate(selectedComplaint.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setSelectedComplaint(undefined);
        },
      });
    }
  };

  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  const handleViewComplaint = (complaint: Complaint) => {
    router.push(`/helpdesk/complaints/${complaint.id}`);
  };

  const handleEditComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsEditDialogOpen(true);
  };

  const handleDeleteComplaintClick = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsDeleteDialogOpen(true);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Helpdesk', href: '/helpdesk' },
            { label: 'Complaints' },
          ]}
        />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            New Complaint
          </Button>
        </div>
      </div>

      <ComplaintFilters filters={filters} onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading complaints...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          Error loading complaints: {error.message}
        </div>
      ) : complaints.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No complaints found matching your filters.</p>
          <p className="text-gray-500 mt-1">
            Try adjusting your filters or click the &quot;New Complaint&quot; button to create a complaint.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ComplaintTable
            complaints={complaints}
            onView={handleViewComplaint}
            onEdit={handleEditComplaint}
            onDelete={handleDeleteComplaintClick}
          />
        </div>
      )}

      {/* Create Complaint Dialog */}
      <ComplaintDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateComplaint}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Complaint Dialog */}
      <ComplaintDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedComplaint(undefined);
        }}
        onSubmit={handleUpdateComplaint}
        initialData={selectedComplaint}
        isSubmitting={updateMutation.isPending}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedComplaint(undefined);
        }}
        onConfirm={handleDeleteComplaint}
        title="Delete Complaint"
        description={`Are you sure you want to delete the complaint "${selectedComplaint?.subject}"? This action cannot be undone.`}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
