import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { CannedResponseForm } from './CannedResponseForm';
import { CannedResponse, CannedResponseInput } from '@/types/canned-responses';

interface CannedResponseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CannedResponseInput) => void;
  initialData?: CannedResponse;
  isSubmitting: boolean;
}

export const CannedResponseDialog: React.FC<CannedResponseDialogProps> = ({
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
          className="w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl resize-both overflow-auto p-0"
          style={{
            minWidth: '320px',
            minHeight: '300px',
            maxHeight: '90vh',
            resize: 'both',
            margin: '24px'
          }}
          onClose={onClose}>
          <DialogTitle>
            {initialData ? 'Edit Canned Response' : 'Create Canned Response'}
          </DialogTitle>
          <div className="mt-4">
            <CannedResponseForm
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
