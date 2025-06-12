// src/app/dashboard/landlord/settings/page.tsx
"use client";

import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save, UserCircle, Lock, Bell, Eye, EyeOff, Settings2Icon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PasswordStrength, calculatePasswordScore } from '@/components/auth/PasswordStrength';
import { LandlordProfileSchema, ChangePasswordSchema, type LandlordProfileFormData, type ChangePasswordFormData } from '@/schemas/settings';

// Dummy initial data - in a real app, this would come from an API
const initialProfileData: LandlordProfileFormData = {
  fullName: "Demo Landlord",
  email: "landlord@example.com",
  phoneNumber: "+254712345678",
};

export default function LandlordSettingsPage() {
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState(0);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const profileForm = useForm<LandlordProfileFormData>({
    resolver: zodResolver(LandlordProfileSchema),
    defaultValues: initialProfileData,
  });

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    setPasswordScore(calculatePasswordScore(newPassword));
  }, [newPassword]);

  async function onProfileSubmit(data: LandlordProfileFormData) {
    console.log("Updating profile with data:", data);
    toast({
      title: "Profile Updated",
      description: "Your personal information has been saved.",
    });
    // Here you would typically call an API to save the data
    // For demo, we can update initialProfileData if needed or just reset to new values
    profileForm.reset(data); // Resets form with new "saved" values
  }

  async function onPasswordSubmit(data: ChangePasswordFormData) {
    console.log("Changing password with data:", data);
    // IMPORTANT: In a real app, verify currentPassword against the server
    // For now, we simulate success if new passwords match schema
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });
    passwordForm.reset();
    setNewPassword('');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/landlord" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to Dashboard
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Settings2Icon className="mr-3 h-7 w-7" /> Account Settings
            </h1>
          </div>
        </div>

        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary/80"/> Personal Information</CardTitle>
            <CardDescription>Update your name, email, and phone number.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                <FormField
                  control={profileForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl><Input type="email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input type="tel" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                  {profileForm.formState.isSubmitting ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Personal Info</>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Lock className="mr-2 h-5 w-5 text-primary/80"/> Change Password</CardTitle>
            <CardDescription>Update your account password.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showCurrentPassword ? "text" : "password"} {...field} />
                          <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showNewPassword ? "text" : "password"} 
                            {...field} 
                            onChange={(e) => { field.onChange(e); setNewPassword(e.target.value); }}
                          />
                          <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground" onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <PasswordStrength score={passwordScore} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showConfirmNewPassword ? "text" : "password"} {...field} />
                          <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                            {showConfirmNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
                  {passwordForm.formState.isSubmitting ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Change Password</>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Notification Settings Link Card */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5 text-primary/80"/> Notification Settings</CardTitle>
                <CardDescription>Manage how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Customize your notification preferences for rent reminders, service request updates, and general announcements.
                </p>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/landlord/notifications/settings">
                        Go to Notification Settings
                    </Link>
                </Button>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
