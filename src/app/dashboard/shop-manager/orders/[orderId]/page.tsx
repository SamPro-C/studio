
// /src/app/dashboard/shop-manager/orders/[orderId]/page.tsx
"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Package, User, Home, Printer, Edit, MessageSquare, DollarSign, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type OrderStatus = 'New' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Canceled';
type PaymentStatus = 'Paid' | 'Pending' | 'Failed';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface OrderDetails {
  id: string;
  orderId: string;
  customerName: string;
  customerContact: string;
  apartmentUnit: string; // e.g. Greenwood H. / A101
  deliveryInstructions?: string;
  orderDate: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  internalNotes?: string;
}

// Dummy data for a single order
const dummyOrderDetails: { [key: string]: OrderDetails } = {
  "SM2408001": {
    id: "ord1",
    orderId: "SM2408001",
    customerName: "Alice W.",
    customerContact: "+254712345678",
    apartmentUnit: "Greenwood H. / A101 (Room 1)",
    deliveryInstructions: "Leave at the door if no answer.",
    orderDate: "2024-08-05",
    items: [
      { id: "item1", name: "Fresh Milk (1L)", quantity: 2, price: 120, subtotal: 240 },
      { id: "item2", name: "Bread (Wholewheat)", quantity: 1, price: 80, subtotal: 80 },
      { id: "item3", name: "20L Water Refill", quantity: 1, price: 200, subtotal: 200 },
      { id: "item4", name: "Cleaning Service (Basic)", quantity: 1, price: 730, subtotal: 730 },
    ],
    subtotal: 1250,
    deliveryFee: 0, // Assuming free delivery for this example
    totalAmount: 1250,
    status: "New",
    paymentStatus: "Paid",
    paymentMethod: "M-Pesa",
  }
};

export default function ShopManagerOrderDetailPage() {
  const params = useParams();
  const routerOrderId = params.orderId as string;
  const order = dummyOrderDetails[routerOrderId];
  const { toast } = useToast();

  const handleUpdateStatus = (newStatus: OrderStatus) => {
    toast({ title: "Status Update", description: `Order ${order?.orderId} status updated to ${newStatus}. (Placeholder)`});
    // Add logic to update order status in backend
  };

  const handlePrintPackingSlip = () => {
    toast({ title: "Print Slip", description: `Printing packing slip for ${order?.orderId}. (Placeholder)`});
  };
  
  const handleAddNote = (note: string) => {
    toast({ title: "Note Added", description: `Note added to order ${order?.orderId}. (Placeholder)`});
    // Add logic to save note
  };

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
        <p className="text-muted-foreground mb-4">The order with ID <span className="font-mono bg-muted px-1">{routerOrderId}</span> could not be found.</p>
        <Button asChild><Link href="/dashboard/shop-manager/orders">Back to Orders</Link></Button>
      </div>
    );
  }

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
            <Link href="/dashboard/shop-manager/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/shop-manager/orders" className="text-sm text-muted-foreground hover:underline">Back to Orders</Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Package className="mr-3 h-7 w-7" /> Order Details: {order.orderId}
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Order Info & Customer */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Order Information</CardTitle>
                  <CardDescription>Date: {new Date(order.orderDate).toLocaleString()}</CardDescription>
                </div>
                <Badge variant={getStatusBadgeVariant(order.status)} className="text-sm">{order.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold flex items-center mb-1"><User className="mr-2 h-4 w-4 text-primary/80"/>Customer Details</h4>
                <p className="text-sm">Name: {order.customerName}</p>
                <p className="text-sm">Contact: {order.customerContact}</p>
                <p className="text-sm">Delivery To: {order.apartmentUnit}</p>
                {order.deliveryInstructions && <p className="text-sm italic">Instructions: "{order.deliveryInstructions}"</p>}
              </div>
              <div className="border-t pt-3">
                <h4 className="font-semibold flex items-center mb-1"><DollarSign className="mr-2 h-4 w-4 text-primary/80"/>Payment Details</h4>
                <p className="text-sm">Method: {order.paymentMethod}</p>
                <p className="text-sm">Status: <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'destructive'}>{order.paymentStatus}</Badge></p>
              </div>
            </CardContent>
          </Card>
          
          {/* Actions Card */}
          <Card className="md:col-span-1 self-start">
            <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label htmlFor="updateStatus">Update Order Status</Label>
                <Select onValueChange={(value) => handleUpdateStatus(value as OrderStatus)} defaultValue={order.status}>
                  <SelectTrigger id="updateStatus"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(['New', 'Processing', 'Out for Delivery', 'Delivered', 'Canceled'] as OrderStatus[]).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full" onClick={handlePrintPackingSlip}><Printer className="mr-2"/> Print Packing Slip</Button>
              <div>
                <Label htmlFor="internalNotes">Add Internal Note</Label>
                <Textarea id="internalNotes" placeholder="e.g., Called customer, confirmed address" className="mt-1" rows={2}/>
                <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => handleAddNote("Sample note")}>Save Note</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Itemized List */}
        <Card>
          <CardHeader><CardTitle>Order Items</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product/Service</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price (KES)</TableHead>
                  <TableHead className="text-right">Subtotal (KES)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{item.subtotal.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 pt-4 border-t space-y-1 text-right">
              <p className="text-sm">Subtotal: KES {order.subtotal.toLocaleString()}</p>
              <p className="text-sm">Delivery Fee: KES {order.deliveryFee.toLocaleString()}</p>
              <p className="text-lg font-semibold">Total: KES {order.totalAmount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
