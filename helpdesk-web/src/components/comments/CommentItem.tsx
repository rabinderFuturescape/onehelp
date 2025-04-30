import React from 'react';
import { Comment } from '@/types/comments';
import { PaperClipIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';

interface CommentItemProps {
  comment: Comment;
  onEdit?: (comment: Comment) => void;
  onDelete?: (comment: Comment) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onEdit,
  onDelete,
}) => {
  const { user } = useAuthStore();
  const isAuthor = user?.id === comment.userId;
  const isAdmin = user?.role === 'admin';
  const canEdit = isAuthor || isAdmin;
  const canDelete = isAuthor || isAdmin;
  
  // Format the date
  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
  
  return (
    <div 
      className={`p-4 mb-4 rounded-lg ${
        comment.isInternal 
          ? 'bg-amber-50 border border-amber-200' 
          : 'bg-white border border-gray-200'
      }`}
    >
      {comment.isInternal && (
        <div className="mb-2 text-amber-600 text-xs font-medium">
          Internal Note (Only visible to staff)
        </div>
      )}
      
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <img
            className="h-10 w-10 rounded-full"
            src={comment.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}`}
            alt={comment.user.name}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {comment.user.name}
                {comment.user.role && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800">
                    {comment.user.role}
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
            
            {(canEdit || canDelete) && (
              <div className="flex space-x-2">
                {canEdit && onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(comment)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                )}
                
                {canDelete && onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(comment)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
          
          <div 
            className="mt-2 text-sm text-gray-700 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />
          
          {comment.attachments && comment.attachments.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-medium text-gray-500">Attachments</h4>
              <ul className="mt-1 border border-gray-200 rounded-md divide-y divide-gray-200">
                {comment.attachments.map((attachment) => (
                  <li
                    key={attachment.id}
                    className="pl-3 pr-4 py-2 flex items-center justify-between text-sm"
                  >
                    <div className="w-0 flex-1 flex items-center">
                      <PaperClipIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 flex-1 w-0 truncate">
                        {attachment.fileName}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {attachment.url && (
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
