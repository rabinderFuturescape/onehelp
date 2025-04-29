import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Transition } from '@headlessui/react';
import { HelpTopic } from '@/types/help-topics';
import { Button } from '@/components/ui/Button';

interface HelpTopicViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  topic?: HelpTopic;
}

export const HelpTopicViewDialog: React.FC<HelpTopicViewDialogProps> = ({
  isOpen,
  onClose,
  topic,
}) => {
  if (!topic) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
          <DialogTitle>{topic.name}</DialogTitle>
          <div className="mt-4 space-y-6">
            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                  topic.priority
                )}`}
              >
                {topic.priority.charAt(0).toUpperCase() + topic.priority.slice(1)} Priority
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  topic.status
                )}`}
              >
                {topic.status.charAt(0).toUpperCase() + topic.status.slice(1)}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Parent Topic</dt>
                  <dd className="mt-1 text-sm text-gray-900">{topic.parent?.name || 'None'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Auto-Assign Role</dt>
                  <dd className="mt-1 text-sm text-gray-900">{topic.autoAssignRole?.name || 'None'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Due Hours</dt>
                  <dd className="mt-1 text-sm text-gray-900">{topic.dueHours}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Visibility</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {topic.visibility.charAt(0).toUpperCase() + topic.visibility.slice(1)}
                  </dd>
                </div>
              </dl>
            </div>

            {topic.description && (
              <div className="border-t border-gray-200 pt-4">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd
                  className="mt-2 prose prose-sm max-w-none text-gray-900"
                  dangerouslySetInnerHTML={{ __html: topic.description }}
                />
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
