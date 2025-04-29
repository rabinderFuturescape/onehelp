import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { EscalationRuleForm } from './EscalationRuleForm';
import { EscalationRule, EscalationRuleInput } from '@/types/escalation';

interface EscalationRuleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EscalationRuleInput) => void;
  initialData?: EscalationRule;
  isSubmitting: boolean;
}

export const EscalationRuleDialog: React.FC<EscalationRuleDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="sm:max-w-2xl" onClose={onClose}>
        <DialogTitle>
          {initialData ? 'Edit Escalation Rule' : 'Create Escalation Rule'}
        </DialogTitle>
        <div className="mt-4">
          <EscalationRuleForm
            initialData={initialData}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
