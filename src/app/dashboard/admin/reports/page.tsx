
// src/app/dashboard/admin/reports/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, BarChart3, FileText, PieChart, Users, DollarSign, ListChecks, ShoppingCart, Settings2 } from 'lucide-react';

interface ReportCategoryLink {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string; // For now, these will be placeholder links
  actionText: string;
}

const reportCategories: ReportCategoryLink[] = [
  {
    title: "User Statistics",
    description: "Reports on user registrations, active users, and role distributions.",
    icon: Users,
    href: "/dashboard/admin/reports/user-stats", // Placeholder
    actionText: "View User Reports"
  },
  {
    title: "Financial Performance",
    description: "Aggregated rent collection, expense summaries, and payment gateway performance.",
    icon: DollarSign,
    href: "/dashboard/admin/reports/financial-performance", // Placeholder
    actionText: "View Financial Reports"
  },
  {
    title: "Operational Performance",
    description: "Service request resolution times, worker task completion rates, and property occupancy.",
    icon: ListChecks,
    href: "/dashboard/admin/reports/operational-performance", // Placeholder
    actionText: "View Operational Reports"
  },
  {
    title: "E-commerce Performance",
    description: "Sales, orders, and customer acquisition metrics from the integrated shopping platform.",
    icon: ShoppingCart,
    href: "/dashboard/admin/reports/ecommerce-performance", // Placeholder
    actionText: "View E-commerce Reports"
  },
  {
    title: "System Health & Configuration",
    description: "Reports on system uptime, error rates, and current configurations.",
    icon: Settings2,
    href: "/dashboard/admin/reports/system-health", // Placeholder
    actionText: "View System Reports"
  },
];

export default function AdminReportsAnalyticsPage() {
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
            <BarChart3 className="mr-3 h-7 w-7" /> Reporting & Analytics
          </h1>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Platform Reports Hub</CardTitle>
                <CardDescription>
                    Access comprehensive reports to monitor user activity, financial performance, operational efficiency, and e-commerce metrics across the Rentizzi platform.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportCategories.map((category) => (
                <Card key={category.title} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <category.icon className="h-8 w-8 text-primary" />
                            <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
                        </div>
                    <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow" />
                    <CardFooter className="border-t pt-4">
                    <Button className="w-full" asChild variant="outline">
                        {/* For now, links might be placeholders. In a real app, these would go to actual report pages. */}
                        <Link href={category.href}>{category.actionText}</Link>
                    </Button>
                    </CardFooter>
                </Card>
                ))}
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Advanced Reporting Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-lg">Custom Report Builder (Future)</h3>
                    <p className="text-sm text-muted-foreground">
                        A tool to allow administrators to select specific data points, apply filters (date range, user type, property), and generate custom reports in various formats (Table, Chart, CSV, Excel, PDF).
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Pre-defined Reports (Future)</h3>
                    <p className="text-sm text-muted-foreground">
                        A library of commonly used, pre-configured reports will be accessible for quick insights.
                    </p>
                </div>
                 <div className="p-6 border border-dashed rounded-md bg-muted/50 text-center">
                    <p className="text-muted-foreground">
                        Reporting features will be progressively rolled out. Detailed report pages are currently placeholders.
                    </p>
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
