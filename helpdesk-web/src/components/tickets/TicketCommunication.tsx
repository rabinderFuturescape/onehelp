'use client';

import React from 'react';
import { ExclamationTriangleIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

interface CommunicationItem {
  id: string;
  type: 'system' | 'user' | 'agent';
  content: string;
  date: Date;
  isOverdue?: boolean;
  author?: {
    name: string;
    role?: string;
  };
}

interface TicketCommunicationProps {
  items: CommunicationItem[];
}

export const TicketCommunication: React.FC<TicketCommunicationProps> = ({ items }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        Communication <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{items.length}</span>
      </h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 rounded-md p-4"
          >
            {item.type === 'system' ? (
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  {item.isOverdue ? (
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <ChatBubbleLeftIcon className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${item.isOverdue ? 'text-red-600' : 'text-blue-600'}`}>
                      {item.isOverdue ? 'Issue marked as Overdue' : 'Issue Raised'}
                    </p>
                    <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{item.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {item.author?.name.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {item.author?.name || 'Unknown'}
                      {item.author?.role && (
                        <span className="ml-2 text-xs text-gray-500">({item.author.role})</span>
                      )}
                    </p>
                    <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{item.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
