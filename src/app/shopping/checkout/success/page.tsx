
// /src/app/shopping/checkout/success/page.tsx
"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { CheckCircle, ShoppingBag } from 'lucide-react';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/20 p-4">
       <Card className="w-full max-w-md text-center">
          <CardHeader>
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <CardTitle className="font-headline text-2xl">Order Confirmed!</CardTitle>
              <CardDescription>
                Your order {orderId ? <span className="font-semibold">#{orderId}</span> : ''} has been successfully placed. 
                You can track its progress in your dashboard.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <p className="text-sm text-muted-foreground">Thank you for shopping with us!</p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="w-full sm:flex-1">
                  <Link href="/shopping">
                    <ShoppingBag className="mr-2 h-4 w-4"/> Continue Shopping
                  </Link>
              </Button>
              <Button variant="outline" asChild className="w-full sm:flex-1">
                  <Link href={`/dashboard/tenant/shopping-orders/${orderId || ''}`}>View Order Details</Link>
              </Button>
          </CardFooter>
       </Card>
    </div>
  );
}

