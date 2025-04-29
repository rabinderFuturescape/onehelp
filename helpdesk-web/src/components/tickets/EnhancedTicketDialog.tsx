import React from 'react';
import { Ticket, TicketInput } from '@/types/tickets';
import { DialogWrapper } from '@/components/shared/DialogWrapper';
import { EnhancedTicketForm } from './EnhancedTicketForm';

interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TicketInput) => void;
  initialData?: Ticket;
  isSubmitting: boolean;
}

/**
 * Enhanced ticket dialog component using the new shared components
 * for consistent styling across the application.
 */
export const EnhancedTicketDialog: React.FC<TicketDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}) => {
  return (
    <DialogWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Ticket' : 'Create Ticket'}
      maxWidth="4xl"
    >
      <EnhancedTicketForm
        initialData={initialData}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        onClose={onClose}
      />
    </DialogWrapper>
  );
};
