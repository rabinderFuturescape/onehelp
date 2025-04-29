import React, { InputHTMLAttributes, forwardRef } from 'react';
import { classNames } from '@/utils/classNames';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerClassName?: string;
}

/**
 * A standardized input component that provides consistent styling
 * for all inputs in the application.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      label,
      helperText,
      fullWidth = false,
      startIcon,
      endIcon,
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
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            className={classNames(
              'block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
              hasError
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                : '',
              startIcon ? 'pl-10' : '',
              endIcon ? 'pr-10' : '',
              fullWidth ? 'w-full' : '',
              className || ''
            )}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${props.id}-error` : undefined}
            {...props}
          />
          {endIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {endIcon}
            </div>
          )}
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

Input.displayName = 'Input';
