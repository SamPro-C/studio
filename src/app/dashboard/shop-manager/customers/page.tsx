
// src/app/dashboard/shop-manager/customers/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Users, Search, ExternalLink } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ShopCustomer {
  id: string; // tenantId from main system
  name: string;
  apartmentUnit: string; // e.g. "Greenwood H. / A101"
  totalOrders: number;
  totalSpent: number;
}

const dummyShopCustomers: ShopCustomer[] = [
  { id: "tenant001", name: "Alice W.", apartmentUnit: "Greenwood H. / A101", totalOrders: 5, totalSpent: 6500 },
  { id: "tenant003", name: "Charlie B.", apartmentUnit: "Oceanview T. / C203", totalOrders: 2, totalSpent: 3000 },
  { id: "tenant005", name: "Edward N.", apartmentUnit: "Mountain R.V. / Villa B", totalOrders: 8, totalSpent: 12000 },
];

export default function ShopCustomerManagementPage() {
  const { toast } = useToast();

  const handleViewOrderHistory = (customerId: string, customerName: string) => {
    // In a real app, this would filter the orders page or go to a specific customer order history view
    toast({ title: "View Order History", description: `Showing order history for ${customerName}. (Placeholder - would link to filtered orders)` });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/shop-manager">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <Users className="mr-3 h-7 w-7" /> Customer Management
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Shop Customers</CardTitle>
            <CardDescription>View tenants who have placed orders through your shop.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <label htmlFor="searchCustomers" className="sr-only">Search Customers</label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="searchCustomers" type="search" placeholder="Search by Customer Name or Apartment/Unit..." className="pl-9" />
              </div>
            </div>

            {dummyShopCustomers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Apartment / Unit</TableHead>
                      <TableHead className="text-right">Total Orders</TableHead>
                      <TableHead className="text-right">Total Spent (KES)</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyShopCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell className="text-xs">{customer.apartmentUnit}</TableCell>
                        <TableCell className="text-right">{customer.totalOrders}</TableCell>
                        <TableCell className="text-right">{customer.totalSpent.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrderHistory(customer.id, customer.name)}>
                            View Orders <ExternalLink className="ml-2 h-3 w-3"/>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No customers found.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
