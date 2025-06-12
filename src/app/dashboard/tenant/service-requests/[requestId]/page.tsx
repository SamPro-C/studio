
// src/app/dashboard/tenant/service-requests/[requestId]/page.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    Wrench, 
    CalendarDays, 
    UserCircle, 
    Briefcase, 
    Paperclip,
    MessageSquare,
    Clock,
    AlertCircle
} from 'lucide-react';

interface MediaUpload {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  aiHint?: string;
}

interface ActionLogEntry {
  id: string;
  timestamp: string;
  user: string; // "You", "Landlord", "Worker Name"
  action: string;
  details?: string;
}

interface ServiceRequestDetailsData {
  id: string;
  requestId: string;
  dateSubmitted: string;
  requestType: string;
  location: string;
  fullDescription: string;
  priority: 'Normal' | 'Urgent';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Canceled';
  assignedWorker: {
    name: string | null;
    role: string | null;
    contact?: string | null; // Phone or email
  };
  mediaUploads: MediaUpload[];
  actionLog: ActionLogEntry[];
}

// Dummy data for a single service request - in a real app, fetch this by requestId
const dummyRequestDetails: { [key: string]: ServiceRequestDetailsData } = {
  "SR20240726-001": {
    id: "tsr1",
    requestId: "SR20240726-001",
    dateSubmitted: "2024-07-26T10:00:00Z",
    requestType: "Plumbing",
    location: "Kitchen",
    fullDescription: "The main kitchen sink is severely leaking from the base of the faucet. It's a constant drip and has created a small pool of water under the sink cabinet. This started yesterday evening and seems to be getting worse. We've placed a bucket, but it needs urgent attention to prevent further water damage.",
    priority: 'Urgent',
    status: 'Pending',
    assignedWorker: { name: null, role: null, contact: null },
    mediaUploads: [
      { id: "media1", type: 'image', url: 'https://placehold.co/600x400.png', caption: 'Leaking faucet base', aiHint: 'leaky faucet' },
      { id: "media2", type: 'image', url: 'https://placehold.co/600x400.png', caption: 'Water under sink', aiHint: 'water damage' },
    ],
    actionLog: [
      { id: "log1", timestamp: "2024-07-26T10:00:00Z", user: "You", action: "Request Submitted", details: "Kitchen sink leaking badly." },
      { id: "log2", timestamp: "2024-07-26T10:05:00Z", user: "System", action: "Notification sent to Landlord" },
    ]
  },
  "SR20240720-005": {
    id: "tsr2",
    requestId: "SR20240720-005",
    dateSubmitted: "2024-07-20T14:30:00Z",
    requestType: "Electrical",
    location: "Living Room",
    fullDescription: "The main ceiling light fixture in the living room is not turning on. Checked the bulb, it's not that. Might be a wiring issue or the fixture itself.",
    priority: 'Normal',
    status: 'In Progress',
    assignedWorker: { name: "Sarah Connor", role: "Electrician", contact: "sarah.c@propertyelectric.co.ke" },
    mediaUploads: [],
    actionLog: [
      { id: "logA", timestamp: "2024-07-20T14:30:00Z", user: "You", action: "Request Submitted", details: "Living room light not working." },
      { id: "logB", timestamp: "2024-07-20T15:00:00Z", user: "Landlord", action: "Worker Assigned", details: "Sarah Connor (Electrician) assigned." },
      { id: "logC", timestamp: "2024-07-22T09:00:00Z", user: "Sarah Connor", action: "Status Update: In Progress", details: "Scheduled site visit for today afternoon." },
    ]
  },
  "SR20240715-002": { // Completed example
    id: "tsr3",
    requestId: "SR20240715-002",
    dateSubmitted: "2024-07-15T08:15:00Z",
    requestType: "HVAC",
    location: "Bedroom 1",
    fullDescription: "AC unit is making a loud rattling noise when turned on. It still cools, but the noise is very disruptive.",
    priority: 'Normal',
    status: 'Completed',
    assignedWorker: { name: "Tech Services Inc.", role: "HVAC Technicians", contact: "0700-123-456" },
    mediaUploads: [],
    actionLog: [
        { id: "logX1", timestamp: "2024-07-15T08:15:00Z", user: "You", action: "Request Submitted" },
        { id: "logX2", timestamp: "2024-07-15T09:00:00Z", user: "Landlord", action: "Worker Assigned", details: "Tech Services Inc. assigned." },
        { id: "logX3", timestamp: "2024-07-16T11:00:00Z", user: "Tech Services Inc.", action: "Status Update: In Progress", details: "Technician en route." },
        { id: "logX4", timestamp: "2024-07-16T14:30:00Z", user: "Tech Services Inc.", action: "Status Update: Completed", details: "Loose fan blade tightened. AC unit tested and working quietly." },
    ]
  }
};

