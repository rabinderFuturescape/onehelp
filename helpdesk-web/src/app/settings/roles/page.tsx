'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { DataTable, Column } from '@/components/shared/DataTable';
import { FilterPanel, FilterOption } from '@/components/shared/FilterPanel';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RoleDialog } from '@/components/roles/RoleDialog';
import { RoleInput, Role } from '@/types/roles';

// Mock roles data
const mockRoles = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full access to all features',
    permissions: ['create', 'read', 'update', 'delete'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Can manage tickets and agents',
    permissions: ['create', 'read', 'update'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Agent',
    description: 'Can handle tickets',
    permissions: ['read', 'update'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'User',
    description: 'Limited access to create tickets',
    permissions: ['create', 'read'],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

interface RoleFilters {
  name?: string;
  permission?: string;
}

export default function RolesPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router, user]);

  // State for filters
  const [filters, setFilters] = useState<RoleFilters>({});
  const [filteredRoles, setFilteredRoles] = useState(mockRoles);

  // State for dialogs
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter options
  const filterOptions: FilterOption[] = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter role name',
    },
    {
      id: 'permission',
      name: 'permission',
      type: 'select',
      label: 'Permission',
      options: [
        { value: '', label: 'All Permissions' },
        { value: 'create', label: 'Create' },
        { value: 'read', label: 'Read' },
        { value: 'update', label: 'Update' },
        { value: 'delete', label: 'Delete' },
      ],
    },
  ];

  // Table columns
  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (role) => role.name,
    },
    {
      key: 'description',
      header: 'Description',
      render: (role) => role.description,
    },
    {
      key: 'permissions',
      header: 'Permissions',
      render: (role) => (
        <div className="flex flex-wrap gap-1">
          {role.permissions.map((permission: string) => (
            <span
              key={permission}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {permission.charAt(0).toUpperCase() + permission.slice(1)}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (role) => {
        const date = new Date(role.createdAt);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
    },
  ];

  // Handlers
  const handleFilterChange = (newFilters: RoleFilters) => {
    setFilters(newFilters);

    // Apply filters
    let filtered = [...mockRoles];

    if (newFilters.name) {
      filtered = filtered.filter((role) =>
        role.name.toLowerCase().includes(newFilters.name!.toLowerCase())
      );
    }

    if (newFilters.permission) {
      filtered = filtered.filter((role) =>
        role.permissions.includes(newFilters.permission!)
      );
    }

    setFilteredRoles(filtered);
  };

  const handleCreateRole = () => {
    setSelectedRole(null);
    setIsRoleDialogOpen(true);
  };

  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setIsRoleDialogOpen(true);
  };

  const handleSubmitRole = (data: RoleInput) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (selectedRole) {
        // Update existing role
        setFilteredRoles(
          filteredRoles.map((r) => (r.id === selectedRole.id ? { ...r, ...data } : r))
        );
      } else {
        // Create new role
        const newRole = {
          id: Math.random().toString(36).substring(2, 9),
          ...data,
          createdAt: new Date().toISOString(),
        };
        setFilteredRoles([newRole, ...filteredRoles]);
      }

      setIsRoleDialogOpen(false);
      setSelectedRole(null);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleViewRole = (role: any) => {
    // In a real app, this would navigate to a role detail page
    alert(`View role: ${role.name}`);
  };

  const handleDeleteRoleClick = (role: any) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteRole = () => {
    setIsDeleting(true);

    // Simulate API call
    setTimeout(() => {
      setFilteredRoles(filteredRoles.filter((r) => r.id !== selectedRole?.id));
      setIsDeleteDialogOpen(false);
      setSelectedRole(null);
      setIsDeleting(false);
    }, 1000);
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Settings', href: '/settings' },
            { label: 'Roles' },
          ]}
        />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Roles</h1>
          <Button
            onClick={handleCreateRole}
            className="flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            New Role
          </Button>
        </div>
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
        title="Role Filters"
      />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <DataTable
          items={filteredRoles}
          columns={columns}
          onView={handleViewRole}
          onEdit={handleEditRole}
          onDelete={handleDeleteRoleClick}
          keyExtractor={(role) => role.id}
        />
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteRole}
        title="Delete Role"
        description={`Are you sure you want to delete the role "${selectedRole?.name}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />

      <RoleDialog
        isOpen={isRoleDialogOpen}
        onClose={() => setIsRoleDialogOpen(false)}
        onSubmit={handleSubmitRole}
        initialData={selectedRole}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
