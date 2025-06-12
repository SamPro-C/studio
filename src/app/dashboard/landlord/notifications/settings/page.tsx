
// src/app/dashboard/landlord/notifications/settings/page.tsx
"use client";

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, BellOff, Settings2, BellRing, Clock, Mail, MessageSquareText, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotificationSettingsData {
  masterEnable: boolean;
  rentReminders: boolean;
  serviceRequestUpdates: boolean;
  generalAnnouncements: boolean;
  deliveryChannels: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
  defaultTone: 'Formal' | 'Informal' | 'Friendly';
  quietHoursStart: string;
  quietHoursEnd: string;
}

export default function NotificationSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<NotificationSettingsData>({
    masterEnable: true,
    rentReminders: true,
    serviceRequestUpdates: true,
    generalAnnouncements: true,
    deliveryChannels: {
      email: true,
      sms: false,
      inApp: true,
    },
    defaultTone: 'Friendly',
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
  });

  const handleSwitchChange = (field: keyof Pick<NotificationSettingsData, 'masterEnable' | 'rentReminders' | 'serviceRequestUpdates' | 'generalAnnouncements'>, checked: boolean) => {
    setSettings(prev => ({ ...prev, [field]: checked }));
  };

  const handleCheckboxChange = (channel: keyof NotificationSettingsData['deliveryChannels']) => {
    setSettings(prev => ({
      ...prev,
      deliveryChannels: {
        ...prev.deliveryChannels,
        [channel]: !prev.deliveryChannels[channel],
      },
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: NotificationSettingsData['defaultTone']) => {
    setSettings(prev => ({ ...prev, defaultTone: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Saving Notification Settings:", settings);
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    });
    // In a real app, this would be an API call.
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord/notifications">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/landlord/notifications" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to Notifications Center
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Settings2 className="mr-3 h-7 w-7" /> Notification Settings
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>General Preferences</CardTitle>
              <CardDescription>Manage overall notification behavior.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="masterEnable" className="flex items-center text-base font-medium">
                  {settings.masterEnable ? <BellRing className="mr-2 h-5 w-5 text-green-500"/> : <BellOff className="mr-2 h-5 w-5 text-muted-foreground"/>}
                   Enable All Notifications
                </Label>
                <Switch
                  id="masterEnable"
                  checked={settings.masterEnable}
                  onCheckedChange={(checked) => handleSwitchChange('masterEnable', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
              <CardDescription>Choose which types of notifications you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'rentReminders', label: 'Rent Reminders', field: 'rentReminders' as const },
                { id: 'serviceRequestUpdates', label: 'Service Request Updates', field: 'serviceRequestUpdates' as const },
                { id: 'generalAnnouncements', label: 'General Announcements & Platform Updates', field: 'generalAnnouncements' as const },
              ].map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                  <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                  <Switch
                    id={item.id}
                    checked={settings[item.field]}
                    onCheckedChange={(checked) => handleSwitchChange(item.field, checked)}
                    disabled={!settings.masterEnable}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Delivery Channels</CardTitle>
              <CardDescription>Select how you prefer to receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-3 border rounded-md bg-muted/30">
                    <p className="text-sm font-medium mb-3">Preferred Channels (Select at least one):</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { id: 'channelEmail', label: 'Email', field: 'email' as const, icon: Mail },
                            { id: 'channelSms', label: 'SMS', field: 'sms' as const, icon: Smartphone },
                            { id: 'channelInApp', label: 'In-App Notifications', field: 'inApp' as const, icon: MessageSquareText },
                        ].map(item => (
                            <div key={item.id} className="flex items-center space-x-2 p-2 rounded-md border border-transparent hover:border-primary/50 transition-colors">
                                <Checkbox
                                    id={item.id}
                                    checked={settings.deliveryChannels[item.field]}
                                    onCheckedChange={() => handleCheckboxChange(item.field)}
                                    disabled={!settings.masterEnable}
                                />
                                <Label htmlFor={item.id} className="flex items-center text-sm cursor-pointer">
                                    <item.icon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                    {item.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tone & Timing</CardTitle>
              <CardDescription>Customize the default tone and quiet hours for notifications.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="defaultTone">Default Notification Tone</Label>
                <Select
                  value={settings.defaultTone}
                  onValueChange={(value) => handleSelectChange(value as NotificationSettingsData['defaultTone'])}
                  disabled={!settings.masterEnable}
                >
                  <SelectTrigger id="defaultTone" className="mt-1">
                    <SelectValue placeholder="Select default tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Formal">Formal</SelectItem>
                    <SelectItem value="Informal">Informal</SelectItem>
                    <SelectItem value="Friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center"><Clock className="mr-2 h-4 w-4 text-muted-foreground"/> Quiet Hours (Do Not Disturb)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    id="quietHoursStart"
                    name="quietHoursStart"
                    value={settings.quietHoursStart}
                    onChange={handleInputChange}
                    disabled={!settings.masterEnable}
                    className="w-full"
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="time"
                    id="quietHoursEnd"
                    name="quietHoursEnd"
                    value={settings.quietHoursEnd}
                    onChange={handleInputChange}
                    disabled={!settings.masterEnable}
                    className="w-full"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Notifications will be silenced during these hours.</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg">
              <Save className="mr-2 h-4 w-4" /> Save Settings
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
