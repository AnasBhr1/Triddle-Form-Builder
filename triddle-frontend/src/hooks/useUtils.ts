import { useEffect, useRef, useCallback } from 'react';
import { useFormBuilderStore } from '../store/formBuilder';

export const useFormAutosave = (intervalMs = 30000) => {
  const { currentForm, isDirty, setIsDirty } = useFormBuilderStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Create a save function that should be implemented in the component
  const triggerAutoSave = useCallback(() => {
    console.log('Auto-saving form...');
    // This should be implemented in the component that uses this hook
    // For now, we'll just clear the dirty flag
    setIsDirty(false);
  }, [setIsDirty]);
  
  // Set up auto-save feature
  useEffect(() => {
    // Only auto-save if the feature is enabled and there are unsaved changes
    if (!currentForm?.settings?.autoSave) return;
    
    const startAutoSave = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        if (isDirty) {
          triggerAutoSave();
        }
      }, intervalMs);
    };
    
    if (isDirty) {
      startAutoSave();
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDirty, triggerAutoSave, intervalMs, currentForm?.settings?.autoSave]);
  
  // Manual save trigger
  const manualSave = () => {
    if (isDirty) {
      triggerAutoSave();
    }
  };
  
  return { manualSave };
};

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export const useEscapeKey = (handler: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handler]);
};