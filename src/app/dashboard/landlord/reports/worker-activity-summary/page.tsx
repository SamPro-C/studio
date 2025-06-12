
// src/app/dashboard/landlord/reports/worker-activity-summary/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Briefcase, Filter, FileDown, BarChartHorizontal, CheckCircle, ListChecks, Clock } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";


interface WorkerActivityEntry {
  id: string;
  workerName: string;
  workerId: string;
  taskId: string; // Could be ServiceRequest ID or a generic task ID
  taskDescription: string;
  dateAssigned: string;
  dateCompleted: string | null;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Canceled';
  propertyUnit: string; // e.g. "Greenwood Heights / A-101"
  hoursLogged?: number; // Optional
}

const dummyWorkerActivityData: WorkerActivityEntry[] = [
  { id: "wa1", workerName: "Mike Ross", workerId: "worker001", taskId: "SR20240724-003", taskDescription: "Unclog shower drain", dateAssigned: "2024-07-24", dateCompleted: null, status: "In Progress", propertyUnit: "Greenwood Heights / B-201", hoursLogged: 2 },
  { id: "wa2", workerName: "Mike Ross", workerId: "worker001", taskId: "SR20240725-001", taskDescription: "Leaky faucet under the sink", dateAssigned: "2024-07-25", dateCompleted: "2024-07-26", status: "Completed", propertyUnit: "Greenwood Heights / A-101", hoursLogged: 3 },
  { id: "wa3", workerName: "Sarah Connor", workerId: "worker002", taskId: "MAINT-001", taskDescription: "Routine electrical inspection", dateAssigned: "2024-07-20", dateCompleted: "2024-07-20", status: "Completed", propertyUnit: "Oceanview Towers / Common Area", hoursLogged: 4 },
  { id: "wa4", workerName: "Sarah Connor", workerId: "worker002", taskId: "SR20240723-001", taskDescription: "AC not cooling", dateAssigned: "2024-07-23", dateCompleted: null, status: "Pending", propertyUnit: "Oceanview Towers / C-505" },
  { id: "wa5", workerName: "Mike Ross", workerId: "worker001", taskId: "INST-005", taskDescription: "Install new shelving unit", dateAssigned: "2024-07-28", dateCompleted: null, status: "Pending", propertyUnit: "Mountain Ridge Villas / Villa A" },
];

const totalTasks = dummyWorkerActivityData.length;
const completedTasks = dummyWorkerActivityData.filter(task => task.status === 'Completed').length;
const inProgressTasks = dummyWorkerActivityData.filter(task => task.status === 'In Progress').length;
const avgCompletionTime = "2.5 days (placeholder)"; // Placeholder

const workersFilter = ["All", "Mike Ross", "Sarah Connor", "John Cleese"];
const taskStatusesFilter = ["All", "Pending", "In Progress", "Completed", "Canceled"];

const tasksPerWorkerData = workersFilter.slice(1).map((workerName, index) => ({
  name: workerName.split(" ")[0], // Shorten for chart label
  tasks: dummyWorkerActivityData.filter(task => task.workerName === workerName).length,
  fill: `hsl(var(--chart-${index + 1}))`,
})).filter(item => item.tasks > 0);

const taskStatusDistributionData = taskStatusesFilter.slice(1).map((status, index) => ({
  name: status,
  value: dummyWorkerActivityData.filter(task => task.status === status).length,
  fill: `hsl(var(--chart-${index + 1}))`,
})).filter(item => item.value > 0);


