"use client"

import { useAppStore, getCurrentMonth, getExpensesByMonth } from "@/lib/store";
import { Navigation } from "@/components/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { AIAdvisor } from "@/components/ai-advisor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export default function Home() {
  const { expenses, budgets } = useAppStore();
  const router = useRouter();
  const currentMonth = getCurrentMonth();
  const monthlyExpenses = getExpensesByMonth(expenses, currentMonth);
  const totalSpent = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const currentBudget = budgets.find(b => b.month === currentMonth);
  const budgetRemaining = currentBudget ? currentBudget.totalBudget - totalSpent : 0;
  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex h-14 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Smart Money Manager</h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="container px-4 py-6 space-y-6">
        {/* Monthly Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(budgetRemaining)}</div>
              <p className="text-xs text-muted-foreground">
                {currentBudget ? `of ${formatCurrency(currentBudget.totalBudget)}` : 'No budget set'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyExpenses.length}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => router.push('/add')} 
              className="w-full"
              size="lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Expense
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard')}
              >
                View Analytics
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/settings')}
              >
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Advisor */}
        <AIAdvisor />

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {recentExpenses.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No transactions yet. Add your first expense!
              </p>
            ) : (
              <div className="space-y-3">
                {recentExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{expense.note || expense.category}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(expense.amount)}</p>
                      <Badge variant="secondary" className="text-xs">
                        {expense.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
}
