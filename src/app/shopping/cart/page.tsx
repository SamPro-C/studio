
// /src/app/shopping/cart/page.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  aiHint: string;
}

const dummyCartItems: CartItem[] = [
  { id: "item1", productId: "prod1", name: "Fresh Milk (1L)", price: 120, quantity: 2, image: "https://placehold.co/100x100.png?text=Milk", aiHint: "milk carton" },
  { id: "item2", productId: "prod3", name: "20L Water Refill", price: 200, quantity: 1, image: "https://placehold.co/100x100.png?text=Water", aiHint: "water jug" },
];

export default function ShoppingCartPage() {
  const { toast } = useToast();

  const handleQuantityChange = (itemId: string, change: number) => {
    toast({ description: `Quantity updated for item ${itemId}. (Placeholder)` });
    // Update dummyCartItems or state here in a real app
  };

  const handleRemoveItem = (itemId: string, itemName: string) => {
    toast({ description: `${itemName} removed from cart. (Placeholder)` });
    // Remove from dummyCartItems or state here
  };

  const subtotal = dummyCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 100; // Example
  const total = subtotal + deliveryFee;

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/shopping">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-xl sm:text-2xl font-bold text-primary flex items-center">
              <ShoppingCart className="mr-2 h-6 w-6" /> Your Shopping Cart
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        {dummyCartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {dummyCartItems.map(item => (
                <Card key={item.id} className="flex items-center p-4 gap-4 shadow-sm">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" data-ai-hint={item.aiHint}/>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Price: KES {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-semibold w-24 text-right">KES {(item.price * item.quantity).toLocaleString()}</p>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveItem(item.id, item.name)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>

            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>KES {deliveryFee.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/shopping/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/shopping">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild>
              <Link href="/shopping">Start Shopping</Link>
            </Button>
          </div>
        )}
      </main>
      <footer className="border-t bg-background py-6 mt-8">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rentizzi Tenant Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
