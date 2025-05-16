import React from 'react';
import { cn } from '../../utils';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  label?: string;
  error?: string;
  helperText?: string;
  orientation?: 'horizontal' | 'vertical';
  containerClassName?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  error,
  helperText,
  orientation = 'vertical',
  containerClassName,
}) => {
  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <div className="mb-3">
          <span
            className={cn(
              'block text-sm font-medium',
              error
                ? 'text-red-700 dark:text-red-400'
                : 'text-gray-700 dark:text-gray-300'
            )}
          >
            {label}
          </span>
        </div>
      )}
      <div
        className={cn(
          'space-y-2',
          orientation === 'horizontal' && 'flex flex-wrap gap-4 space-y-0'
        )}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={option.disabled}
              className={cn(
                'h-4 w-4 border-gray-300 transition-colors',
                'focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                'text-primary-600 dark:border-gray-600 dark:bg-gray-700',
                'dark:checked:bg-primary-500 dark:checked:border-primary-500',
                error
                  ? 'border-red-300 text-red-600 focus:ring-red-500'
                  : 'border-gray-300 text-primary-600 focus:ring-primary-500',
                option.disabled && 'opacity-50 cursor-not-allowed'
              )}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={cn(
                'ml-3 text-sm cursor-pointer',
                error
                  ? 'text-red-700 dark:text-red-400'
                  : 'text-gray-700 dark:text-gray-300',
                option.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;