
// src/app/dashboard/admin/reports/system-health/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Settings2, Filter, FileDown, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SystemHealthReportPage() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({ title: "Exporting Report", description: "System health report export initiated (Placeholder)." });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/admin/reports">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <Settings2 className="mr-3 h-7 w-7" /> System Health & Configuration Report
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Report Filters</CardTitle>
            <CardDescription>Filter system health data by date range or specific components.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
            {/* Optional: Filter by component (e.g., Payment Gateway, SMS Service) */}
            <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">System Uptime (Last 30d)</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-green-600">99.98%</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Critical Errors (Last 24h)</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-destructive">2</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Security Alerts (Last 7d)</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">0</div></CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-primary/80"/> System Component Status</CardTitle>
            <CardDescription>Real-time or recent status of key system components.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md"><span>Payment Gateway API:</span> <span className="text-green-600 font-semibold">Operational</span></div>
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md"><span>SMS Service:</span> <span className="text-green-600 font-semibold">Operational</span></div>
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md"><span>Email Service (SMTP):</span> <span className="text-green-600 font-semibold">Operational</span></div>
            <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md"><span>Main Database:</span> <span className="text-green-600 font-semibold">Operational</span></div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><AlertTriangle className="mr-2 h-5 w-5 text-primary/80"/> Recent Error Log Summary</CardTitle>
                <CardDescription>Overview of recent system errors and warnings.</CardDescription>
            </CardHeader>
            <CardContent className="h-60 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Error Log Summary Table/Chart Placeholder</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
                <Button variant="outline" onClick={handleExport}><FileDown className="mr-2 h-4 w-4" /> Export Full Report</Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}
