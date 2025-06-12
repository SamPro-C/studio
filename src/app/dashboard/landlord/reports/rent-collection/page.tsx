
// src/app/dashboard/landlord/reports/rent-collection/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, DollarSign, PieChart, Filter, CalendarRange, FileDown } from 'lucide-react';

interface RentCollectionEntry {
  id: string;
  tenantName: string;
  apartmentUnit: string; // e.g. "Greenwood Heights / Unit A-101"
  month: string;
  amountDue: number;
  amountPaid: number;
  balance: number;
  status: 'Paid' | 'Unpaid' | 'Partial';
  paymentDate?: string;
}

const dummyRentCollectionData: RentCollectionEntry[] = [
  { id: "rc1", tenantName: "Alice Wonderland", apartmentUnit: "Greenwood Heights / A-101", month: "July 2024", amountDue: 1200, amountPaid: 1200, balance: 0, status: "Paid", paymentDate: "2024-07-01" },
  { id: "rc2", tenantName: "Bob The Builder", apartmentUnit: "Greenwood Heights / B-201", month: "July 2024", amountDue: 1500, amountPaid: 0, balance: 1500, status: "Unpaid" },
  { id: "rc3", tenantName: "Charlie Brown", apartmentUnit: "Oceanview Towers / C-505", month: "July 2024", amountDue: 2500, amountPaid: 2500, balance: 0, status: "Paid", paymentDate: "2024-07-03" },
  { id: "rc4", tenantName: "Alice Wonderland", apartmentUnit: "Greenwood Heights / A-101", month: "June 2024", amountDue: 1200, amountPaid: 1000, balance: 200, status: "Partial", paymentDate: "2024-06-05" },
  { id: "rc5", tenantName: "Edward Nygma", apartmentUnit: "Mountain Ridge Villas / Villa B", month: "July 2024", amountDue: 2900, amountPaid: 2900, balance: 0, status: "Paid", paymentDate: "2024-07-02" },
];

const totalDue = dummyRentCollectionData.reduce((sum, item) => sum + item.amountDue, 0);
const totalCollected = dummyRentCollectionData.reduce((sum, item) => sum + item.amountPaid, 0);
const totalOutstanding = totalDue - totalCollected;

export default function RentCollectionSummaryPage() {
  
  const handleExportData = () => {
    alert(`Export rent collection data to CSV/Excel. To be implemented.`);
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
              <PieChart className="mr-3 h-7 w-7" /> Rent Collection Summary
            </h1>
          </div>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Filters</CardTitle>
            <CardDescription>Refine the report data based on date range and property.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
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
            <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        {/* Summary Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rent Due</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {totalDue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">For the selected period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {totalCollected.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{((totalCollected/totalDue)*100 || 0).toFixed(1)}% collection rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
              <DollarSign className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {totalOutstanding.toLocaleString()}</div>
               <p className="text-xs text-muted-foreground">Across all filtered properties</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><PieChart className="mr-2 h-5 w-5 text-primary/80"/> Collection Trends</CardTitle>
            <CardDescription>Visual representation of rent collection over time (e.g., by month).</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
              <p className="text-muted-foreground text-center p-4">
                A chart (e.g., Bar chart showing Paid vs. Unpaid vs. Partial amounts per month/property) will be displayed here.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Table Section */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
                <CardTitle>Detailed Rent Collection Data</CardTitle>
                <CardDescription>Breakdown of rent status by tenant and unit.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
                <FileDown className="mr-2 h-4 w-4" /> Export Data
            </Button>
          </CardHeader>
          <CardContent>
            {dummyRentCollectionData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Property/Unit</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Amount Due</TableHead>
                      <TableHead className="text-right">Amount Paid</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyRentCollectionData.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.tenantName}</TableCell>
                        <TableCell>{entry.apartmentUnit}</TableCell>
                        <TableCell>{entry.month}</TableCell>
                        <TableCell className="text-right">KES {entry.amountDue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">KES {entry.amountPaid.toLocaleString()}</TableCell>
                        <TableCell className="text-right">KES {entry.balance.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            entry.status === 'Paid' ? 'default' 
                            : entry.status === 'Unpaid' ? 'destructive' 
                            : 'secondary' // For Partial
                          }>
                            {entry.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{entry.paymentDate || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No rent collection data available for the selected filters.</p>
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
