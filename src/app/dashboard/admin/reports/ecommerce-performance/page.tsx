
// src/app/dashboard/admin/reports/ecommerce-performance/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ShoppingCart, Filter, FileDown, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const salesTrendData = [
  { month: "Jan", sales: 5000 },
  { month: "Feb", sales: 7000 },
  { month: "Mar", sales: 6500 },
  { month: "Apr", sales: 8200 },
  { month: "May", sales: 9500 },
  { month: "Jun", sales: 11000 },
];

const chartConfig = {
  sales: {
    label: "Sales (KES)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;


export default function EcommercePerformanceReportPage() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({ title: "Exporting Report", description: "E-commerce performance report export initiated (Placeholder)." });
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
            <ShoppingCart className="mr-3 h-7 w-7" /> E-commerce Performance Report
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Report Filters</CardTitle>
            <CardDescription>Filter e-commerce data by date range, product category, etc.</CardDescription>
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
            {/* Optional: Filter by product category or shop manager */}
            <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Sales</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">KES 75,000</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Orders</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">120</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Average Order Value</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">KES 625</div></CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary/80"/> Sales Trends</CardTitle>
            <CardDescription>Chart displaying sales volume over time.</CardDescription>
          </CardHeader>
          <CardContent>
            {salesTrendData.length > 0 ? (
               <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesTrendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={8} 
                        className="text-xs"
                      />
                      <YAxis 
                        tickFormatter={(value) => `KES ${value/1000}k`} 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={8}
                        width={80}
                        className="text-xs"
                      />
                      <ChartTooltip 
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />} 
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
            ) : (
                <div className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground">Sales Trend Chart Placeholder</p>
                </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Top Selling Products/Services</CardTitle>
                <CardDescription>List of most popular items from the e-commerce platform.</CardDescription>
            </CardHeader>
            <CardContent className="h-60 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Top Products Table Placeholder</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
                <Button variant="outline" onClick={handleExport}><FileDown className="mr-2 h-4 w-4" /> Export Report</Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}
