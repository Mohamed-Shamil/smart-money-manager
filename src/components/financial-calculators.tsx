"use client"

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calculator, Shield, PiggyBank, CreditCard, Receipt } from "lucide-react";
import { formatCurrency, calculateEmergencyFund, calculateRetirement, calculateTaxBracket, calculateDebtPayoff } from "@/lib/utils";
import { toast } from "sonner";

export function FinancialCalculators() {
  const { emergencyFund, setEmergencyFund, retirementPlan, setRetirementPlan, taxEstimates, addTaxEstimate } = useAppStore();
  
  // Emergency Fund Calculator
  const [emergencyForm, setEmergencyForm] = useState({
    monthlyExpenses: "",
    months: "6"
  });

  // Retirement Calculator
  const [retirementForm, setRetirementForm] = useState({
    currentAge: "",
    retirementAge: "",
    currentSavings: "",
    monthlyContribution: "",
    expectedReturn: "7"
  });

  // Debt Payoff Calculator
  const [debtForm, setDebtForm] = useState({
    principal: "",
    interestRate: "",
    monthlyPayment: ""
  });

  // Tax Calculator
  const [taxForm, setTaxForm] = useState({
    income: "",
    deductions: "",
    year: new Date().getFullYear().toString()
  });

  const handleEmergencyFundCalculate = () => {
    if (!emergencyForm.monthlyExpenses) {
      toast.error("Please enter your monthly expenses");
      return;
    }

    const monthlyExpenses = parseFloat(emergencyForm.monthlyExpenses);
    const months = parseInt(emergencyForm.months);
    const targetAmount = calculateEmergencyFund(monthlyExpenses, months);

    setEmergencyFund({
      id: "emergency-fund",
      uid: "default",
      targetAmount,
      currentAmount: emergencyFund?.currentAmount || 0,
      monthlyContribution: emergencyFund?.monthlyContribution || 0,
      monthsToTarget: months,
      createdAt: emergencyFund?.createdAt || new Date()
    });

    toast.success(`Emergency fund target: ${formatCurrency(targetAmount)}`);
  };

  const handleRetirementCalculate = () => {
    if (!retirementForm.currentAge || !retirementForm.retirementAge || !retirementForm.currentSavings) {
      toast.error("Please fill in all required fields");
      return;
    }

    const currentAge = parseInt(retirementForm.currentAge);
    const retirementAge = parseInt(retirementForm.retirementAge);
    const currentSavings = parseFloat(retirementForm.currentSavings);
    const monthlyContribution = parseFloat(retirementForm.monthlyContribution) || 0;
    const expectedReturn = parseFloat(retirementForm.expectedReturn);

    const projectedAmount = calculateRetirement(
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      expectedReturn
    );

    setRetirementPlan({
      id: "retirement-plan",
      uid: "default",
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      expectedReturn,
      targetAmount: projectedAmount * 0.8, // 80% of projected as target
      projectedAmount,
      createdAt: retirementPlan?.createdAt || new Date()
    });

    toast.success(`Projected retirement savings: ${formatCurrency(projectedAmount)}`);
  };

  const handleDebtPayoffCalculate = () => {
    if (!debtForm.principal || !debtForm.interestRate || !debtForm.monthlyPayment) {
      toast.error("Please fill in all required fields");
      return;
    }

    const principal = parseFloat(debtForm.principal);
    const interestRate = parseFloat(debtForm.interestRate);
    const monthlyPayment = parseFloat(debtForm.monthlyPayment);

    const result = calculateDebtPayoff(principal, interestRate, monthlyPayment);

    if (result.months === Infinity) {
      toast.error("Monthly payment is too low to pay off the debt");
    } else {
      toast.success(`Debt will be paid off in ${result.months} months. Total interest: ${formatCurrency(result.totalInterest)}`);
    }
  };

  const handleTaxCalculate = () => {
    if (!taxForm.income) {
      toast.error("Please enter your income");
      return;
    }

    const income = parseFloat(taxForm.income);
    const deductions = parseFloat(taxForm.deductions) || 0;
    const year = parseInt(taxForm.year);
    const taxableIncome = income - deductions;

    const taxBracket = calculateTaxBracket(taxableIncome);
    const estimatedTax = taxableIncome * taxBracket.rate;

    addTaxEstimate({
      year,
      income,
      deductions,
      taxBracket: taxBracket.bracket,
      estimatedTax
    });

    toast.success(`Estimated tax: ${formatCurrency(estimatedTax)} (${taxBracket.bracket} bracket)`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-purple-500" />
          Financial Calculators
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="emergency" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="emergency">Emergency Fund</TabsTrigger>
            <TabsTrigger value="retirement">Retirement</TabsTrigger>
            <TabsTrigger value="debt">Debt Payoff</TabsTrigger>
            <TabsTrigger value="tax">Tax Estimator</TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium">Emergency Fund Calculator</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  value={emergencyForm.monthlyExpenses}
                  onChange={(e) => setEmergencyForm({ ...emergencyForm, monthlyExpenses: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="months">Months to Cover</Label>
                <Input
                  id="months"
                  type="number"
                  value={emergencyForm.months}
                  onChange={(e) => setEmergencyForm({ ...emergencyForm, months: e.target.value })}
                  placeholder="6"
                />
              </div>
            </div>
            <Button onClick={handleEmergencyFundCalculate} className="w-full">
              Calculate Emergency Fund
            </Button>
            {emergencyFund && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Target Emergency Fund</p>
                <p className="text-2xl font-bold">{formatCurrency(emergencyFund.targetAmount)}</p>
                <p className="text-xs text-muted-foreground">
                  {emergencyForm.months} months of expenses at {formatCurrency(parseFloat(emergencyForm.monthlyExpenses) || 0)}/month
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="retirement" className="space-y-4">
            <div className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4 text-green-500" />
              <h3 className="font-medium">Retirement Calculator</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentAge">Current Age</Label>
                <Input
                  id="currentAge"
                  type="number"
                  value={retirementForm.currentAge}
                  onChange={(e) => setRetirementForm({ ...retirementForm, currentAge: e.target.value })}
                  placeholder="30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retirementAge">Retirement Age</Label>
                <Input
                  id="retirementAge"
                  type="number"
                  value={retirementForm.retirementAge}
                  onChange={(e) => setRetirementForm({ ...retirementForm, retirementAge: e.target.value })}
                  placeholder="65"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Savings</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  value={retirementForm.currentSavings}
                  onChange={(e) => setRetirementForm({ ...retirementForm, currentSavings: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  value={retirementForm.monthlyContribution}
                  onChange={(e) => setRetirementForm({ ...retirementForm, monthlyContribution: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  value={retirementForm.expectedReturn}
                  onChange={(e) => setRetirementForm({ ...retirementForm, expectedReturn: e.target.value })}
                  placeholder="7"
                />
              </div>
            </div>
            <Button onClick={handleRetirementCalculate} className="w-full">
              Calculate Retirement
            </Button>
            {retirementPlan && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">Projected Retirement Savings</p>
                <p className="text-2xl font-bold">{formatCurrency(retirementPlan.projectedAmount)}</p>
                <p className="text-xs text-muted-foreground">
                  {retirementPlan.retirementAge - retirementPlan.currentAge} years to retirement
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="debt" className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-red-500" />
              <h3 className="font-medium">Debt Payoff Calculator</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Principal Amount</Label>
                <Input
                  id="principal"
                  type="number"
                  value={debtForm.principal}
                  onChange={(e) => setDebtForm({ ...debtForm, principal: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    value={debtForm.interestRate}
                    onChange={(e) => setDebtForm({ ...debtForm, interestRate: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyPayment">Monthly Payment</Label>
                  <Input
                    id="monthlyPayment"
                    type="number"
                    value={debtForm.monthlyPayment}
                    onChange={(e) => setDebtForm({ ...debtForm, monthlyPayment: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            <Button onClick={handleDebtPayoffCalculate} className="w-full">
              Calculate Payoff
            </Button>
          </TabsContent>

          <TabsContent value="tax" className="space-y-4">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-orange-500" />
              <h3 className="font-medium">Tax Estimator</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="income">Annual Income</Label>
                <Input
                  id="income"
                  type="number"
                  value={taxForm.income}
                  onChange={(e) => setTaxForm({ ...taxForm, income: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deductions">Deductions</Label>
                <Input
                  id="deductions"
                  type="number"
                  value={taxForm.deductions}
                  onChange={(e) => setTaxForm({ ...taxForm, deductions: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Tax Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={taxForm.year}
                  onChange={(e) => setTaxForm({ ...taxForm, year: e.target.value })}
                  placeholder="2024"
                />
              </div>
            </div>
            <Button onClick={handleTaxCalculate} className="w-full">
              Calculate Tax
            </Button>
            {taxEstimates.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Recent Estimates</p>
                {taxEstimates.slice(-3).map((estimate) => (
                  <div key={estimate.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{estimate.year}</span>
                      <Badge variant="outline">{estimate.taxBracket}</Badge>
                    </div>
                    <p className="text-lg font-bold">{formatCurrency(estimate.estimatedTax)}</p>
                    <p className="text-xs text-muted-foreground">
                      Income: {formatCurrency(estimate.income)} | Deductions: {formatCurrency(estimate.deductions)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 