import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { HelpTopicForm } from './HelpTopicForm';
import { HelpTopic, HelpTopicInput } from '@/types/help-topics';

interface HelpTopicDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: HelpTopicInput) => void;
  initialData?: HelpTopic;
  isSubmitting: boolean;
}

export const HelpTopicDialog: React.FC<HelpTopicDialogProps> = ({
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
            {initialData ? 'Edit Help Topic' : 'Create Help Topic'}
          </DialogTitle>
          <div className="mt-4">
            <HelpTopicForm
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
