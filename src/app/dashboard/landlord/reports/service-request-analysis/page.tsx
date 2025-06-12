
// src/app/dashboard/landlord/reports/service-request-analysis/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ListChecks, Filter, FileDown, BarChartHorizontal, PieChart, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { ServiceRequest, dummyServiceRequests } from '../../service-requests/page'; // Reuse existing interface and data

// Simplified interface for report display if needed, or use ServiceRequest directly
interface ServiceRequestReportEntry extends ServiceRequest {}

const serviceRequestReportData: ServiceRequestReportEntry[] = dummyServiceRequests;

const totalRequests = serviceRequestReportData.length;
const pendingRequests = serviceRequestReportData.filter(r => r.status === 'Pending').length;
const inProgressRequests = serviceRequestReportData.filter(r => r.status === 'In Progress').length;
// Avg resolution time would require more complex calculation based on actual completion dates
const avgResolutionTime = "3.5 Days (placeholder)"; 

const serviceCategories = ["All", "Plumbing", "HVAC", "Electrical", "Fixtures", "General Maintenance", "Pest Control", "Other"];
const requestStatuses = ["All", "Pending", "In Progress", "Completed", "Canceled", "On Hold"];


export default function ServiceRequestAnalysisPage() {
  
  const handleExportData = () => {
    alert(`Export service request analysis data to CSV/Excel. To be implemented.`);
  };
  
  const getStatusBadgeVariant = (status: ServiceRequest['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'In Progress': return 'default'; 
      case 'Completed': return 'default';
      case 'Canceled': return 'destructive';
      case 'On Hold': return 'outline';
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
              <ListChecks className="mr-3 h-7 w-7" /> Service Request Analysis
            </h1>
          </div>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Filters</CardTitle>
            <CardDescription>Refine the service request data based on date, property, category, and status.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
            <div>
              <Label htmlFor="property">Property</Label>
              <Select>
                <SelectTrigger id="property">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="apt1">Greenwood Heights</SelectItem>
                  <SelectItem value="apt2">Oceanview Towers</SelectItem>
                  <SelectItem value="apt3">Mountain Ridge Villas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                   {serviceCategories.map(cat => <SelectItem key={cat} value={cat.toLowerCase().replace(' ', '_')}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  {requestStatuses.map(stat => <SelectItem key={stat} value={stat.toLowerCase().replace(' ', '_')}>{stat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full sm:w-auto self-end sm:col-span-2 md:col-span-1 lg:col-start-4"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        {/* Summary Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRequests}</div>
              <p className="text-xs text-muted-foreground">For the selected period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests}</div>
              <p className="text-xs text-muted-foreground">Awaiting action</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressRequests}</div>
              <p className="text-xs text-muted-foreground">Currently being worked on</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgResolutionTime}</div>
              <p className="text-xs text-muted-foreground">For completed requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholders */}
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><PieChart className="mr-2 h-5 w-5 text-primary/80"/> Requests by Category</CardTitle>
                <CardDescription>Distribution of service requests across different categories.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground text-center p-4">
                    Pie chart showing service request counts per category.
                </p>
                </div>
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><BarChartHorizontal className="mr-2 h-5 w-5 text-primary/80"/> Requests by Status</CardTitle>
                <CardDescription>Overview of service request statuses (Pending, In Progress, Completed etc.).</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground text-center p-4">
                    Bar chart showing counts of requests per status.
                </p>
                </div>
            </CardContent>
            </Card>
        </div>

        {/* Detailed Table Section */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
                <CardTitle>Detailed Service Request Data</CardTitle>
                <CardDescription>Individual service request entries based on filters.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
                <FileDown className="mr-2 h-4 w-4" /> Export Data
            </Button>
          </CardHeader>
          <CardContent>
            {serviceRequestReportData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Date Submitted</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Property/Unit</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Worker</TableHead>
                      <TableHead>Date Completed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceRequestReportData.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell>{req.requestId}</TableCell>
                        <TableCell>{new Date(req.dateSubmitted).toLocaleDateString()}</TableCell>
                        <TableCell>{req.tenantName}</TableCell>
                        <TableCell>{req.apartment} / {req.unit}</TableCell>
                        <TableCell>{req.category}</TableCell>
                        <TableCell><Badge variant={req.priority === 'High' || req.priority === 'Urgent' ? 'destructive' : req.priority === 'Medium' ? 'secondary' : 'outline' }>{req.priority}</Badge></TableCell>
                        <TableCell><Badge variant={getStatusBadgeVariant(req.status)}>{req.status}</Badge></TableCell>
                        <TableCell>{req.workerAssigned || 'N/A'}</TableCell>
                        <TableCell>{req.dateCompleted ? new Date(req.dateCompleted).toLocaleDateString() : 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No service request data available for the selected filters.</p>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">This report reflects data based on the applied filters.</p>
          </CardFooter>
        </Card>

      </main>
    </div>
  );
}

