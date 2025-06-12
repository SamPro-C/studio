
// src/app/dashboard/admin/system-oversight/service-requests/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ListChecks, Search, MoreHorizontal, Eye, UserCog, Settings, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type RequestStatus = 'Pending' | 'In Progress' | 'Completed' | 'Canceled' | 'On Hold';
type RequestPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

interface SystemServiceRequest {
  id: string;
  requestId: string;
  dateSubmitted: string;
  tenantName: string;
  tenantId: string;
  apartmentName: string;
  apartmentId: string;
  landlordName: string;
  landlordId: string;
  workerAssigned: string | null;
  workerId: string | null;
  status: RequestStatus;
  priority: RequestPriority;
  description: string;
}

const dummySystemRequests: SystemServiceRequest[] = [
  { id: "sys_sr1", requestId: "SR20240725-001", dateSubmitted: "2024-07-25", tenantName: "Alice W.", tenantId: "tenant001", apartmentName: "Greenwood H.", apartmentId: "apt1", landlordName: "John L.", landlordId: "landlord1", workerAssigned: null, workerId: null, status: "Pending", priority: "High", description: "Leaky faucet." },
  { id: "sys_sr2", requestId: "SR20240724-003", dateSubmitted: "2024-07-24", tenantName: "Bob B.", tenantId: "tenant002", apartmentName: "Greenwood H.", apartmentId: "apt1", landlordName: "John L.", landlordId: "landlord1", workerAssigned: "Mike R.", workerId: "worker001", status: "In Progress", priority: "Medium", description: "Shower drain clogged." },
  { id: "sys_sr3", requestId: "SR20240723-001", dateSubmitted: "2024-07-23", tenantName: "Charlie B.", tenantId: "tenant003", apartmentName: "Oceanview T.", apartmentId: "apt2", landlordName: "Jane P.", landlordId: "landlord2", workerAssigned: "Tech Inc.", workerId: "workerExt001", status: "Completed", priority: "Medium", description: "AC not cooling." },
];

export default function SystemServiceRequestsPage() {
  const { toast } = useToast();

  const handleViewDetails = (requestId: string) => {
    toast({ title: "View Details", description: `Viewing details for request ${requestId}. (Placeholder)` });
    // router.push(`/dashboard/landlord/service-requests/${requestId}`); // Needs careful routing if admin views landlord's context
  };
  
  const handleReassignWorker = (requestId: string) => {
    toast({ title: "Reassign Worker", description: `Opening modal to reassign worker for ${requestId}. (Placeholder)` });
  };

  const handleOverrideStatus = (requestId: string) => {
    toast({ title: "Override Status", description: `Opening modal to override status for ${requestId}. (Placeholder)` });
  };
  
  const getStatusVariant = (status: RequestStatus) => {
    if (status === 'Pending') return 'secondary';
    if (status === 'In Progress') return 'default';
    if (status === 'Completed') return 'default'; // Consider 'success' if available
    if (status === 'Canceled') return 'destructive';
    return 'outline';
  };
  
  const getPriorityVariant = (priority: RequestPriority) => {
    if (priority === 'Urgent' || priority === 'High') return 'destructive';
    if (priority === 'Medium') return 'secondary';
    return 'outline';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/admin/system-oversight">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <ListChecks className="mr-3 h-7 w-7" /> System-Wide Service Requests
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Service Requests</CardTitle>
            <CardDescription>Monitor and manage service requests across the entire platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="relative lg:col-span-1">
                    <Label htmlFor="searchRequests">Search Requests</Label>
                    <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="searchRequests" type="search" placeholder="Req ID, Tenant, Apartment..." className="pl-9 mt-1" />
                </div>
                <div>
                    <Label htmlFor="filterStatus">Filter by Status</Label>
                    <Select><SelectTrigger id="filterStatus" className="mt-1"><SelectValue placeholder="All Statuses"/></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="pending">Pending</SelectItem></SelectContent></Select>
                </div>
                <div>
                    <Label htmlFor="filterLandlord">Filter by Landlord</Label>
                    <Select><SelectTrigger id="filterLandlord" className="mt-1"><SelectValue placeholder="All Landlords"/></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="l1">John L.</SelectItem></SelectContent></Select>
                </div>
                <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
            </div>

            {dummySystemRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Tenant / Property</TableHead>
                      <TableHead>Landlord</TableHead>
                      <TableHead>Worker</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummySystemRequests.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium">{req.requestId}</TableCell>
                        <TableCell>{new Date(req.dateSubmitted).toLocaleDateString()}</TableCell>
                        <TableCell>{req.tenantName}<div className="text-xs text-muted-foreground">{req.apartmentName}</div></TableCell>
                        <TableCell>{req.landlordName}</TableCell>
                        <TableCell>{req.workerAssigned || 'N/A'}</TableCell>
                        <TableCell className="max-w-xs truncate" title={req.description}>{req.description}</TableCell>
                        <TableCell><Badge variant={getPriorityVariant(req.priority)}>{req.priority}</Badge></TableCell>
                        <TableCell><Badge variant={getStatusVariant(req.status)}>{req.status}</Badge></TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewDetails(req.requestId)}><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReassignWorker(req.requestId)}><UserCog className="mr-2 h-4 w-4" /> Reassign Worker</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOverrideStatus(req.requestId)}><Settings className="mr-2 h-4 w-4" /> Override Status</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <ListChecks className="mx-auto h-12 w-12 mb-3" />
                    <p>No service requests found or matching your filters.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
