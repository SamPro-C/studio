// src/app/dashboard/shop-manager/settings/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Store, Truck, CreditCard, Settings2, Users, Save, ExternalLink, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ShopSettingsPage() {
  const { toast } = useToast();
  const handleSaveSettings = (section: string) => toast({ title: "Settings Saved", description: `${section} settings saved successfully. (Placeholder)` });

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
            <Settings2 className="mr-3 h-7 w-7" /> Shop Settings
          </h1>
        </div>

        {/* Shop Information */}
        <Card>
          <CardHeader><CardTitle className="flex items-center"><Store className="mr-2"/>Shop Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label htmlFor="shopName">Shop Name</Label><Input id="shopName" defaultValue="My Apartment Shop" /></div>
            <div><Label htmlFor="shopContactEmail">Contact Email</Label><Input id="shopContactEmail" type="email" defaultValue="shop@example.com" /></div>
            <div><Label htmlFor="shopContactPhone">Contact Phone</Label><Input id="shopContactPhone" type="tel" defaultValue="0700123123" /></div>
            <div><Label htmlFor="shopHours">Operating Hours</Label><Input id="shopHours" defaultValue="Mon-Sat: 9 AM - 6 PM" /></div>
          </CardContent>
          <CardFooter><Button onClick={() => handleSaveSettings("Shop Information")}><Save className="mr-2"/>Save Shop Info</Button></CardFooter>
        </Card>

        {/* Delivery Settings */}
        <Card>
          <CardHeader><CardTitle className="flex items-center"><Truck className="mr-2"/>Delivery Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label htmlFor="deliveryZones">Delivery Zones (e.g., Apartment Blocks)</Label><Textarea id="deliveryZones" placeholder="Block A, Block B, Greenwood Heights Only" /></div>
            <div><Label htmlFor="deliveryFee">Standard Delivery Fee (KES)</Label><Input id="deliveryFee" type="number" defaultValue="100" /></div>
            <div><Label htmlFor="minOrderFree">Minimum Order for Free Delivery (KES)</Label><Input id="minOrderFree" type="number" defaultValue="1000" /></div>
          </CardContent>
          <CardFooter><Button onClick={() => handleSaveSettings("Delivery Settings")}><Save className="mr-2"/>Save Delivery Settings</Button></CardFooter>
        </Card>

        {/* Payment Gateway Configuration */}
        <Card>
          <CardHeader><CardTitle className="flex items-center"><CreditCard className="mr-2"/>Payment Gateway</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label htmlFor="mpesaApiKey">M-Pesa API Key (Placeholder)</Label><Input id="mpesaApiKey" type="password" /></div>
            <div><Label htmlFor="cardApiKeyShop">Card Processor API Key (Placeholder)</Label><Input id="cardApiKeyShop" type="password" /></div>
             <p className="text-xs text-muted-foreground">Configure your shop-specific payment gateway credentials here.</p>
          </CardContent>
          <CardFooter><Button onClick={() => handleSaveSettings("Payment Gateway")}><Save className="mr-2"/>Save Payment Settings</Button></CardFooter>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader><CardTitle className="flex items-center"><Bell className="mr-2"/>Notification Settings</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Configure email/SMS templates for order confirmations, shipping updates, etc.</p>
            <Button variant="outline" asChild><Link href="#">Manage Notification Templates <ExternalLink className="ml-2 h-3 w-3"/></Link></Button>
          </CardContent>
           <CardFooter><Button onClick={() => handleSaveSettings("Notification Settings")}><Save className="mr-2"/>Save Notification Preferences</Button></CardFooter>
        </Card>
        
        {/* User Management (Shop Staff) */}
        <Card>
          <CardHeader><CardTitle className="flex items-center"><Users className="mr-2"/>Shop Staff Management</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Add or manage other shop managers or delivery personnel who can access this dashboard.</p>
            <div className="mt-4 p-4 border border-dashed rounded-md bg-muted/50 text-center">
                <p className="text-muted-foreground">(Staff management UI placeholder)</p>
            </div>
          </CardContent>
           <CardFooter><Button onClick={() => handleSaveSettings("Shop Staff")} disabled><Save className="mr-2"/>Save Staff Settings (Disabled)</Button></CardFooter>
        </Card>
      </main>
    </div>
  );
}
