import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { classNames } from '@/utils/classNames';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  containerClassName?: string;
}

/**
 * A standardized textarea component that provides consistent styling
 * for all textareas in the application.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      error,
      label,
      helperText,
      fullWidth = false,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <div className={classNames(fullWidth ? 'w-full' : '', containerClassName || '')}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          <textarea
            ref={ref}
            className={classNames(
              'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
              hasError
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                : '',
              fullWidth ? 'w-full' : '',
              className || ''
            )}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${props.id}-error` : undefined}
            {...props}
          />
        </div>
        {(helperText || error) && (
          <p
            className={classNames(
              'mt-1 text-sm',
              hasError ? 'text-red-600' : 'text-gray-500'
            )}
            id={hasError ? `${props.id}-error` : undefined}
          >
            {hasError ? error : helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
