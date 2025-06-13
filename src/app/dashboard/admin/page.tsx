
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="items-center">
          <ShieldCheck className="h-12 w-12 text-primary mb-2" />
          <CardTitle className="font-headline text-3xl">Admin Dashboard</CardTitle>
          <CardDescription>Platform administration and oversight.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">Welcome, Admin! This is the central control panel for managing Rentizzi.</p>
          <div className="p-8 border border-dashed rounded-md bg-muted/50">
            <p className="text-muted-foreground">Dashboard content will appear here.</p>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button asChild variant="outline">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
