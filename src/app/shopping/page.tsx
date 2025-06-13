
// /src/app/shopping/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, ShoppingCart, Tag, List, UserCircle, Filter as FilterIcon, Star, History, Zap, Newspaper } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

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
  { id: "prod4", name: "Artisan Bread Loaf", price: 250, image: "https://placehold.co/200x150.png?text=Bread", category: "Groceries", aiHint: "bread loaf" },
];

const recentlyViewedProducts = [
  { id: "prod5", name: "Organic Eggs (Dozen)", price: 300, image: "https://placehold.co/200x150.png?text=Eggs", category: "Groceries", aiHint: "eggs carton" },
  { id: "prod6", name: "All-Purpose Cleaner", price: 180, image: "https://placehold.co/200x150.png?text=Cleaner", category: "Cleaning Supplies", aiHint: "cleaning spray" },
];

const specialOfferProducts = [
  { id: "offer1", name: "Snack Bundle (Save 10%)", price: 450, originalPrice: 500, image: "https://placehold.co/200x150.png?text=Snack+Offer", category: "Groceries", aiHint: "snack bundle" },
  { id: "offer2", name: "Laundry Service - 5kg", price: 600, originalPrice: 700, image: "https://placehold.co/200x150.png?text=Laundry+Offer", category: "Laundry Services", aiHint: "folded laundry" },
];

const dummyTopOffers = [
    { id: "offer_banner1", title: "Weekend Grocery Bonanza!", description: "Up to 20% off on selected groceries.", image: "https://placehold.co/400x200.png?text=Grocery+Sale", link: "#", aiHint: "grocery sale banner" },
    { id: "offer_banner2", title: "Sparkling Clean Home", description: "Get 15% off your first cleaning service.", image: "https://placehold.co/400x200.png?text=Cleaning+Offer", link: "#", aiHint: "cleaning service ad" },
    { id: "offer_banner3", title: "Bulk Water Discount", description: "Order 5+ refills & save!", image: "https://placehold.co/400x200.png?text=Water+Deal", link: "#", aiHint: "water delivery deal" },
];

const dummyNewArrivals = [
    { id: "newprod1", name: "Artisanal Coffee Beans", price: 750, image: "https://placehold.co/200x150.png?text=Coffee+Beans", category: "Groceries", aiHint: "coffee beans package" },
    { id: "newprod2", name: "Eco-Friendly Sponges (Pack of 3)", price: 220, image: "https://placehold.co/200x150.png?text=Sponges", category: "Cleaning Supplies", aiHint: "eco sponges" },
    { id: "newprod3", name: "Express Laundry (24hr)", price: 1000, image: "https://placehold.co/200x150.png?text=Express+Laundry", category: "Laundry Services", aiHint: "fast laundry" },
    { id: "newprod4", name: "Organic Veggie Box", price: 900, image: "https://placehold.co/200x150.png?text=Veggie+Box", category: "Groceries", aiHint: "vegetable box" },
];


export default function ShoppingPlatformPage() {
  const { toast } = useToast();
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleAddToCart = (productName: string) => {
    setCartItemCount(prevCount => prevCount + 1);
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
                <ShoppingCart className="mr-2 h-4 w-4" /> View Cart ({cartItemCount})
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8 space-y-10">
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

        {/* Top Offers Carousel-like Section */}
        <section>
          <h3 className="font-headline text-2xl font-semibold text-primary mb-4 flex items-center">
            <Zap className="mr-2 h-6 w-6 text-amber-500" /> Today's Top Offers
          </h3>
          <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4">
            {/* Add a comment here indicating a carousel component would be used */}
            {/* <!-- Carousel Component (e.g., Swiper.js, Embla) would be integrated here in a full implementation --> */}
            {dummyTopOffers.map(offer => (
              <Card key={offer.id} className="min-w-[300px] sm:min-w-[350px] flex-shrink-0 overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={offer.link} className="block">
                  <div className="relative h-40">
                    <Image 
                      src={offer.image} 
                      alt={offer.title} 
                      fill 
                      sizes="(max-width: 640px) 80vw, 350px"
                      className="object-cover"
                      data-ai-hint={offer.aiHint}
                    />
                  </div>
                  <CardHeader className="p-3">
                    <CardTitle className="text-md font-medium">{offer.title}</CardTitle>
                    <CardDescription className="text-xs">{offer.description}</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </section>
        
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

        {/* New Arrivals Section */}
        <section>
          <h3 className="font-headline text-2xl font-semibold text-primary mb-4 flex items-center">
            <Newspaper className="mr-2 h-6 w-6" /> New Arrivals
          </h3>
          <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4">
             {/* <!-- Carousel Component would be integrated here --> */}
            {dummyNewArrivals.map(product => (
              <Card key={product.id} className="min-w-[180px] sm:min-w-[200px] flex flex-col flex-shrink-0 overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/shopping/products/${product.id}`} className="block">
                    <div className="relative h-32 sm:h-36">
                        <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill
                            sizes="(max-width: 640px) 45vw, 200px"
                            className="object-cover"
                            data-ai-hint={product.aiHint}
                        />
                    </div>
                    <CardHeader className="p-3">
                    <CardTitle className="text-sm font-medium leading-tight truncate">{product.name}</CardTitle>
                    <CardDescription className="text-xs">{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 flex-grow">
                    <p className="text-base font-semibold text-primary">KES {product.price.toLocaleString()}</p>
                    </CardContent>
                </Link>
                <CardFooter className="p-3 pt-0 border-t mt-auto">
                  <Button size="sm" className="w-full text-xs" onClick={() => handleAddToCart(product.name)}>Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

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
        
        <section>
          <h3 className="font-headline text-2xl font-semibold text-primary mb-4 flex items-center">
            <History className="mr-2 h-6 w-6" /> Recently Viewed Items
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentlyViewedProducts.map(product => (
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
             {recentlyViewedProducts.length === 0 && (
                <p className="text-sm text-muted-foreground md:col-span-full text-center py-4">You haven't viewed any items recently.</p>
            )}
          </div>
        </section>

        <section>
          <h3 className="font-headline text-2xl font-semibold text-primary mb-4 flex items-center">
            <Star className="mr-2 h-6 w-6 text-amber-500" /> Today's Special Offers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {specialOfferProducts.map(product => (
              <Card key={product.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-amber-500/50 border-2">
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
                         {product.originalPrice && (
                            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
                                SAVE {(((product.originalPrice - product.price) / product.originalPrice) * 100).toFixed(0)}%
                            </div>
                        )}
                    </div>
                    <CardHeader className="p-4">
                    <CardTitle className="text-md font-medium leading-tight">{product.name}</CardTitle>
                    <CardDescription className="text-xs">{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                        <div className="flex items-baseline gap-2">
                            <p className="text-lg font-semibold text-destructive">KES {product.price.toLocaleString()}</p>
                            {product.originalPrice && (
                                <p className="text-sm text-muted-foreground line-through">KES {product.originalPrice.toLocaleString()}</p>
                            )}
                        </div>
                    </CardContent>
                </Link>
                <CardFooter className="p-4 pt-0 border-t mt-auto">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white" onClick={() => handleAddToCart(product.name)}>Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
            {specialOfferProducts.length === 0 && (
                <p className="text-sm text-muted-foreground md:col-span-full text-center py-4">No special offers available today.</p>
            )}
          </div>
        </section>

      </main>

      <footer className="border-t bg-background py-6">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rentizzi Tenant Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}


    