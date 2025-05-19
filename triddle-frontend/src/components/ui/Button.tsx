import React from 'react';
import { cn } from '../../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      children,
      fullWidth,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
      danger: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
      outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
    };

    const sizes = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg',
    };
    
    return (
      <button
        className={cn(
          'font-medium rounded-lg focus:outline-none transition-colors',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          isLoading && 'opacity-70 cursor-wait',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        <div className="flex items-center justify-center space-x-2">
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {!isLoading && leftIcon && <span>{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span>{rightIcon}</span>}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;