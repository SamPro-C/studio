
// src/app/dashboard/landlord/reports/lease-expiry-tracker/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, Filter, FileDown, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { differenceInDays, formatDistanceToNowStrict, isFuture, isPast } from 'date-fns';

interface LeaseEntry {
  id: string;
  tenantName: string;
  tenantId: string;
  property: string;
  unitName: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: number;
}

const dummyLeaseData: LeaseEntry[] = [
  { id: "lease1", tenantName: "Alice Wonderland", tenantId: "tenant001", property: "Greenwood Heights", unitName: "A-101", leaseStartDate: "2023-08-01", leaseEndDate: "2024-07-31", monthlyRent: 1200 },
  { id: "lease2", tenantName: "Bob The Builder", tenantId: "tenant002", property: "Greenwood Heights", unitName: "B-201", leaseStartDate: "2023-09-15", leaseEndDate: "2024-09-14", monthlyRent: 1500 },
  { id: "lease3", tenantName: "Charlie Brown", tenantId: "tenant003", property: "Oceanview Towers", unitName: "C-505", leaseStartDate: "2024-01-01", leaseEndDate: "2024-12-31", monthlyRent: 2500 },
  { id: "lease4", tenantName: "Diana Prince", tenantId: "tenant004", property: "Mountain Ridge Villas", unitName: "Villa A", leaseStartDate: "2022-05-01", leaseEndDate: "2024-08-15", monthlyRent: 3200 }, // Expiring soon
  { id: "lease5", tenantName: "Edward Nygma", tenantId: "tenant005", property: "Mountain Ridge Villas", unitName: "Villa B", leaseStartDate: "2024-03-01", leaseEndDate: "2025-02-28", monthlyRent: 2900 }, // Further out
  { id: "lease6", tenantName: "Fiona Glenanne", tenantId: "tenant006", property: "Greenwood Heights", unitName: "A-103", leaseStartDate: "2023-06-01", leaseEndDate: "2024-06-30", monthlyRent: 1100 }, // Expired
];

const today = new Date();
const leasesExpiringNext30Days = dummyLeaseData.filter(lease => 
  differenceInDays(new Date(lease.leaseEndDate), today) >= 0 && differenceInDays(new Date(lease.leaseEndDate), today) <= 30
).length;
const leasesExpiringNext60Days = dummyLeaseData.filter(lease => 
  differenceInDays(new Date(lease.leaseEndDate), today) > 30 && differenceInDays(new Date(lease.leaseEndDate), today) <= 60
).length;
const totalActiveLeases = dummyLeaseData.filter(lease => isFuture(new Date(lease.leaseEndDate))).length;


export default function LeaseExpiryTrackerPage() {
  
  const handleExportData = () => {
    alert(`Export lease expiry data to CSV/Excel. To be implemented.`);
  };

  const handleInitiateRenewal = (tenantName: string) => {
    alert(`Initiate lease renewal process for ${tenantName}. To be implemented.`);
  };

  const getDaysRemainingDisplay = (leaseEndDate: string) => {
    const endDate = new Date(leaseEndDate);
    if (isPast(endDate)) {
      return <span className="text-destructive font-semibold">Expired</span>;
    }
    const days = differenceInDays(endDate, today);
    if (days <= 7) return <span className="text-destructive font-semibold">{days} Days</span>;
    if (days <= 30) return <span className="text-orange-500 font-semibold">{days} Days</span>;
    return <span className="text-green-600">{days} Days</span>;
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
              <CalendarDays className="mr-3 h-7 w-7" /> Lease Expiry Tracker
            </h1>
          </div>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Filters</CardTitle>
            <CardDescription>Refine the lease expiry data by date range, property, or status.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="expiryStartDate">Expiry After</Label>
              <Input id="expiryStartDate" type="date" />
            </div>
            <div>
              <Label htmlFor="expiryEndDate">Expiry Before</Label>
              <Input id="expiryEndDate" type="date" />
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
            <Button className="w-full sm:w-auto self-end lg:col-start-4"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        {/* Summary Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring (Next 30 Days)</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leasesExpiringNext30Days}</div>
              <p className="text-xs text-muted-foreground">Leases needing attention soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring (31-60 Days)</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leasesExpiringNext60Days}</div>
              <p className="text-xs text-muted-foreground">Plan for upcoming renewals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Active Leases</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalActiveLeases}</div>
               <p className="text-xs text-muted-foreground">Currently ongoing leases</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Detailed Lease Expiry Table */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
                <CardTitle>Lease Expiry Details</CardTitle>
                <CardDescription>Breakdown of upcoming and recent lease expirations.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
                <FileDown className="mr-2 h-4 w-4" /> Export Data
            </Button>
          </CardHeader>
          <CardContent>
            {dummyLeaseData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant Name</TableHead>
                      <TableHead>Property / Unit</TableHead>
                      <TableHead>Lease Start Date</TableHead>
                      <TableHead>Lease End Date</TableHead>
                      <TableHead>Monthly Rent (KES)</TableHead>
                      <TableHead className="text-center">Status / Days Remaining</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyLeaseData.map((lease) => (
                      <TableRow key={lease.id} className={isPast(new Date(lease.leaseEndDate)) ? "bg-muted/30" : ""}>
                        <TableCell>{lease.tenantName}</TableCell>
                        <TableCell>{lease.property} / {lease.unitName}</TableCell>
                        <TableCell>{new Date(lease.leaseStartDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(lease.leaseEndDate).toLocaleDateString()}</TableCell>
                        <TableCell>KES {lease.monthlyRent.toLocaleString()}</TableCell>
                        <TableCell className="text-center">{getDaysRemainingDisplay(lease.leaseEndDate)}</TableCell>
                        <TableCell className="text-right space-x-1">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={`/dashboard/landlord/tenants/${lease.tenantId}`}>
                                    <ExternalLink className="h-3 w-3 mr-1"/> Tenant
                                </Link>
                            </Button>
                            {!isPast(new Date(lease.leaseEndDate)) && (
                                <Button variant="outline" size="sm" onClick={() => handleInitiateRenewal(lease.tenantName)}>
                                    Renew
                                </Button>
                            )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No lease data available for the selected filters.</p>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">This report reflects data based on the applied filters. Please verify lease terms regularly.</p>
          </CardFooter>
        </Card>

      </main>
    </div>
  );
}

