
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

// Dummy Data
const topCustomersData = [
  { id: "cust1", name: "Alice W. (Greenwood H.)", totalOrders: 15, totalSpent: 12500 },
  { id: "cust2", name: "Bob T. (Oceanview T.)", totalOrders: 12, totalSpent: 9800 },
  { id: "cust3", name: "Charlie B. (Greenwood H.)", totalOrders: 10, totalSpent: 7500 },
];

const purchaseFrequencyData = [
  { segment: "Once a week", count: 25 },
  { segment: "2-3 times a month", count: 60 },
  { segment: "Once a month", count: 120 },
  { segment: "Less than once a month", count: 50 },
];


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
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-primary/80"/>Top Customers</CardTitle>
            <CardDescription>Customers with the highest spending or order frequency.</CardDescription>
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
                     <p className="text-muted-foreground">No customer data to display for top spenders/orderers.</p>
                </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary/80"/>Purchase Frequency</CardTitle>
            <CardDescription>How often customers are making purchases.</CardDescription>
          </CardHeader>
          <CardContent>
             {purchaseFrequencyData.length > 0 ? (
                <div className="space-y-2">
                    {purchaseFrequencyData.map(segment => (
                        <div key={segment.segment} className="flex justify-between items-center p-2 bg-muted/50 rounded text-sm">
                            <span>{segment.segment}:</span>
                            <span className="font-semibold">{segment.count} customers</span>
                        </div>
                    ))}
                </div>
             ) : (
                <div className="h-40 bg-muted rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground">Purchase frequency data will appear here.</p>
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
