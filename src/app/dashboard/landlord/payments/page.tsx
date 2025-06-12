
// src/app/dashboard/landlord/payments/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft, Search, DollarSign, Mail, Filter, FileDown, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Dummy data - replace with actual data fetching
const paidRentData = [
  { id: "pay1", tenantName: "Alice Wonderland", apartment: "Greenwood Heights", unit: "A-101", room: "Master Bedroom", amountPaid: 1200, paymentDate: "2024-07-01", method: "M-Pesa", transactionId: "SGH7ABCD" },
  { id: "pay2", tenantName: "Charlie Brown", apartment: "Oceanview Towers", unit: "C-505", room: "Penthouse Suite", amountPaid: 2500, paymentDate: "2024-07-03", method: "Card", transactionId: "txn_123" },
  { id: "pay3", tenantName: "Diana Prince", apartment: "Mountain Ridge Villas", unit: "Villa A", room: "Main Villa Space", amountPaid: 3200, paymentDate: "2024-07-05", method: "Bank Transfer", transactionId: "BANK987" },
];

const unpaidRentData = [
  { id: "unpaid1", tenantName: "Bob The Builder", apartment: "Greenwood Heights", unit: "B-201", room: "Studio Main Room", amountDue: 1500, dueDate: "2024-07-05", tenantId: "tenant002" },
  { id: "unpaid2", tenantName: "Edward Nygma", apartment: "Mountain Ridge Villas", unit: "Villa B", room: "Cozy Villa Retreat", amountDue: 2900, dueDate: "2024-07-10", tenantId: "tenant005" }, // Assume tenant005 exists
];

export default function RentPaymentOverviewPage() {
  const router = useRouter();

  const handleAddManualPayment = () => {
    router.push('/dashboard/landlord/payments/new');
  };

  const handleSendReminders = () => {
    alert("Functionality to send bulk reminders to unpaid tenants. To be implemented.");
  };

  const handleExportData = (tableType: 'paid' | 'unpaid') => {
    alert(`Export ${tableType} rent data to CSV/Excel. To be implemented.`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/landlord">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <DollarSign className="mr-3 h-7 w-7" /> Rent Payment Overview
            </h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddManualPayment}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Manual Payment
            </Button>
            <Button variant="outline" onClick={handleSendReminders}>
              <Mail className="mr-2 h-4 w-4" /> Send Reminders
            </Button>
          </div>
        </div>

        {/* Paid Rent Section */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <CardTitle>Paid Rent</CardTitle>
              <CardDescription>Payments received from tenants.</CardDescription>
            </div>
            <div className="flex gap-2 items-center w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search tenants..." className="pl-9 h-9 w-full sm:w-auto" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Month</DropdownMenuItem>
                  <DropdownMenuItem>Year</DropdownMenuItem>
                  <DropdownMenuItem>Apartment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" className="h-9" onClick={() => handleExportData('paid')}>
                <FileDown className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {paidRentData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Amount Paid</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Transaction ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paidRentData.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {payment.tenantName}
                          <div className="text-xs text-muted-foreground">{payment.apartment} / {payment.unit} / {payment.room}</div>
                        </TableCell>
                        <TableCell>{payment.apartment}</TableCell>
                        <TableCell>${payment.amountPaid.toLocaleString()}</TableCell>
                        <TableCell>{payment.paymentDate}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{payment.transactionId}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No paid rent records found for the selected filters.</p>
            )}
          </CardContent>
        </Card>

        {/* Unpaid Rent Section */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <CardTitle>Unpaid Rent</CardTitle>
              <CardDescription>Tenants with outstanding rent payments.</CardDescription>
            </div>
             <div className="flex gap-2 items-center w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search tenants..." className="pl-9 h-9 w-full sm:w-auto" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Month</DropdownMenuItem>
                  <DropdownMenuItem>Year</DropdownMenuItem>
                  <DropdownMenuItem>Apartment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" className="h-9" onClick={() => handleExportData('unpaid')}>
                <FileDown className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {unpaidRentData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Amount Due</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unpaidRentData.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {payment.tenantName}
                          <div className="text-xs text-muted-foreground">{payment.apartment} / {payment.unit} / {payment.room}</div>
                        </TableCell>
                        <TableCell>{payment.apartment}</TableCell>
                        <TableCell>${payment.amountDue.toLocaleString()}</TableCell>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/landlord/tenants/${payment.tenantId}`}>View Tenant</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No unpaid rent records found for the selected filters.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="destructive" onClick={handleSendReminders}>Send Reminders to All Unpaid</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
