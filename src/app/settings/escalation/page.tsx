'use client';

import React, { useState } from 'react';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { EscalationRuleCard } from '@/components/escalation/EscalationRuleCard';
import { EscalationRuleDialog } from '@/components/escalation/EscalationRuleDialog';
import { DeleteConfirmationDialog } from '@/components/escalation/DeleteConfirmationDialog';
import { EscalationRule, EscalationRuleInput } from '@/types/escalation';
import { useEscalationRules, useCreateEscalationRule, useUpdateEscalationRule, useDeleteEscalationRule } from '@/hooks/useEscalationRules';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EscalationMatrixPage() {
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<EscalationRule | undefined>(undefined);

  // Queries and mutations
  const { data: rules = [], isLoading, error } = useEscalationRules();
  const createMutation = useCreateEscalationRule();
  const updateMutation = useUpdateEscalationRule();
  const deleteMutation = useDeleteEscalationRule();

  // Handlers
  const handleCreateRule = (data: EscalationRuleInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      },
    });
  };

  const handleUpdateRule = (data: EscalationRuleInput) => {
    if (selectedRule) {
      updateMutation.mutate(
        { id: selectedRule.id, rule: data },
        {
          onSuccess: () => {
            setIsEditDialogOpen(false);
            setSelectedRule(undefined);
          },
        }
      );
    }
  };

  const handleDeleteRule = () => {
    if (selectedRule) {
      deleteMutation.mutate(selectedRule.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setSelectedRule(undefined);
        },
      });
    }
  };

  const openEditDialog = (rule: EscalationRule) => {
    setSelectedRule(rule);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (rule: EscalationRule) => {
    setSelectedRule(rule);
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
            { label: 'Escalation Matrix' },
          ]}
        />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Escalation Matrix</h1>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add New Rule
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading escalation rules...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          Error loading escalation rules: {error.message}
        </div>
      ) : rules.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No escalation rules found.</p>
          <p className="text-gray-500 mt-1">
            Click the &quot;Add New Rule&quot; button to create your first escalation rule.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {rules.map((rule) => (
            <EscalationRuleCard
              key={rule.id}
              rule={rule}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
            />
          ))}
        </div>
      )}

      {/* Create Rule Dialog */}
      <EscalationRuleDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateRule}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Rule Dialog */}
      <EscalationRuleDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedRule(undefined);
        }}
        onSubmit={handleUpdateRule}
        initialData={selectedRule}
        isSubmitting={updateMutation.isPending}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedRule(undefined);
        }}
        onConfirm={handleDeleteRule}
        title="Delete Escalation Rule"
        description={`Are you sure you want to delete the escalation rule "${selectedRule?.name}"? This action cannot be undone.`}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
