
// src/app/dashboard/tenant/payments/history/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Receipt } from 'lucide-react';

export default function PaymentHistoryPage() {
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
            <Receipt className="mr-3 h-7 w-7" /> Payment History
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Your Past Payments</CardTitle>
            <CardDescription>Review all your previous rent payments and their status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 border border-dashed rounded-md bg-muted/50 text-center">
              <p className="text-muted-foreground">Payment history table will be displayed here.</p>
              <p className="text-sm text-muted-foreground mt-2">(Filters for Year, Status, Search by Transaction ID)</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

    