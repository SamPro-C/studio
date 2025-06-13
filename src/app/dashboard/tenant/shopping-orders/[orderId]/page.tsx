
// /src/app/dashboard/tenant/shopping-orders/[orderId]/page.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, ShoppingBag, User, Home, Truck, CreditCard, AlertTriangle, PackageCheck, PackageX, CheckCircle, HelpCircle, MessageSquare, Star } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

type OrderStatusTenant = 'Order Placed' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Canceled';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  aiHint: string;
}
interface StoredOrder {
  orderId: string;
  orderDate: string;
  status: OrderStatusTenant;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: string;
  deliveryAddress: {
    name: string;
    apartment: string;
    unit: string;
    room: string;
    phone: string;
  };
  deliveryInstructions?: string;
}

const statusProgress: Record<OrderStatusTenant, number> = {
  'Order Placed': 25,
  'Processing': 50,
  'Out for Delivery': 75,
  'Delivered': 100,
  'Canceled': 0,
};

const statusIcon: Record<OrderStatusTenant, React.ElementType> = {
    'Order Placed': PackageCheck,
    'Processing': PackageCheck,
    'Out for Delivery': Truck,
    'Delivered': CheckCircle,
    'Canceled': PackageX,
};

export default function TenantShopOrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (orderId) {
      const storedOrdersString = localStorage.getItem('rentizziTenantOrders');
      if (storedOrdersString) {
        const storedOrdersObject: Record<string, StoredOrder> = JSON.parse(storedOrdersString);
        setOrder(storedOrdersObject[orderId] || null);
      }
    }
  }, [orderId]);


  const getStatusBadgeVariant = (status: OrderStatusTenant) => {
    if (status === 'Order Placed' || status === 'Processing') return 'secondary';
    if (status === 'Out for Delivery') return 'default';
    if (status === 'Delivered') return 'default';
    if (status === 'Canceled') return 'destructive';
    return 'outline';
  };
  
  const handleRateOrder = () => {
    toast({ title: "Rate Order", description: "Order rating functionality is coming soon!"});
  }
  const handleReportIssue = () => {
    toast({ title: "Report Issue", description: "Issue reporting for this order is coming soon!"});
  }


  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Shop Order Not Found</h1>
        <p className="text-muted-foreground mb-4">The order with ID <span className="font-mono bg-muted px-1">{orderId}</span> could not be found in your history or localStorage.</p>
        <Button asChild><Link href="/dashboard/tenant/shopping-orders">Back to My Shop Orders</Link></Button>
      </div>
    );
  }
  
  const StatusIcon = statusIcon[order.status] || HelpCircle;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tenant/shopping-orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/tenant/shopping-orders" className="text-sm text-muted-foreground hover:underline">My Shop Orders</Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <ShoppingBag className="mr-3 h-7 w-7" /> Order Details: {order.orderId}
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                    <CardTitle>Order #{order.orderId}</CardTitle>
                    <CardDescription>Placed on: {new Date(order.orderDate).toLocaleString()}</CardDescription>
                </div>
                <Badge variant={getStatusBadgeVariant(order.status)} className="text-md px-3 py-1 flex items-center">
                   <StatusIcon className="mr-2 h-4 w-4"/> {order.status}
                </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {order.status !== 'Canceled' && order.status !== 'Delivered' && (
                <div className="mb-6">
                    <Label className="text-sm font-medium">Order Progress</Label>
                    <Progress value={statusProgress[order.status]} className="w-full mt-1 h-3" />
                    {order.status === "Out for Delivery" && <p className="text-xs text-muted-foreground mt-1">Estimated Delivery: Today</p>}
                     {order.status === "Processing" && <p className="text-xs text-muted-foreground mt-1">Estimated Delivery: 1-2 days</p>}
                </div>
            )}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-muted/30">
                    <CardHeader className="pb-2"><CardTitle className="text-base flex items-center"><Home className="mr-2 h-4"/>Delivery Details</CardTitle></CardHeader>
                    <CardContent className="text-sm space-y-1">
                        <p><strong>To:</strong> {order.deliveryAddress.name}</p>
                        <p><strong>Address:</strong> {order.deliveryAddress.apartment} / {order.deliveryAddress.unit} ({order.deliveryAddress.room})</p>
                        <p><strong>Contact:</strong> {order.deliveryAddress.phone}</p>
                        {order.deliveryInstructions && <p><strong>Instructions:</strong> {order.deliveryInstructions}</p>}
                    </CardContent>
                </Card>
                <Card className="bg-muted/30">
                    <CardHeader className="pb-2"><CardTitle className="text-base flex items-center"><CreditCard className="mr-2 h-4"/>Payment Information</CardTitle></CardHeader>
                    <CardContent className="text-sm space-y-1">
                        <p><strong>Method:</strong> {order.paymentMethod}</p>
                        <p><strong>Total Amount:</strong> KES {order.totalAmount.toLocaleString()}</p>
                        <p><strong>Status:</strong> Paid (Simulated)</p>
                    </CardContent>
                </Card>
            </div>
            
            <h3 className="font-semibold mb-2 text-lg">Items in this Order:</h3>
            <div className="space-y-3">
                {order.items.map(item => (
                    <Card key={item.id} className="flex items-center p-3 gap-3 shadow-sm">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                           <Image src={item.image || `https://placehold.co/80x80.png?text=${item.name.substring(0,10)}`} alt={item.name} fill sizes="80px" className="object-cover" data-ai-hint={item.aiHint || "product image"}/>
                        </div>
                        <div className="flex-grow">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-sm">KES {(item.price * item.quantity).toLocaleString()}</p>
                    </Card>
                ))}
            </div>
             <div className="mt-4 pt-4 border-t text-right space-y-1">
                <p className="text-sm">Subtotal: KES {order.subtotal.toLocaleString()}</p>
                <p className="text-sm">Delivery Fee: KES {order.deliveryFee.toLocaleString()}</p>
                <p className="text-lg font-bold text-primary">Order Total: KES {order.totalAmount.toLocaleString()}</p>
            </div>
          </CardContent>
           <CardFooter className="mt-4 flex flex-col sm:flex-row gap-2 justify-between items-center">
                <Button variant="outline" asChild>
                    <Link href="/shopping"><ShoppingBag className="mr-2 h-4 w-4"/>Continue Shopping</Link>
                </Button>
                {order.status === 'Delivered' && (
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleRateOrder}><Star className="mr-2 h-4 w-4"/>Rate Order</Button>
                        <Button variant="destructive" onClick={handleReportIssue}><AlertTriangle className="mr-2 h-4 w-4"/>Report Issue</Button>
                    </div>
                )}
                 {order.status !== 'Delivered' && order.status !== 'Canceled' && (
                    <Button variant="ghost">Contact Support</Button>
                )}
            </CardFooter>
        </Card>
      </main>
    </div>
  );
}
