import React from 'react';
import { cn } from '../../utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
  containerClassName?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      containerClassName,
      label,
      error,
      helperText,
      indeterminate = false,
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => checkboxRef.current!, []);

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className={cn('w-full', containerClassName)}>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id={checkboxId}
              ref={checkboxRef}
              type="checkbox"
              className={cn(
                'h-4 w-4 rounded border-gray-300 transition-colors',
                'focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                'text-primary-600 dark:border-gray-600 dark:bg-gray-700',
                'dark:checked:bg-primary-500 dark:checked:border-primary-500',
                error
                  ? 'border-red-300 text-red-600 focus:ring-red-500'
                  : 'border-gray-300 text-primary-600 focus:ring-primary-500',
                className
              )}
              {...props}
            />
          </div>
          {label && (
            <div className="ml-3">
              <label
                htmlFor={checkboxId}
                className={cn(
                  'text-sm',
                  error
                    ? 'text-red-700 dark:text-red-400'
                    : 'text-gray-700 dark:text-gray-300'
                )}
              >
                {label}
              </label>
              {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
              {helperText && !error && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {helperText}
                </p>
              )}
            </div>
          )}
        </div>
        {!label && error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {!label && helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;