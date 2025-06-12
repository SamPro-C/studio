
// src/app/dashboard/admin/reports/operational-performance/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ListChecks, Filter, FileDown, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const serviceRequestStatusData = [
  { status: "Pending", count: 15, fill: "hsl(var(--chart-1))" },
  { status: "In Progress", count: 25, fill: "hsl(var(--chart-2))" },
  { status: "Completed", count: 150, fill: "hsl(var(--chart-3))" },
  { status: "Canceled", count: 5, fill: "hsl(var(--chart-4))" },
];

const workerTaskCompletionData = [
  { worker: "Mike R.", tasksCompleted: 45, fill: "hsl(var(--chart-1))" },
  { worker: "Sarah C.", tasksCompleted: 52, fill: "hsl(var(--chart-2))" },
  { worker: "John D.", tasksCompleted: 38, fill: "hsl(var(--chart-3))" },
  { worker: "Jane B.", tasksCompleted: 40, fill: "hsl(var(--chart-4))" },
];

const srStatusChartConfig = {
  count: { label: "Count" },
  Pending: { label: "Pending", color: "hsl(var(--chart-1))" },
  "In Progress": { label: "In Progress", color: "hsl(var(--chart-2))" },
  Completed: { label: "Completed", color: "hsl(var(--chart-3))" },
  Canceled: { label: "Canceled", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

const workerPerfChartConfig = {
  tasksCompleted: { label: "Tasks Completed", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;


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
        
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><PieChartIcon className="mr-2 h-5 w-5 text-primary/80"/> Service Request Statuses</CardTitle>
                <CardDescription>Current distribution of service requests by status.</CardDescription>
            </CardHeader>
            <CardContent>
                {serviceRequestStatusData.length > 0 ? (
                <ChartContainer config={srStatusChartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={serviceRequestStatusData} layout="vertical" margin={{ left: 10, right: 20 }}>
                        <CartesianGrid horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="status" type="category" tickLine={false} axisLine={false} tickMargin={8} width={80} className="text-xs"/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="count" layout="vertical" radius={4}>
                            {serviceRequestStatusData.map((entry) => (
                                <Cell key={`cell-${entry.status}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
                ) : (
                <div className="h-[300px] bg-muted rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground">No service request data to display.</p>
                </div>
                )}
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary/80"/> Worker Task Completion</CardTitle>
                <CardDescription>Tasks completed per worker in the selected period.</CardDescription>
            </CardHeader>
            <CardContent>
                {workerTaskCompletionData.length > 0 ? (
                <ChartContainer config={workerPerfChartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={workerTaskCompletionData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="worker" tickLine={false} axisLine={false} tickMargin={8} className="text-xs"/>
                        <YAxis allowDecimals={false} tickLine={false} axisLine={false} tickMargin={8} width={30}/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="tasksCompleted" radius={[4, 4, 0, 0]}>
                             {workerTaskCompletionData.map((entry) => (
                                <Cell key={`cell-${entry.worker}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
                ) : (
                <div className="h-[300px] bg-muted rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground">No worker performance data to display.</p>
                </div>
                )}
            </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Overall Operational Efficiency</CardTitle>
                <CardDescription>More detailed breakdowns and trends will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="h-60 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Advanced Operational Metrics Table/Chart Placeholder</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
                <Button variant="outline" onClick={handleExport}><FileDown className="mr-2 h-4 w-4" /> Export Full Report</Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}

