import React, { ReactNode } from 'react';
import { classNames } from '@/utils/classNames';

interface FormFieldProps {
  children: ReactNode;
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

/**
 * A standardized form field wrapper component that provides consistent styling
 * for form fields.
 */
const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  htmlFor,
  required = false,
  error,
  helperText,
  className = ''
}) => {
  const hasError = !!error;

  return (
    <div className={classNames('mb-6', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-1">
        {children}
      </div>
      {(error || helperText) && (
        <p
          className={classNames(
            'mt-2 text-sm',
            hasError ? 'text-red-600' : 'text-gray-500'
          )}
        >
          {hasError ? error : helperText}
        </p>
      )}
    </div>
  );
};

export default FormField;
