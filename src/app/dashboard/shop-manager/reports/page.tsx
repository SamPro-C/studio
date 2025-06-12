
// src/app/dashboard/shop-manager/reports/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, BarChart3, FileText, Package, Users } from 'lucide-react';

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  actionText?: string;
}

const shopReports: ReportCardProps[] = [
  { title: "Sales Reports", description: "Analyze sales trends, top products, and revenue.", icon: BarChart3, href: "/dashboard/shop-manager/reports/sales", actionText: "View Sales Reports" },
  { title: "Order Reports", description: "Track order volume, status distribution, and fulfillment rates.", icon: Package, href: "/dashboard/shop-manager/reports/orders", actionText: "View Order Reports" },
  { title: "Inventory Reports", description: "Monitor stock levels, identify low-stock items, and manage inventory value.", icon: FileText, href: "/dashboard/shop-manager/reports/inventory", actionText: "View Inventory Reports" },
  { title: "Customer Insights", description: "Understand customer purchasing behavior (Placeholder).", icon: Users, href: "/dashboard/shop-manager/reports/customer-insights", actionText: "View Customer Insights" },
];

export default function ShopReportsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/shop-manager">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <BarChart3 className="mr-3 h-7 w-7" /> Shop Reports & Analytics
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Shop Performance Insights</CardTitle>
            <CardDescription>Access detailed reports to monitor and optimize your shop's operations.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopReports.map((report) => (
              <Card key={report.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <report.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="font-headline text-xl">{report.title}</CardTitle>
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow" />
                <CardFooter className="border-t pt-4">
                  <Button className="w-full" asChild variant="outline">
                    <Link href={report.href}>{report.actionText || "View Report"}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
         <div className="p-6 border border-dashed rounded-md bg-muted/50 text-center">
            <p className="text-muted-foreground">
                Custom report generation and advanced analytics will be available in future updates.
            </p>
        </div>
      </main>
    </div>
  );
}
