
// src/app/dashboard/tenant/payments/make-payment/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, DollarSign } from 'lucide-react';

export default function MakePaymentPage() {
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
            <DollarSign className="mr-3 h-7 w-7" /> Make a Payment
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Pay Your Rent</CardTitle>
            <CardDescription>Securely make your rent payment using one of the methods below.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 border border-dashed rounded-md bg-muted/50 text-center">
              <p className="text-muted-foreground">Current rent amount and payment method options (M-Pesa, Card, Bank Transfer) will be displayed here.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

    