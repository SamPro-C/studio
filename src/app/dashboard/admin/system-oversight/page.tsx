
// src/app/dashboard/admin/system-oversight/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye, Building, BarChart3, ListChecks, ShoppingCart } from 'lucide-react';

const oversightSections = [
  {
    title: "All Apartments Overview",
    description: "View and manage all registered apartments across the platform.",
    icon: Building,
    href: "/dashboard/admin/system-oversight/all-apartments",
    actionText: "View All Apartments"
  },
  {
    title: "Global Financial Overview",
    description: "Aggregated financial data, rent collection, and expense summaries.",
    icon: BarChart3,
    href: "/dashboard/admin/system-oversight/financial-overview",
    actionText: "View Financials"
  },
  {
    title: "System-Wide Service Requests",
    description: "Monitor and manage all service requests across all properties.",
    icon: ListChecks,
    href: "/dashboard/admin/system-oversight/service-requests",
    actionText: "View Service Requests"
  },
  {
    title: "E-commerce Platform Oversight",
    description: "Key metrics and management links for the integrated shopping platform.",
    icon: ShoppingCart,
    href: "/dashboard/admin/system-oversight/ecommerce-oversight",
    actionText: "View E-commerce Stats"
  },
];

export default function SystemOversightHubPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <Eye className="mr-3 h-7 w-7" /> Property & System Oversight
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Platform Management Areas</CardTitle>
            <CardDescription>
              Access various modules for a global view and management of properties, financials, service requests, and e-commerce activities.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {oversightSections.map((section) => (
              <Card key={section.title} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <section.icon className="h-8 w-8 text-primary" />
                        <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
                    </div>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow" />
                <div className="p-4 border-t">
                  <Button className="w-full" asChild>
                    <Link href={section.href}>{section.actionText}</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
        
        <div className="p-6 border border-dashed rounded-md bg-muted/50 text-center">
            <p className="text-muted-foreground">
                Future enhancements may include more detailed system health dashboards and real-time analytics here.
            </p>
        </div>
      </main>
    </div>
  );
}
