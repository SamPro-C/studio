
// /src/app/shopping/products/[productId]/page.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ShoppingCart, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  longDescription: string;
  images: { url: string; alt: string; aiHint: string }[];
  stockStatus: 'In Stock' | 'Out of Stock' | 'Available on Order';
}

// Dummy data for product details
const dummyProductDatabase: { [key: string]: ProductDetail } = {
  "prod1": {
    id: "prod1",
    name: "Fresh Milk (1L)",
    price: 120,
    category: "Groceries",
    description: "Full cream pasteurized fresh milk, perfect for your daily needs.",
    longDescription: "Our Fresh Milk is sourced from local farms, ensuring quality and freshness. It's pasteurized and homogenized, making it a healthy choice for the whole family. Enjoy it with your cereal, coffee, or on its own. Rich in calcium and vitamins. Keep refrigerated.",
    images: [
      { url: "https://placehold.co/600x400.png?text=Milk+Large", alt: "Fresh Milk Large View", aiHint: "milk carton product" },
      { url: "https://placehold.co/300x200.png?text=Milk+Side", alt: "Fresh Milk Side View", aiHint: "milk detail" },
    ],
    stockStatus: "In Stock",
  },
  "prod2": {
    id: "prod2",
    name: "Dish Soap (500ml)",
    price: 150,
    category: "Cleaning Supplies",
    description: "Powerful dish soap that cuts through grease, leaving your dishes sparkling clean.",
    longDescription: "This Lemon Scented Dish Soap provides superior cleaning power. Its concentrated formula means a little goes a long way. Tough on grease, yet gentle on hands. Biodegradable and eco-friendly.",
    images: [
      { url: "https://placehold.co/600x400.png?text=Soap+Large", alt: "Dish Soap Large View", aiHint: "dish soap bottle" },
    ],
    stockStatus: "In Stock",
  },
  "prod3": {
    id: "prod3",
    name: "20L Water Refill",
    price: 200,
    category: "Water Delivery",
    description: "Purified drinking water, 20-liter refill. Bottle exchange may be required.",
    longDescription: "Stay hydrated with our 20L purified drinking water refill service. We ensure the highest quality standards for clean and safe water. Conveniently delivered to your unit. Note: This is a refill service; an empty 20L bottle may be required for exchange, or a new bottle fee may apply.",
    images: [
      { url: "https://placehold.co/600x400.png?text=Water+Refill+Large", alt: "20L Water Refill", aiHint: "water jug large" },
    ],
    stockStatus: "Available on Order",
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;
  const product = dummyProductDatabase[productId];
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!product) return;
    toast({
      title: "Added to Cart!",
      description: `${quantity} x ${product.name} has been added to your shopping cart.`,
    });
    // Implement actual cart logic here
  };

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-4">The product with ID <span className="font-mono bg-muted px-1">{productId}</span> could not be found.</p>
        <Button asChild><Link href="/shopping">Back to Shop</Link></Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
       {/* Simplified Header */}
       <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/shopping">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-xl sm:text-2xl font-bold text-primary truncate max-w-xs sm:max-w-md">
              {product.name}
            </h1>
          </div>
          <Button variant="outline" asChild>
            <Link href="/shopping/cart">
             <ShoppingCart className="mr-2 h-4 w-4" /> View Cart (0)
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                data-ai-hint={product.images[0].aiHint}
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="relative aspect-square w-full overflow-hidden rounded-md border hover:border-primary cursor-pointer">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="25vw"
                      className="object-cover"
                      data-ai-hint={img.aiHint}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">{product.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{product.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-2xl font-bold text-foreground">KES {product.price.toLocaleString()}</p>
                <Badge variant={product.stockStatus === "In Stock" ? "default" : product.stockStatus === "Out of Stock" ? "destructive" : "secondary"}>
                  {product.stockStatus}
                </Badge>
                <p className="text-foreground/80">{product.description}</p>
                
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="w-24">
                    <Label htmlFor="quantity" className="text-sm">Quantity</Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      min="1" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="mt-1 h-10 text-center"
                    />
                  </div>
                  <Button size="lg" className="flex-grow h-10" onClick={handleAddToCart} disabled={product.stockStatus === 'Out of Stock'}>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="text-lg">Product Details</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-sm text-foreground/70 whitespace-pre-wrap">{product.longDescription}</p>
                </CardContent>
            </Card>
            
            {/* Placeholder for Reviews/Related Products */}
            <div className="p-6 border border-dashed rounded-md bg-card text-center">
                <p className="text-muted-foreground text-sm">Customer Reviews & Related Products sections can be added here.</p>
            </div>
          </div>
        </div>
      </main>
       <footer className="border-t bg-background py-6 mt-8">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rentizzi Tenant Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
