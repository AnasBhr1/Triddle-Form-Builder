import { useState, useEffect, useRef } from 'react';
import { useFormBuilderStore } from '../store/formBuilder';
import { useAutoSave } from './useForms';

// Auto-save hook for form builder
export const useFormAutoSave = (formId: string, intervalMs: number = 30000) => {
  const { isDirty, currentForm } = useFormBuilderStore();
  const { triggerAutoSave, isAutoSaving } = useAutoSave(formId);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!currentForm?.settings.autoSave) return;

    const startAutoSave = () => {
      intervalRef.current = setInterval(() => {
        if (isDirty) {
          triggerAutoSave();
        }
      }, intervalMs);
    };

    startAutoSave();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDirty, triggerAutoSave, intervalMs, currentForm?.settings.autoSave]);

  // Manual save trigger
  const manualSave = () => {
    if (isDirty) {
      triggerAutoSave();
    }
  };

  return {
    isAutoSaving,
    manualSave,
    isDirty,
  };
};

// Local storage hook
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

// Debounce hook
export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Media query hook
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

// Click outside hook
export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// Intersection observer hook
export const useIntersectionObserver = (
  elementRef: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isIntersecting;
};

// Copy to clipboard hook
export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopied(false);
      return false;
    }
  };

  return { copy, copied };
};

// Form submission tracking
export const useFormSubmissionTracking = () => {
  const [timeSpent, setTimeSpent] = useState<Map<string, number>>(new Map());
  const [startTimes, setStartTimes] = useState<Map<string, number>>(new Map());
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState<number>(Date.now());

  const startQuestionTimer = (questionId: string) => {
    const now = Date.now();
    setStartTimes(prev => new Map(prev).set(questionId, now));
    setCurrentQuestionStartTime(now);
  };

  const stopQuestionTimer = (questionId: string) => {
    const startTime = startTimes.get(questionId);
    if (startTime) {
      const timeSpentOnQuestion = Date.now() - startTime;
      setTimeSpent(prev => {
        const newMap = new Map(prev);
        const existingTime = newMap.get(questionId) || 0;
        newMap.set(questionId, existingTime + timeSpentOnQuestion);
        return newMap;
      });
    }
  };

  const getTimeSpent = (questionId: string): number => {
    return timeSpent.get(questionId) || 0;
  };

  const getTotalTimeSpent = (): number => {
    return Array.from(timeSpent.values()).reduce((total, time) => total + time, 0);
  };

  return {
    startQuestionTimer,
    stopQuestionTimer,
    getTimeSpent,
    getTotalTimeSpent,
    timeSpent,
  };
};