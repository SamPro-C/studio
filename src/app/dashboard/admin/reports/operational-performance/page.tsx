
// src/app/dashboard/admin/reports/operational-performance/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ListChecks, Filter, FileDown, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OperationalPerformanceReportPage() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({ title: "Exporting Report", description: "Operational performance report export initiated (Placeholder)." });
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
            <ListChecks className="mr-3 h-7 w-7" /> Operational Performance Report
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Report Filters</CardTitle>
            <CardDescription>Filter operational data by date range, property type, etc.</CardDescription>
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
            {/* Optional: Filter by specific landlord or property region */}
            <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Avg. SR Resolution Time</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">2.5 Days</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Worker Task Completion Rate</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">92%</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Property Occupancy Rate</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">88%</div></CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary/80"/> Service Request Trends</CardTitle>
            <CardDescription>Volume and resolution times for service requests.</CardDescription>
          </CardHeader>
          <CardContent className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
            <p className="text-muted-foreground">Service Request Trend Chart Placeholder</p>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Worker Performance Metrics</CardTitle>
                <CardDescription>Breakdown of tasks per worker, completion rates, etc.</CardDescription>
            </CardHeader>
            <CardContent className="h-60 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Worker Performance Table/Chart Placeholder</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
                <Button variant="outline" onClick={handleExport}><FileDown className="mr-2 h-4 w-4" /> Export Report</Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}
