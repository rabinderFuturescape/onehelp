import React from 'react';
import { colors } from '@/theme';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  className?: string;
}

// Helper function to combine class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  className,
}) => {
  // Variant styles
  const variantStyles = {
    primary: `bg-[${colors.primary[50]}] text-[${colors.primary[700]}]`,
    secondary: `bg-[${colors.brand.secondary}] bg-opacity-20 text-[#c08000]`,
    success: 'bg-green-100 text-green-800',
    danger: `bg-[${colors.primary[100]}] text-[${colors.primary[700]}]`,
    warning: `bg-[${colors.status.high}] text-amber-800`,
    info: `bg-[${colors.brand.blue}] bg-opacity-20 text-[${colors.brand.blue}]`,
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm',
  };

  // Rounded style
  const roundedStyle = rounded ? 'rounded-full' : 'rounded';

  return (
    <span
      className={classNames(
        'inline-flex items-center font-medium',
        variantStyles[variant],
        sizeStyles[size],
        roundedStyle,
        className || ''
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
