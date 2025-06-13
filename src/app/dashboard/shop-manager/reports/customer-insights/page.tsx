
// src/app/dashboard/shop-manager/reports/customer-insights/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Users, Filter, FileDown, TrendingUp, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

// Dummy Data
const topCustomersData = [
  { id: "cust4", name: "Diana P. (Mountain R.V.)", totalOrders: 5, totalSpent: 15000 },
  { id: "cust1", name: "Alice W. (Greenwood H.)", totalOrders: 15, totalSpent: 12500 },
  { id: "cust5", name: "Edward N. (Greenwood H.)", totalOrders: 20, totalSpent: 11000 },
  { id: "cust2", name: "Bob T. (Oceanview T.)", totalOrders: 12, totalSpent: 9800 },
  { id: "cust3", name: "Charlie B. (Greenwood H.)", totalOrders: 10, totalSpent: 7500 },
];

const chartTopCustomersData = topCustomersData
  .slice(0, 5) // Take top 5 for the chart
  .map((c, index) => ({ 
    name: c.name.split('(')[0].trim(), // Simplify name for chart
    totalSpent: c.totalSpent,
    fill: `hsl(var(--chart-${index + 1}))` 
  }));

const topCustomersChartConfig = {
  totalSpent: { label: "Total Spent (KES)" },
  "Diana P.": { label: "Diana P.", color: "hsl(var(--chart-1))" },
  "Alice W.": { label: "Alice W.", color: "hsl(var(--chart-2))" },
  "Edward N.": { label: "Edward N.", color: "hsl(var(--chart-3))" },
  "Bob T.": { label: "Bob T.", color: "hsl(var(--chart-4))" },
  "Charlie B.": { label: "Charlie B.", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;


const purchaseFrequencyData = [
  { segment: "Once a week", count: 25, fill: "hsl(var(--chart-1))" },
  { segment: "2-3 times/month", count: 60, fill: "hsl(var(--chart-2))" },
  { segment: "Once a month", count: 120, fill: "hsl(var(--chart-3))" },
  { segment: "< Once/month", count: 50, fill: "hsl(var(--chart-4))" },
];

const purchaseFreqChartConfig = {
  count: { label: "Customer Count" },
  "Once a week": { label: "Once a week", color: "hsl(var(--chart-1))" },
  "2-3 times/month": { label: "2-3 times/month", color: "hsl(var(--chart-2))" },
  "Once a month": { label: "Once a month", color: "hsl(var(--chart-3))" },
  "< Once/month": { label: "< Once/month", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;


export default function ShopCustomerInsightsPage() {
  const { toast } = useToast();
  const handleExport = () => toast({ title: "Exporting Report", description: "Customer insights export initiated (Placeholder)." });

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
            <Users className="mr-3 h-7 w-7" /> Customer Insights
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Report Filters</CardTitle>
            <CardDescription>Analyze customer purchasing behavior and demographics.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            <div><Label htmlFor="dateRange">Date Range</Label><Input id="dateRange" type="date" /></div>
            <div><Label htmlFor="apartmentComplex">Apartment Complex</Label><Input id="apartmentComplex" placeholder="e.g., Greenwood Heights"/></div>
            <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-primary/80"/>Top Customers by Spending</CardTitle>
                <CardDescription>Customers with the highest total spending.</CardDescription>
            </CardHeader>
            <CardContent>
                {chartTopCustomersData.length > 0 ? (
                    <ChartContainer config={topCustomersChartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartTopCustomersData} layout="vertical" margin={{ right: 20, left: 10 }}>
                        <CartesianGrid horizontal={false} />
                        <XAxis type="number" dataKey="totalSpent" tickFormatter={(value) => `KES ${value/1000}k`} className="text-xs"/>
                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={5} width={80} className="text-xs"/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Bar dataKey="totalSpent" layout="vertical" radius={4}>
                            {chartTopCustomersData.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                            ))}
                        </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    </ChartContainer>
                ): (
                    <div className="h-[300px] bg-muted rounded-md flex items-center justify-center border border-dashed">
                        <p className="text-muted-foreground">No customer spending data to display.</p>
                    </div>
                )}
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary/80"/>Purchase Frequency</CardTitle>
                <CardDescription>Distribution of customers by how often they purchase.</CardDescription>
            </CardHeader>
            <CardContent>
                {purchaseFrequencyData.length > 0 ? (
                    <ChartContainer config={purchaseFreqChartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={purchaseFrequencyData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="segment" tickLine={false} axisLine={false} tickMargin={8} angle={-15} textAnchor="end" height={50} className="text-xs"/>
                        <YAxis allowDecimals={false} className="text-xs"/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {purchaseFrequencyData.map((entry) => (
                                <Cell key={`cell-${entry.segment}`} fill={entry.fill} />
                            ))}
                        </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    </ChartContainer>
                ) : (
                    <div className="h-[300px] bg-muted rounded-md flex items-center justify-center border border-dashed">
                        <p className="text-muted-foreground">Purchase frequency data will appear here.</p>
                    </div>
                )}
            </CardContent>
            </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Customer List</CardTitle>
            <CardDescription>Table view of top customers (can be expanded for all customers).</CardDescription>
          </CardHeader>
          <CardContent>
            {topCustomersData.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer Name</TableHead>
                            <TableHead className="text-right">Total Orders</TableHead>
                            <TableHead className="text-right">Total Spent (KES)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topCustomersData.map(customer => (
                            <TableRow key={customer.id}>
                                <TableCell className="font-medium">{customer.name}</TableCell>
                                <TableCell className="text-right">{customer.totalOrders}</TableCell>
                                <TableCell className="text-right">{customer.totalSpent.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ): (
                <div className="h-40 bg-muted rounded-md flex items-center justify-center border border-dashed">
                     <p className="text-muted-foreground">No customer data to display in table.</p>
                </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" onClick={handleExport}><FileDown className="mr-2 h-4 w-4" /> Export Full Report</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
