'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { HelpTopicTable } from '@/components/help-topics/HelpTopicTable';
import { HelpTopicDialog } from '@/components/help-topics/HelpTopicDialog';
import { HelpTopicViewDialog } from '@/components/help-topics/HelpTopicViewDialog';
import { DeleteConfirmationDialog } from '@/components/help-topics/DeleteConfirmationDialog';
import { HelpTopic, HelpTopicInput } from '@/types/help-topics';
import { useHelpTopics, useCreateHelpTopic, useUpdateHelpTopic, useDeleteHelpTopic } from '@/hooks/useHelpTopics';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HelpTopicsPage() {
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
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | undefined>(undefined);

  // Queries and mutations
  const { data: topics = [], isLoading, error } = useHelpTopics();
  const createMutation = useCreateHelpTopic();
  const updateMutation = useUpdateHelpTopic();
  const deleteMutation = useDeleteHelpTopic();

  // Handlers
  const handleCreateTopic = (data: HelpTopicInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      },
    });
  };

  const handleUpdateTopic = (data: HelpTopicInput) => {
    if (selectedTopic) {
      updateMutation.mutate(
        { id: selectedTopic.id, topic: data },
        {
          onSuccess: () => {
            setIsEditDialogOpen(false);
            setSelectedTopic(undefined);
          },
        }
      );
    }
  };

  const handleDeleteTopic = () => {
    if (selectedTopic) {
      deleteMutation.mutate(selectedTopic.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setSelectedTopic(undefined);
        },
      });
    }
  };

  const openViewDialog = (topic: HelpTopic) => {
    setSelectedTopic(topic);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (topic: HelpTopic) => {
    setSelectedTopic(topic);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (topic: HelpTopic) => {
    setSelectedTopic(topic);
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
            { label: 'Help Topics' },
          ]}
        />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Help Topics</h1>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add New Topic
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading help topics...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          Error loading help topics: {error.message}
        </div>
      ) : topics.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No help topics found.</p>
          <p className="text-gray-500 mt-1">
            Click the &quot;Add New Topic&quot; button to create your first help topic.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <HelpTopicTable
            topics={topics}
            onView={openViewDialog}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
          />
        </div>
      )}

      {/* Create Topic Dialog */}
      <HelpTopicDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateTopic}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Topic Dialog */}
      <HelpTopicDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedTopic(undefined);
        }}
        onSubmit={handleUpdateTopic}
        initialData={selectedTopic}
        isSubmitting={updateMutation.isPending}
      />

      {/* View Topic Dialog */}
      <HelpTopicViewDialog
        isOpen={isViewDialogOpen}
        onClose={() => {
          setIsViewDialogOpen(false);
          setSelectedTopic(undefined);
        }}
        topic={selectedTopic}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedTopic(undefined);
        }}
        onConfirm={handleDeleteTopic}
        title="Delete Help Topic"
        description={`Are you sure you want to delete the help topic "${selectedTopic?.name}"? This action cannot be undone.`}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
