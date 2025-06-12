
// src/app/dashboard/admin/reports/financial-performance/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, DollarSign, Filter, FileDown, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const revenueExpenseTrendData = [
  { month: "Jan", revenue: 80000, expenses: 30000 },
  { month: "Feb", revenue: 95000, expenses: 35000 },
  { month: "Mar", revenue: 75000, expenses: 28000 },
  { month: "Apr", revenue: 110000, expenses: 40000 },
  { month: "May", revenue: 100000, expenses: 38000 },
  { month: "Jun", revenue: 120000, expenses: 45000 },
];

const expenseCategoryData = [
  { name: "Maintenance", value: 150000, fill: "hsl(var(--chart-1))" },
  { name: "Salaries/Commissions", value: 100000, fill: "hsl(var(--chart-2))" },
  { name: "Platform Fees", value: 50000, fill: "hsl(var(--chart-3))" },
  { name: "Marketing", value: 30000, fill: "hsl(var(--chart-4))" },
  { name: "Operational Costs", value: 20000, fill: "hsl(var(--chart-5))" },
];

const revExpChartConfig = {
  revenue: { label: "Revenue (KES)", color: "hsl(var(--chart-1))" },
  expenses: { label: "Expenses (KES)", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const expenseCatChartConfig = {
  Maintenance: { label: "Maintenance", color: "hsl(var(--chart-1))" },
  "Salaries/Commissions": { label: "Salaries/Commissions", color: "hsl(var(--chart-2))" },
  "Platform Fees": { label: "Platform Fees", color: "hsl(var(--chart-3))" },
  Marketing: { label: "Marketing", color: "hsl(var(--chart-4))" },
  "Operational Costs": { label: "Operational Costs", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;


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
            <CardContent>
                {revenueExpenseTrendData.length > 0 ? (
                <ChartContainer config={revExpChartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueExpenseTrendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis 
                        tickFormatter={(value) => `KES ${value/1000}k`} 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={8}
                        width={80}
                      />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                ) : (
                <div className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground">Revenue/Expense Trend Chart Placeholder</p>
                </div>
                )}
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><PieChartIcon className="mr-2 h-5 w-5 text-primary/80"/> Expense Category Breakdown</CardTitle>
                <CardDescription>Distribution of expenses across categories.</CardDescription>
            </CardHeader>
            <CardContent>
                {expenseCategoryData.length > 0 ? (
                <ChartContainer config={expenseCatChartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="name" />} />
                        <Pie data={expenseCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {expenseCategoryData.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                    </RechartsPieChart>
                    </ResponsiveContainer>
                </ChartContainer>
                ) : (
                <div className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground">Expense Pie Chart Placeholder</p>
                </div>
                )}
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

