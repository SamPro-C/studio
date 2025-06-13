
// /src/app/dashboard/tenant/shopping-orders/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingBag, Filter, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

type OrderStatus = 'Order Placed' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Canceled';

interface CartItem { // Define CartItem if not already globally available
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  aiHint: string;
}
interface TenantShopOrder {
  orderId: string;
  orderDate: string;
  status: OrderStatus;
  items: CartItem[];
  totalAmount: number;
  // Add other relevant fields if stored
}

export default function TenantShoppingOrdersPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [orders, setOrders] = useState<TenantShopOrder[]>([]);

  useEffect(() => {
    const storedOrdersString = localStorage.getItem('rentizziTenantOrders');
    if (storedOrdersString) {
      const storedOrdersObject: Record<string, TenantShopOrder> = JSON.parse(storedOrdersString);
      const ordersArray = Object.values(storedOrdersObject).sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      setOrders(ordersArray);
    }
  }, []);

  const getStatusBadgeVariant = (status: OrderStatus) => {
    if (status === 'Order Placed' || status === 'Processing') return 'secondary';
    if (status === 'Out for Delivery') return 'default';
    if (status === 'Delivered') return 'default'; 
    if (status === 'Canceled') return 'destructive';
    return 'outline';
  };

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
            <ShoppingBag className="mr-3 h-7 w-7" /> My Shop Orders
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Your Order History</CardTitle>
            <CardDescription>Track all your purchases from the tenant shop.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters Placeholder */}
            <div className="mb-4 flex justify-end">
                <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4"/>Filter Orders</Button>
            </div>

            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Item Count</TableHead>
                      <TableHead className="text-right">Total (KES)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.orderId}>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                        <TableCell className="text-right">{order.totalAmount.toLocaleString()}</TableCell>
                        <TableCell><Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/tenant/shopping-orders/${order.orderId}`}>
                              <Eye className="mr-1 h-4 w-4" /> View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <ShoppingBag className="mx-auto h-12 w-12 mb-3" />
                <p>You haven't placed any shop orders yet.</p>
                <Button asChild className="mt-4">
                  <Link href="/shopping">Start Shopping</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
