
// src/app/dashboard/tenant/service-requests/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Wrench, PlusCircle } from 'lucide-react';

export default function ViewServiceRequestsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/tenant">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Wrench className="mr-3 h-7 w-7" /> My Service Requests
            </h1>
          </div>
          <Button asChild>
            <Link href="/dashboard/tenant/service-requests/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Submit New Request
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Your Submitted Requests</CardTitle>
            <CardDescription>Track the status of all your service and maintenance requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 border border-dashed rounded-md bg-muted/50 text-center">
              <p className="text-muted-foreground">A table or card view of service requests will be displayed here.</p>
              <p className="text-sm text-muted-foreground mt-2">(Filters for Status, "View Details", "Cancel Request")</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

    