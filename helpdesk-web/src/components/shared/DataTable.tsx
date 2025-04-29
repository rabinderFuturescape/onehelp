import React from 'react';
import { Button } from '@/components/ui/Button';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

// Generic helper functions
export const getPriorityColor = (priority: string) => {
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

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-blue-100 text-blue-800';
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'resolved':
      return 'bg-green-100 text-green-800';
    case 'closed':
      return 'bg-gray-100 text-gray-800';
    case 'reopened':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'in_progress':
      return 'In Progress';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

// Generic table component
export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  items: T[];
  columns: Column<T>[];
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  getRowClassName?: (item: T) => string;
  keyExtractor?: (item: T) => string | number;
  actionButtons?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
  };
}

export function DataTable<T>({
  items,
  columns,
  onView,
  onEdit,
  onDelete,
  getRowClassName = () => '',
  keyExtractor = (_, index) => index,
  actionButtons = { view: true, edit: true, delete: true },
}: DataTableProps<T>) {
  const hasActions = onView || onEdit || onDelete;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300 table-fixed">
        <thead className="bg-gray-50">
          <tr>
            {/* Serial Number Column */}
            <th
              scope="col"
              className="py-3.5 px-3 text-center text-sm font-semibold text-gray-900 w-16"
            >
              S.No
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`py-3.5 px-3 text-left text-sm font-semibold text-gray-900 ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
            {hasActions && (
              <th
                scope="col"
                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
              >
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.map((item, index) => {
            const key = typeof keyExtractor === 'function'
              ? keyExtractor(item, index)
              : index;

            // Alternating row background and hover styles
            const isEven = index % 2 === 0;
            const baseRowClass = isEven ? 'bg-white' : 'bg-gray-50';

            return (
              <tr
                key={key}
                className={`${baseRowClass} ${getRowClassName(item)} transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:shadow-md`}
              >
                {/* Serial Number Cell */}
                <td className="px-3 py-4 text-center text-sm font-medium text-gray-500 w-16">
                  <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${
                    isEven ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {index + 1}
                  </span>
                </td>
                {columns.map((column) => (
                  <td key={`${key}-${column.key}`} className={`px-3 py-4 text-sm ${column.className || ''}`}>
                    {column.render(item)}
                  </td>
                ))}
                {hasActions && (
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex items-center justify-end space-x-2">
                      {actionButtons.view && onView && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(item)}
                          aria-label="View"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </Button>
                      )}
                      {actionButtons.edit && onEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(item)}
                          aria-label="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </Button>
                      )}
                      {actionButtons.delete && onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(item)}
                          aria-label="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
