import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Expense, Budget, Settings, User } from './types';

interface AppState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Expenses
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  
  // Budgets
  budgets: Budget[];
  addBudget: (budget: Omit<Budget, 'uid'>) => void;
  updateBudget: (month: string, budget: Partial<Budget>) => void;
  
  // Settings
  settings: Settings | null;
  updateSettings: (settings: Partial<Settings>) => void;
  
  // UI State
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // User
      user: null,
      setUser: (user) => set({ user }),
      
      // Expenses
      expenses: [],
      addExpense: (expense) => set((state) => ({
        expenses: [...state.expenses, { ...expense, id: uuidv4() }]
      })),
      updateExpense: (id, expense) => set((state) => ({
        expenses: state.expenses.map((e) => 
          e.id === id ? { ...e, ...expense } : e
        )
      })),
      deleteExpense: (id) => set((state) => ({
        expenses: state.expenses.filter((e) => e.id !== id)
      })),
      
      // Budgets
      budgets: [],
      addBudget: (budget) => set((state) => ({
        budgets: [...state.budgets, { ...budget, uid: state.user?.uid || 'default' }]
      })),
      updateBudget: (month, budget) => set((state) => ({
        budgets: state.budgets.map((b) => 
          b.month === month ? { ...b, ...budget } : b
        )
      })),
      
      // Settings
      settings: null,
      updateSettings: (settings) => set((state) => ({
        settings: state.settings ? { ...state.settings, ...settings } : { 
          uid: 'default',
          darkMode: false,
          dailyReminder: false,
          spendingLimit: {},
          ...settings 
        }
      })),
      
      // UI State
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    }),
    {
      name: 'smart-money-manager-storage',
      partialize: (state) => ({
        expenses: state.expenses,
        budgets: state.budgets,
        settings: state.settings,
        user: state.user,
      }),
    }
  )
);

// Helper functions
export const getExpensesByMonth = (expenses: Expense[], month: string) => {
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;
    return expenseMonth === month;
  });
};

export const getTotalExpensesByCategory = (expenses: Expense[]) => {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
};

export const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}; 