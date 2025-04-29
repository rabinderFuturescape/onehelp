import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { CannedResponse } from '@/types/canned-responses';
import { Button } from '@/components/ui/Button';

interface CannedResponseViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  response?: CannedResponse;
}

export const CannedResponseViewDialog: React.FC<CannedResponseViewDialogProps> = ({
  isOpen,
  onClose,
  response,
}) => {
  if (!response) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <DialogContent
          className="w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl resize-both overflow-auto"
          style={{
            minWidth: '300px',
            minHeight: '300px',
            maxHeight: '90vh',
            resize: 'both'
          }}
          onClose={onClose}>
          <DialogTitle>{response.title}</DialogTitle>
          <div className="mt-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                response.status
              )}`}
            >
              {response.status.charAt(0).toUpperCase() + response.status.slice(1)}
            </span>
          </div>
          <div className="mt-4 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Email Response</h4>
              <div
                className="mt-2 prose prose-sm max-w-none text-gray-900 border border-gray-200 rounded-md p-4 bg-gray-50"
                dangerouslySetInnerHTML={{ __html: response.emailResponse }}
              />
            </div>

            {response.smsResponse && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">SMS Response</h4>
                <div className="mt-2 text-sm text-gray-900 border border-gray-200 rounded-md p-4 bg-gray-50 whitespace-pre-wrap">
                  {response.smsResponse}
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-end">
                <Button onClick={onClose}>Close</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Transition>
  );
};
