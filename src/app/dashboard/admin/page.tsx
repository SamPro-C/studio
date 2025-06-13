
// src/app/dashboard/admin/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { 
    ShieldCheck, 
    Users, 
    Building, 
    Briefcase, 
    UserCheck, 
    BarChart3, 
    Settings, 
    ListChecks,
    Eye,
    DollarSign,
    ShoppingCart
} from 'lucide-react';

interface AdminMetric {
  title: string;
  value: string | number;
  icon: React.ElementType;
  href?: string;
  description?: string;
}

interface AdminQuickLink {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
}

const adminMetrics: AdminMetric[] = [
  { title: "Total Landlords", value: 150, icon: Building, href: "/dashboard/admin/user-management/landlords" },
  { title: "Total Tenants", value: 1200, icon: Users, href: "/dashboard/admin/user-management/tenants" },
  { title: "Total Workers", value: 75, icon: Briefcase, href: "/dashboard/admin/user-management/workers" },
  { title: "Pending Approvals", value: 5, icon: UserCheck, href: "/dashboard/admin/user-management/approvals", description: "New user registrations" },
];

const adminQuickLinks: AdminQuickLink[] = [
    { title: "User Management", description: "Oversee all user accounts.", icon: Users, href: "/dashboard/admin/user-management" },
    { title: "System Oversight", description: "Manage properties, financials, etc.", icon: Eye, href: "/dashboard/admin/system-oversight"},
    { title: "Reports & Analytics", description: "View platform-wide reports.", icon: BarChart3, href: "/dashboard/admin/reports" },
    { title: "System Configuration", description: "Manage global settings.", icon: Settings, href: "/dashboard/admin/configuration" },
    { title: "Audit Logs", description: "Track system and admin activities.", icon: ListChecks, href: "/dashboard/admin/audit-logs" },
    { title: "Support Tickets", description: "Manage escalated support issues.", icon: DollarSign, href: "/dashboard/admin/support" },
];


export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header section (can be part of a layout later) */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <h1 className="font-headline text-xl md:text-2xl font-bold text-primary">Admin Dashboard</h1>
        </div>
        <nav className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/admin/profile">My Profile</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
                <Link href="/">Back to Homepage</Link>
            </Button>
        </nav>
      </header>

      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-8">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Welcome, Admin!</h2>
            <p className="text-muted-foreground">This is your central control panel for managing Rentizzi.</p>
        </div>

        {/* Key Metrics */}
        <section>
          <h3 className="font-headline text-xl font-semibold text-primary mb-4">Platform Overview</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {adminMetrics.map((metric) => (
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
                            <Link href={metric.href}>View Details &rarr;</Link>
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {adminQuickLinks.map((link) => (
                    <Card key={link.title} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-1">
                                <link.icon className="h-7 w-7 text-primary"/>
                                <CardTitle className="font-headline text-lg">{link.title}</CardTitle>
                            </div>
                            <CardDescription className="text-xs">{link.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="border-t pt-4">
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
