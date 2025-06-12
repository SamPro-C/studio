
// src/app/dashboard/landlord/service-requests/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Search, Filter, Wrench, MoreHorizontal, UserPlus, CheckCircle, Eye, Edit } from 'lucide-react';

type RequestStatus = 'Pending' | 'In Progress' | 'Completed' | 'Canceled' | 'On Hold';
type RequestPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface ServiceRequest {
  id: string; // unique key for lists
  requestId: string; // user-facing ID
  dateSubmitted: string;
  tenantName: string;
  tenantId?: string;
  apartment: string;
  unit: string;
  room: string;
  category: string;
  description: string; // Short description for table
  fullDescription: string; // Detailed description
  priority: RequestPriority;
  status: RequestStatus;
  workerAssigned: string | null;
  workerId?: string;
  dateCompleted: string | null;
  mediaUploads: Array<{ id: string, type: 'image' | 'video'; url: string; caption?: string, aiHint?: string }>;
  actionLog: Array<{ id: string, timestamp: string; user: string; action: string; details?: string }>;
  reportedBy?: string;
}

// Updated dummy data for service requests
export const dummyServiceRequests: ServiceRequest[] = [
  { 
    id: "sr001", 
    requestId: "SR20240725-001", 
    dateSubmitted: "2024-07-25", 
    tenantName: "Alice Wonderland", 
    tenantId: "tenant001",
    apartment: "Greenwood Heights", 
    unit: "A-101", 
    room: "Kitchen", 
    category: "Plumbing",
    description: "Leaky faucet under the sink, constant dripping.", 
    fullDescription: "The kitchen faucet has been leaking consistently for the past two days. It's a steady drip under the sink, and a small puddle forms. Needs urgent attention to prevent water damage and high bills.",
    priority: "High", 
    status: "Pending", 
    workerAssigned: null, 
    workerId: undefined,
    dateCompleted: null,
    mediaUploads: [
      { id: "media001", type: 'image', url: 'https://placehold.co/300x200.png', caption: 'Leaking Faucet View 1', aiHint: 'leaky faucet' },
      { id: "media002", type: 'image', url: 'https://placehold.co/300x200.png', caption: 'Puddle under sink', aiHint: 'water damage' }
    ],
    actionLog: [
      { id: "log001", timestamp: "2024-07-25 10:00 AM", user: "Alice Wonderland", action: "Request Submitted", details: "Tenant submitted the request via app." }
    ],
    reportedBy: "Alice Wonderland",
  },
  { 
    id: "sr002", 
    requestId: "SR20240724-003", 
    dateSubmitted: "2024-07-24", 
    tenantName: "Bob The Builder", 
    tenantId: "tenant002",
    apartment: "Greenwood Heights", 
    unit: "B-201", 
    room: "Bathroom", 
    category: "Plumbing",
    description: "Shower drain clogged, water not draining.", 
    fullDescription: "The main bathroom shower drain is completely clogged. Water backs up significantly during showers, making it unusable. Tenant tried basic unclogging methods without success.",
    priority: "Medium", 
    status: "In Progress", 
    workerAssigned: "Mike Ross (Plumber)", 
    workerId: "worker001",
    dateCompleted: null,
    mediaUploads: [],
    actionLog: [
      { id: "log002a", timestamp: "2024-07-24 02:30 PM", user: "Bob The Builder", action: "Request Submitted" },
      { id: "log002b", timestamp: "2024-07-24 03:00 PM", user: "Landlord Admin", action: "Worker Assigned", details: "Mike Ross assigned." },
      { id: "log002c", timestamp: "2024-07-25 09:00 AM", user: "Mike Ross", action: "Status Updated", details: "Changed to In Progress. Site visit scheduled." }
    ],
    reportedBy: "Bob The Builder",
  },
  { 
    id: "sr003", 
    requestId: "SR20240723-001", 
    dateSubmitted: "2024-07-23", 
    tenantName: "Charlie Brown", 
    tenantId: "tenant003",
    apartment: "Oceanview Towers", 
    unit: "C-505", 
    room: "Living Room", 
    category: "HVAC",
    description: "Air conditioner not cooling properly.", 
    fullDescription: "The living room AC unit runs, but it's not blowing cold air. It's been like this for a day. Filters were cleaned recently by the tenant.",
    priority: "Medium", 
    status: "Completed", 
    workerAssigned: "Tech Services Inc.", 
    workerId: "workerExternal001", 
    dateCompleted: "2024-07-24",
    mediaUploads: [
       { id: "media003", type: 'image', url: 'https://placehold.co/300x200.png', caption: 'AC Unit Model', aiHint: 'air conditioner' }
    ],
    actionLog: [
      { id: "log003a", timestamp: "2024-07-23 11:00 AM", user: "Charlie Brown", action: "Request Submitted" },
      { id: "log003b", timestamp: "2024-07-23 11:30 AM", user: "Landlord Admin", action: "Worker Assigned", details: "Tech Services Inc. assigned." },
      { id: "log003c", timestamp: "2024-07-24 04:00 PM", user: "Tech Services Inc.", action: "Status Updated", details: "Work completed. Refrigerant recharged." }
    ],
    reportedBy: "Charlie Brown",
  },
  { 
    id: "sr004", 
    requestId: "SR20240722-005", 
    dateSubmitted: "2024-07-22", 
    tenantName: "Diana Prince", 
    tenantId: "tenant004",
    apartment: "Mountain Ridge Villas", 
    unit: "Villa A", 
    room: "Bedroom", 
    category: "Fixtures",
    description: "Broken window lock.", 
    fullDescription: "The lock on the master bedroom window is broken and cannot be secured. This is a security concern.",
    priority: "High", 
    status: "Canceled", 
    workerAssigned: null, 
    workerId: undefined,
    dateCompleted: null,
    mediaUploads: [],
    actionLog: [
      { id: "log004a", timestamp: "2024-07-22 09:15 AM", user: "Diana Prince", action: "Request Submitted" },
      { id: "log004b", timestamp: "2024-07-22 01:00 PM", user: "Landlord Admin", action: "Status Updated", details: "Canceled by tenant. Tenant fixed it themselves." }
    ],
    reportedBy: "Diana Prince",
  },
];

