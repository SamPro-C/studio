"use client";

import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "@/schemas/auth";
import { LoginSchema } from "@/schemas/auth";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Placeholder for server action
async function loginUser(data: LoginFormData) {
  "use server";
  console.log("Login attempt with:", data);
  // In a real app, you would call your authentication API here
  // For now, simulate success or failure
  if (data.emailOrPhone === "error@example.com") {
    return { success: false, message: "Invalid credentials provided." };
  }
  return { success: true, message: "Login successful! Redirecting..." };
}


export function LoginForm() {
  const { toast } = useToast();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginFormData) {
    // This would ideally be a server action imported and called
    // For now, simulating the call to the placeholder server action
    console.log("Submitting login form with data:", data);
    // This is a client-side simulation. In a real app, use a server action.
    const result = data.emailOrPhone === "error@example.com" 
      ? { success: false, message: "Invalid credentials provided." }
      : { success: true, message: "Login successful! Redirecting..." };

    if (result.success) {
      toast({
        title: "Login Successful",
        description: result.message,
      });
      // Add redirection logic here, e.g., router.push('/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Welcome Back!</CardTitle>
        <CardDescription>Enter your credentials to access your Propero account.</CardDescription>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link href="/forgot-password" passHref>
                      <Button variant="link" type="button" className="p-0 h-auto text-sm">Forgot password?</Button>
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Remember me</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Placeholder for reCAPTCHA v3.
        </p>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="text-sm text-muted-foreground">
          Are you a Landlord?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register Here
          </Link>
        </p>
         <p className="mt-2 text-sm text-muted-foreground">
          Tenant or Worker? Your Landlord will register you.
        </p>
      </CardFooter>
    </Card>
  );
}
