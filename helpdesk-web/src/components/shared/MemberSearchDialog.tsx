'use client';

import React, { Fragment, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Form';
import { Member } from '@/types/complaints';
import { useSearchMembers } from '@/hooks/useComplaints';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { DataTable, Column } from './DataTable';

interface MemberSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMember: (member: Member) => void;
}

export const MemberSearchDialog: React.FC<MemberSearchDialogProps> = ({
  isOpen,
  onClose,
  onSelectMember,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: members, isLoading } = useSearchMembers(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already triggered by the useSearchMembers hook
  };

  const handleSelectMember = (member: Member) => {
    onSelectMember(member);
    onClose();
  };

  const columns: Column<Member>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (member) => (
        <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {member.name}
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (member) => <span>{member.email || '-'}</span>,
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (member) => <span>{member.phone || '-'}</span>,
    },
    {
      key: 'unitNumber',
      header: 'Unit',
      render: (member) => <span>{member.unitNumber || '-'}</span>,
    },
    {
      key: 'actions',
      header: '',
      render: (member) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSelectMember(member)}
        >
          Select
        </Button>
      ),
    },
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" open={isOpen} onClose={onClose}>
        <DialogContent className="sm:max-w-2xl" onClose={onClose}>
          <DialogTitle>Search Member or Unit</DialogTitle>
          <div className="mt-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex space-x-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, phone, or unit number..."
                  className="flex-1"
                />
                <Button type="submit" disabled={searchQuery.length < 3}>
                  <MagnifyingGlassIcon className="h-5 w-5 mr-1" />
                  Search
                </Button>
              </div>
            </form>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-500">Searching members...</p>
              </div>
            ) : members && members.length > 0 ? (
              <div className="overflow-y-auto max-h-96">
                <DataTable
                  items={members}
                  columns={columns}
                  keyExtractor={(member) => member.id}
                  actionButtons={{ view: false, edit: false, delete: false }}
                />
              </div>
            ) : searchQuery.length >= 3 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500">No members found matching your search.</p>
                <p className="text-gray-500 mt-1">
                  Try a different search term or contact support to add a new member.
                </p>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500">Enter at least 3 characters to search.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Transition>
  );
};