const dummyWorkers = [
    { id: "worker001", name: "Mike Ross (Plumber)"},
    { id: "worker002", name: "Sarah Connor (Electrician)"},
    { id: "workerExternal001", name: "Tech Services Inc."},
    { id: "none", name: "Unassign / No Worker"}
];
const requestStatuses: RequestStatus[] = ["Pending", "In Progress", "On Hold", "Completed", "Canceled"];

export default function ManageServiceRequestsPage() {
  const router = useRouter();
  const [isAssignWorkerModalOpen, setIsAssignWorkerModalOpen] = useState(false);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [selectedRequestForModal, setSelectedRequestForModal] = useState<ServiceRequest | null>(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | undefined>(undefined);
  const [statusUpdateComments, setStatusUpdateComments] = useState("");


  const handleViewDetails = (requestId: string) => {
    router.push(`/dashboard/landlord/service-requests/${requestId}`);
  };

  const handleEditRequest = (requestId: string) => {
    router.push(`/dashboard/landlord/service-requests/${requestId}/edit`);
  };

  const openAssignWorkerModal = (request: ServiceRequest) => {
    setSelectedRequestForModal(request);
    setSelectedWorkerId(request.workerId || "none");
    setIsAssignWorkerModalOpen(true);
  };

  const openUpdateStatusModal = (request: ServiceRequest) => {
    setSelectedRequestForModal(request);
    setSelectedStatus(request.status);
    setStatusUpdateComments("");
    setIsUpdateStatusModalOpen(true);
  };
  
  const handleConfirmAssignWorker = () => {
    if (!selectedRequestForModal || selectedWorkerId === undefined) return;
    const workerName = dummyWorkers.find(w => (w.id === selectedWorkerId || w.name === selectedWorkerId))?.name || "Unassigned";
    console.log(`Assigning worker "${workerName}" (ID: ${selectedWorkerId}) to request ${selectedRequestForModal.requestId}`);
    alert(`Worker "${workerName}" assigned to SR-${selectedRequestForModal.requestId}. (Simulated)`);
    // Here you would typically call an action to update the service request in your backend/state
    // For dummy data, you might update the dummyServiceRequests array if you want to see immediate effect (not done here)
    setIsAssignWorkerModalOpen(false);
    setSelectedRequestForModal(null);
  };

  const handleConfirmUpdateStatus = () => {
    if (!selectedRequestForModal || selectedStatus === undefined) return;
    console.log(`Updating status of request ${selectedRequestForModal.requestId} to "${selectedStatus}" with comments: "${statusUpdateComments}"`);
    alert(`Status of SR-${selectedRequestForModal.requestId} updated to "${selectedStatus}". (Simulated)`);
    // Update dummy data or call action
    setIsUpdateStatusModalOpen(false);
    setSelectedRequestForModal(null);
  };


  const getStatusBadgeVariant = (status: RequestStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'In Progress': return 'default'; 
      case 'Completed': return 'default';
      case 'Canceled': return 'destructive';
      case 'On Hold': return 'outline';
      default: return 'outline';
    }
  };
  
  const getPriorityBadgeVariant = (priority: RequestPriority): "default" | "secondary" | "destructive" | "outline" => {
    switch (priority) {
        case 'Urgent':
        case 'High': return 'destructive';
        case 'Medium': return 'secondary'; 
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
                      <TableHead>Category</TableHead>
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
                        <TableCell>{req.category}</TableCell>
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
                              <DropdownMenuItem onClick={() => handleViewDetails(req.requestId)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditRequest(req.requestId)} disabled={req.status === 'Completed' || req.status === 'Canceled'}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Request
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openAssignWorkerModal(req)} disabled={req.status === 'Completed' || req.status === 'Canceled'}>
                                <UserPlus className="mr-2 h-4 w-4" /> Assign Worker
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openUpdateStatusModal(req)}>
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

        {/* Assign Worker Modal */}
        {selectedRequestForModal && (
            <Dialog open={isAssignWorkerModalOpen} onOpenChange={setIsAssignWorkerModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Assign Worker to SR: {selectedRequestForModal.requestId}</DialogTitle>
                <DialogDescription>
                    Select a worker to assign to this service request. Current: {selectedRequestForModal.workerAssigned || 'None'}
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="worker" className="text-right">Worker</Label>
                    <Select 
                        defaultValue={selectedRequestForModal.workerId || selectedRequestForModal.workerAssigned || "none"}
                        onValueChange={(value) => setSelectedWorkerId(value === "none" ? "" : value)}
                    >
                        <SelectTrigger id="worker" className="col-span-3">
                            <SelectValue placeholder="Select worker" />
                        </SelectTrigger>
                        <SelectContent>
                            {dummyWorkers.map(worker => (
                            <SelectItem key={worker.id} value={worker.id === "none" ? "none" : worker.name}>
                                {worker.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                </div>
                <DialogFooter>
                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                <Button type="button" onClick={handleConfirmAssignWorker}>Assign Worker</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        )}

        {/* Update Status Modal */}
        {selectedRequestForModal && (
            <Dialog open={isUpdateStatusModalOpen} onOpenChange={setIsUpdateStatusModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Update Status for SR: {selectedRequestForModal.requestId}</DialogTitle>
                <DialogDescription>
                    Current status: {selectedRequestForModal.status}. Select new status and add comments if any.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Select 
                            defaultValue={selectedRequestForModal.status}
                            onValueChange={(value) => setSelectedStatus(value as RequestStatus)}
                        >
                            <SelectTrigger id="status" className="col-span-3">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {requestStatuses.map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="comments" className="text-right pt-1">Comments</Label>
                        <Textarea 
                            id="comments" 
                            className="col-span-3" 
                            placeholder="Add comments about status change (optional)"
                            value={statusUpdateComments}
                            onChange={(e) => setStatusUpdateComments(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button type="button" onClick={handleConfirmUpdateStatus}>Update Status</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        )}

      </main>
    </div>
  );
}

    