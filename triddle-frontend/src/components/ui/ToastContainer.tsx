import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToastStore, type Toast } from '../../store/toast';
import { cn } from '../../utils';
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XIcon } from '@heroicons/react/outline';

const toastIcons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 md:bottom-4 md:right-4 md:top-auto">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function Toast({ toast, onRemove }: ToastProps) {
  const { id, title, message, type = 'default', duration = 5000 } = toast;

  useEffect(() => {
    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        onRemove(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onRemove]);

  const Icon = toastIcons[type as keyof typeof toastIcons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      className={cn(
        'pointer-events-auto relative flex w-full max-w-sm overflow-hidden rounded-lg shadow-lg',
        'border p-4 pr-8',
        type === 'success' && 'bg-green-50 border-green-200',
        type === 'error' && 'bg-red-50 border-red-200',
        type === 'warning' && 'bg-yellow-50 border-yellow-200',
        type === 'info' && 'bg-blue-50 border-blue-200',
        type === 'default' && 'bg-white'
      )}
    >
      {Icon && (
        <div className="mr-3 flex-shrink-0">
          <Icon
            className={cn(
              'h-5 w-5',
              type === 'success' && 'text-green-500',
              type === 'error' && 'text-red-500',
              type === 'warning' && 'text-yellow-500',
              type === 'info' && 'text-blue-500'
            )}
          />
        </div>
      )}
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        {message && <p className="mt-1 text-sm text-gray-600">{message}</p>}
      </div>
      <button
        onClick={() => onRemove(id)}
        className="absolute right-2 top-2 inline-flex rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export default ToastContainer;