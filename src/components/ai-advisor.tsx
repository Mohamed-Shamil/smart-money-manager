"use client"

import { useState } from "react";
import { useAppStore, getCurrentMonth, getExpensesByMonth, getTotalExpensesByCategory } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, Target, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIES } from "@/lib/types";

interface AIAdvice {
  tips: string[];
  futurePlans: string[];
  warnings: string[];
}

export function AIAdvisor() {
  const { expenses, budgets } = useAppStore();
  const [advice, setAdvice] = useState<AIAdvice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateAdvice = () => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const currentMonth = getCurrentMonth();
      const monthlyExpenses = getExpensesByMonth(expenses, currentMonth);
      const totalSpent = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      const categoryTotals = getTotalExpensesByCategory(monthlyExpenses);
      const currentBudget = budgets.find(b => b.month === currentMonth);
      
      const tips: string[] = [];
      const futurePlans: string[] = [];
      const warnings: string[] = [];

      // Analyze spending patterns
      const topCategory = Object.entries(categoryTotals).sort(([,a], [,b]) => b - a)[0];
      
      if (topCategory) {
        tips.push(`Consider reducing spending in ${topCategory[0]} - it's your highest expense category.`);
      }

      if (currentBudget && totalSpent > currentBudget.totalBudget * 0.8) {
        warnings.push(`You've spent ${((totalSpent / currentBudget.totalBudget) * 100).toFixed(1)}% of your budget.`);
      }

      if (totalSpent > 0) {
        const avgDailySpending = totalSpent / 30;
        tips.push(`Your average daily spending is ${formatCurrency(avgDailySpending)}. Try to keep it under ${formatCurrency(avgDailySpending * 0.9)}.`);
        
        futurePlans.push(`Based on current spending, you'll spend approximately ${formatCurrency(totalSpent * 12)} this year.`);
        futurePlans.push(`Consider setting aside ${formatCurrency(totalSpent * 0.1)} monthly for emergency savings.`);
      }

      // Generic tips
      tips.push("Track every expense, no matter how small - it adds up quickly.");
      tips.push("Review your spending weekly to identify patterns and opportunities to save.");

      setAdvice({ tips, futurePlans, warnings });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Financial Advisor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!advice ? (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Get personalized financial advice based on your spending patterns
            </p>
            <Button 
              onClick={generateAdvice} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Analyzing..." : "Get Advice"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {advice.warnings.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <h4 className="font-medium">Warnings</h4>
                </div>
                {advice.warnings.map((warning, index) => (
                  <Badge key={index} variant="destructive" className="block w-fit">
                    {warning}
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Saving Tips</h4>
              </div>
              <ul className="space-y-1">
                {advice.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Future Planning</h4>
              </div>
              <ul className="space-y-1">
                {advice.futurePlans.map((plan, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {plan}
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              onClick={() => setAdvice(null)} 
              variant="outline" 
              className="w-full"
            >
              Get New Advice
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 