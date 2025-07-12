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
}

export interface Budget {
  uid: string;
  month: string;
  totalBudget: number;
  categories: Record<string, number>;
}

export interface Settings {
  uid: string;
  darkMode: boolean;
  dailyReminder: boolean;
  spendingLimit: Record<string, number>;
}

export interface AIAdvice {
  tips: string[];
  futurePlans: string[];
  timestamp: Date;
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
  "Other": "#85C1E9"
}; 