
// src/app/dashboard/tenant/service-requests/[requestId]/page.tsx
"use client"; // Needs to be a client component to access params

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Wrench } from 'lucide-react';

export default function ServiceRequestDetailsTenantPage() {
  const params = useParams();
  const requestId = params.requestId;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tenant/service-requests">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <Wrench className="mr-3 h-7 w-7" /> Service Request Details: {requestId}
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Request ID: {requestId}</CardTitle>
            <CardDescription>Full details of your service request.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 border border-dashed rounded-md bg-muted/50 text-center">
              <p className="text-muted-foreground">Full request details, media, status, worker info, and activity log will be displayed here.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

    