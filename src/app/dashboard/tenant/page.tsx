
// src/app/dashboard/tenant/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DollarSign, Home, User, Settings, Bell, Wrench, Briefcase, ShoppingBag, AlertTriangle, ListChecks } from 'lucide-react';

// Dummy tenant data - replace with actual data fetching
const tenantData = {
  name: "Alice Wonderland",
  nationalId: "12345678",
  apartmentName: "Greenwood Heights",
  unitName: "A-101",
  roomNumber: "Master Bedroom",
  profilePicUrl: "https://placehold.co/100x100.png",
  aiProfileHint: "profile woman",
  rent: {
    amountDue: 1200,
    amountPaid: 500,
    dueDate: "2024-08-05",
  },
  serviceRequests: {
    pending: 1,
    inProgress: 0,
  },
  worker: {
    name: "Mike Ross (Plumber)",
    availability: "Working 9 AM - 5 PM, Mon-Fri",
    isAvailableNow: false, // Example
  },
  notifications: [
    { id: "n1", title: "Rent Reminder", message: "Your rent for August is due soon.", date: "2024-07-28", read: false, type: "alert" as "alert" | "info" },
    { id: "n2", title: "Maintenance Scheduled", message: "Plumbing work in building on Aug 2nd.", date: "2024-07-25", read: true, type: "info" as "alert" | "info" },
  ]
};

export default function TenantDashboardPage() {
  const outstandingRent = tenantData.rent.amountDue - tenantData.rent.amountPaid;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        {/* Welcome Message & Profile Snippet */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">
              Hello, {tenantData.name}!
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">Welcome to your Rentizzi dashboard.</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={tenantData.profilePicUrl} alt={tenantData.name} data-ai-hint={tenantData.aiProfileHint} />
              <AvatarFallback>{tenantData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/tenant/profile">
                <Settings className="mr-2 h-4 w-4" /> My Profile
              </Link>
            </Button>
          </div>
        </div>

        {/* Core Information */}
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg text-primary/90">Your Residence Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
            <div><strong>Tenant Name:</strong> {tenantData.name}</div>
            <div><strong>National ID:</strong> {tenantData.nationalId}</div>
            <div><strong>Apartment:</strong> {tenantData.apartmentName}</div>
            <div><strong>Unit:</strong> {tenantData.unitName}</div>
            <div><strong>Room:</strong> {tenantData.roomNumber}</div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Rent Status Card */}
          <Card className="lg:col-span-2 border-primary shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-primary"><DollarSign className="mr-2 h-6 w-6" /> Current Rent Status</CardTitle>
              <CardDescription>Due Date: {new Date(tenantData.rent.dueDate).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-medium">Amount Due:</span>
                <span className="text-2xl font-bold text-primary">KES {tenantData.rent.amountDue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-medium">Amount Paid:</span>
                <span className="text-xl font-semibold text-green-600">KES {tenantData.rent.amountPaid.toLocaleString()}</span>
              </div>
              {outstandingRent > 0 && (
                <div className="flex justify-between items-baseline p-3 bg-destructive/10 rounded-md">
                  <span className="text-lg font-medium text-destructive">Outstanding:</span>
                  <span className="text-xl font-bold text-destructive">KES {outstandingRent.toLocaleString()}</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" asChild>
                <Link href="/dashboard/tenant/payments/make-payment">
                  <DollarSign className="mr-2 h-5 w-5" /> Pay Now
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Important Notifications Card */}
          <Card className="lg:row-span-2">
            <CardHeader>
              <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5" /> Important Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-80 overflow-y-auto">
              {tenantData.notifications.length > 0 ? (
                tenantData.notifications.map(notif => (
                  <div key={notif.id} className={`p-3 rounded-md border ${notif.type === 'alert' ? 'border-destructive/50 bg-destructive/5' : 'border-border bg-muted/30'}`}>
                    <div className="flex items-center justify-between">
                      <h4 className={`font-semibold text-sm ${notif.type === 'alert' ? 'text-destructive' : 'text-foreground'}`}>{notif.title}</h4>
                      {!notif.read && <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                    <p className="text-xs text-muted-foreground/80 mt-1">{new Date(notif.date).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No new notifications.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm" asChild>
                <Link href="/dashboard/tenant/notifications">View All Notifications</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions/Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Wrench className="mr-2 h-5 w-5" /> Service Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                You have <span className="font-bold text-primary">{tenantData.serviceRequests.pending}</span> pending request(s).
              </p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/dashboard/tenant/service-requests/new">New Request</Link>
              </Button>
              <Button className="w-full sm:w-auto" asChild>
                <Link href="/dashboard/tenant/service-requests">View Requests</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Briefcase className="mr-2 h-5 w-5" /> Worker Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{tenantData.worker.name}</p>
              <p className={`text-xs ${tenantData.worker.isAvailableNow ? 'text-green-600' : 'text-muted-foreground'}`}>
                {tenantData.worker.isAvailableNow ? "Available Now" : tenantData.worker.availability}
              </p>
            </CardContent>
            <CardFooter>
               <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/tenant/workers">View Assigned Workers</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Shopping Section Link */}
            <Card className="bg-accent/30 hover:bg-accent/50 transition-colors">
            <CardHeader className="flex-row items-center justify-between">
                <div className="space-y-1">
                <CardTitle className="flex items-center text-accent-foreground"><ShoppingBag className="mr-2 h-5 w-5"/> Exclusive Shopping</CardTitle>
                <CardDescription className="text-accent-foreground/80">Discover goods and services relevant to your living needs.</CardDescription>
                </div>
                <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/80" asChild>
                <Link href="/shopping">
                    Go to Shop
                </Link>
                </Button>
            </CardHeader>
            </Card>

            {/* My Shop Orders Link */}
            <Card className="bg-primary/10 hover:bg-primary/20 transition-colors">
                <CardHeader className="flex-row items-center justify-between">
                    <div className="space-y-1">
                    <CardTitle className="flex items-center text-primary"><ListChecks className="mr-2 h-5 w-5"/> My Shop Orders</CardTitle>
                    <CardDescription className="text-primary/80">Track your purchases from the tenant shop.</CardDescription>
                    </div>
                    <Button variant="outline" asChild>
                    <Link href="/dashboard/tenant/shopping-orders">
                        View My Shop Orders
                    </Link>
                    </Button>
                </CardHeader>
            </Card>
        </div>
      </main>
    </div>
  );
}