const workerChartConfig = {
  tasks: { label: "Tasks", color: "hsl(var(--chart-1))" },
  "Mike": { label: "Mike", color: "hsl(var(--chart-1))" },
  "Sarah": { label: "Sarah", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const statusChartConfig = {
  Pending: { label: "Pending", color: "hsl(var(--chart-1))" },
  "In Progress": { label: "In Progress", color: "hsl(var(--chart-2))" },
  Completed: { label: "Completed", color: "hsl(var(--chart-3))" },
  Canceled: { label: "Canceled", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;


export default function WorkerActivitySummaryPage() {
  
  const handleExportData = () => {
    alert(`Export worker activity data to CSV/Excel. To be implemented.`);
  };
  
  const getStatusBadgeVariant = (status: WorkerActivityEntry['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'In Progress': return 'default'; 
      case 'Completed': return 'default'; 
      case 'Canceled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord/reports">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/landlord/reports" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to Reports
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Briefcase className="mr-3 h-7 w-7" /> Worker Activity Summary
            </h1>
          </div>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Filters</CardTitle>
            <CardDescription>Refine the worker activity data based on worker, date range, and task status.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="worker">Worker</Label>
              <Select>
                <SelectTrigger id="worker">
                  <SelectValue placeholder="All Workers" />
                </SelectTrigger>
                <SelectContent>
                  {workersFilter.map(worker => <SelectItem key={worker} value={worker.toLowerCase().replace(' ', '_')}>{worker}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
            <div>
              <Label htmlFor="taskStatus">Task Status</Label>
              <Select>
                <SelectTrigger id="taskStatus">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  {taskStatusesFilter.map(status => <SelectItem key={status} value={status.toLowerCase().replace(' ', '_')}>{status}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full sm:w-auto self-end md:col-start-4"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        {/* Summary Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks Assigned</CardTitle>
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTasks}</div>
              <p className="text-xs text-muted-foreground">In selected period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">Successfully resolved</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressTasks}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgCompletionTime}</div>
              <p className="text-xs text-muted-foreground">For completed tasks</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholders */}
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><BarChartHorizontal className="mr-2 h-5 w-5 text-primary/80"/> Tasks per Worker</CardTitle>
                <CardDescription>Number of tasks handled by each worker.</CardDescription>
            </CardHeader>
            <CardContent>
               {tasksPerWorkerData.length > 0 ? (
                <ChartContainer config={workerChartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={tasksPerWorkerData} layout="vertical" margin={{left: 10, right: 20}}>
                        <CartesianGrid horizontal={false}/>
                        <XAxis type="number" hide/>
                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={8} width={60}/>
                        <ChartTooltip 
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />} 
                        />
                        <RechartsLegend content={<ChartLegendContent />} />
                        <Bar dataKey="tasks" layout="vertical" radius={4}>
                            {tasksPerWorkerData.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                            ))}
                        </Bar>
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </ChartContainer>
                ) : (
                <div className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground text-center p-4">No task data available for worker chart.</p>
                </div>
                )}
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><RechartsPieChart className="mr-2 h-5 w-5 text-primary/80"/> Task Status Distribution</CardTitle>
                <CardDescription>Overall distribution of task statuses (Pending, Completed, etc.).</CardDescription>
            </CardHeader>
            <CardContent>
               {taskStatusDistributionData.length > 0 ? (
                <ChartContainer config={statusChartConfig} className="mx-auto aspect-square max-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel nameKey="name" />}
                      />
                      <Pie data={taskStatusDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {taskStatusDistributionData.map((entry) => (
                          <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartLegend content={<ChartLegendContent nameKey="name"/>} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
                  <p className="text-muted-foreground text-center p-4">No task status data for chart.</p>
                </div>
              )}
            </CardContent>
            </Card>
        </div>

        {/* Detailed Table Section */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
                <CardTitle>Detailed Worker Activity</CardTitle>
                <CardDescription>Individual task assignments and progress.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
                <FileDown className="mr-2 h-4 w-4" /> Export Data
            </Button>
          </CardHeader>
          <CardContent>
            {dummyWorkerActivityData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Worker Name</TableHead>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Property/Unit</TableHead>
                      <TableHead>Date Assigned</TableHead>
                      <TableHead>Date Completed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Hours Logged</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyWorkerActivityData.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.workerName}</TableCell>
                        <TableCell>{activity.taskId}</TableCell>
                        <TableCell className="max-w-xs truncate" title={activity.taskDescription}>{activity.taskDescription}</TableCell>
                        <TableCell>{activity.propertyUnit}</TableCell>
                        <TableCell>{new Date(activity.dateAssigned).toLocaleDateString()}</TableCell>
                        <TableCell>{activity.dateCompleted ? new Date(activity.dateCompleted).toLocaleDateString() : 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(activity.status)}>{activity.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{activity.hoursLogged !== undefined ? activity.hoursLogged : 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No worker activity data available for the selected filters.</p>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">This report reflects data based on the applied filters and worker logs.</p>
          </CardFooter>
        </Card>

      </main>
    </div>
  );
}
