import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { ComplaintForm } from './ComplaintForm';
import { Complaint, ComplaintInput } from '@/types/complaints';

interface ComplaintDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ComplaintInput) => void;
  initialData?: Complaint;
  isSubmitting: boolean;
}

export const ComplaintDialog: React.FC<ComplaintDialogProps> = ({
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
          className="sm:max-w-4xl p-0"
          style={{
            margin: '24px'
          }}
          onClose={onClose}>
          <DialogTitle>
            {initialData ? 'Edit Complaint' : 'Create Complaint'}
          </DialogTitle>
          <div className="mt-4">
            <ComplaintForm
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
