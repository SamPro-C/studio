
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

export default function SystemConfigurationPage() {
  const { toast } = useToast();

  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings Saved (Placeholder)",
      description: `${section} settings have been saved. This is a simulated action.`,
    });
  };

  const handleSendAnnouncement = () => {
    toast({
        title: "Announcement Sent (Placeholder)",
        description: "System-wide announcement has been dispatched. This is a simulated action."
    });
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

        {/* Payment Gateway Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5 text-primary/80"/> Payment Gateway Settings</CardTitle>
            <CardDescription>Manage payment processing configurations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="mpesaPaybill">M-Pesa Paybill Number</Label>
              <Input id="mpesaPaybill" placeholder="e.g., 123456" />
            </div>
            <div>
              <Label htmlFor="cardApiKey">Card Payment API Key</Label>
              <Input id="cardApiKey" type="password" placeholder="••••••••••••••••" />
            </div>
            <div>
              <Label htmlFor="transactionFee">Transaction Fee (%)</Label>
              <Input id="transactionFee" type="number" placeholder="e.g., 2.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSaveSettings("Payment Gateway")}><Save className="mr-2 h-4 w-4"/> Save Payment Settings</Button>
          </CardFooter>
        </Card>

        {/* SMS & Email Service Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Mail className="mr-2 h-5 w-5 text-primary/80"/> SMS & Email Service Configuration</CardTitle>
            <CardDescription>Setup communication service providers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="smsApiKey">SMS Gateway API Key (e.g., Africa's Talking)</Label>
              <Input id="smsApiKey" type="password" placeholder="••••••••••••••••" />
            </div>
            <div>
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input id="smtpHost" placeholder="e.g., smtp.example.com" />
            </div>
            <div>
              <Label htmlFor="smtpUser">SMTP Username</Label>
              <Input id="smtpUser" placeholder="e.g., user@example.com" />
            </div>
            <div>
                <Button variant="outline" asChild>
                    <Link href="#">Manage Notification Templates <ExternalLink className="ml-2 h-3 w-3"/></Link>
                </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSaveSettings("Communication Service")}><Save className="mr-2 h-4 w-4"/> Save Communication Settings</Button>
          </CardFooter>
        </Card>

        {/* User Role Permissions */}
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
            {/* Placeholder for future permission toggles */}
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSaveSettings("User Role Permissions")} disabled><Save className="mr-2 h-4 w-4"/> Save Permissions (Disabled)</Button>
          </CardFooter>
        </Card>

        {/* System Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Megaphone className="mr-2 h-5 w-5 text-primary/80"/> System Announcements</CardTitle>
            <CardDescription>Send messages to all users or specific groups.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <Label htmlFor="announcementMessage">Announcement Message</Label>
                <Textarea id="announcementMessage" placeholder="Enter your system-wide announcement here..." rows={4}/>
            </div>
            <div>
                <Label htmlFor="announcementTarget">Target Audience</Label>
                <Select>
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
            <Button onClick={handleSendAnnouncement}><Megaphone className="mr-2 h-4 w-4"/> Send Announcement</Button>
          </CardFooter>
        </Card>

        {/* Global App Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Globe className="mr-2 h-5 w-5 text-primary/80"/> Global App Settings</CardTitle>
            <CardDescription>Manage platform-wide settings like currency and legal documents.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currency">Default Currency</Label>
              <Input id="currency" defaultValue="KES" placeholder="e.g., KES, USD" />
            </div>
            <div>
              <Label htmlFor="timezone">Default Timezone</Label>
              <Input id="timezone" defaultValue="Africa/Nairobi" placeholder="e.g., Africa/Nairobi" />
            </div>
            <div>
              <Label htmlFor="dateFormat">Date Format</Label>
              <Input id="dateFormat" defaultValue="YYYY-MM-DD" placeholder="e.g., DD/MM/YYYY" />
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
            <Button onClick={() => handleSaveSettings("Global App Settings")}><Save className="mr-2 h-4 w-4"/> Save Global Settings</Button>
          </CardFooter>
        </Card>

      </main>
    </div>
  );
}

