
// src/app/dashboard/admin/system-oversight/ecommerce-oversight/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, DollarSign, Package, Users, ExternalLink, Settings, BarChart3 } from 'lucide-react';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const dummyEcommerceData = {
  totalSales: 75000,
  totalOrders: 120,
  activeShopManagers: 5,
  topProducts: [
    { name: "Cleaning Service", sales: 15000 },
    { name: "Snack Pack", sales: 12000 },
    { name: "Laundry Detergent", sales: 9000 },
  ],
  salesTrend: [
    { month: "Jan", sales: 5000 },
    { month: "Feb", sales: 7000 },
    { month: "Mar", sales: 6500 },
    { month: "Apr", sales: 8200 },
    { month: "May", sales: 9500 },
    { month: "Jun", sales: 11000 },
  ]
};

const salesChartConfig = {
  sales: { label: "Sales (KES)", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;


export default function EcommerceOversightPage() {
  const { toast } = useToast();

  const handleNavigate = (path: string) => {
    toast({ title: "Navigate (Placeholder)", description: `Attempting to navigate to e-commerce section: ${path}.`});
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
            <ShoppingCart className="mr-3 h-7 w-7" /> E-commerce Platform Oversight
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shop Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {dummyEcommerceData.totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Lifetime platform sales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders Processed</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dummyEcommerceData.totalOrders}</div>
              <p className="text-xs text-muted-foreground">Across all shops</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shop Managers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dummyEcommerceData.activeShopManagers}</div>
                <Button variant="link" size="sm" className="p-0 h-auto text-xs" asChild>
                    <Link href="/dashboard/admin/user-management/shop-managers">Manage Shop Managers</Link>
                </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary/80"/>Sales Trends</CardTitle>
                <CardDescription>Monthly sales performance across the e-commerce platform.</CardDescription>
            </CardHeader>
            <CardContent>
            {dummyEcommerceData.salesTrend.length > 0 ? (
                <ChartContainer config={salesChartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dummyEcommerceData.salesTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
                        <YAxis tickFormatter={(value) => `KES ${value/1000}k`} tickLine={false} axisLine={false} tickMargin={8} width={70} className="text-xs"/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            ) : (
                <div className="h-[300px] bg-muted rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground">No sales trend data to display.</p>
                </div>
            )}
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>E-commerce Management Links</CardTitle>
            <CardDescription>Quick access to related e-commerce management areas.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <Button variant="outline" onClick={() => handleNavigate("/orders")}>
                <Package className="mr-2 h-4 w-4" /> View All Shop Orders (Read-Only) <ExternalLink className="ml-2 h-3 w-3"/>
            </Button>
            <Button variant="outline" onClick={() => handleNavigate("/products")}>
                <Settings className="mr-2 h-4 w-4" /> Manage Categories/Products (Restricted) <ExternalLink className="ml-2 h-3 w-3"/>
            </Button>
             <Button variant="outline" asChild>
                <Link href="/dashboard/admin/user-management/shop-managers">
                    <Users className="mr-2 h-4 w-4" /> Manage Shop Manager Accounts
                </Link>
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Direct e-commerce management might be handled in a separate admin interface for the shop platform. These links provide oversight or restricted access.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
    