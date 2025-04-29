import React, { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils/classNames';

interface FormContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  onClose?: () => void;
  hideCloseButton?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerContent?: ReactNode;
}

/**
 * A standardized form container component that provides consistent styling
 * for all form containers in the application.
 */
const FormContainer: React.FC<FormContainerProps> = ({
  children,
  title,
  subtitle,
  onClose,
  hideCloseButton = false,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerContent
}) => {
  return (
    <div className={classNames("bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm my-6 mx-auto", className)}>
      {/* Header with title and close button */}
      <div className={classNames(
        "flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white sticky top-0 z-10",
        headerClassName
      )}>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {onClose && !hideCloseButton && (
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Form content with proper padding */}
      <div className={classNames("p-6 sm:p-8", bodyClassName)}>
        {children}
      </div>

      {/* Optional footer */}
      {footerContent && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 sticky bottom-0">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default FormContainer;
