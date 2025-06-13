
// /src/app/shopping/profile/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, UserCircle, MapPin, CreditCard, Bell, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Dummy data - In a real app, this would come from user's profile
const shopUserProfileData = {
  name: "Alice Wonderland",
  defaultDeliveryAddress: {
    apartment: "Greenwood Heights",
    unit: "A-101",
    room: "Main Bedroom",
    contactPhone: "+254712345678",
  },
  savedPaymentMethodsCount: 1, // e.g., "Visa ending in 1234"
  shopNotificationPreferences: {
    promotions: true,
    newArrivals: false,
  },
};

export default function ShoppingProfilePage() {
  const { toast } = useToast();

  const handleEditAddress = () => {
    toast({ description: "Address editing functionality to be implemented." });
  };
  const handleManagePayments = () => {
    toast({ description: "Payment method management to be implemented." });
  };
  const handleUpdateNotifications = () => {
    toast({ description: "Notification preferences update to be implemented." });
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/shopping">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-xl sm:text-2xl font-bold text-primary flex items-center">
              <UserCircle className="mr-2 h-6 w-6" /> My Shop Profile
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center"><MapPin className="mr-2 h-5 w-5 text-primary/80" /> Default Delivery Information</CardTitle>
              <CardDescription>Your primary address for shop deliveries.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleEditAddress}><Edit className="mr-2 h-4 w-4"/> Edit</Button>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><strong>Name:</strong> {shopUserProfileData.name}</p>
            <p><strong>Apartment:</strong> {shopUserProfileData.defaultDeliveryAddress.apartment}</p>
            <p><strong>Unit/Room:</strong> {shopUserProfileData.defaultDeliveryAddress.unit} ({shopUserProfileData.defaultDeliveryAddress.room})</p>
            <p><strong>Contact Phone:</strong> {shopUserProfileData.defaultDeliveryAddress.contactPhone}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5 text-primary/80" /> Saved Payment Methods</CardTitle>
              <CardDescription>Manage payment options for quicker checkout.</CardDescription>
            </div>
             <Button variant="outline" size="sm" onClick={handleManagePayments}><Edit className="mr-2 h-4 w-4"/> Manage</Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You have {shopUserProfileData.savedPaymentMethodsCount} saved payment method(s). (Details hidden for security).
            </p>
            <div className="mt-3 p-4 border border-dashed rounded-md bg-muted/50 text-center">
              <p className="text-muted-foreground text-xs">Full payment method management will appear here.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5 text-primary/80" /> Shop Notification Preferences</CardTitle>
                <CardDescription>Choose what updates you receive from the shop.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleUpdateNotifications}><Edit className="mr-2 h-4 w-4"/> Update</Button>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
                <span>Receive promotional offers:</span>
                <span className={shopUserProfileData.shopNotificationPreferences.promotions ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {shopUserProfileData.shopNotificationPreferences.promotions ? "Yes" : "No"}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <span>Get notified about new arrivals:</span>
                 <span className={shopUserProfileData.shopNotificationPreferences.newArrivals ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {shopUserProfileData.shopNotificationPreferences.newArrivals ? "Yes" : "No"}
                </span>
            </div>
             <div className="mt-3 p-4 border border-dashed rounded-md bg-muted/50 text-center">
                <p className="text-muted-foreground text-xs">Detailed notification toggles will appear here.</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="border-t bg-background py-6 mt-auto">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rentizzi Tenant Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
