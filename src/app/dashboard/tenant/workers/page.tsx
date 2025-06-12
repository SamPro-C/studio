
// src/app/dashboard/tenant/workers/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Briefcase, Phone, Mail, CalendarDays } from 'lucide-react';

interface WorkerInfo {
  id: string;
  name: string;
  role: string; // e.g., Plumber, Electrician
  phone?: string; // Landlord decides if visible
  email?: string; // Landlord decides if visible
  schedule?: string; // e.g., "Mon-Fri, 9 AM - 5 PM"
  profilePicUrl?: string;
  aiHint?: string;
}

// Dummy worker data for tenant view
const dummyAssignedWorkers: WorkerInfo[] = [
  {
    id: "worker001",
    name: "Mike Ross",
    role: "Plumber",
    phone: "0712-345-678 (Office Hours)",
    schedule: "Mon-Fri, 9 AM - 5 PM. Available by appointment.",
    profilePicUrl: "https://placehold.co/100x100.png",
    aiHint: "man worker"
  },
  {
    id: "worker002",
    name: "Sarah Connor",
    role: "Electrician",
    email: "sarah.c@propertyelectric.co.ke",
    schedule: "Tue, Thu, Sat, 10 AM - 4 PM.",
    profilePicUrl: "https://placehold.co/100x100.png",
    aiHint: "woman technician"
  },
  {
    id: "worker003",
    name: "Building Maintenance Team",
    role: "General Maintenance",
    schedule: "On-call for emergencies. Routine checks on Wednesdays.",
    aiHint: "tools team"
  },
];

export default function TenantWorkersPage() {
  const handleContactWorker = (worker: WorkerInfo) => {
    alert(`Contacting ${worker.name}. In a real app, this might open a chat or show more details.`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tenant">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <Briefcase className="mr-3 h-7 w-7" /> Workers in My Apartment
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Assigned Workers</CardTitle>
            <CardDescription>View information about workers assigned to your apartment complex by the landlord.</CardDescription>
          </CardHeader>
          <CardContent>
            {dummyAssignedWorkers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyAssignedWorkers.map((worker) => (
                  <Card key={worker.id} className="flex flex-col">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={worker.profilePicUrl} alt={worker.name} data-ai-hint={worker.aiHint || 'profile person'}/>
                        <AvatarFallback>{worker.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{worker.name}</CardTitle>
                        <CardDescription>{worker.role}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2 text-sm">
                      {worker.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{worker.phone}</span>
                        </div>
                      )}
                      {worker.email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{worker.email}</span>
                        </div>
                      )}
                      {worker.schedule && (
                        <div className="flex items-start">
                          <CalendarDays className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
                          <span>{worker.schedule}</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-3 border-t">
                      <Button variant="outline" className="w-full" onClick={() => handleContactWorker(worker)}>
                        Contact {worker.name.split(' ')[0]}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-8 border border-dashed rounded-md bg-muted/50 text-center">
                <p className="text-muted-foreground">No specific workers are currently listed for your apartment complex, or information is pending from the landlord.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
