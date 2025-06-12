
// src/app/dashboard/admin/reports/financial-performance/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, DollarSign, Filter, FileDown, BarChart3, PieChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FinancialPerformanceReportPage() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({ title: "Exporting Report", description: "Financial performance report export initiated (Placeholder)." });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/admin/reports">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <DollarSign className="mr-3 h-7 w-7" /> Financial Performance Report
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Report Filters</CardTitle>
            <CardDescription>Filter financial data by date range and property (if applicable).</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
            {/* Optional: Filter by specific landlord or property if needed for admin view */}
            <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Rent Collected</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">KES 1,250,000</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Expenses</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">KES 350,000</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Net Operating Income</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-green-600">KES 900,000</div></CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary/80"/> Revenue vs. Expense Trend</CardTitle>
                <CardDescription>Monthly trends for total revenue and expenses.</CardDescription>
            </CardHeader>
            <CardContent className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Revenue/Expense Trend Chart Placeholder</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><PieChart className="mr-2 h-5 w-5 text-primary/80"/> Expense Category Breakdown</CardTitle>
                <CardDescription>Distribution of expenses across categories.</CardDescription>
            </CardHeader>
            <CardContent className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Expense Pie Chart Placeholder</p>
            </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Payment Gateway Performance</CardTitle>
                <CardDescription>Metrics on transaction success rates, fees, etc.</CardDescription>
            </CardHeader>
            <CardContent className="h-40 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Payment Gateway Metrics Placeholder</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
                <Button variant="outline" onClick={handleExport}><FileDown className="mr-2 h-4 w-4" /> Export Report</Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}
