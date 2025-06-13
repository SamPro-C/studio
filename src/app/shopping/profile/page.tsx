
// /src/app/shopping/profile/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, UserCircle, MapPin, CreditCard, Bell, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

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
  const [promotionsEnabled, setPromotionsEnabled] = useState(shopUserProfileData.shopNotificationPreferences.promotions);
  const [newArrivalsEnabled, setNewArrivalsEnabled] = useState(shopUserProfileData.shopNotificationPreferences.newArrivals);

  const handleEditAddress = () => {
    toast({ description: "Address editing functionality to be implemented." });
  };
  const handleManagePayments = () => {
    toast({ description: "Payment method management to be implemented." });
  };
  const handleUpdateNotifications = () => {
    // In a real app, save these preferences to backend
    console.log("Updated Notification Preferences:", { promotions: promotionsEnabled, newArrivals: newArrivalsEnabled });
    toast({ description: "Shop notification preferences updated (client-side).", title: "Preferences Saved" });
  };

  const InfoDisplayItem: React.FC<{label: string, value: string | undefined, icon?: React.ElementType}> = ({ label, value, icon: Icon }) => (
    <div className="flex items-start py-1">
        {Icon && <Icon className="mr-2 h-4 w-4 mt-0.5 text-primary/70 flex-shrink-0" />}
        <span className="font-medium text-muted-foreground w-28 sm:w-36 flex-shrink-0">{label}:</span>
        <span className="text-foreground break-words">{value || 'N/A'}</span>
    </div>
  );


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
          <CardContent className="space-y-1.5 text-sm">
            <InfoDisplayItem label="Name" value={shopUserProfileData.name} />
            <InfoDisplayItem label="Apartment" value={shopUserProfileData.defaultDeliveryAddress.apartment} />
            <InfoDisplayItem label="Unit / Room" value={`${shopUserProfileData.defaultDeliveryAddress.unit} (${shopUserProfileData.defaultDeliveryAddress.room})`} />
            <InfoDisplayItem label="Contact Phone" value={shopUserProfileData.defaultDeliveryAddress.contactPhone} />
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
          <CardHeader>
            <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5 text-primary/80" /> Shop Notification Preferences</CardTitle>
            <CardDescription>Choose what updates you receive from the shop.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="promotionsSwitch" className="text-sm font-medium">Receive promotional offers</Label>
                <Switch 
                    id="promotionsSwitch"
                    checked={promotionsEnabled}
                    onCheckedChange={setPromotionsEnabled}
                />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="newArrivalsSwitch" className="text-sm font-medium">Get notified about new arrivals</Label>
                 <Switch 
                    id="newArrivalsSwitch"
                    checked={newArrivalsEnabled}
                    onCheckedChange={setNewArrivalsEnabled}
                />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpdateNotifications}>Save Notification Preferences</Button>
          </CardFooter>
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
