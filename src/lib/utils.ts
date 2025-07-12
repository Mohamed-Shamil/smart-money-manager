import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CURRENCIES } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function formatCurrencyCompact(amount: number, currency: string = 'USD'): string {
  const currencyInfo = CURRENCIES[currency as keyof typeof CURRENCIES] || CURRENCIES.USD;
  
  if (amount >= 1000000) {
    return `${currencyInfo.symbol}${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${currencyInfo.symbol}${(amount / 1000).toFixed(1)}K`;
  }
  
  return formatCurrency(amount, currency);
}

// Haptic feedback support
export const hapticFeedback = {
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  },
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  },
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
  },
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 50, 100]);
    }
  },
  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
  }
};

// Performance optimization helpers
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Animation helpers
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const slideIn = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: 0.2, ease: "easeOut" }
};

// Data validation helpers
export const validateAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= 0;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateDate = (date: string): boolean => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

// Date helpers
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateFull = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getDaysBetween = (startDate: Date, endDate: Date): number => {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const isToday = (date: string | Date): boolean => {
  const today = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toDateString() === today.toDateString();
};

export const isThisMonth = (date: string | Date): boolean => {
  const today = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getMonth() === today.getMonth() && 
         dateObj.getFullYear() === today.getFullYear();
};

export function calculateEmergencyFund(monthlyExpenses: number, months: number = 6): number {
  return monthlyExpenses * months;
}

export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  expectedReturn: number
): number {
  const yearsToRetirement = retirementAge - currentAge;
  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonths = yearsToRetirement * 12;
  const futureValue = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement) +
    monthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
  return Math.round(futureValue);
}

export function calculateTaxBracket(income: number): { bracket: string; rate: number } {
  // Simplified US tax brackets for 2024
  if (income <= 11600) return { bracket: '10%', rate: 0.10 };
  if (income <= 47150) return { bracket: '12%', rate: 0.12 };
  if (income <= 100525) return { bracket: '22%', rate: 0.22 };
  if (income <= 191950) return { bracket: '24%', rate: 0.24 };
  if (income <= 243725) return { bracket: '32%', rate: 0.32 };
  if (income <= 609350) return { bracket: '35%', rate: 0.35 };
  return { bracket: '37%', rate: 0.37 };
}

export function calculateDebtPayoff(principal: number, interestRate: number, monthlyPayment: number): { months: number; totalInterest: number } {
  const monthlyRate = interestRate / 100 / 12;
  if (monthlyPayment <= principal * monthlyRate) {
    return { months: Infinity, totalInterest: Infinity };
  }
  const months = Math.log(monthlyPayment / (monthlyPayment - principal * monthlyRate)) / Math.log(1 + monthlyRate);
  const totalInterest = (monthlyPayment * months) - principal;
  return {
    months: Math.ceil(months),
    totalInterest: Math.round(totalInterest)
  };
}
