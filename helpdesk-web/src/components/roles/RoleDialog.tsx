import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { RoleForm } from './RoleForm';
import { Role, RoleInput } from '@/types/roles';

interface RoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RoleInput) => void;
  initialData?: Role;
  isSubmitting: boolean;
}

export const RoleDialog: React.FC<RoleDialogProps> = ({
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
            {initialData ? 'Edit Role' : 'Create Role'}
          </DialogTitle>
          <div className="mt-4">
            <RoleForm
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
