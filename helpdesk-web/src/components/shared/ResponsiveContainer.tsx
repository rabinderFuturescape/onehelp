import React from 'react';
import { breakpoints } from '@/theme';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  padding?: boolean;
  centered?: boolean;
}

// Helper function to combine class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  maxWidth = 'lg',
  padding = true,
  centered = true,
}) => {
  // Max width styles
  const maxWidthStyles = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
    none: '',
  };

  // Padding style
  const paddingStyle = padding ? 'px-4 sm:px-6 lg:px-8' : '';

  // Centered style
  const centeredStyle = centered ? 'mx-auto' : '';

  return (
    <div
      className={classNames(
        maxWidthStyles[maxWidth],
        paddingStyle,
        centeredStyle,
        'w-full',
        className || ''
      )}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
