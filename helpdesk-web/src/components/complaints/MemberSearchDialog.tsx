import React, { Fragment, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Form';
import { Member } from '@/types/complaints';
import { useSearchMembers } from '@/hooks/useComplaints';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Unit
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Select</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {members.map((member) => (
                      <tr key={member.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {member.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {member.email || '-'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {member.phone || '-'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {member.unitNumber || '-'}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSelectMember(member)}
                          >
                            Select
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
