
// src/app/dashboard/shop-manager/reports/orders/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Package, Filter, FileDown, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const ordersByStatusData = [
  { status: "New", count: 15, fill: "hsl(var(--chart-1))" },
  { status: "Processing", count: 25, fill: "hsl(var(--chart-2))" },
  { status: "Out for Delivery", count: 10, fill: "hsl(var(--chart-3))" },
  { status: "Delivered", count: 65, fill: "hsl(var(--chart-4))" },
  { status: "Canceled", count: 5, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
  count: { label: "Order Count" },
  New: { label: "New", color: "hsl(var(--chart-1))" },
  Processing: { label: "Processing", color: "hsl(var(--chart-2))" },
  "Out for Delivery": { label: "Out for Delivery", color: "hsl(var(--chart-3))" },
  Delivered: { label: "Delivered", color: "hsl(var(--chart-4))" },
  Canceled: { label: "Canceled", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export default function ShopOrdersReportsPage() {
  const { toast } = useToast();
  const handleExport = () => toast({ title: "Exporting Report", description: "Order report export initiated (Placeholder)." });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/shop-manager/reports">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <Package className="mr-3 h-7 w-7" /> Order Reports
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Report Filters</CardTitle>
            <CardDescription>Filter order data by date range, status, etc.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            <div><Label htmlFor="startDate">Start Date</Label><Input id="startDate" type="date" /></div>
            <div><Label htmlFor="endDate">End Date</Label><Input id="endDate" type="date" /></div>
            {/* Add more filters like status, customer type */}
            <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary/80"/> Orders by Status</CardTitle>
            <CardDescription>Distribution of orders based on their current status.</CardDescription>
          </CardHeader>
          <CardContent>
            {ordersByStatusData.length > 0 ? (
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ordersByStatusData} layout="vertical" margin={{ left: 10, right: 20}}>
                      <CartesianGrid horizontal={false} />
                      <XAxis type="number" hide/>
                      <YAxis dataKey="status" type="category" tickLine={false} axisLine={false} tickMargin={8} width={100} className="text-xs"/>
                      <ChartTooltip 
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />} 
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="count" layout="vertical" radius={4}>
                           {ordersByStatusData.map((entry) => (
                              <Bar key={entry.status} dataKey="count" name={entry.status} fill={entry.fill} />
                          ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
            ) : (
                <div className="h-[300px] bg-muted rounded-md flex items-center justify-center border border-dashed">
                  <p className="text-muted-foreground">No order data available for chart.</p>
                </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Detailed Order List</CardTitle></CardHeader>
          <CardContent className="h-96 bg-muted rounded-md flex items-center justify-center border border-dashed">
            <p className="text-muted-foreground">Detailed Order Table Placeholder</p>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" onClick={handleExport}><FileDown className="mr-2 h-4 w-4" /> Export Full Report</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
