import React from 'react';
import { cn } from '../../utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  className,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            Triddle
          </h1>
        </div>

        {/* Title and subtitle */}
        {title && (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className={cn(
            'bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10',
            'border border-gray-200 dark:border-gray-700',
            className
          )}
        >
          {children}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 Triddle. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;