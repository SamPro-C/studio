
// src/app/dashboard/shop-manager/profile/page.tsx
"use client";

import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, UserCircle, Lock, Mail, Phone, Edit, Eye, EyeOff, Save, Store } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { PasswordStrength, calculatePasswordScore } from '@/components/auth/PasswordStrength';
import { ChangePasswordSchema, type ChangePasswordFormData } from '@/schemas/settings'; // Re-use if applicable

// Dummy data for shop manager - in a real app, this would come from an API
const shopManagerProfileData = {
  fullName: "Shop Manager One",
  email: "shopmanager@example.com",
  phoneNumber: "+254712345000",
  shopName: "My Apartment Delights", // Example shop name
};

export default function ShopManagerProfilePage() {
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState(0);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  useEffect(() => {
    setPasswordScore(calculatePasswordScore(newPassword));
  }, [newPassword]);

  async function onPasswordSubmit(data: ChangePasswordFormData) {
    console.log("Shop Manager changing password with data:", data);
    toast({ title: "Password Changed", description: "Your password has been successfully updated." });
    passwordForm.reset();
    setNewPassword('');
  }

  const handleRequestInfoUpdate = () => {
    toast({
        title: "Update Request Sent",
        description: "Your request to update profile information has been sent to the platform administrator.",
    });
  };
  
  const InfoDisplayItem: React.FC<{label: string, value: string | undefined, icon?: React.ElementType}> = ({ label, value, icon: Icon }) => (
    <div className="flex items-start py-1">
        {Icon && <Icon className="mr-2 h-4 w-4 mt-0.5 text-primary/70 flex-shrink-0" />}
        <span className="font-medium text-muted-foreground w-28 sm:w-36 flex-shrink-0">{label}:</span>
        <span className="text-foreground break-words">{value || 'N/A'}</span>
    </div>
  );

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
            <UserCircle className="mr-3 h-7 w-7" /> My Profile & Settings
          </h1>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary/80"/> My Information</CardTitle>
                <CardDescription>Your personal and shop details.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleRequestInfoUpdate}>
                <Edit className="mr-2 h-4 w-4" /> Request Info Update
            </Button>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <InfoDisplayItem label="Full Name" value={shopManagerProfileData.fullName} icon={UserCircle} />
            <InfoDisplayItem label="Email" value={shopManagerProfileData.email} icon={Mail}/>
            <InfoDisplayItem label="Phone Number" value={shopManagerProfileData.phoneNumber} icon={Phone}/>
            <InfoDisplayItem label="Shop Name" value={shopManagerProfileData.shopName} icon={Store}/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Lock className="mr-2 h-5 w-5 text-primary/80"/> Change Password</CardTitle>
            <CardDescription>Update your account password for security.</CardDescription>
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
                          <Input type={showNewPassword ? "text" : "password"} {...field} onChange={(e) => { field.onChange(e); setNewPassword(e.target.value); }} />
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
      </main>
    </div>
  );
}
