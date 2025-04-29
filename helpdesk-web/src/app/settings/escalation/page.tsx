'use client';

import React, { useState, Fragment } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { EscalationRuleCard } from '@/components/escalation/EscalationRuleCard';
import { EscalationRuleDialog } from '@/components/escalation/EscalationRuleDialog';
import { EscalationMatrixForm } from '@/components/escalation/EscalationMatrixForm';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import {
  EscalationRule,
  EscalationRuleInput,
  EscalationMatrix,
  EscalationMatrixInput
} from '@/types/escalation';
import { useEscalationRules, useCreateEscalationRule, useUpdateEscalationRule, useDeleteEscalationRule } from '@/hooks/useEscalationRules';
import { PlusIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Mock data for escalation matrices
const mockMatrices: EscalationMatrix[] = [
  {
    id: '1',
    name: 'Default Escalation Matrix',
    description: 'Default escalation rules for all help topics',
    helpTopicId: null,
    isActive: true,
    rules: [
      {
        id: '1',
        name: 'Initial Escalation',
        description: 'Escalate after 24 hours of inactivity',
        level: '1',
        type: 'time',
        condition: '24 hours',
        action: 'notify',
        assignToRoleId: null,
        notifyRoleIds: ['2'],
        isActive: true,
      },
      {
        id: '2',
        name: 'Second Level Escalation',
        description: 'Escalate to manager after 48 hours',
        level: '2',
        type: 'time',
        condition: '48 hours',
        action: 'reassign',
        assignToRoleId: '3',
        notifyRoleIds: ['3'],
        isActive: true,
      },
    ],
  },
];

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
  const [isCreateRuleDialogOpen, setIsCreateRuleDialogOpen] = useState(false);
  const [isEditRuleDialogOpen, setIsEditRuleDialogOpen] = useState(false);
  const [isDeleteRuleDialogOpen, setIsDeleteRuleDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<EscalationRule | undefined>(undefined);

  // State for matrix dialogs
  const [isMatrixDialogOpen, setIsMatrixDialogOpen] = useState(false);
  const [selectedMatrix, setSelectedMatrix] = useState<EscalationMatrix | undefined>(undefined);
  const [isMatrixSubmitting, setIsMatrixSubmitting] = useState(false);

  // Queries and mutations
  const { data: rules = [], isLoading, error } = useEscalationRules();
  const createMutation = useCreateEscalationRule();
  const updateMutation = useUpdateEscalationRule();
  const deleteMutation = useDeleteEscalationRule();

  // Handlers for rules
  const handleCreateRule = (data: EscalationRuleInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateRuleDialogOpen(false);
      },
    });
  };

  const handleUpdateRule = (data: EscalationRuleInput) => {
    if (selectedRule) {
      updateMutation.mutate(
        { id: selectedRule.id, rule: data },
        {
          onSuccess: () => {
            setIsEditRuleDialogOpen(false);
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
          setIsDeleteRuleDialogOpen(false);
          setSelectedRule(undefined);
        },
      });
    }
  };

  // Handlers for matrices
  const handleCreateMatrix = (data: EscalationMatrixInput) => {
    setIsMatrixSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Creating matrix:', data);
      setIsMatrixDialogOpen(false);
      setIsMatrixSubmitting(false);
      // In a real app, this would be a mutation
    }, 1000);
  };

  const handleUpdateMatrix = (data: EscalationMatrixInput) => {
    setIsMatrixSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Updating matrix:', data);
      setIsMatrixDialogOpen(false);
      setSelectedMatrix(undefined);
      setIsMatrixSubmitting(false);
      // In a real app, this would be a mutation
    }, 1000);
  };

  const openEditRuleDialog = (rule: EscalationRule) => {
    setSelectedRule(rule);
    setIsEditRuleDialogOpen(true);
  };

  const openDeleteRuleDialog = (rule: EscalationRule) => {
    setSelectedRule(rule);
    setIsDeleteRuleDialogOpen(true);
  };

  const openMatrixDialog = (matrix?: EscalationMatrix) => {
    setSelectedMatrix(matrix);
    setIsMatrixDialogOpen(true);
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
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => openMatrixDialog()}
              className="flex items-center"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-1" />
              Configure Matrix
            </Button>
            <Button
              onClick={() => setIsCreateRuleDialogOpen(true)}
              className="flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add New Rule
            </Button>
          </div>
        </div>
      </div>

      {/* Matrices Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Escalation Matrices</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {mockMatrices.map((matrix) => (
              <div key={matrix.id} className="p-4 sm:p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{matrix.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{matrix.description}</p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      matrix.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {matrix.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {matrix.rules.length} rules
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => openMatrixDialog(matrix)}
                >
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rules Section */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Escalation Rules</h2>
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
                onEdit={openEditRuleDialog}
                onDelete={openDeleteRuleDialog}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Rule Dialog */}
      <EscalationRuleDialog
        isOpen={isCreateRuleDialogOpen}
        onClose={() => setIsCreateRuleDialogOpen(false)}
        onSubmit={handleCreateRule}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Rule Dialog */}
      <EscalationRuleDialog
        isOpen={isEditRuleDialogOpen}
        onClose={() => {
          setIsEditRuleDialogOpen(false);
          setSelectedRule(undefined);
        }}
        onSubmit={handleUpdateRule}
        initialData={selectedRule}
        isSubmitting={updateMutation.isPending}
      />

      {/* Delete Rule Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteRuleDialogOpen}
        onClose={() => {
          setIsDeleteRuleDialogOpen(false);
          setSelectedRule(undefined);
        }}
        onConfirm={handleDeleteRule}
        title="Delete Escalation Rule"
        description={`Are you sure you want to delete the escalation rule "${selectedRule?.name}"? This action cannot be undone.`}
        isDeleting={deleteMutation.isPending}
      />

      {/* Escalation Matrix Dialog */}
      {isMatrixDialogOpen && (
        <Transition appear show={isMatrixDialogOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => {
            setIsMatrixDialogOpen(false);
            setSelectedMatrix(undefined);
          }}>
            <DialogContent className="sm:max-w-4xl" onClose={() => {
              setIsMatrixDialogOpen(false);
              setSelectedMatrix(undefined);
            }}>
              <DialogTitle>
                {selectedMatrix ? 'Edit Escalation Matrix' : 'Create Escalation Matrix'}
              </DialogTitle>
              <EscalationMatrixForm
                initialData={selectedMatrix}
                onSubmit={selectedMatrix ? handleUpdateMatrix : handleCreateMatrix}
                isSubmitting={isMatrixSubmitting}
              />
            </DialogContent>
          </Dialog>
        </Transition>
      )}
    </div>
  );
}
