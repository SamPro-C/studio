
// src/app/dashboard/landlord/service-requests/[requestId]/page.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
    ArrowLeft, 
    Wrench, 
    UserCircle, 
    Home, 
    Briefcase,
    CalendarDays, 
    MessageSquare, 
    Paperclip, 
    ListChecks, 
    Upload, 
    AlertCircle,
    Clock,
    Edit
} from 'lucide-react';
import { dummyServiceRequests, ServiceRequest } from '../page'; // Import from parent

type RequestStatus = ServiceRequest['status'];

// Define dummyWorkers and requestStatuses locally for this page
const dummyWorkers = [
    { id: "worker001", name: "Mike Ross (Plumber)"},
    { id: "worker002", name: "Sarah Connor (Electrician)"},
    { id: "workerExternal001", name: "Tech Services Inc."},
    { id: "none", name: "Unassign / No Worker"}
];
const requestStatuses: RequestStatus[] = ["Pending", "In Progress", "On Hold", "Completed", "Canceled"];


export default function ServiceRequestDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId as string;

  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [isAssignWorkerModalOpen, setIsAssignWorkerModalOpen] = useState(false);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | undefined>(undefined);
  const [statusUpdateComments, setStatusUpdateComments] = useState("");

  useEffect(() => {
    const foundRequest = dummyServiceRequests.find(req => req.requestId === requestId);
    setRequest(foundRequest || null);
    if (foundRequest) {
        setSelectedWorkerId(foundRequest.workerId || "none");
        setSelectedStatus(foundRequest.status);
    }
  }, [requestId]);

  const openAssignWorkerModal = () => {
    if (!request) return;
    setSelectedWorkerId(request.workerId || request.workerAssigned || "none");
    setIsAssignWorkerModalOpen(true);
  };
  
  const openUpdateStatusModal = () => {
    if (!request) return;
    setSelectedStatus(request.status);
    setStatusUpdateComments(""); // Reset comments
    setIsUpdateStatusModalOpen(true);
  };

  const handleConfirmAssignWorker = () => {
    if (!request || selectedWorkerId === undefined) return;
    const workerName = dummyWorkers.find(w => (w.id === selectedWorkerId || w.name === selectedWorkerId))?.name || "Unassigned";
    console.log(`Assigning worker "${workerName}" (ID: ${selectedWorkerId}) to request ${request.requestId}`);
    alert(`Worker "${workerName}" assigned to SR-${request.requestId}. (Simulated)`);
    // Update request state or refetch if this were a real API call
    if(request) { // Update local state for immediate feedback
        setRequest(prev => prev ? {...prev, workerAssigned: workerName === "Unassign / No Worker" ? null : workerName, workerId: selectedWorkerId === "none" ? undefined : selectedWorkerId} : null);
    }
    setIsAssignWorkerModalOpen(false);
  };

  const handleConfirmUpdateStatus = () => {
    if (!request || selectedStatus === undefined) return;
    console.log(`Updating status of request ${request.requestId} to "${selectedStatus}" with comments: "${statusUpdateComments}"`);
    alert(`Status of SR-${request.requestId} updated to "${selectedStatus}". (Simulated)`);
     if(request) { // Update local state for immediate feedback
        setRequest(prev => prev ? {...prev, status: selectedStatus} : null);
    }
    setIsUpdateStatusModalOpen(false);
  };

  const handleAddNote = () => alert(`Add note to SR: ${request?.requestId}. To be implemented.`);
  const handleUploadMedia = () => alert(`Upload media for SR: ${request?.requestId}. To be implemented.`);
  
  const handleViewTenantProfile = () => {
    if(request?.tenantId) {
        router.push(`/dashboard/landlord/tenants/${request.tenantId}`);
    } else {
        alert("Tenant ID not available for this request.");
    }
  };
   const handleViewWorkerProfile = () => {
    if(request?.workerId && request.workerId !== "workerExternal001" && request.workerId !== "none") { // Assuming external workers don't have profiles
        router.push(`/dashboard/landlord/workers/${request.workerId}`);
    } else if (request?.workerAssigned && request.workerAssigned !== "Unassign / No Worker"){
        alert(`Cannot view profile for external or unassigned worker: ${request.workerAssigned}.`);
    } else {
        alert("Worker not assigned or no profile available.");
    }
  };


  if (!request) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/landlord/service-requests">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Service Request Not Found</h1>
          </div>
          <Card>
            <CardContent className="pt-6 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <p>The service request details could not be loaded. The ID might be incorrect or the request does not exist.</p>
              <Button asChild className="mt-6">
                <Link href="/dashboard/landlord/service-requests">Back to Service Requests</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
  
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
  
  const getPriorityBadgeVariant = (priority: ServiceRequest['priority']): "default" | "secondary" | "destructive" | "outline" => {
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
        {/* Header and Main Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/landlord/service-requests">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
                <Link href="/dashboard/landlord/service-requests" className="text-sm text-muted-foreground hover:text-primary hover:underline">All Service Requests</Link>
                <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                    <Wrench className="mr-3 h-8 w-8" /> Service Request: {request.requestId}
                </h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/landlord/service-requests/${request.requestId}/edit`)}><Edit className="mr-2 h-4 w-4" /> Edit Request</Button>
            <Button variant="outline" size="sm" onClick={openAssignWorkerModal}><UserCircle className="mr-2 h-4 w-4" /> Assign Worker</Button>
            <Button variant="outline" size="sm" onClick={openUpdateStatusModal}><ListChecks className="mr-2 h-4 w-4" /> Update Status</Button>
          </div>
        </div>

        {/* Request Overview Card */}
        <Card>
            <CardHeader>
                <CardTitle>Request Overview</CardTitle>
                <CardDescription>Key details about this service request.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                <div><strong>Request ID:</strong> {request.requestId}</div>
                <div><strong>Date Submitted:</strong> {new Date(request.dateSubmitted).toLocaleString()}</div>
                <div><strong>Category:</strong> {request.category}</div>
                <div><strong>Priority:</strong> <Badge variant={getPriorityBadgeVariant(request.priority)}>{request.priority}</Badge></div>
                <div><strong>Status:</strong> <Badge variant={getStatusBadgeVariant(request.status)}>{request.status}</Badge></div>
                <div><strong>Reported By:</strong> {request.reportedBy || request.tenantName}</div>
                {request.dateCompleted && <div><strong>Date Completed:</strong> {new Date(request.dateCompleted).toLocaleString()}</div>}
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Tenant & Property Info Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Tenant & Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center"><UserCircle className="mr-2 h-4 w-4 text-primary/70" /><strong>Tenant:</strong><span className="ml-1">{request.tenantName}</span></div>
              {request.tenantId && <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={handleViewTenantProfile}>View Tenant Profile</Button>}
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center"><Home className="mr-2 h-4 w-4 text-primary/70" /><strong>Apartment:</strong><span className="ml-1">{request.apartment}</span></div>
                <div className="flex items-center"><Home className="mr-2 h-4 w-4 text-primary/70" /><strong>Unit:</strong><span className="ml-1">{request.unit}</span></div>
                <div className="flex items-center"><Home className="mr-2 h-4 w-4 text-primary/70" /><strong>Room:</strong><span className="ml-1">{request.room}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Assigned Worker Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Assigned Worker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {request.workerAssigned ? (
                <>
                  <div className="flex items-center"><Briefcase className="mr-2 h-4 w-4 text-primary/70" /><strong>Worker:</strong><span className="ml-1">{request.workerAssigned}</span></div>
                  {request.workerId && request.workerId !== "none" && request.workerAssigned !== "Unassign / No Worker" && <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={handleViewWorkerProfile}>View Worker Profile</Button>}
                </>
              ) : (
                <p className="text-muted-foreground">No worker assigned yet.</p>
              )}
              <Button variant="outline" size="sm" className="w-full mt-2" onClick={openAssignWorkerModal}>
                {request.workerAssigned ? 'Reassign Worker' : 'Assign Worker'}
              </Button>
            </CardContent>
          </Card>
          
           {/* Description Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Full Description</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">{request.fullDescription}</p>
            </CardContent>
          </Card>
        </div>


        {/* Media Uploads Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Media Uploads</CardTitle>
                <CardDescription>Images or videos related to the request.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleUploadMedia}><Upload className="mr-2 h-4 w-4"/>Upload Media</Button>
          </CardHeader>
          <CardContent>
            {request.mediaUploads && request.mediaUploads.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {request.mediaUploads.map((media) => (
                  <div key={media.id} className="relative aspect-square group">
                    <Image 
                        src={media.url} 
                        alt={media.caption || 'Service request media'} 
                        layout="fill" 
                        objectFit="cover" 
                        className="rounded-md"
                        data-ai-hint={media.aiHint || 'repair image'}
                    />
                    {media.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1.5 truncate group-hover:whitespace-normal group-hover:overflow-visible">
                            {media.caption}
                        </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No media uploaded for this request.</p>
            )}
          </CardContent>
        </Card>

        {/* Action Log / History Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>History of actions taken on this request.</CardDescription>
            </div>
             <Button variant="outline" size="sm" onClick={handleAddNote}><MessageSquare className="mr-2 h-4 w-4"/>Add Note/Log</Button>
          </CardHeader>
          <CardContent>
            {request.actionLog && request.actionLog.length > 0 ? (
              <ul className="space-y-4">
                {request.actionLog.map((logEntry) => (
                  <li key={logEntry.id} className="flex items-start space-x-3 text-sm">
                    <div className="p-1.5 bg-primary/10 rounded-full mt-0.5">
                        <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                        <p><span className="font-semibold">{logEntry.user}</span> performed action: <span className="font-medium text-primary/90">{logEntry.action}</span></p>
                        {logEntry.details && <p className="text-xs text-muted-foreground italic">Details: {logEntry.details}</p>}
                        <p className="text-xs text-muted-foreground">{new Date(logEntry.timestamp).toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">No activity logged for this request yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Assign Worker Modal */}
        <Dialog open={isAssignWorkerModalOpen} onOpenChange={setIsAssignWorkerModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assign Worker to SR: {request.requestId}</DialogTitle>
              <DialogDescription>
                Select a worker to assign to this service request. Current: {request.workerAssigned || 'None'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="workerSelectModal" className="text-right">Worker</Label>
                <Select 
                    defaultValue={selectedWorkerId}
                    onValueChange={(value) => setSelectedWorkerId(value === "none" ? "" : value)}
                >
                    <SelectTrigger id="workerSelectModal" className="col-span-3">
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

        {/* Update Status Modal */}
        <Dialog open={isUpdateStatusModalOpen} onOpenChange={setIsUpdateStatusModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Status for SR: {request.requestId}</DialogTitle>
              <DialogDescription>
                Current status: {request.status}. Select new status and add comments if any.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="statusSelectModal" className="text-right">Status</Label>
                    <Select 
                        defaultValue={selectedStatus}
                        onValueChange={(value) => setSelectedStatus(value as RequestStatus)}
                    >
                        <SelectTrigger id="statusSelectModal" className="col-span-3">
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
                    <Label htmlFor="commentsModal" className="text-right pt-1">Comments</Label>
                    <Textarea 
                        id="commentsModal" 
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

      </main>
    </div>
  );
}

    