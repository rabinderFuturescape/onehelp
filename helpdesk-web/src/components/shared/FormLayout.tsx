import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface FormLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  footerContent?: ReactNode;
}

/**
 * A standardized form layout component that provides consistent styling
 * for all forms in the application.
 */
export const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  subtitle,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  footerContent,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm my-6 mx-auto">
      {(title || subtitle) && (
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 sticky top-0 z-10">
          {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="p-6 sm:p-8">
          {children}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3 sticky bottom-0">
          {footerContent}

          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </Button>
          )}

          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};
