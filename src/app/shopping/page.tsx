
// /src/app/shopping/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, ShoppingCart, Tag, List, UserCircle, Filter as FilterIcon } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

// Dummy data for placeholders
const dummyCategories = [
  { id: "cat1", name: "Groceries", icon: Tag, image: "https://placehold.co/300x200.png?text=Groceries", aiHint: "groceries shelf" },
  { id: "cat2", name: "Cleaning Supplies", icon: Tag, image: "https://placehold.co/300x200.png?text=Cleaning", aiHint: "cleaning products" },
  { id: "cat3", name: "Water Delivery", icon: Tag, image: "https://placehold.co/300x200.png?text=Water", aiHint: "water bottles" },
  { id: "cat4", name: "Laundry Services", icon: List, image: "https://placehold.co/300x200.png?text=Laundry", aiHint: "laundry basket" },
];

const dummyFeaturedProducts = [
  { id: "prod1", name: "Fresh Milk (1L)", price: 120, image: "https://placehold.co/200x150.png?text=Milk", category: "Groceries", aiHint: "milk carton" },
  { id: "prod2", name: "Dish Soap (500ml)", price: 150, image: "https://placehold.co/200x150.png?text=Soap", category: "Cleaning Supplies", aiHint: "dish soap" },
  { id: "prod3", name: "20L Water Refill", price: 200, image: "https://placehold.co/200x150.png?text=Water+Refill", category: "Water Delivery", aiHint: "water jug" },
];

export default function ShoppingPlatformPage() {
  const { toast } = useToast();

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to Cart!",
      description: `${productName} has been added to your shopping cart.`,
    });
  };

  const handleFilterChange = (type: string, value: string) => {
    toast({ description: `Filter applied: ${type} - ${value}. (Placeholder)`});
  }

  const handleClearFilters = () => {
    toast({ description: "Filters cleared. (Placeholder)"});
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      {/* Simplified Header for Shopping Page */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/tenant">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-xl sm:text-2xl font-bold text-primary">
              Tenant Shop
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/shopping/profile">
                <UserCircle className="mr-2 h-4 w-4" /> My Shop Profile
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/shopping/cart">
                <ShoppingCart className="mr-2 h-4 w-4" /> View Cart (0)
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8 space-y-10">
        {/* Welcome & Search Section */}
        <section className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Welcome to Your Apartment Shop!
          </h2>
          <p className="mt-3 text-lg text-foreground/80">
            Conveniently order goods and services delivered to your doorstep.
          </p>
          <div className="mt-6 mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search for products or services (e.g., milk, cleaning)..." 
                className="pl-10 py-3 text-base h-12 rounded-full shadow-sm" 
              />
            </div>
          </div>
        </section>
        
        {/* Filters & Sorting Section */}
        <section>
            <Card className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <Label htmlFor="filterCategory" className="text-sm font-medium">Filter by Category</Label>
                        <Select onValueChange={(value) => handleFilterChange("category", value)}>
                            <SelectTrigger id="filterCategory" className="mt-1 h-9">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {dummyCategories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="sortBy" className="text-sm font-medium">Sort by</Label>
                        <Select onValueChange={(value) => handleFilterChange("sort", value)}>
                            <SelectTrigger id="sortBy" className="mt-1 h-9">
                                <SelectValue placeholder="Relevance" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="relevance">Relevance</SelectItem>
                                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                                <SelectItem value="newest">Newest Arrivals</SelectItem>
                                <SelectItem value="popularity">Popularity</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant="outline" onClick={handleClearFilters} className="w-full sm:w-auto h-9">
                        <FilterIcon className="mr-2 h-4 w-4" /> Clear Filters
                    </Button>
                </div>
            </Card>
        </section>

        {/* Categories Section */}
        <section>
          <h3 className="font-headline text-2xl font-semibold text-primary mb-4">Shop by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {dummyCategories.map(category => (
              <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-32 sm:h-40">
                    <Image 
                        src={category.image} 
                        alt={category.name} 
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover"
                        data-ai-hint={category.aiHint}
                    />
                </div>
                <CardHeader className="p-3">
                  <CardTitle className="text-sm sm:text-base font-medium text-center flex items-center justify-center">
                    <category.icon className="mr-2 h-4 w-4 text-primary/80" /> {category.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section>
          <h3 className="font-headline text-2xl font-semibold text-primary mb-4">Featured Products & Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dummyFeaturedProducts.map(product => (
              <Card key={product.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/shopping/products/${product.id}`} className="block">
                    <div className="relative h-40 sm:h-48">
                        <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover"
                            data-ai-hint={product.aiHint}
                        />
                    </div>
                    <CardHeader className="p-4">
                    <CardTitle className="text-md font-medium leading-tight">{product.name}</CardTitle>
                    <CardDescription className="text-xs">{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                    <p className="text-lg font-semibold text-primary">KES {product.price.toLocaleString()}</p>
                    </CardContent>
                </Link>
                <CardFooter className="p-4 pt-0 border-t mt-auto">
                  <Button className="w-full" onClick={() => handleAddToCart(product.name)}>Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Placeholder for "Recently Viewed" or "Special Offers" */}
        <section>
            <div className="p-8 border border-dashed rounded-md bg-muted/50 text-center">
                <p className="text-muted-foreground">
                    More sections like "Recently Viewed" or "Special Offers" can be added here.
                </p>
            </div>
        </section>

      </main>

      {/* Simplified Footer for Shopping Page */}
      <footer className="border-t bg-background py-6">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rentizzi Tenant Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
