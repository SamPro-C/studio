
// src/app/dashboard/shop-manager/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { 
    Store, 
    Package, 
    Users, 
    Settings, 
    BarChart3, 
    DollarSign, 
    Truck, 
    AlertTriangle,
    ArrowRight
} from 'lucide-react';

// Dummy data for shop manager
const shopManagerData = {
  name: "Shop Manager Alpha",
  shopName: "Alpha Goods & Services",
};

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    href?: string;
    description?: string;
}

const shopMetrics: MetricCardProps[] = [
    { title: "Today's Sales", value: "KES 5,200", icon: DollarSign, description: "+5% from yesterday" },
    { title: "New Orders Today", value: 12, icon: Package, href: "/dashboard/shop-manager/orders"},
    { title: "Pending Deliveries", value: 3, icon: Truck, href: "/dashboard/shop-manager/orders"},
    { title: "Low Stock Items", value: 2, icon: AlertTriangle, href: "/dashboard/shop-manager/products", description: "Items needing reorder" },
];

interface QuickLinkCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
}
const quickLinks: QuickLinkCardProps[] = [
    { title: "Manage Products", description: "Add, edit, or remove items from your catalog.", icon: Package, href: "/dashboard/shop-manager/products" },
    { title: "View Orders", description: "Track and process all customer orders.", icon: Package, href: "/dashboard/shop-manager/orders" },
    { title: "Customer List", description: "See your shop's customer base.", icon: Users, href: "/dashboard/shop-manager/customers" },
    { title: "Shop Reports", description: "Analyze sales, inventory, and customer data.", icon: BarChart3, href: "/dashboard/shop-manager/reports" },
];


export default function ShopManagerDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
            <Store className="h-7 w-7 text-primary" />
            <h1 className="font-headline text-xl md:text-2xl font-bold text-primary">Shop Manager Dashboard</h1>
        </div>
        <nav className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/shop-manager/settings">
                    <Settings className="mr-1.5 h-4 w-4"/> Shop Settings
                </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/shop-manager/profile">My Profile</Link>
            </Button>
             <Button variant="ghost" size="sm" asChild>
                <Link href="/">Exit to Main Site</Link>
            </Button>
        </nav>
      </header>

      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="mb-8">
            <h2 className="text-2xl font-semibold">Welcome, {shopManagerData.name}!</h2>
            <p className="text-muted-foreground">Managing: <span className="font-medium text-primary">{shopManagerData.shopName}</span></p>
        </div>

        {/* Key Metrics */}
        <section>
          <h3 className="font-headline text-xl font-semibold text-primary mb-4">Today's Overview</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {shopMetrics.map((metric) => (
              <Card key={metric.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-5 w-5 text-primary/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  {metric.description && <p className="text-xs text-muted-foreground">{metric.description}</p>}
                </CardContent>
                {metric.href && (
                    <CardFooter className="pt-0">
                        <Button size="sm" variant="ghost" className="text-xs p-0 h-auto" asChild>
                            <Link href={metric.href}>View Details <ArrowRight className="ml-1 h-3 w-3"/></Link>
                        </Button>
                    </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Navigation Links */}
        <section>
            <h3 className="font-headline text-xl font-semibold text-primary mb-4">Quick Access</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {quickLinks.map((link) => (
                    <Card key={link.title} className="hover:shadow-lg transition-shadow flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-1">
                                <link.icon className="h-7 w-7 text-primary"/>
                                <CardTitle className="font-headline text-lg">{link.title}</CardTitle>
                            </div>
                            <CardDescription className="text-xs flex-grow">{link.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="border-t pt-4 mt-auto">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href={link.href}>Go to {link.title}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
}
    