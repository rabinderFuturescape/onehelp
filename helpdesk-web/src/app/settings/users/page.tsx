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
import { UserDialog } from '@/components/users/UserDialog';
import { UserInput, User } from '@/types/users';

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Support Agent',
    email: 'agent@example.com',
    role: 'agent',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Manager',
    email: 'manager@example.com',
    role: 'manager',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Inactive User',
    email: 'inactive@example.com',
    role: 'agent',
    status: 'inactive',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock roles
const mockRoles = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'agent', label: 'Agent' },
  { value: 'user', label: 'User' },
];

interface UserFilters {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

export default function UsersPage() {
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
  const [filters, setFilters] = useState<UserFilters>({});
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  // State for dialogs
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter options
  const filterOptions: FilterOption[] = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter name',
    },
    {
      id: 'email',
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'Enter email',
    },
    {
      id: 'role',
      name: 'role',
      type: 'select',
      label: 'Role',
      options: [
        { value: '', label: 'All Roles' },
        ...mockRoles,
      ],
    },
    {
      id: 'status',
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { value: '', label: 'All Statuses' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    },
  ];

  // Table columns
  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (user) => user.name,
    },
    {
      key: 'email',
      header: 'Email',
      render: (user) => user.email,
    },
    {
      key: 'role',
      header: 'Role',
      render: (user) => {
        const role = mockRoles.find((r) => r.value === user.role);
        return role ? role.label : user.role;
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (user) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {user.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (user) => {
        const date = new Date(user.createdAt);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
    },
  ];

  // Handlers
  const handleFilterChange = (newFilters: UserFilters) => {
    setFilters(newFilters);

    // Apply filters
    let filtered = [...mockUsers];

    if (newFilters.name) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(newFilters.name!.toLowerCase())
      );
    }

    if (newFilters.email) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(newFilters.email!.toLowerCase())
      );
    }

    if (newFilters.role) {
      filtered = filtered.filter((user) => user.role === newFilters.role);
    }

    if (newFilters.status) {
      filtered = filtered.filter((user) => user.status === newFilters.status);
    }

    setFilteredUsers(filtered);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsUserDialogOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  const handleSubmitUser = (data: UserInput) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (selectedUser) {
        // Update existing user
        setFilteredUsers(
          filteredUsers.map((u) => (u.id === selectedUser.id ? { ...u, ...data } : u))
        );
      } else {
        // Create new user
        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          ...data,
          createdAt: new Date().toISOString(),
        };
        setFilteredUsers([newUser, ...filteredUsers]);
      }

      setIsUserDialogOpen(false);
      setSelectedUser(null);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleViewUser = (user: any) => {
    // In a real app, this would navigate to a user detail page
    alert(`View user: ${user.name}`);
  };

  const handleDeleteUserClick = (user: any) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = () => {
    setIsDeleting(true);

    // Simulate API call
    setTimeout(() => {
      setFilteredUsers(filteredUsers.filter((u) => u.id !== selectedUser?.id));
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
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
            { label: 'Users' },
          ]}
        />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <Button
            onClick={handleCreateUser}
            className="flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            New User
          </Button>
        </div>
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
        title="User Filters"
      />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <DataTable
          items={filteredUsers}
          columns={columns}
          onView={handleViewUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUserClick}
          keyExtractor={(user) => user.id}
        />
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteUser}
        title="Delete User"
        description={`Are you sure you want to delete the user "${selectedUser?.name}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />

      <UserDialog
        isOpen={isUserDialogOpen}
        onClose={() => setIsUserDialogOpen(false)}
        onSubmit={handleSubmitUser}
        initialData={selectedUser}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
