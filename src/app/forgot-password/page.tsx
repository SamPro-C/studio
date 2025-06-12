"use client";

import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from '@/components/shared/Logo';
import { useToast } from "@/hooks/use-toast";

const ForgotPasswordSchema = z.object({
  emailOrPhone: z.string().min(1, { message: "Email or Phone Number is required" }),
});

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

// Placeholder server action
async function requestPasswordReset(data: ForgotPasswordFormData) {
  "use server";
  console.log("Password reset request for:", data.emailOrPhone);
  // In a real app, you would:
  // 1. Verify if the email/phone exists.
  // 2. Generate a unique, time-sensitive reset token/code.
  // 3. Send an email/SMS with the reset link/code.
  return { success: true, message: "If an account exists for this email/phone, a password reset link has been sent." };
}

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      emailOrPhone: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    // This would ideally be a server action imported and called
    const result = await requestPasswordReset(data); 
    // For client-side display/testing:
    // const result = { success: true, message: "If an account exists for this email/phone, a password reset link has been sent." };

    if (result.success) {
      toast({
        title: "Password Reset Requested",
        description: result.message,
      });
      form.reset();
    } else {
       toast({
        title: "Error",
        description: result.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Forgot Your Password?</CardTitle>
          <CardDescription>
            No worries! Enter your email address or phone number below, and we'll send you instructions to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="emailOrPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com or +2547XXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sending..." : "Send Reset Instructions"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col items-center space-y-2">
           <p className="text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log In
            </Link>
          </p>
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary underline underline-offset-4">
              Back to Homepage
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
