import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calculator as CalculatorIcon,
  DollarSign,
  Percent,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Calculator = () => {
  const [income, setIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState("single");
  const [deductions, setDeductions] = useState("");

  const calculateTax = () => {
    // Simplified tax calculation for demo
    const grossIncome = parseFloat(income) || 0;
    const totalDeductions = parseFloat(deductions) || 0;
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    
    // 2024 tax brackets (simplified)
    let tax = 0;
    if (taxableIncome > 578125) {
      tax = 174238.25 + (taxableIncome - 578125) * 0.37;
    } else if (taxableIncome > 231250) {
      tax = 52832 + (taxableIncome - 231250) * 0.35;
    } else if (taxableIncome > 182100) {
      tax = 37104 + (taxableIncome - 182100) * 0.32;
    } else if (taxableIncome > 95375) {
      tax = 16290 + (taxableIncome - 95375) * 0.24;
    } else if (taxableIncome > 44725) {
      tax = 5147 + (taxableIncome - 44725) * 0.22;
    } else if (taxableIncome > 11000) {
      tax = 1100 + (taxableIncome - 11000) * 0.12;
    } else {
      tax = taxableIncome * 0.10;
    }
    
    return {
      grossIncome,
      totalDeductions,
      taxableIncome,
      estimatedTax: tax,
      effectiveRate: taxableIncome > 0 ? (tax / taxableIncome) * 100 : 0,
      takeHome: grossIncome - tax
    };
  };

  const results = calculateTax();

  return (
    <>
      <DashboardHeader 
        title="Tax Calculator" 
        subtitle="Estimate tax liability for your clients"
      />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalculatorIcon className="w-5 h-5 text-primary" />
                Tax Estimation
              </CardTitle>
              <CardDescription>Enter income details to calculate estimated tax</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="income">Gross Annual Income</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="income"
                    type="number"
                    placeholder="0.00"
                    className="pl-9"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Filing Status</Label>
                <Select value={filingStatus} onValueChange={setFilingStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select filing status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married-joint">Married Filing Jointly</SelectItem>
                    <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                    <SelectItem value="head">Head of Household</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deductions">Total Deductions</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="deductions"
                    type="number"
                    placeholder="0.00"
                    className="pl-9"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 gradient-primary text-primary-foreground hover:opacity-90">
                  Calculate Tax
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIncome("");
                    setDeductions("");
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            <Card className="border-border gradient-primary text-primary-foreground">
              <CardContent className="p-6">
                <p className="text-sm opacity-80 mb-2">Estimated Tax Liability</p>
                <p className="text-4xl font-bold mb-4">
                  ${results.estimatedTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Percent className="w-4 h-4" />
                  <span>Effective Tax Rate: {results.effectiveRate.toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">Gross Income</span>
                  </div>
                  <p className="text-2xl font-bold">
                    ${results.grossIncome.toLocaleString("en-US")}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <span className="text-sm text-muted-foreground">Take Home</span>
                  </div>
                  <p className="text-2xl font-bold text-success">
                    ${results.takeHome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Gross Income</span>
                  <span className="font-medium">${results.grossIncome.toLocaleString("en-US")}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Total Deductions</span>
                  <span className="font-medium text-success">-${results.totalDeductions.toLocaleString("en-US")}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Taxable Income</span>
                  <span className="font-medium">${results.taxableIncome.toLocaleString("en-US")}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Federal Tax</span>
                  <span className="font-medium text-destructive">
                    -${results.estimatedTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 font-semibold text-lg">
                  <span>Net Take Home</span>
                  <span className="text-success">
                    ${results.takeHome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
