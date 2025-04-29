import React from 'react';
import { CannedResponse } from '@/types/canned-responses';
import { Button } from '@/components/ui/Button';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

interface CannedResponseCardProps {
  response: CannedResponse;
  onView: (response: CannedResponse) => void;
  onEdit: (response: CannedResponse) => void;
  onDelete: (response: CannedResponse) => void;
}

export const CannedResponseCard: React.FC<CannedResponseCardProps> = ({
  response,
  onView,
  onEdit,
  onDelete,
}) => {
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

  // Function to strip HTML tags for preview
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  // Get a preview of the email response (first 100 characters)
  const emailPreview = response.emailResponse
    ? stripHtml(response.emailResponse).substring(0, 100) + (stripHtml(response.emailResponse).length > 100 ? '...' : '')
    : 'No email response';

  // Get a preview of the SMS response (first 100 characters)
  const smsPreview = response.smsResponse
    ? response.smsResponse.substring(0, 100) + (response.smsResponse.length > 100 ? '...' : '')
    : 'No SMS response';

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-medium text-gray-900">{response.title}</h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                response.status
              )}`}
            >
              {response.status.charAt(0).toUpperCase() + response.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onView(response)}
              aria-label="View response"
            >
              <EyeIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(response)}
              aria-label="Edit response"
            >
              <PencilIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(response)}
              aria-label="Delete response"
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Email Response</h4>
            <p className="mt-1 text-sm text-gray-900">{emailPreview}</p>
          </div>
          {response.smsResponse && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">SMS Response</h4>
              <p className="mt-1 text-sm text-gray-900">{smsPreview}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
