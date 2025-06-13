
// src/app/dashboard/admin/reports/system-health/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Settings2, Filter, FileDown, ShieldCheck, AlertTriangle, Server, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

interface SystemComponentStatus {
  id: string;
  name: string;
  status: 'Operational' | 'Degraded Performance' | 'Partial Outage' | 'Offline';
  lastChecked: string;
}

const dummyComponentStatuses: SystemComponentStatus[] = [
  { id: "comp1", name: "Main Authentication Service", status: "Operational", lastChecked: "2 mins ago" },
  { id: "comp2", name: "Payment Gateway API (M-Pesa)", status: "Operational", lastChecked: "1 min ago" },
  { id: "comp3", name: "Card Payment Gateway API", status: "Degraded Performance", lastChecked: "5 mins ago" },
  { id: "comp4", name: "SMS Notification Service", status: "Operational", lastChecked: "3 mins ago" },
  { id: "comp5", name: "Email Service (SMTP)", status: "Offline", lastChecked: "10 mins ago" },
  { id: "comp6", name: "Primary Database Cluster", status: "Operational", lastChecked: "1 min ago" },
  { id: "comp7", name: "E-commerce Subsystem", status: "Operational", lastChecked: "4 mins ago" },
];

const errorLogData = [
    { date: "Aug 1", errors: 5 },
    { date: "Aug 2", errors: 2 },
    { date: "Aug 3", errors: 8 },
    { date: "Aug 4", errors: 1 },
    { date: "Aug 5", errors: 3 },
    { date: "Aug 6", errors: 0 },
    { date: "Aug 7", errors: 4 },
];

const errorLogChartConfig = {
  errors: { label: "Errors", color: "hsl(var(--destructive))" },
} satisfies ChartConfig;


export default function SystemHealthReportPage() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({ title: "Exporting Report", description: "System health report export initiated (Placeholder)." });
  };
  
  const getStatusIcon = (status: SystemComponentStatus['status']) => {
    if (status === 'Operational') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'Degraded Performance') return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    if (status === 'Offline' || status === 'Partial Outage') return <XCircle className="h-4 w-4 text-destructive" />;
    return <Server className="h-4 w-4 text-muted-foreground"/>;
  };
  
  const getStatusBadgeVariant = (status: SystemComponentStatus['status']): "default" | "secondary" | "destructive" | "outline" => {
     if (status === 'Operational') return 'default'; 
    if (status === 'Degraded Performance') return 'secondary'; 
    if (status === 'Offline' || status === 'Partial Outage') return 'destructive';
    return 'outline';
  }

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
            {dummyComponentStatuses.map(comp => (
                <div key={comp.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md text-sm">
                    <div className="flex items-center">
                        {getStatusIcon(comp.status)}
                        <span className="ml-2 font-medium">{comp.name}:</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadgeVariant(comp.status)}>{comp.status}</Badge>
                        <span className="text-xs text-muted-foreground">({comp.lastChecked})</span>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><AlertTriangle className="mr-2 h-5 w-5 text-primary/80"/> Recent Error Log Summary</CardTitle>
                <CardDescription>Overview of recent system errors and warnings (last 7 days).</CardDescription>
            </CardHeader>
            <CardContent>
                {errorLogData.length > 0 ? (
                    <ChartContainer config={errorLogChartConfig} className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={errorLogData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
                                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tickMargin={8} width={30} className="text-xs"/>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="errors" fill="var(--color-errors)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                ) : (
                     <div className="h-[300px] bg-muted rounded-md flex items-center justify-center border border-dashed">
                        <p className="text-muted-foreground text-center p-4">No error data to display for the selected period.</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="border-t pt-4">
                <Button variant="outline" onClick={handleExport}><FileDown className="mr-2 h-4 w-4" /> Export Full Report</Button>
                 <Button variant="link" asChild className="ml-auto">
                    <Link href="/dashboard/admin/audit-logs">View Detailed Audit Logs</Link>
                </Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}

