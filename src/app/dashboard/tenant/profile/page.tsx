
// src/app/dashboard/tenant/profile/page.tsx
"use client";

import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save, UserCircle, Lock, Mail, Phone, Home, CalendarDays, Id, Users as GenderIcon, MessageSquare, Edit, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PasswordStrength, calculatePasswordScore } from '@/components/auth/PasswordStrength';
import { ChangePasswordSchema, type ChangePasswordFormData } from '@/schemas/settings'; // Re-use landlord's schema if suitable

// Dummy tenant data - in a real app, this would come from an API
const tenantProfileData = {
  id: "tenant001",
  fullName: "Alice Wonderland",
  email: "alice@example.com",
  phoneNumber: "555-1234",
  nationalId: "12345678",
  dateOfBirth: "1990-05-15",
  gender: "Female",
  emergencyContactName: "Mad Hatter",
  emergencyContactPhone: "555-4321",
  residence: {
    apartmentName: "Greenwood Heights",
    unitName: "A-101",
    roomNumber: "Master Bedroom"
  },
  leaseInfo: {
      moveInDate: "2023-01-15",
      monthlyRent: 1200,
      securityDeposit: 1200,
      leaseStartDate: "2023-01-15",
      leaseEndDate: "2024-01-14",
  },
};

export default function TenantProfilePage() {
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
    console.log("Tenant changing password with data:", data);
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });
    passwordForm.reset();
    setNewPassword('');
  }

  const handleRequestInfoUpdate = () => {
    toast({
        title: "Update Request Sent",
        description: "Your request to update profile information has been sent to the landlord for review.",
    });
    // In a real app, this would trigger a notification/request to the landlord.
  };

  const InfoDisplayItem: React.FC<{label: string, value: string | number | undefined, icon?: React.ElementType}> = ({ label, value, icon: Icon }) => (
    <div className="flex items-start py-1">
        {Icon && <Icon className="mr-2 h-4 w-4 mt-0.5 text-primary/70 flex-shrink-0" />}
        <span className="font-medium text-muted-foreground w-32 sm:w-40 flex-shrink-0">{label}:</span>
        <span className="text-foreground break-words">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tenant">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/tenant" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to Dashboard
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <UserCircle className="mr-3 h-7 w-7" /> My Profile & Settings
            </h1>
          </div>
        </div>

        {/* Personal Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center"><Id className="mr-2 h-5 w-5 text-primary/80"/> My Information</CardTitle>
                <CardDescription>This information is managed by your landlord.</CardDescription>
            </div>
            <Button variant="outline" onClick={handleRequestInfoUpdate}>
                <Edit className="mr-2 h-4 w-4" /> Request Update
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                <InfoDisplayItem label="Full Name" value={tenantProfileData.fullName} icon={UserCircle} />
                <InfoDisplayItem label="Email" value={tenantProfileData.email} icon={Mail}/>
                <InfoDisplayItem label="Phone Number" value={tenantProfileData.phoneNumber} icon={Phone}/>
                <InfoDisplayItem label="National ID" value={tenantProfileData.nationalId} icon={Id}/>
                <InfoDisplayItem label="Date of Birth" value={new Date(tenantProfileData.dateOfBirth).toLocaleDateString()} icon={CalendarDays}/>
                <InfoDisplayItem label="Gender" value={tenantProfileData.gender} icon={GenderIcon}/>
            </div>
            <div className="border-t pt-3 mt-3">
                <h4 className="font-semibold mb-1 text-md text-primary/90">Emergency Contact</h4>
                <InfoDisplayItem label="Name" value={tenantProfileData.emergencyContactName} icon={UserCircle}/>
                <InfoDisplayItem label="Phone" value={tenantProfileData.emergencyContactPhone} icon={Phone}/>
            </div>
          </CardContent>
        </Card>
        
        {/* Residence & Lease Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Home className="mr-2 h-5 w-5 text-primary/80"/> Residence & Lease</CardTitle>
            <CardDescription>Details about your current tenancy.</CardDescription>
          </CardHeader>
           <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                <InfoDisplayItem label="Apartment" value={tenantProfileData.residence.apartmentName} icon={Home}/>
                <InfoDisplayItem label="Unit" value={tenantProfileData.residence.unitName} icon={Home}/>
                <InfoDisplayItem label="Room" value={tenantProfileData.residence.roomNumber} icon={Home}/>
                <InfoDisplayItem label="Move-in Date" value={new Date(tenantProfileData.leaseInfo.moveInDate).toLocaleDateString()} icon={CalendarDays}/>
                <InfoDisplayItem label="Monthly Rent" value={`KES ${tenantProfileData.leaseInfo.monthlyRent.toLocaleString()}`} icon={Id}/>
                <InfoDisplayItem label="Security Deposit" value={`KES ${tenantProfileData.leaseInfo.securityDeposit.toLocaleString()}`} icon={Id}/>
                <InfoDisplayItem label="Lease Start" value={new Date(tenantProfileData.leaseInfo.leaseStartDate).toLocaleDateString()} icon={CalendarDays}/>
                <InfoDisplayItem label="Lease End" value={tenantProfileData.leaseInfo.leaseEndDate ? new Date(tenantProfileData.leaseInfo.leaseEndDate).toLocaleDateString() : 'Ongoing'} icon={CalendarDays}/>
            </div>
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
      </main>
    </div>
  );
}

    