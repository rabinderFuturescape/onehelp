import React, { Fragment } from 'react';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { ImprovedTicketForm } from './ImprovedTicketForm';
import { Ticket, TicketInput } from '@/types/tickets';

interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TicketInput) => void;
  initialData?: Ticket;
  isSubmitting: boolean;
}

export const TicketDialog: React.FC<TicketDialogProps> = ({
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
          className="w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl resize-both overflow-hidden p-0"
          style={{
            minWidth: '320px',
            minHeight: '300px',
            maxHeight: '90vh',
            resize: 'both',
            margin: '24px'
          }}
          onClose={onClose}>
          <ImprovedTicketForm
            initialData={initialData}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>
    </Transition>
  );
};
