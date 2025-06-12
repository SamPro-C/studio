
// /src/app/dashboard/shop-manager/orders/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Package, Filter, Search, MoreHorizontal, Eye, Edit, Printer } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

type OrderStatus = 'New' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Canceled';
type PaymentStatus = 'Paid' | 'Pending' | 'Failed';

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  apartmentUnit: string;
  orderDate: string;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
}

const dummyOrders: Order[] = [
  { id: "ord1", orderId: "SM2408001", customerName: "Alice W.", apartmentUnit: "Greenwood H. / A101", orderDate: "2024-08-05", totalAmount: 1250, status: "New", paymentStatus: "Paid" },
  { id: "ord2", orderId: "SM2408002", customerName: "Bob T.", apartmentUnit: "Oceanview T. / C203", orderDate: "2024-08-05", totalAmount: 780, status: "Processing", paymentStatus: "Paid" },
  { id: "ord3", orderId: "SM2408003", customerName: "Charlie B.", apartmentUnit: "Greenwood H. / B105", orderDate: "2024-08-04", totalAmount: 2100, status: "Delivered", paymentStatus: "Paid" },
  { id: "ord4", orderId: "SM2408004", customerName: "Diana P.", apartmentUnit: "Mountain R.V. / Villa A", orderDate: "2024-08-03", totalAmount: 550, status: "Canceled", paymentStatus: "Pending" },
];

export default function ShopOrderManagementPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => toast({ title: "Update Status", description: `Order ${orderId} status updated to ${newStatus}. (Placeholder)` });
  const handlePrintPackingSlip = (orderId: string) => toast({ title: "Print Slip", description: `Printing packing slip for ${orderId}. (Placeholder)` });
  
  const getStatusBadgeVariant = (status: OrderStatus) => {
    if (status === 'New') return 'secondary';
    if (status === 'Processing' || status === 'Out for Delivery') return 'default';
    if (status === 'Delivered') return 'default'; // Potentially a 'success' variant
    if (status === 'Canceled') return 'destructive';
    return 'outline';
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
            <Package className="mr-3 h-7 w-7" /> Order Management
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Customer Orders</CardTitle>
            <CardDescription>View, manage, and update the status of all incoming orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="relative lg:col-span-1">
                <label htmlFor="searchOrders" className="text-sm font-medium">Search Orders</label>
                <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="searchOrders" type="search" placeholder="Order ID, Customer..." className="pl-9 mt-1" />
              </div>
              <div>
                <label htmlFor="filterStatus" className="text-sm font-medium">Order Status</label>
                <Select><SelectTrigger id="filterStatus" className="mt-1"><SelectValue placeholder="All Statuses" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="new">New</SelectItem><SelectItem value="processing">Processing</SelectItem><SelectItem value="delivered">Delivered</SelectItem></SelectContent></Select>
              </div>
               <div>
                <label htmlFor="filterDate" className="text-sm font-medium">Date Range</label>
                <Input id="filterDate" type="date" className="mt-1" />
              </div>
              <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
            </div>

            {dummyOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Apartment/Unit</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell className="text-xs">{order.apartmentUnit}</TableCell>
                        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">KES {order.totalAmount.toLocaleString()}</TableCell>
                        <TableCell><Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'secondary'}>{order.paymentStatus}</Badge></TableCell>
                        <TableCell><Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge></TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/shop-manager/orders/${order.orderId}`}>
                                  <Eye className="mr-2 h-4 w-4" /> View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(order.orderId, 'Processing')}><Edit className="mr-2 h-4 w-4" /> Update Status</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePrintPackingSlip(order.orderId)}><Printer className="mr-2 h-4 w-4" /> Print Slip</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No orders found matching your criteria.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
