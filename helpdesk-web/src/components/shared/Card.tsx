import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: boolean;
}

// Helper function to combine class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * A standardized card component that provides consistent styling
 * for content containers throughout the application.
 */
const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  padding = 'md',
  shadow = 'md',
  border = true,
  rounded = 'lg',
  hoverEffect = false,
}) => {
  // Padding styles
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  // Shadow styles
  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };

  // Border radius styles
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  // Border style
  const borderStyle = border ? 'border border-gray-200' : '';

  // Hover effect
  const hoverStyle = hoverEffect ? 'transition-shadow hover:shadow-lg' : '';

  const hasHeader = title || subtitle;
  const hasFooter = !!footer;

  return (
    <div
      className={classNames(
        'bg-white overflow-hidden',
        shadowStyles[shadow],
        roundedStyles[rounded],
        borderStyle,
        hoverStyle,
        className || ''
      )}
    >
      {hasHeader && (
        <div className={`px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 ${headerClassName}`}>
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      <div className={classNames(
        !hasHeader && !hasFooter ? paddingStyles[padding] : 'p-6',
        bodyClassName
      )}>
        {children}
      </div>

      {hasFooter && (
        <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
