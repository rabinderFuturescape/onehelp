'use client';

import React, { useState } from 'react';
import { classNames } from '@/utils/classNames';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  id,
}) => {
  const toggleSwitch = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={classNames('flex items-center', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        id={id}
        disabled={disabled}
        onClick={toggleSwitch}
        className={classNames(
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          checked ? 'bg-blue-600' : 'bg-gray-200',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        )}
      >
        <span
          className={classNames(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
      {label && (
        <span
          className={classNames(
            'ml-3 text-sm',
            disabled ? 'text-gray-400' : 'text-gray-900'
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};
