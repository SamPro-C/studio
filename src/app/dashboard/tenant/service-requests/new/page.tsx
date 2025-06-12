
// src/app/dashboard/tenant/service-requests/new/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, PlusCircle } from 'lucide-react';

export default function SubmitServiceRequestPage() {
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
            <PlusCircle className="mr-3 h-7 w-7" /> Submit New Service Request
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>Please provide as much detail as possible about the issue.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 border border-dashed rounded-md bg-muted/50 text-center">
              <p className="text-muted-foreground">Form fields for Request Type, Location, Description, Media Upload, Priority will be here.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

    