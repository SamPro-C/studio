
// src/app/dashboard/landlord/reports/profit-loss/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, BarChart3, Filter, FileDown, DollarSign } from 'lucide-react';

interface PnLEntry {
  category: string;
  amount: number;
}

interface PnLData {
  income: PnLEntry[];
  expenses: PnLEntry[];
}

// Dummy data for Profit & Loss
const dummyPnLData: PnLData = {
  income: [
    { category: "Rental Income", amount: 78000 },
    { category: "Late Fees Collected", amount: 500 },
    { category: "Application Fees", amount: 200 },
  ],
  expenses: [
    { category: "Maintenance & Repairs", amount: 12500 },
    { category: "Utilities (Common Area)", amount: 4200 },
    { category: "Management Fees", amount: 7800 }, // Assuming 10% of rental income
    { category: "Property Taxes", amount: 15000 },
    { category: "Insurance", amount: 3000 },
    { category: "Supplies", amount: 550 },
  ],
};

const totalIncome = dummyPnLData.income.reduce((sum, item) => sum + item.amount, 0);
const totalExpenses = dummyPnLData.expenses.reduce((sum, item) => sum + item.amount, 0);
const netProfitLoss = totalIncome - totalExpenses;

export default function ProfitLossStatementPage() {
  
  const handleExportData = () => {
    alert(`Export Profit & Loss Statement to CSV/Excel. To be implemented.`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord/reports">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/landlord/reports" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to Reports
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <BarChart3 className="mr-3 h-7 w-7" /> Profit & Loss Statement
            </h1>
          </div>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Filters</CardTitle>
            <CardDescription>Generate the P&L statement for a specific period and property.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
            <div>
              <Label htmlFor="property">Property</Label>
              <Select>
                <SelectTrigger id="property">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="apt1">Greenwood Heights</SelectItem>
                  <SelectItem value="apt2">Oceanview Towers</SelectItem>
                  <SelectItem value="apt3">Mountain Ridge Villas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full sm:w-auto self-end lg:col-start-4"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        {/* Summary Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">For the selected period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit / (Loss)</CardTitle>
              <DollarSign className={`h-4 w-4 ${netProfitLoss >= 0 ? 'text-green-500' : 'text-destructive'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                KES {netProfitLoss.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">{netProfitLoss >= 0 ? 'Profit' : 'Loss'}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Detailed P&L Table */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
                <CardTitle>Detailed Statement</CardTitle>
                <CardDescription>Breakdown of income and expenses.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
                <FileDown className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-3/4">Category</TableHead>
                    <TableHead className="text-right w-1/4">Amount (KES)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Income Section */}
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={2} className="font-semibold text-primary">Income</TableCell>
                  </TableRow>
                  {dummyPnLData.income.map((item) => (
                    <TableRow key={`income-${item.category}`}>
                      <TableCell className="pl-8">{item.category}</TableCell>
                      <TableCell className="text-right">{item.amount.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-semibold border-t">
                    <TableCell className="pl-8">Total Income</TableCell>
                    <TableCell className="text-right text-green-600">KES {totalIncome.toLocaleString()}</TableCell>
                  </TableRow>

                  {/* Expenses Section */}
                  <TableRow className="bg-muted/30 mt-4">
                    <TableCell colSpan={2} className="font-semibold text-primary">Expenses</TableCell>
                  </TableRow>
                  {dummyPnLData.expenses.map((item) => (
                    <TableRow key={`expense-${item.category}`}>
                      <TableCell className="pl-8">{item.category}</TableCell>
                      <TableCell className="text-right">({item.amount.toLocaleString()})</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-semibold border-t">
                    <TableCell className="pl-8">Total Expenses</TableCell>
                    <TableCell className="text-right text-red-600">(KES {totalExpenses.toLocaleString()})</TableCell>
                  </TableRow>

                  {/* Net Profit/Loss Section */}
                  <TableRow className="font-bold border-t-2 border-primary/50 text-lg">
                    <TableCell>Net Profit / (Loss)</TableCell>
                    <TableCell className={`text-right ${netProfitLoss >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                      KES {netProfitLoss.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">This statement is based on the selected filters and recorded transactions.</p>
          </CardFooter>
        </Card>

      </main>
    </div>
  );
}
