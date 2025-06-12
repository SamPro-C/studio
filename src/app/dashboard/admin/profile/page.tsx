
// src/app/dashboard/admin/profile/page.tsx
"use client";

import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save, UserCircle, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PasswordStrength, calculatePasswordScore } from '@/components/auth/PasswordStrength';
import { ChangePasswordSchema, type ChangePasswordFormData } from '@/schemas/settings';

// Dummy initial data for admin - in a real app, this would come from an API
const initialAdminProfileData = {
  fullName: "Super Admin",
  email: "admin@rentizzi.app",
  role: "Platform Administrator",
};

export default function AdminProfilePage() {
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState(0);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

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

  async function onPasswordSubmit(data: ChangePasswordFormData) {
    console.log("Admin changing password with data:", data);
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });
    passwordForm.reset();
    setNewPassword('');
  }

  const handleRequestInfoUpdate = () => {
    // For admin, this might be different or not present if they have direct edit rights or use a different system.
    toast({
      title: "Info Update",
      description: "Admin profile information is typically managed via super-admin tools or direct database access for security reasons.",
    });
  };
  
  const handle2FASetup = () => {
    toast({
        title: "Two-Factor Authentication",
        description: "2FA setup functionality will be implemented here. (Placeholder)",
    });
  };


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/admin" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to Admin Dashboard
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <UserCircle className="mr-3 h-7 w-7" /> Admin Profile & Security
            </h1>
          </div>
        </div>

        {/* Personal Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary/80"/> My Information</CardTitle>
                <CardDescription>Your admin account details.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleRequestInfoUpdate}>Request Info Update</Button>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div><strong>Full Name:</strong> {initialAdminProfileData.fullName}</div>
            <div><strong>Email:</strong> {initialAdminProfileData.email}</div>
            <div><strong>Role:</strong> {initialAdminProfileData.role}</div>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Lock className="mr-2 h-5 w-5 text-primary/80"/> Change Password</CardTitle>
            <CardDescription>Update your account password regularly for security.</CardDescription>
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
        
        {/* Two-Factor Authentication Card */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><Shield className="mr-2 h-5 w-5 text-primary/80"/> Two-Factor Authentication (2FA)</CardTitle>
                <CardDescription>Enhance your account security by enabling 2FA.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Placeholder content for 2FA */}
                <p className="text-sm text-muted-foreground">Status: <span className="font-semibold text-destructive">Not Enabled</span></p>
                <p className="text-xs mt-1">
                    Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to log in.
                </p>
            </CardContent>
            <CardFooter>
                <Button onClick={handle2FASetup}>Setup Two-Factor Authentication</Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}
