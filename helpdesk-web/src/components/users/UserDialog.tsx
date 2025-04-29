import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { UserForm } from './UserForm';
import { User, UserInput } from '@/types/users';

interface UserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserInput) => void;
  initialData?: User;
  isSubmitting: boolean;
}

export const UserDialog: React.FC<UserDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <DialogContent
          className="w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-0"
          style={{
            margin: '24px'
          }}
          onClose={onClose}>
          <DialogTitle>
            {initialData ? 'Edit User' : 'Create User'}
          </DialogTitle>
          <div className="mt-4">
            <UserForm
              initialData={initialData}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Transition>
  );
};
