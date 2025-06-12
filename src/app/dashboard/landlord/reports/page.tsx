
// src/app/dashboard/landlord/reports/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, BarChart3, FileText, PieChart, DollarSign, Users, Wrench } from 'lucide-react';
import { Home, CalendarDays, ListChecks, Briefcase } from 'lucide-react';

interface ReportLink {
  title: string;
  description: string;
  icon: React.ElementType;
  actionText: string;
  href?: string; // Make href optional
  onClickAction?: () => void; // Keep onClickAction optional
}

interface ReportCategory {
  categoryTitle: string;
  categoryIcon: React.ElementType;
  reports: ReportLink[];
}

const reportCategories: ReportCategory[] = [
  {
    categoryTitle: "Financial Reports",
    categoryIcon: DollarSign,
    reports: [
      { title: "Rent Collection Summary", description: "Overview of paid, unpaid, and partially paid rents.", icon: PieChart, actionText: "View Summary", href: "/dashboard/landlord/reports/rent-collection" },
      { title: "Expense Breakdown", description: "Detailed analysis of all recorded expenses by category and property.", icon: FileText, actionText: "View Breakdown", href: "/dashboard/landlord/reports/expense-breakdown" },
      { title: "Profit & Loss Statement", description: "Generate a P&L statement for a selected period.", icon: BarChart3, actionText: "Generate Statement", href: "/dashboard/landlord/reports/profit-loss" },
    ]
  },
  {
    categoryTitle: "Occupancy Reports",
    categoryIcon: Users,
    reports: [
      { title: "Vacancy Overview", description: "Track vacant units and overall occupancy rates.", icon: Home, actionText: "View Overview", href: "/dashboard/landlord/reports/vacancy-overview" },
      { title: "Lease Expiry Tracker", description: "Monitor upcoming lease expirations and renewals.", icon: CalendarDays, actionText: "View Tracker", href: "/dashboard/landlord/reports/lease-expiry-tracker" },
    ]
  },
  {
    categoryTitle: "Operational Reports",
    categoryIcon: Wrench,
    reports: [
      { title: "Service Request Analysis", description: "Analyze service requests by type, status, and resolution time.", icon: ListChecks, actionText: "View Analysis", href: "/dashboard/landlord/reports/service-request-analysis" },
      { title: "Worker Activity Summary", description: "Overview of tasks assigned and completed by workers.", icon: Briefcase, actionText: "View Summary", href: "/dashboard/landlord/reports/worker-activity-summary" },
    ]
  }
];


export default function ReportsAnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <BarChart3 className="mr-3 h-7 w-7" /> Reports & Analytics
          </h1>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Gain insights into your property performance, financials, and operations. Select a report category below to view specific reports.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="p-6 border border-dashed rounded-md bg-muted/50 text-center">
                    <p className="text-muted-foreground">
                        Advanced charting and data visualization tools will be available here to provide a quick snapshot of key performance indicators.
                    </p>
                </div>
            </CardContent>
        </Card>


        {reportCategories.map((category) => (
          <Card key={category.categoryTitle}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <category.categoryIcon className="mr-3 h-6 w-6 text-primary/80" />
                {category.categoryTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.reports.map((report) => (
                <Card key={report.title} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-1">
                        <report.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg font-medium">{report.title}</CardTitle>
                    </div>
                    <CardDescription className="text-xs flex-grow">{report.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-0">
                    {report.href ? (
                         <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href={report.href}>{report.actionText}</Link>
                         </Button>
                    ) : (
                        <Button variant="outline" size="sm" className="w-full" onClick={report.onClickAction}>
                            {report.actionText}
                        </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
        
      </main>
    </div>
  );
}

