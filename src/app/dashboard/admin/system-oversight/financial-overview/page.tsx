
// src/app/dashboard/admin/system-oversight/financial-overview/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, BarChart3, DollarSign, FileDown, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const dummyFinancialData = {
  totalRentCollected: 1500000,
  totalOutstandingRent: 120000,
  totalSystemExpenses: 350000,
  topLandlordsByRevenue: [
    { landlord: "John L.", revenue: 500000 },
    { landlord: "Jane P.", revenue: 450000 },
    { landlord: "Alice R.", revenue: 300000 },
    { landlord: "Peter E.", revenue: 150000 },
    { landlord: "Sam B.", revenue: 100000 },
  ],
  expenseDistribution: [
    { name: "Maintenance", value: 150000, fill: "hsl(var(--chart-1))" },
    { name: "Commissions", value: 100000, fill: "hsl(var(--chart-2))" },
    { name: "Platform Fees", value: 50000, fill: "hsl(var(--chart-3))" },
    { name: "Marketing", value: 50000, fill: "hsl(var(--chart-4))" },
  ]
};

const revenueChartConfig = {
  revenue: { label: "Revenue (KES)", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const expenseChartConfig = {
   Maintenance: { label: "Maintenance", color: "hsl(var(--chart-1))" },
   Commissions: { label: "Commissions", color: "hsl(var(--chart-2))" },
   "Platform Fees": { label: "Platform Fees", color: "hsl(var(--chart-3))" },
   Marketing: { label: "Marketing", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;


export default function GlobalFinancialOverviewPage() {

  const handleDownloadReport = (reportType: string) => {
    alert(`Downloading ${reportType} report. (Placeholder)`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/admin/system-oversight">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <BarChart3 className="mr-3 h-7 w-7" /> Global Financial Overview
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Date Range Filter</CardTitle>
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
            <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rent Collected</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {dummyFinancialData.totalRentCollected.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">For the selected period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Outstanding Rent</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {dummyFinancialData.totalOutstandingRent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all properties</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total System Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {dummyFinancialData.totalSystemExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Platform operational costs</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Revenue by Top Landlords</CardTitle>
                    <CardDescription>Platform revenue generated by top performing landlords.</CardDescription>
                </CardHeader>
                <CardContent>
                 {dummyFinancialData.topLandlordsByRevenue.length > 0 ? (
                    <ChartContainer config={revenueChartConfig} className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dummyFinancialData.topLandlordsByRevenue} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                            <XAxis dataKey="landlord" tickLine={false} axisLine={false} tickMargin={8} className="text-xs"/>
                            <YAxis tickFormatter={(value) => `KES ${value/1000}k`} tickLine={false} axisLine={false} tickMargin={8} width={80} className="text-xs"/>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                  ) : (
                    <div className="h-[300px] bg-muted rounded-md flex items-center justify-center border border-dashed">
                      <p className="text-muted-foreground">No landlord revenue data to display.</p>
                    </div>
                  )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Expense Distribution</CardTitle>
                    <CardDescription>Breakdown of system-wide expenses by category.</CardDescription>
                </CardHeader>
                <CardContent>
                {dummyFinancialData.expenseDistribution.length > 0 ? (
                    <ChartContainer config={expenseChartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="name" />} />
                        <Pie data={dummyFinancialData.expenseDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {dummyFinancialData.expenseDistribution.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                    </ChartContainer>
                ) : (
                    <div className="h-[300px] bg-muted rounded-md flex items-center justify-center border border-dashed">
                      <p className="text-muted-foreground">No expense data to display.</p>
                    </div>
                )}
                </CardContent>
            </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Download Reports</CardTitle>
            <CardDescription>Download aggregated financial reports for the selected period.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => handleDownloadReport("Rent Collection Summary")}>
              <FileDown className="mr-2 h-4 w-4" /> Rent Collection Summary (CSV)
            </Button>
            <Button variant="outline" onClick={() => handleDownloadReport("Expense Report")}>
              <FileDown className="mr-2 h-4 w-4" /> Expense Report (PDF)
            </Button>
             <Button variant="outline" onClick={() => handleDownloadReport("Full Financial Statement")}>
              <FileDown className="mr-2 h-4 w-4" /> Full Financial Statement (Excel)
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Access to individual tenant payment details is restricted and logged for auditing purposes.
            </p>
          </CardFooter>
        </Card>

      </main>
    </div>
  );
}

    
