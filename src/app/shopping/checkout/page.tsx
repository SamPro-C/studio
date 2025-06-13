
// /src/app/shopping/checkout/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ShoppingCart, CreditCard, Smartphone, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, FormEvent } from 'react';

// Dummy data - In a real app, this would come from user profile and cart
const tenantDeliveryInfo = {
  name: "Alice Wonderland",
  apartment: "Greenwood Heights",
  unit: "A-101",
  room: "Main Bedroom",
  phone: "+254712345678",
};
const cartTotal = 240 + 100; // Example: Subtotal + Delivery
const DUMMY_ORDER_ID = "SHOP" + Math.floor(10000 + Math.random() * 90000);

export default function CheckoutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast({ title: "Payment Method Required", description: "Please select a payment method.", variant: "destructive" });
      return;
    }
    setIsPlacingOrder(true);
    console.log("Placing order with:", { ...tenantDeliveryInfo, deliveryInstructions, paymentMethod, total: cartTotal });

    // Simulate API call
    setTimeout(() => {
      setIsPlacingOrder(false);
      toast({ title: "Order Placed!", description: `Your order ${DUMMY_ORDER_ID} has been successfully placed.` });
      router.push(`/shopping/checkout/success?orderId=${DUMMY_ORDER_ID}`);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/shopping/cart">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-xl sm:text-2xl font-bold text-primary flex items-center">
              <ShoppingCart className="mr-2 h-6 w-6" /> Checkout
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Delivery & Payment Column */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader><CardTitle>1. Delivery Information</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p><strong>Name:</strong> {tenantDeliveryInfo.name}</p>
                  <p><strong>Apartment:</strong> {tenantDeliveryInfo.apartment}</p>
                  <p><strong>Unit:</strong> {tenantDeliveryInfo.unit} ({tenantDeliveryInfo.room})</p>
                  <p><strong>Contact Phone:</strong> {tenantDeliveryInfo.phone}</p>
                  <div>
                    <Label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</Label>
                    <Textarea 
                      id="deliveryInstructions" 
                      value={deliveryInstructions} 
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      placeholder="e.g., Leave at door, Call upon arrival" 
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>2. Payment Method</CardTitle></CardHeader>
                <CardContent>
                  <Select onValueChange={setPaymentMethod} value={paymentMethod}>
                    <SelectTrigger><SelectValue placeholder="Select payment method" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mpesa"><Smartphone className="mr-2 h-4 w-4 inline"/> M-Pesa</SelectItem>
                      <SelectItem value="card"><CreditCard className="mr-2 h-4 w-4 inline"/> Credit/Debit Card</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Placeholder for M-Pesa details / Card form fields if selected */}
                  {paymentMethod === 'mpesa' && (
                    <div className="mt-4 p-3 border rounded-md bg-muted/50 text-sm">
                        <p>You will receive an STK push on your registered M-Pesa number after placing the order. Paybill <strong>SHOPXYZ</strong>, Account <strong>YourUnit</strong>.</p>
                    </div>
                  )}
                   {paymentMethod === 'card' && (
                    <div className="mt-4 p-3 border rounded-md bg-muted/50 text-sm">
                        <p>Secure card payment form will appear here (Placeholder for integration).</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Column */}
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardHeader><CardTitle>3. Order Summary</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {/* Placeholder for itemized list - for now just total */}
                  <div className="flex justify-between text-sm">
                    <span>Items Subtotal:</span>
                    <span>KES {(cartTotal - 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee:</span>
                    <span>KES 100</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount:</span>
                    <span>KES {cartTotal.toLocaleString()}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" size="lg" disabled={isPlacingOrder || !paymentMethod}>
                    {isPlacingOrder ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Place Order & Pay
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </main>
      <footer className="border-t bg-background py-6 mt-8">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rentizzi Tenant Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
