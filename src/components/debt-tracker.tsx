"use client"

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Handshake, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Debt } from "@/lib/types";
import { toast } from "sonner";

export function DebtTracker() {
  const { debts, addDebt, updateDebt, deleteDebt } = useAppStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "owed" as "owed" | "given",
    amount: "",
    interestRate: "",
    dueDate: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    const debt = {
      name: formData.name,
      type: formData.type,
      amount: parseFloat(formData.amount),
      interestRate: formData.interestRate ? parseFloat(formData.interestRate) : undefined,
      dueDate: formData.dueDate || undefined,
      description: formData.description,
      status: "active" as const
    };

    addDebt(debt);
    setIsDialogOpen(false);
    setFormData({ name: "", type: "owed", amount: "", interestRate: "", dueDate: "", description: "" });
    toast.success("Debt record created successfully!");
  };

  const handleStatusUpdate = (debtId: string, status: "active" | "paid" | "overdue") => {
    updateDebt(debtId, { status });
    toast.success("Debt status updated!");
  };

  const getTotalOwed = () => {
    return debts
      .filter(d => d.type === "owed" && d.status === "active")
      .reduce((sum, debt) => sum + debt.amount, 0);
  };

  const getTotalGiven = () => {
    return debts
      .filter(d => d.type === "given" && d.status === "active")
      .reduce((sum, debt) => sum + debt.amount, 0);
  };

  const getNetDebt = () => {
    return getTotalOwed() - getTotalGiven();
  };

  const getStatusIcon = (debt: Debt) => {
    if (debt.status === "paid") return <CheckCircle className="h-4 w-4" />;
    if (debt.status === "overdue") return <AlertTriangle className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Handshake className="h-5 w-5 text-orange-500" />
          Debt Tracker
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Debt
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Debt Record</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Person/Entity Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., John Doe, Bank Loan, Credit Card"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select value={formData.type} onValueChange={(value: "owed" | "given") => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owed">Money Owed (You owe them)</SelectItem>
                    <SelectItem value="given">Money Given (They owe you)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={formData.interestRate}
                    onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Personal loan, Business expense"
                />
              </div>

              <Button type="submit" className="w-full">
                Add Debt Record
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">You Owe</p>
            <p className="text-lg font-bold text-red-500">{formatCurrency(getTotalOwed())}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">You're Owed</p>
            <p className="text-lg font-bold text-green-500">{formatCurrency(getTotalGiven())}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Net</p>
            <p className={`text-lg font-bold ${getNetDebt() >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {formatCurrency(Math.abs(getNetDebt()))}
            </p>
            <p className="text-xs text-muted-foreground">
              {getNetDebt() >= 0 ? 'You owe more' : 'You\'re owed more'}
            </p>
          </div>
        </div>

        {/* Debt List */}
        {debts.length === 0 ? (
          <div className="text-center py-8">
            <Handshake className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No debt records yet. Add your first debt or loan!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {debts.map((debt) => (
              <div key={debt.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{debt.name}</h4>
                    <p className="text-sm text-muted-foreground">{debt.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={debt.type === "owed" ? "destructive" : "default"}>
                      {debt.type === "owed" ? "You Owe" : "You're Owed"}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(debt)}
                      <Badge variant="outline" className="text-xs">
                        {debt.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{formatCurrency(debt.amount)}</p>
                    {debt.interestRate && (
                      <p className="text-muted-foreground">Interest: {debt.interestRate}%</p>
                    )}
                    {debt.dueDate && (
                      <p className="text-muted-foreground">Due: {formatDate(debt.dueDate)}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {debt.status === "active" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(debt.id, "paid")}
                        >
                          Mark Paid
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(debt.id, "overdue")}
                        >
                          Mark Overdue
                        </Button>
                      </>
                    )}
                    {debt.status === "overdue" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(debt.id, "paid")}
                      >
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 