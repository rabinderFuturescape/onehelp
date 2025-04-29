import React from 'react';
import { HelpTopic } from '@/types/help-topics';
import { Button } from '@/components/ui/Button';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

interface HelpTopicCardProps {
  topic: HelpTopic;
  onView: (topic: HelpTopic) => void;
  onEdit: (topic: HelpTopic) => void;
  onDelete: (topic: HelpTopic) => void;
}

export const HelpTopicCard: React.FC<HelpTopicCardProps> = ({
  topic,
  onView,
  onEdit,
  onDelete,
}) => {
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
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-medium text-gray-900">{topic.name}</h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                topic.priority
              )}`}
            >
              {topic.priority.charAt(0).toUpperCase() + topic.priority.slice(1)}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                topic.status
              )}`}
            >
              {topic.status.charAt(0).toUpperCase() + topic.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onView(topic)}
              aria-label="View topic"
            >
              <EyeIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(topic)}
              aria-label="Edit topic"
            >
              <PencilIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(topic)}
              aria-label="Delete topic"
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          {topic.parent && (
            <p>
              <span className="font-medium">Parent:</span> {topic.parent.name}
            </p>
          )}
          {topic.autoAssignRole && (
            <p>
              <span className="font-medium">Auto-Assign:</span> {topic.autoAssignRole.name}
            </p>
          )}
          <p>
            <span className="font-medium">Due Hours:</span> {topic.dueHours}
          </p>
          <p>
            <span className="font-medium">Visibility:</span>{' '}
            {topic.visibility.charAt(0).toUpperCase() + topic.visibility.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};
