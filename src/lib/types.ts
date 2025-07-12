export interface User {
  uid: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Expense {
  id: string;
  uid: string;
  amount: number;
  category: string;
  note: string;
  date: string;
  businessName?: string; // For business expenses
  tags?: string[];
  currency?: string;
  location?: string;
  isRecurring?: boolean;
  recurringType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface Budget {
  uid: string;
  month: string;
  totalBudget: number;
  categories: Record<string, number>;
  businessBudgets?: Record<string, number>; // For business budgets
}

export interface Settings {
  uid: string;
  darkMode: boolean;
  dailyReminder: boolean;
  spendingLimit: Record<string, number>;
  currency: string;
  notifications: {
    budgetAlerts: boolean;
    billReminders: boolean;
    weeklyReports: boolean;
  };
  businessNames: string[]; // List of business names
}

export interface AIAdvice {
  tips: string[];
  futurePlans: string[];
  timestamp: Date;
}

export interface SavingsGoal {
  id: string;
  uid: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  createdAt: Date;
}

export interface Debt {
  id: string;
  uid: string;
  name: string;
  type: 'owed' | 'given'; // Money owed to others or given to others
  amount: number;
  interestRate?: number;
  dueDate?: string;
  description: string;
  status: 'active' | 'paid' | 'overdue';
  createdAt: Date;
}

export interface FinancialChallenge {
  id: string;
  uid: string;
  name: string;
  type: 'no-spend' | 'save-more' | 'reduce-category' | 'custom';
  targetAmount?: number;
  startDate: string;
  endDate: string;
  currentProgress: number;
  status: 'active' | 'completed' | 'failed';
  description: string;
}

export interface EmergencyFund {
  id: string;
  uid: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  monthsToTarget: number;
  createdAt: Date;
}

export interface RetirementPlan {
  id: string;
  uid: string;
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  targetAmount: number;
  projectedAmount: number;
  createdAt: Date;
}

export interface TaxEstimate {
  id: string;
  uid: string;
  year: number;
  income: number;
  deductions: number;
  taxBracket: string;
  estimatedTax: number;
  createdAt: Date;
}

export interface TravelMode {
  id: string;
  uid: string;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  currency: string;
  location: string;
  isActive: boolean;
  expenses: string[]; // Expense IDs
}

export type Category = 
  | "Food & Dining"
  | "Transportation"
  | "Shopping"
  | "Entertainment"
  | "Healthcare"
  | "Utilities"
  | "Housing"
  | "Education"
  | "Travel"
  | "Business"
  | "Debt Payment"
  | "Savings"
  | "Investment"
  | "Insurance"
  | "Taxes"
  | "Other";

export const CATEGORIES: Category[] = [
  "Food & Dining",
  "Transportation", 
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Utilities",
  "Housing",
  "Education",
  "Travel",
  "Business",
  "Debt Payment",
  "Savings",
  "Investment",
  "Insurance",
  "Taxes",
  "Other"
];

export const CATEGORY_COLORS: Record<Category, string> = {
  "Food & Dining": "#FF6B6B",
  "Transportation": "#4ECDC4",
  "Shopping": "#45B7D1",
  "Entertainment": "#96CEB4",
  "Healthcare": "#FFEAA7",
  "Utilities": "#DDA0DD",
  "Housing": "#98D8C8",
  "Education": "#F7DC6F",
  "Travel": "#BB8FCE",
  "Business": "#FF8C42",
  "Debt Payment": "#E74C3C",
  "Savings": "#27AE60",
  "Investment": "#F39C12",
  "Insurance": "#9B59B6",
  "Taxes": "#34495E",
  "Other": "#85C1E9"
};

export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  INR: { symbol: '₹', name: 'Indian Rupee' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' },
  CHF: { symbol: 'CHF', name: 'Swiss Franc' },
  CNY: { symbol: '¥', name: 'Chinese Yuan' },
  BRL: { symbol: 'R$', name: 'Brazilian Real' }
}; 