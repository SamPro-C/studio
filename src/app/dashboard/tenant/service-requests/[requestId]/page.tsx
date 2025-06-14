// src/app/dashboard/tenant/service-requests/[requestId]/page.tsx
"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import React from 'react'; // Explicitly import React

export default function ServiceRequestDetailsTenantPage() {
  const params = useParams();
  const requestId = params.requestId as string;

  // Basic check to simulate data fetching or existence
  const requestExists = true; // Assume for this minimal example it exists

  if (!requestExists) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Request Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The request with ID <span className="font-mono bg-muted px-1 py-0.5 rounded text-sm">{requestId}</span> could not be found.
        </p>
        <Button asChild className="mt-6">
          <Link href="/dashboard/tenant/service-requests">Back to My Requests</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tenant/service-requests">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/tenant/service-requests" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to My Requests
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">
              Service Request: {requestId}
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Minimal Request Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a simplified page for request ID: {requestId}.</p>
            <p>The original complex content has been temporarily removed to help debug build issues.</p>
            <p>If this page builds successfully, the error was within the previous content of this file.</p>
            <p>You can now gradually re-add the original functionality piece by piece, testing the build at each step.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
