import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Briefcase, Home, Users, Building, ShieldCheck, MessageCircle, DollarSign } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-32">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              Rentizzi: Effortless Property Management, Elevated Living.
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80 md:text-xl">
              A comprehensive solution for landlords, tenants, and workers, simplifying property operations and enhancing community experience.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/register">Register as Landlord</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Log In</Link>
              </Button>
            </div>
            <div className="mt-16">
              <Image
                src="https://placehold.co/1200x600.png"
                alt="Rentizzi Dashboard Mockup"
                width={1200}
                height={600}
                className="rounded-lg shadow-2xl"
                data-ai-hint="dashboard interface"
                priority
              />
            </div>
          </div>
        </section>

        {/* For Landlords Section */}
        <section id="for-landlords" className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Empowering Landlords
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Maximize your ROI and streamline operations with our powerful management tools.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Building, title: 'Property Management', description: 'Easily add, edit, and manage apartments, units, and rooms with detailed occupancy status.' },
                { icon: Users, title: 'Tenant & Worker Control', description: 'Register, manage, and communicate with tenants and workers efficiently.' },
                { icon: DollarSign, title: 'Financial Tracking', description: 'Oversee rent payments, track expenses, and generate insightful financial reports.' },
              ].map((item) => (
                <Card key={item.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="mt-4 font-headline">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* For Tenants Section */}
        <section id="for-tenants" className="bg-primary/5 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Elevated Tenant Experience
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Live smarter, not harder. Enjoy convenience and seamless services at your fingertips.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Home, title: 'Easy Rent Payments', description: 'Securely pay your rent online through multiple payment methods.' },
                { icon: Briefcase, title: 'Service Requests', description: 'Submit maintenance requests with media uploads and track their status in real-time.' },
                { icon: MessageCircle, title: 'Integrated Shopping', description: 'Access an exclusive e-commerce platform for goods and services relevant to your living needs.' },
              ].map((item) => (
                <Card key={item.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="mt-4 font-headline">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Key Features of Rentizzi
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Discover how Rentizzi revolutionizes property management for everyone involved.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Role-Based Dashboards", description: "Tailored dashboards for Landlords, Tenants, Workers, and Shop Managers with specific tools and views.", icon: Users },
                { name: "Secure Authentication", description: "Robust login with role selection, email/SMS verification, and admin-approved access.", icon: ShieldCheck },
                { name: "Automated Notifications", description: "Timely alerts for payments, service requests, and important announcements via in-app, SMS, and email.", icon: MessageCircle },
                { name: "Smart Notification Assistant", description: "AI-powered suggestions for optimized tenant and worker communication.", icon: Briefcase },
                { name: "E-commerce Integration", description: "A dedicated shopping platform for tenants, managed by Shop Managers.", icon: DollarSign },
                { name: "Comprehensive Reporting", description: "Detailed analytics for landlords and admins on financials, operations, and user activity.", icon: Building },
              ].map((feature) => (
                 <div key={feature.name} className="flex flex-col items-start">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                     <feature.icon className="h-6 w-6" aria-hidden="true" />
                   </div>
                   <h3 className="mt-6 text-lg font-semibold leading-7 text-primary font-headline">{feature.name}</h3>
                   <p className="mt-2 text-base leading-7 text-foreground/80">{feature.description}</p>
                 </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Us Section */}
        <section id="contact" className="bg-primary/5 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Get In Touch</h2>
              <p className="mt-4 text-lg text-foreground/80">
                Have questions or want to learn more? Contact our team today.
              </p>
            </div>
            <Card className="mx-auto mt-16 max-w-xl">
              <CardContent className="p-6 sm:p-8">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-medium">Full Name</Label>
                    <Input type="text" name="name" id="name" autoComplete="name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-medium">Email</Label>
                    <Input type="email" name="email" id="email" autoComplete="email" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="font-medium">Phone Number</Label>
                    <Input type="tel" name="phone" id="phone" autoComplete="tel" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="font-medium">Message</Label>
                    <Textarea name="message" id="message" rows={4} className="mt-1" />
                  </div>
                  <div>
                    <Button type="submit" className="w-full" size="lg">Send Message</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
