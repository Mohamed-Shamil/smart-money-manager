import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { 
  Expense, 
  Budget, 
  Settings, 
  User, 
  SavingsGoal, 
  Debt, 
  FinancialChallenge,
  EmergencyFund,
  RetirementPlan,
  TaxEstimate,
  TravelMode
} from './types';

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
  
  // Savings Goals
  savingsGoals: SavingsGoal[];
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'uid'>) => void;
  updateSavingsGoal: (id: string, goal: Partial<SavingsGoal>) => void;
  deleteSavingsGoal: (id: string) => void;
  
  // Debts
  debts: Debt[];
  addDebt: (debt: Omit<Debt, 'id' | 'uid'>) => void;
  updateDebt: (id: string, debt: Partial<Debt>) => void;
  deleteDebt: (id: string) => void;
  
  // Financial Challenges
  challenges: FinancialChallenge[];
  addChallenge: (challenge: Omit<FinancialChallenge, 'id' | 'uid'>) => void;
  updateChallenge: (id: string, challenge: Partial<FinancialChallenge>) => void;
  deleteChallenge: (id: string) => void;
  
  // Emergency Fund
  emergencyFund: EmergencyFund | null;
  setEmergencyFund: (fund: EmergencyFund | null) => void;
  updateEmergencyFund: (fund: Partial<EmergencyFund>) => void;
  
  // Retirement Plan
  retirementPlan: RetirementPlan | null;
  setRetirementPlan: (plan: RetirementPlan | null) => void;
  updateRetirementPlan: (plan: Partial<RetirementPlan>) => void;
  
  // Tax Estimate
  taxEstimates: TaxEstimate[];
  addTaxEstimate: (estimate: Omit<TaxEstimate, 'id' | 'uid'>) => void;
  updateTaxEstimate: (id: string, estimate: Partial<TaxEstimate>) => void;
  deleteTaxEstimate: (id: string) => void;
  
  // Travel Mode
  travelModes: TravelMode[];
  addTravelMode: (travel: Omit<TravelMode, 'id' | 'uid'>) => void;
  updateTravelMode: (id: string, travel: Partial<TravelMode>) => void;
  deleteTravelMode: (id: string) => void;
  
  // UI State
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  
  // Offline sync
  pendingChanges: Array<{
    id: string;
    type: 'add' | 'update' | 'delete';
    entity: string;
    data: unknown;
    timestamp: number;
  }>;
  addPendingChange: (change: Omit<AppState['pendingChanges'][0], 'id' | 'timestamp'>) => void;
  clearPendingChanges: () => void;
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
          currency: 'USD',
          notifications: {
            budgetAlerts: true,
            billReminders: true,
            weeklyReports: false
          },
          businessNames: [],
          ...settings 
        }
      })),
      
      // Savings Goals
      savingsGoals: [],
      addSavingsGoal: (goal) => set((state) => ({
        savingsGoals: [...state.savingsGoals, { 
          ...goal, 
          id: uuidv4(), 
          uid: state.user?.uid || 'default',
          createdAt: new Date()
        }]
      })),
      updateSavingsGoal: (id, goal) => set((state) => ({
        savingsGoals: state.savingsGoals.map((g) => 
          g.id === id ? { ...g, ...goal } : g
        )
      })),
      deleteSavingsGoal: (id) => set((state) => ({
        savingsGoals: state.savingsGoals.filter((g) => g.id !== id)
      })),
      
      // Debts
      debts: [],
      addDebt: (debt) => set((state) => ({
        debts: [...state.debts, { 
          ...debt, 
          id: uuidv4(), 
          uid: state.user?.uid || 'default',
          createdAt: new Date()
        }]
      })),
      updateDebt: (id, debt) => set((state) => ({
        debts: state.debts.map((d) => 
          d.id === id ? { ...d, ...debt } : d
        )
      })),
      deleteDebt: (id) => set((state) => ({
        debts: state.debts.filter((d) => d.id !== id)
      })),
      
      // Financial Challenges
      challenges: [],
      addChallenge: (challenge) => set((state) => ({
        challenges: [...state.challenges, { 
          ...challenge, 
          id: uuidv4(), 
          uid: state.user?.uid || 'default'
        }]
      })),
      updateChallenge: (id, challenge) => set((state) => ({
        challenges: state.challenges.map((c) => 
          c.id === id ? { ...c, ...challenge } : c
        )
      })),
      deleteChallenge: (id) => set((state) => ({
        challenges: state.challenges.filter((c) => c.id !== id)
      })),
      
      // Emergency Fund
      emergencyFund: null,
      setEmergencyFund: (fund) => set({ emergencyFund: fund }),
      updateEmergencyFund: (fund) => set((state) => ({
        emergencyFund: state.emergencyFund ? { ...state.emergencyFund, ...fund } : fund as EmergencyFund
      })),
      
      // Retirement Plan
      retirementPlan: null,
      setRetirementPlan: (plan) => set({ retirementPlan: plan }),
      updateRetirementPlan: (plan) => set((state) => ({
        retirementPlan: state.retirementPlan ? { ...state.retirementPlan, ...plan } : plan as RetirementPlan
      })),
      
      // Tax Estimates
      taxEstimates: [],
      addTaxEstimate: (estimate) => set((state) => ({
        taxEstimates: [...state.taxEstimates, { 
          ...estimate, 
          id: uuidv4(), 
          uid: state.user?.uid || 'default',
          createdAt: new Date()
        }]
      })),
      updateTaxEstimate: (id, estimate) => set((state) => ({
        taxEstimates: state.taxEstimates.map((t) => 
          t.id === id ? { ...t, ...estimate } : t
        )
      })),
      deleteTaxEstimate: (id) => set((state) => ({
        taxEstimates: state.taxEstimates.filter((t) => t.id !== id)
      })),
      
      // Travel Modes
      travelModes: [],
      addTravelMode: (travel) => set((state) => ({
        travelModes: [...state.travelModes, { 
          ...travel, 
          id: uuidv4(), 
          uid: state.user?.uid || 'default'
        }]
      })),
      updateTravelMode: (id, travel) => set((state) => ({
        travelModes: state.travelModes.map((t) => 
          t.id === id ? { ...t, ...travel } : t
        )
      })),
      deleteTravelMode: (id) => set((state) => ({
        travelModes: state.travelModes.filter((t) => t.id !== id)
      })),
      
      // UI State
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      
      // Offline sync
      pendingChanges: [],
      addPendingChange: (change) => set((state) => ({
        pendingChanges: [...state.pendingChanges, {
          ...change,
          id: uuidv4(),
          timestamp: Date.now()
        }]
      })),
      clearPendingChanges: () => set({ pendingChanges: [] }),
    }),
    {
      name: 'smart-money-manager-storage',
      partialize: (state) => ({
        expenses: state.expenses,
        budgets: state.budgets,
        settings: state.settings,
        user: state.user,
        savingsGoals: state.savingsGoals,
        debts: state.debts,
        challenges: state.challenges,
        emergencyFund: state.emergencyFund,
        retirementPlan: state.retirementPlan,
        taxEstimates: state.taxEstimates,
        travelModes: state.travelModes,
        pendingChanges: state.pendingChanges,
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

// Financial calculation helpers
export const calculateEmergencyFund = (monthlyExpenses: number, months: number = 6) => {
  return monthlyExpenses * months;
};

export const calculateRetirement = (
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  expectedReturn: number
) => {
  const yearsToRetirement = retirementAge - currentAge;
  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonths = yearsToRetirement * 12;
  
  const futureValue = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement) +
    monthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
  
  return Math.round(futureValue);
};

export const calculateTaxBracket = (income: number) => {
  // Simplified US tax brackets for 2024
  if (income <= 11600) return { bracket: '10%', rate: 0.10 };
  if (income <= 47150) return { bracket: '12%', rate: 0.12 };
  if (income <= 100525) return { bracket: '22%', rate: 0.22 };
  if (income <= 191950) return { bracket: '24%', rate: 0.24 };
  if (income <= 243725) return { bracket: '32%', rate: 0.32 };
  if (income <= 609350) return { bracket: '35%', rate: 0.35 };
  return { bracket: '37%', rate: 0.37 };
};

export const calculateDebtPayoff = (principal: number, interestRate: number, monthlyPayment: number) => {
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
}; 