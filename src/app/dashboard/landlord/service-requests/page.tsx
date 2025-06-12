
// src/app/dashboard/landlord/service-requests/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Filter, Wrench, MoreHorizontal, UserPlus, CheckCircle, Eye } from 'lucide-react';

type RequestStatus = 'Pending' | 'In Progress' | 'Completed' | 'Canceled';
type RequestPriority = 'Low' | 'Medium' | 'High';

interface ServiceRequest {
  id: string;
  requestId: string;
  dateSubmitted: string;
  tenantName: string;
  apartment: string;
  unit: string;
  room: string;
  description: string;
  status: RequestStatus;
  workerAssigned: string | null;
  priority: RequestPriority;
}

// Dummy data for service requests - replace with actual data fetching
const dummyServiceRequests: ServiceRequest[] = [
  { id: "sr001", requestId: "SR20240725-001", dateSubmitted: "2024-07-25", tenantName: "Alice Wonderland", apartment: "Greenwood Heights", unit: "A-101", room: "Kitchen", description: "Leaky faucet under the sink, constant dripping.", status: "Pending", workerAssigned: null, priority: "High" },
  { id: "sr002", requestId: "SR20240724-003", dateSubmitted: "2024-07-24", tenantName: "Bob The Builder", apartment: "Greenwood Heights", unit: "B-201", room: "Bathroom", description: "Shower drain clogged, water not draining.", status: "In Progress", workerAssigned: "Mike Ross (Plumber)", priority: "Medium" },
  { id: "sr003", requestId: "SR20240723-001", dateSubmitted: "2024-07-23", tenantName: "Charlie Brown", apartment: "Oceanview Towers", unit: "C-505", room: "Living Room", description: "Air conditioner not cooling properly.", status: "Completed", workerAssigned: "Tech Services Inc.", priority: "Medium" },
  { id: "sr004", requestId: "SR20240722-005", dateSubmitted: "2024-07-22", tenantName: "Diana Prince", apartment: "Mountain Ridge Villas", unit: "Villa A", room: "Bedroom", description: "Broken window lock.", status: "Canceled", workerAssigned: null, priority: "Low" },
];

export default function ManageServiceRequestsPage() {
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    alert(`View details for Service Request ID: ${id}. Functionality to be implemented.`);
    // router.push(`/dashboard/landlord/service-requests/${id}`);
  };

  const handleAssignWorker = (id: string) => {
    alert(`Assign worker to Service Request ID: ${id}. Functionality to be implemented.`);
    // Show modal or navigate to assignment page
  };

  const handleChangeStatus = (id: string, currentStatus: RequestStatus) => {
    alert(`Change status for Service Request ID: ${id} (Current: ${currentStatus}). Functionality to be implemented.`);
    // Show dropdown or modal for status change
  };

  const getStatusBadgeVariant = (status: RequestStatus) => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'In Progress': return 'default'; // Or a specific 'warning' variant if you add one
      case 'Completed': return 'default'; // Or a specific 'success' variant
      case 'Canceled': return 'destructive';
      default: return 'outline';
    }
  };
  
  const getPriorityBadgeVariant = (priority: RequestPriority) => {
    switch (priority) {
        case 'High': return 'destructive';
        case 'Medium': return 'secondary'; // or 'default' if you prefer
        case 'Low': return 'outline';
        default: return 'outline';
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/landlord">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Wrench className="mr-3 h-7 w-7" /> Manage Service Requests
            </h1>
          </div>
          {/* Placeholder for "Create New Service Request" if landlords can also create them */}
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <CardTitle>Service Request Queue</CardTitle>
              <CardDescription>Track and manage all tenant service requests.</CardDescription>
            </div>
            <div className="flex gap-2 items-center w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search by Tenant, ID, Description..." className="pl-9 h-9 w-full sm:w-auto" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Status (Pending)</DropdownMenuItem>
                  <DropdownMenuItem>Status (In Progress)</DropdownMenuItem>
                  <DropdownMenuItem>Status (Completed)</DropdownMenuItem>
                  <DropdownMenuItem>Priority (High)</DropdownMenuItem>
                  <DropdownMenuItem>Apartment</DropdownMenuItem>
                  <DropdownMenuItem>Worker Assigned</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            {dummyServiceRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Worker</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyServiceRequests.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium">{req.requestId}</TableCell>
                        <TableCell>{new Date(req.dateSubmitted).toLocaleDateString()}</TableCell>
                        <TableCell>{req.tenantName}</TableCell>
                        <TableCell>
                          {req.apartment} <br />
                          <span className="text-xs text-muted-foreground">{req.unit} / {req.room}</span>
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={req.description}>{req.description}</TableCell>
                        <TableCell>
                            <Badge variant={getPriorityBadgeVariant(req.priority)}>{req.priority}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(req.status)}>{req.status}</Badge>
                        </TableCell>
                        <TableCell>{req.workerAssigned || 'N/A'}</TableCell>
                        <TableCell className="text-right">
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewDetails(req.id)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignWorker(req.id)} disabled={req.status === 'Completed' || req.status === 'Canceled'}>
                                <UserPlus className="mr-2 h-4 w-4" /> Assign Worker
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeStatus(req.id, req.status)}>
                                <CheckCircle className="mr-2 h-4 w-4" /> Change Status
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No service requests found.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
