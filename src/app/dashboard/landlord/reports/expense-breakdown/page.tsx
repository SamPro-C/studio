
// src/app/dashboard/landlord/reports/expense-breakdown/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, FileText, Filter, FileDown, DollarSign, PieChart, Receipt } from 'lucide-react';

interface ExpenseEntry {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  property: string; // e.g. "Greenwood Heights" or "General"
  receiptUrl?: string; // Optional link to a receipt image/pdf
}

const dummyExpenseData: ExpenseEntry[] = [
  { id: "exp1", date: "2024-07-10", description: "Replaced kitchen faucet for Unit A-101", category: "Maintenance", amount: 1500, property: "Greenwood Heights", receiptUrl: "#" },
  { id: "exp2", date: "2024-07-12", description: "Cleaning supplies for common areas", category: "Supplies", amount: 550, property: "Oceanview Towers" },
  { id: "exp3", date: "2024-07-15", description: "Emergency roof repair after storm", category: "Repairs", amount: 12500, property: "Mountain Ridge Villas", receiptUrl: "#" },
  { id: "exp4", date: "2024-07-18", description: "Monthly gardening service", category: "Maintenance", amount: 3000, property: "Greenwood Heights" },
  { id: "exp5", date: "2024-07-20", description: "Common area electricity bill", category: "Utilities", amount: 4200, property: "General" },
  { id: "exp6", date: "2024-07-22", description: "Pest control service for all units", category: "Pest Control", amount: 2000, property: "Oceanview Towers" },
];

const expenseCategories = ["All", "Maintenance", "Supplies", "Repairs", "Utilities", "Pest Control", "Salaries", "Marketing", "Legal", "Other"];
const totalExpenses = dummyExpenseData.reduce((sum, item) => sum + item.amount, 0);
const averageExpensePerProperty = dummyExpenseData.length > 0 
    ? totalExpenses / new Set(dummyExpenseData.map(e => e.property)).size 
    : 0;

export default function ExpenseBreakdownReportPage() {
  
  const handleExportData = () => {
    alert(`Export expense breakdown data to CSV/Excel. To be implemented.`);
  };
  
  const handleViewReceipt = (receiptUrl: string | undefined) => {
    if (receiptUrl && receiptUrl !== "#") {
      alert(`Viewing receipt: ${receiptUrl}. In a real app, this would open the receipt.`);
    } else {
      alert("No receipt available for this expense.");
    }
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
              <FileText className="mr-3 h-7 w-7" /> Expense Breakdown Report
            </h1>
          </div>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Filters</CardTitle>
            <CardDescription>Refine the expense data based on date range, property, and category.</CardDescription>
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
                  <SelectItem value="general">General (No Specific Property)</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="category">Expense Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map(cat => <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full sm:w-auto self-end lg:col-start-4"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        {/* Summary Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">For the selected period/filters</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Number of Entries</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dummyExpenseData.length}</div>
              <p className="text-xs text-muted-foreground">Total expense transactions</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Expense/Property</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {averageExpensePerProperty.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
              <p className="text-xs text-muted-foreground">Across unique properties</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><PieChart className="mr-2 h-5 w-5 text-primary/80"/> Expense Distribution by Category</CardTitle>
            <CardDescription>Visual representation of expenses across different categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
              <p className="text-muted-foreground text-center p-4">
                A chart (e.g., Pie chart or Bar chart showing expense amounts per category) will be displayed here.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Table Section */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
                <CardTitle>Detailed Expense Data</CardTitle>
                <CardDescription>Breakdown of individual expense entries.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
                <FileDown className="mr-2 h-4 w-4" /> Export Data
            </Button>
          </CardHeader>
          <CardContent>
            {dummyExpenseData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead className="text-right">Amount (KES)</TableHead>
                      <TableHead className="text-center">Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyExpenseData.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                        <TableCell className="max-w-sm truncate" title={entry.description}>{entry.description}</TableCell>
                        <TableCell>{entry.category}</TableCell>
                        <TableCell>{entry.property}</TableCell>
                        <TableCell className="text-right">{entry.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                          {entry.receiptUrl ? (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewReceipt(entry.receiptUrl)}>
                              <Receipt className="h-4 w-4" />
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No expense data available for the selected filters.</p>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">This report reflects data based on the applied filters.</p>
          </CardFooter>
        </Card>

      </main>
    </div>
  );
}
