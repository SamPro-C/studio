
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

// Firestore imports
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
// Firebase app import (usually for client-side initialization, but getFirestore() might need it if not auto-init by env)
// import { getApp, getApps, initializeApp } from 'firebase/app';


const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(500, {message: "Message must be less than 500 characters."}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Server Action to save the contact message to Firestore
async function saveContactMessage(data: ContactFormValues) {
  'use server';
  try {
    // In a Firebase App Hosting environment, Firebase SDK should be configured.
    // getFirestore() should ideally work if the default Firebase app is initialized.
    const db = getFirestore();
    await addDoc(collection(db, 'contactSubmissions'), {
      name: data.name,
      email: data.email,
      message: data.message,
      submittedAt: Timestamp.now(),
    });
    return { success: true, message: 'Your message has been sent successfully and stored!' };
  } catch (error: any) {
    console.error('Error writing to Firestore:', error);
    let userMessage = 'There was an error saving your message. Please try again.';
    // More specific error messages can be helpful for debugging or user feedback
    if (error.code === 'unavailable') {
        userMessage = 'The service is temporarily unavailable. Please try again later.';
    } else if (error.code === 'permission-denied') {
        userMessage = 'Could not save message. Please check service permissions.';
    }
    return { success: false, message: userMessage };
  }
}


export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await saveContactMessage(data); // Call the server action
      if (result.success) {
        toast({
          title: 'Message Sent!',
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      // This catch block handles errors if the server action itself throws an unhandled exception
      // or if there's an issue calling it (network, etc.)
      console.error("Client-side error submitting form:", error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred while sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project or inquiry..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </Form>
  );
}
