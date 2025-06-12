
// src/app/dashboard/tenant/payments/history/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Receipt, Search, Filter, FileText } from 'lucide-react';

interface PaymentRecord {
  id: string;
  monthYear: string;
  amountDue: number;
  amountPaid: number;
  paymentDate: string | null;
  paymentMethod: string | null;
  transactionId: string | null;
  status: 'Paid' | 'Unpaid' | 'Partial' | 'Overdue';
}

// Dummy payment history data
const dummyPaymentHistory: PaymentRecord[] = [
  { id: "pay1", monthYear: "July 2024", amountDue: 1200, amountPaid: 1200, paymentDate: "2024-07-01", paymentMethod: "M-Pesa", transactionId: "SGH7ABCD", status: "Paid" },
  { id: "pay2", monthYear: "June 2024", amountDue: 1200, amountPaid: 1200, paymentDate: "2024-06-01", paymentMethod: "Card", transactionId: "txn_12345", status: "Paid" },
  { id: "pay3", monthYear: "May 2024", amountDue: 1200, amountPaid: 1000, paymentDate: "2024-05-05", paymentMethod: "M-Pesa", transactionId: "SGE5EFGH", status: "Partial" },
  { id: "pay4", monthYear: "April 2024", amountDue: 1200, amountPaid: 0, paymentDate: null, paymentMethod: null, transactionId: null, status: "Overdue" },
  { id: "pay5", monthYear: "March 2024", amountDue: 1100, amountPaid: 1100, paymentDate: "2024-03-02", paymentMethod: "Bank Transfer", transactionId: "BANK001", status: "Paid" },
];

export default function PaymentHistoryPage() {

  const handleViewReceipt = (transactionId: string | null) => {
    alert(`View receipt for transaction ID: ${transactionId || 'N/A'}. Functionality to be implemented.`);
  };
  
  const handleExportHistory = () => {
     alert(`Export payment history to PDF/CSV. Functionality to be implemented.`);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tenant">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <Receipt className="mr-3 h-7 w-7" /> Payment History
          </h1>
        </div>
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
                <CardTitle>Your Past Payments</CardTitle>
                <CardDescription>Review all your previous rent payments and their status.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportHistory}>
                <FileText className="mr-2 h-4 w-4"/> Export History
            </Button>
          </CardHeader>
          <CardContent>
            {/* Filters Section */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
                <div className="relative">
                    <Label htmlFor="searchTransaction">Search Transaction ID</Label>
                    <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="searchTransaction" type="search" placeholder="Enter Transaction ID..." className="pl-9 mt-1" />
                </div>
                <div>
                    <Label htmlFor="filterYear">Filter by Year</Label>
                    <Select>
                        <SelectTrigger id="filterYear" className="mt-1">
                        <SelectValue placeholder="All Years" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="filterStatus">Filter by Status</Label>
                    <Select>
                        <SelectTrigger id="filterStatus" className="mt-1">
                        <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Payment Table */}
            {dummyPaymentHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month/Year</TableHead>
                      <TableHead className="text-right">Amount Due</TableHead>
                      <TableHead className="text-right">Amount Paid</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyPaymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.monthYear}</TableCell>
                        <TableCell className="text-right">KES {payment.amountDue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">KES {payment.amountPaid.toLocaleString()}</TableCell>
                        <TableCell>{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'N/A'}</TableCell>
                        <TableCell>{payment.paymentMethod || 'N/A'}</TableCell>
                        <TableCell className="text-sm max-w-[100px] truncate" title={payment.transactionId || undefined}>{payment.transactionId || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant={
                            payment.status === 'Paid' ? 'default' 
                            : payment.status === 'Unpaid' ? 'destructive' 
                            : payment.status === 'Overdue' ? 'destructive'
                            : 'secondary' // For Partial
                          }>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {payment.status === 'Paid' || payment.status === 'Partial' ? (
                            <Button variant="ghost" size="sm" onClick={() => handleViewReceipt(payment.transactionId)}>
                              <FileText className="h-4 w-4" />
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No payment history found for the selected filters.</p>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
                Contact your landlord or property manager if you have any questions about your payment history.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