export default function ServiceRequestDetailsTenantPage() {
  const params = useParams();
  const requestId = params.requestId as string;
  const request = dummyRequestDetails[requestId];

  const getStatusBadgeVariant = (status: ServiceRequestDetailsData['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'In Progress': return 'default';
      case 'Completed': return 'default';
      case 'Canceled': return 'destructive';
      default: return 'outline';
    }
  };
  
  const getPriorityBadgeVariant = (priority: ServiceRequestDetailsData['priority']): "default" | "secondary" | "destructive" | "outline" => {
    switch (priority) {
        case 'Urgent': return 'destructive';
        case 'Normal': return 'outline';
        default: return 'outline';
    }
  };

  if (!request) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/tenant/service-requests">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Request Not Found</h1>
          </div>
          <Card>
            <CardContent className="pt-6 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <p>The service request details could not be loaded. The ID <span className="font-mono bg-muted px-1 py-0.5 rounded text-sm">{requestId}</span> might be incorrect.</p>
              <Button asChild className="mt-6">
                <Link href="/dashboard/tenant/service-requests">Back to My Requests</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tenant/service-requests">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/tenant/service-requests" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to My Requests
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Wrench className="mr-3 h-7 w-7" /> Service Request: {request.requestId}
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {/* Main Details Card */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Request Details</CardTitle>
                    <CardDescription>
                        Submitted on: {new Date(request.dateSubmitted).toLocaleString()}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Request Type:</h4>
                        <p>{request.requestType}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Location:</h4>
                        <p>{request.location}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Priority:</h4>
                        <Badge variant={getPriorityBadgeVariant(request.priority)}>{request.priority}</Badge>
                    </div>
                     <div>
                        <h4 className="font-semibold">Description:</h4>
                        <p className="whitespace-pre-wrap text-foreground/80">{request.fullDescription}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Status and Worker Card */}
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Status & Assignment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Current Status:</h4>
                        <Badge variant={getStatusBadgeVariant(request.status)} className="text-base px-3 py-1">{request.status}</Badge>
                    </div>
                    <div>
                        <h4 className="font-semibold">Assigned Worker:</h4>
                        {request.assignedWorker.name ? (
                            <>
                                <p className="flex items-center"><UserCircle className="mr-2 h-4 w-4 text-primary/70"/>{request.assignedWorker.name} ({request.assignedWorker.role})</p>
                                {request.assignedWorker.contact && <p className="text-xs text-muted-foreground">Contact: {request.assignedWorker.contact}</p>}
                            </>
                        ) : (
                            <p className="text-muted-foreground">Not yet assigned</p>
                        )}
                    </div>
                    {request.status !== 'Completed' && request.status !== 'Canceled' && (
                         <Button variant="outline" className="w-full" disabled>
                            <MessageSquare className="mr-2 h-4 w-4"/> Contact Landlord (Placeholder)
                        </Button>
                    )}
                     {request.status === 'Completed' && (
                         <Button variant="default" className="w-full" disabled>
                            <MessageSquare className="mr-2 h-4 w-4"/> Rate Service (Placeholder)
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* Media Uploads Card */}
        {request.mediaUploads.length > 0 && (
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><Paperclip className="mr-2 h-5 w-5"/> Attached Media</CardTitle>
                <CardDescription>Images or videos you provided for this request.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {request.mediaUploads.map((media) => (
                    <div key={media.id} className="relative aspect-video group">
                    <Image 
                        src={media.url} 
                        alt={media.caption || 'Service request media'} 
                        layout="fill" 
                        objectFit="cover" 
                        className="rounded-md shadow"
                        data-ai-hint={media.aiHint || "repair image"}
                    />
                    {media.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1.5 truncate group-hover:whitespace-normal group-hover:overflow-visible">
                            {media.caption}
                        </div>
                    )}
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
        )}

        {/* Activity Log Card */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><Clock className="mr-2 h-5 w-5"/> Activity Log</CardTitle>
                <CardDescription>Timeline of updates and actions for this request.</CardDescription>
            </CardHeader>
            <CardContent>
            {request.actionLog.length > 0 ? (
              <ul className="space-y-4">
                {request.actionLog.map((logEntry) => (
                  <li key={logEntry.id} className="flex items-start space-x-3 text-sm relative pl-6">
                     <div className={`absolute left-0 top-1 h-2.5 w-2.5 rounded-full ${logEntry.user === "You" ? 'bg-primary' : 'bg-muted-foreground/50'}`}></div>
                     <div className="absolute left-[3px] top-[14px] h-full w-[2px] ${logEntry.user === "You" ? 'bg-primary/30' : 'bg-muted-foreground/20'} group-last:h-0"></div>
                    
                    <div>
                        <p className="font-medium">
                            <span className={`${logEntry.user === "You" ? 'text-primary' : 'text-foreground'}`}>{logEntry.user}</span>: {logEntry.action}
                        </p>
                        {logEntry.details && <p className="text-xs text-muted-foreground italic pl-2">"{logEntry.details}"</p>}
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

      </main>
    </div>
  );
}
