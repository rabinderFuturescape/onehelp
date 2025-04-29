import React, { ReactNode } from 'react';

interface FormSectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * A standardized form section component that provides consistent styling
 * for grouping form fields.
 */
export const FormSection: React.FC<FormSectionProps> = ({
  children,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`mb-6 last:mb-0 ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-200">
              {title}
            </h3>
          )}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      )}

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

/**
 * A standardized form field wrapper component that provides consistent styling
 * for form fields.
 */
export const FormField: React.FC<{
  children: ReactNode;
  label?: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  className?: string;
}> = ({
  children,
  label,
  htmlFor,
  error,
  required = false,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {children}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

/**
 * A component for creating a grid layout of form fields.
 */
export const FormGrid: React.FC<{
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({
  children,
  columns = 2,
  gap = 'md',
  className = '',
}) => {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

export default FormSection;
