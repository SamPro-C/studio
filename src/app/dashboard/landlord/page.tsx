
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { 
  Building, 
  Home, 
  Users, 
  Briefcase, 
  Wrench, 
  CreditCard, 
  DollarSign, 
  PlusCircle, 
  UserPlus, 
  ListChecks, 
  FileText, 
  CheckCircle, 
  Receipt, 
  ArrowRight, 
  Settings, 
  Bell 
} from 'lucide-react';

// Dummy data for landlord name - replace with actual data fetching later
const landlordName = "Demo Landlord"; 

// Define types for metrics and activities for better type safety
type MetricVariant = 'default' | 'warning' | 'danger';

interface Metric {
  title: string;
  value: string | number;
  icon: React.ElementType;
  href: string;
  variant?: MetricVariant;
}

interface Activity {
  id: string;
  type: 'payment' | 'request' | 'worker' | 'expense';
  description: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
}

interface QuickAction {
  label: string;
  href: string;
  icon: React.ElementType;
}

const metrics: Metric[] = [
  { title: "Total Apartments", value: 5, icon: Building, href: "/dashboard/landlord/apartments" },
  { title: "Total Units", value: "50 (45 Occ / 5 Vac)", icon: Home, href: "/dashboard/landlord/apartments" },
  { title: "Total Tenants", value: 85, icon: Users, href: "/dashboard/landlord/tenants" },
  { title: "Total Workers", value: 12, icon: Briefcase, href: "/dashboard/landlord/workers" },
  { title: "Pending Service Requests", value: 3, icon: Wrench, href: "/dashboard/landlord/service-requests", variant: "warning" },
  { title: "Unpaid Rent (This Month)", value: "$1,250", icon: CreditCard, href: "/dashboard/landlord/payments", variant: "danger" },
  { title: "Payments (Last 7 Days)", value: "$5,600", icon: DollarSign, href: "/dashboard/landlord/payments" },
];

const recentActivities: Activity[] = [
  { id: "1", type: "payment", description: "Jane Doe (A-101) paid $500 rent.", time: "2h ago", icon: DollarSign, iconColor: "text-green-500" },
  { id: "2", type: "request", description: "New service request from B-203: Leaky faucet.", time: "5h ago", icon: Wrench, iconColor: "text-orange-500" },
  { id: "3", type: "worker", description: "Mike Ross (Plumber) updated task #SR123 to 'In Progress'.", time: "1d ago", icon: Briefcase, iconColor: "text-blue-500" },
  { id: "4", type: "expense", description: "Expense added: $50 for cleaning supplies.", time: "2d ago", icon: Receipt, iconColor: "text-purple-500" },
];

const quickActions: QuickAction[] = [
  { label: "Add New Apartment", href: "/dashboard/landlord/apartments/new", icon: PlusCircle },
  { label: "Register New Tenant", href: "/dashboard/landlord/tenants/new", icon: UserPlus },
  { label: "Register New Worker", href: "/dashboard/landlord/workers/new", icon: Briefcase }, 
  { label: "View Service Requests", href: "/dashboard/landlord/service-requests", icon: ListChecks },
  { label: "View Payments & Financials", href: "/dashboard/landlord/payments", icon: DollarSign },
  { label: "Manage Expenses", href: "/dashboard/landlord/expenses", icon: Receipt },
  { label: "Generate Report", href: "/dashboard/landlord/reports", icon: FileText },
];

function getIconColorClass(variant?: MetricVariant): string {
  switch (variant) {
    case 'warning':
      return 'text-orange-500';
    case 'danger':
      return 'text-red-500';
    default:
      return 'text-primary/80';
  }
}

export default function LandlordDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* For now, the dashboard is full page. A dedicated Layout/Sidebar for landlord can be added later */}
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        {/* Welcome Message and Top Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Welcome back, {landlordName}!</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Here's what's happening with your properties today.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/landlord/notifications">
                <Bell className="mr-2 h-4 w-4" /> View Notifications
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/landlord/settings">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Link>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <section>
          <h2 className="font-headline text-xl sm:text-2xl font-semibold text-primary mb-4">Key Metrics</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {metrics.map((metric) => (
              <Card key={metric.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className={`h-5 w-5 ${getIconColorClass(metric.variant)}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  {metric.href && (
                    <Link href={metric.href} className="text-xs text-muted-foreground hover:text-primary flex items-center mt-1">
                      View Details <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Recent Activity Feed */}
          <section className="lg:col-span-2">
            <h2 className="font-headline text-xl sm:text-2xl font-semibold text-primary mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y divide-border">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity) => (
                      <li key={activity.id} className="p-4 flex items-start space-x-3 sm:space-x-4 hover:bg-muted/50 transition-colors">
                        <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                          <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="p-4 text-muted-foreground text-sm">No recent activity.</p>
                  )}
                </ul>
              </CardContent>
              {recentActivities.length > 0 && (
                <CardFooter className="border-t p-4">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/dashboard/landlord/activity-log">View All Activity</Link>
                  </Button>
                </CardFooter>
              )}
            </Card>
          </section>

          {/* Quick Actions */}
          <section className="lg:col-span-1">
            <h2 className="font-headline text-xl sm:text-2xl font-semibold text-primary mb-4">Quick Actions</h2>
            <div className="grid gap-3">
              {quickActions.map((action) => (
                <Button key={action.label} variant="outline" className="w-full justify-start text-left" asChild>
                  <Link href={action.href}>
                    <action.icon className="mr-3 h-5 w-5 text-primary/90" />
                    {action.label}
                  </Link>
                </Button>
              ))}
            </div>
          </section>
        </div>
        
        {/* Placeholder for future graphs or more detailed summaries */}
        {/* 
        <section>
          <h2 className="font-headline text-xl sm:text-2xl font-semibold text-primary mb-4">Property Overview Charts</h2>
          <Card>
            <CardHeader>
              <CardTitle>Occupancy & Revenue Trends</CardTitle>
              <CardDescription>Monthly overview of your property performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Chart placeholder - coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </section>
        */}
      </main>
    </div>
  );
}
    
    

    
