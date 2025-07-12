"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, getCurrentMonth } from "@/lib/store";
import { Navigation } from "@/components/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Bell, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { CATEGORIES } from "@/lib/types";

export default function Settings() {
  const router = useRouter();
  const { budgets, addBudget, updateBudget, settings, expenses, deleteExpense } = useAppStore();
  const currentMonth = getCurrentMonth();
  const currentBudget = budgets.find(b => b.month === currentMonth);
  
  const [budgetData, setBudgetData] = useState({
    totalBudget: currentBudget?.totalBudget || 0,
    categories: currentBudget?.categories || {}
  });

  const [settingsData, setSettingsData] = useState({
    dailyReminder: settings?.dailyReminder || false,
    spendingLimit: settings?.spendingLimit || {}
  });

  const handleSaveBudget = () => {
    if (currentBudget) {
      updateBudget(currentMonth, budgetData);
    } else {
      addBudget({
        month: currentMonth,
        totalBudget: budgetData.totalBudget,
        categories: budgetData.categories
      });
    }
    alert("Budget saved successfully!");
  };

  // Settings are automatically saved when changed

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      // Clear all expenses
      expenses.forEach(expense => deleteExpense(expense.id));
      alert("All data cleared successfully!");
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setSettingsData(prev => ({ ...prev, dailyReminder: true }));
        alert("Notifications enabled!");
      } else {
        alert("Notification permission denied");
      }
    } else {
      alert("Notifications not supported in this browser");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container px-4 py-6 space-y-6">
        {/* Budget Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="totalBudget">Monthly Budget</Label>
              <Input
                id="totalBudget"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={budgetData.totalBudget}
                onChange={(e) => setBudgetData({ ...budgetData, totalBudget: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label>Category Budgets (Optional)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CATEGORIES.map((category) => (
                  <div key={category} className="space-y-1">
                    <Label htmlFor={category} className="text-sm">{category}</Label>
                    <Input
                      id={category}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={budgetData.categories[category] || ''}
                      onChange={(e) => setBudgetData({
                        ...budgetData,
                        categories: {
                          ...budgetData.categories,
                          [category]: parseFloat(e.target.value) || 0
                        }
                      })}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleSaveBudget} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Budget
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Daily Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminded to log your expenses daily
                </p>
              </div>
              <Switch
                checked={settingsData.dailyReminder}
                onCheckedChange={(checked) => {
                  if (checked) {
                    requestNotificationPermission();
                  } else {
                    setSettingsData(prev => ({ ...prev, dailyReminder: false }));
                  }
                }}
              />
            </div>

            <Button 
              variant="outline" 
              onClick={requestNotificationPermission}
              className="w-full"
            >
              <Bell className="mr-2 h-4 w-4" />
              Enable Notifications
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>Total expenses: {expenses.length}</p>
              <p>Total amount: {formatCurrency(expenses.reduce((sum, expense) => sum + expense.amount, 0))}</p>
            </div>

            <Button 
              variant="destructive" 
              onClick={handleClearData}
              className="w-full"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All Data
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Smart Money Manager v1.0.0</p>
            <p>A mobile-first PWA for tracking expenses and managing budgets</p>
            <p>Built with Next.js, React, and shadcn/ui</p>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
} 