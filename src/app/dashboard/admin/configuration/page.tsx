
// src/app/dashboard/admin/configuration/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Settings, CreditCard, Mail, Users, Megaphone, Globe, Save, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, FormEvent } from 'react';

interface PaymentGatewaySettings {
  mpesaPaybill: string;
  cardApiKey: string;
  transactionFee: string;
}
interface CommunicationSettings {
  smsApiKey: string;
  smtpHost: string;
  smtpUser: string;
}
interface AnnouncementData {
    message: string;
    target: string;
}
interface GlobalAppSettings {
    currency: string;
    timezone: string;
    dateFormat: string;
}


export default function SystemConfigurationPage() {
  const { toast } = useToast();

  const [paymentSettings, setPaymentSettings] = useState<PaymentGatewaySettings>({
      mpesaPaybill: "123456", cardApiKey: "**********", transactionFee: "2.5"
  });
  const [commSettings, setCommSettings] = useState<CommunicationSettings>({
      smsApiKey: "**********", smtpHost: "smtp.example.com", smtpUser: "user@example.com"
  });
  const [announcement, setAnnouncement] = useState<AnnouncementData>({message: "", target: ""});
  const [globalSettings, setGlobalSettings] = useState<GlobalAppSettings>({
      currency: "KES", timezone: "Africa/Nairobi", dateFormat: "YYYY-MM-DD"
  });

  const handleInputChange = <T extends {}>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    field: keyof T
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(prev => ({ ...prev, [field]: e.target.value }));
  };
  
  const handleSelectChange = <T extends {}>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    field: keyof T
  ) => (value: string) => {
    setter(prev => ({ ...prev, [field]: value }));
  };


  const handleSaveSettings = (section: string, data: any) => {
    console.log(`Saving ${section} settings:`, data);
    toast({
      title: "Settings Saved (Simulated)",
      description: `${section} settings have been updated client-side.`,
    });
  };

  const handleSendAnnouncement = (e: FormEvent) => {
    e.preventDefault();
    if (!announcement.message || !announcement.target) {
        toast({title: "Error", description: "Please enter message and select target audience.", variant: "destructive"});
        return;
    }
    console.log("Sending announcement:", announcement);
    toast({
        title: "Announcement Sent (Simulated)",
        description: "System-wide announcement has been dispatched."
    });
    setAnnouncement({message: "", target: ""}); // Reset form
  };

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
            <Settings className="mr-3 h-7 w-7" /> System Configuration
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5 text-primary/80"/> Payment Gateway Settings</CardTitle>
            <CardDescription>Manage payment processing configurations.</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleSaveSettings("Payment Gateway", paymentSettings);}}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="mpesaPaybill">M-Pesa Paybill Number</Label>
                <Input id="mpesaPaybill" value={paymentSettings.mpesaPaybill} onChange={handleInputChange(setPaymentSettings, "mpesaPaybill")} placeholder="e.g., 123456" />
              </div>
              <div>
                <Label htmlFor="cardApiKey">Card Payment API Key</Label>
                <Input id="cardApiKey" type="password" value={paymentSettings.cardApiKey} onChange={handleInputChange(setPaymentSettings, "cardApiKey")} placeholder="••••••••••••••••" />
              </div>
              <div>
                <Label htmlFor="transactionFee">Transaction Fee (%)</Label>
                <Input id="transactionFee" type="number" value={paymentSettings.transactionFee} onChange={handleInputChange(setPaymentSettings, "transactionFee")} placeholder="e.g., 2.5" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit"><Save className="mr-2 h-4 w-4"/> Save Payment Settings</Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Mail className="mr-2 h-5 w-5 text-primary/80"/> SMS & Email Service Configuration</CardTitle>
            <CardDescription>Setup communication service providers.</CardDescription>
          </CardHeader>
           <form onSubmit={(e) => { e.preventDefault(); handleSaveSettings("Communication Service", commSettings);}}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="smsApiKey">SMS Gateway API Key (e.g., Africa's Talking)</Label>
                <Input id="smsApiKey" type="password" value={commSettings.smsApiKey} onChange={handleInputChange(setCommSettings, "smsApiKey")} placeholder="••••••••••••••••" />
              </div>
              <div>
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input id="smtpHost" value={commSettings.smtpHost} onChange={handleInputChange(setCommSettings, "smtpHost")} placeholder="e.g., smtp.example.com" />
              </div>
              <div>
                <Label htmlFor="smtpUser">SMTP Username</Label>
                <Input id="smtpUser" value={commSettings.smtpUser} onChange={handleInputChange(setCommSettings, "smtpUser")} placeholder="e.g., user@example.com" />
              </div>
              <div>
                  <Button variant="outline" asChild>
                      <Link href="#">Manage Notification Templates <ExternalLink className="ml-2 h-3 w-3"/></Link>
                  </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit"><Save className="mr-2 h-4 w-4"/> Save Communication Settings</Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-primary/80"/> User Role Permissions</CardTitle>
            <CardDescription>Define capabilities for different user roles.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This section will allow fine-grained control over permissions for Landlords, Tenants, Workers, and Shop Managers.
              (e.g., toggle "Tenant can rate workers," "Landlord can add manual expenses"). Currently, this is a placeholder for a more complex RBAC management interface.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => toast({description: "Permissions save functionality not yet implemented."})} disabled><Save className="mr-2 h-4 w-4"/> Save Permissions (Disabled)</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Megaphone className="mr-2 h-5 w-5 text-primary/80"/> System Announcements</CardTitle>
            <CardDescription>Send messages to all users or specific groups.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSendAnnouncement}>
            <CardContent className="space-y-4">
              <div>
                  <Label htmlFor="announcementMessage">Announcement Message</Label>
                  <Textarea id="announcementMessage" value={announcement.message} onChange={handleInputChange(setAnnouncement, "message")} placeholder="Enter your system-wide announcement here..." rows={4} required/>
              </div>
              <div>
                  <Label htmlFor="announcementTarget">Target Audience</Label>
                  <Select value={announcement.target} onValueChange={handleSelectChange(setAnnouncement, "target")} required>
                      <SelectTrigger id="announcementTarget">
                          <SelectValue placeholder="Select audience"/>
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="landlords">All Landlords</SelectItem>
                          <SelectItem value="tenants">All Tenants</SelectItem>
                          <SelectItem value="workers">All Workers</SelectItem>
                          <SelectItem value="shop_managers">All Shop Managers</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit"><Megaphone className="mr-2 h-4 w-4"/> Send Announcement</Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Globe className="mr-2 h-5 w-5 text-primary/80"/> Global App Settings</CardTitle>
            <CardDescription>Manage platform-wide settings like currency and legal documents.</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleSaveSettings("Global App Settings", globalSettings);}}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Default Currency</Label>
                <Input id="currency" value={globalSettings.currency} onChange={handleInputChange(setGlobalSettings, "currency")} placeholder="e.g., KES, USD" />
              </div>
              <div>
                <Label htmlFor="timezone">Default Timezone</Label>
                <Input id="timezone" value={globalSettings.timezone} onChange={handleInputChange(setGlobalSettings, "timezone")} placeholder="e.g., Africa/Nairobi" />
              </div>
              <div>
                <Label htmlFor="dateFormat">Date Format</Label>
                <Input id="dateFormat" value={globalSettings.dateFormat} onChange={handleInputChange(setGlobalSettings, "dateFormat")} placeholder="e.g., DD/MM/YYYY" />
              </div>
              <div className="md:col-span-2 space-y-2 pt-2 border-t">
                  <Button variant="outline" asChild>
                      <Link href="/terms" target="_blank">Manage Terms of Service <ExternalLink className="ml-2 h-3 w-3"/></Link>
                  </Button>
                  <Button variant="outline" asChild>
                      <Link href="/privacy" target="_blank">Manage Privacy Policy <ExternalLink className="ml-2 h-3 w-3"/></Link>
                  </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit"><Save className="mr-2 h-4 w-4"/> Save Global Settings</Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
    