import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to combine Tailwind classes safely
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Format date to localized string
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', options || defaultOptions).format(dateObject);
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Truncate text to a specific length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

// Generate random ID
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

// Convert camelCase to Title Case
export function camelToTitleCase(text: string): string {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

// Check if an object is empty
export function isEmptyObject(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}

// Deep clone an object
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Debounce function to limit how often a function can be called
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}