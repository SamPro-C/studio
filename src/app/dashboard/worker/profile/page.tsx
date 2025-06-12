
// src/app/dashboard/worker/profile/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, UserCircle, Lock, Mail, Phone, Briefcase, CalendarDays, IdCard, Edit, Eye, EyeOff, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangePasswordSchema, type ChangePasswordFormData } from '@/schemas/settings'; // Re-use landlord's schema
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { PasswordStrength, calculatePasswordScore } from '@/components/auth/PasswordStrength';


// Dummy worker data
const workerProfile = {
  fullName: "Mike Ross",
  email: "mike@example.com",
  phoneNumber: "555-7890",
  nationalId: "30123456",
  role: "Plumber",
  assignedApartments: "Greenwood Heights, Oceanview Towers",
  workingHours: "Mon-Fri, 9 AM - 5 PM",
};

export default function WorkerProfilePage() {
  const { toast } = useToast();
  const [isRequestUpdateModalOpen, setIsRequestUpdateModalOpen] = useState(false);
  const [updateRequestMessage, setUpdateRequestMessage] = useState("");
  
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

  const handleRequestInfoUpdateSubmit = () => {
    if (!updateRequestMessage.trim()) {
        toast({ title: "Error", description: "Please describe the update you need.", variant: "destructive"});
        return;
    }
    console.log("Worker profile update request:", updateRequestMessage);
    toast({ title: "Update Request Sent", description: "Your request has been sent to the landlord." });
    setUpdateRequestMessage("");
    setIsRequestUpdateModalOpen(false);
  };
  
  async function onPasswordSubmit(data: ChangePasswordFormData) {
    console.log("Worker changing password:", data);
    toast({ title: "Password Changed", description: "Your password has been successfully updated." });
    passwordForm.reset();
    setNewPassword('');
  }

  const InfoDisplayItem: React.FC<{label: string, value: string | undefined, icon?: React.ElementType}> = ({ label, value, icon: Icon }) => (
    <div className="flex items-start py-1.5">
        {Icon && <Icon className="mr-2 h-4 w-4 mt-0.5 text-primary/70 flex-shrink-0" />}
        <span className="font-medium text-muted-foreground w-36 sm:w-48 flex-shrink-0">{label}:</span>
        <span className="text-foreground break-words">{value || 'N/A'}</span>
    </div>
  );


  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/worker">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <UserCircle className="mr-3 h-7 w-7" /> My Profile
          </h1>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center"><IdCard className="mr-2 h-5 w-5 text-primary/80"/> My Information</CardTitle>
                <CardDescription>Your details as registered by the landlord.</CardDescription>
            </div>
            <Dialog open={isRequestUpdateModalOpen} onOpenChange={setIsRequestUpdateModalOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> Request Info Update</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request Information Update</DialogTitle>
                        <DialogDescription>
                            Describe the changes you need for your profile (e.g., new phone number, corrected email). This request will be sent to your landlord.
                        </DialogDescription>
                    </DialogHeader>
                    <Textarea 
                        placeholder="Example: Please update my phone number to 07XX XXX XXX." 
                        rows={4}
                        value={updateRequestMessage}
                        onChange={(e) => setUpdateRequestMessage(e.target.value)}
                    />
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button onClick={handleRequestInfoUpdateSubmit}>Send Request</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <InfoDisplayItem label="Full Name" value={workerProfile.fullName} icon={UserCircle} />
            <InfoDisplayItem label="Email" value={workerProfile.email} icon={Mail}/>
            <InfoDisplayItem label="Phone Number" value={workerProfile.phoneNumber} icon={Phone}/>
            <InfoDisplayItem label="National ID" value={workerProfile.nationalId} icon={IdCard}/>
            <InfoDisplayItem label="Role" value={workerProfile.role} icon={Briefcase}/>
            <InfoDisplayItem label="Assigned Apartments" value={workerProfile.assignedApartments} icon={Briefcase}/>
            <InfoDisplayItem label="Working Hours" value={workerProfile.workingHours} icon={CalendarDays}/>
          </CardContent>
        </Card>

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
                          <Input type={showNewPassword ? "text" : "password"} {...field} onChange={(e)=>{field.onChange(e); setNewPassword(e.target.value);}} />
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
