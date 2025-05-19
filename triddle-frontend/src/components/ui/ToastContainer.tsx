import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore, type Toast } from '../../store/toast';
import { cn } from '../../utils';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const toastIcons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon
};

const toastColors = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200'
};

const iconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500'
};

export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  React.useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.duration) {
        const timer = setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration);
        return () => clearTimeout(timer);
      }
    });
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast: Toast) => {
          const Icon = toastIcons[toast.type];
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'max-w-sm w-full rounded-lg border p-4 shadow-lg',
                toastColors[toast.type]
              )}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Icon className={cn('h-5 w-5', iconColors[toast.type])} />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{toast.title}</p>
                  {toast.message && (
                    <p className="mt-1 text-sm text-gray-600">{toast.message}</p>
                  )}
                </div>
                <button
                  type="button"
                  className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => removeToast(toast.id)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};