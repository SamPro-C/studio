// src/app/dashboard/tenant/service-requests/[requestId]/page.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Wrench,
  Briefcase,
  CalendarDays,
  MessageSquare,
  Paperclip,
  Clock,
  Home as HomeIcon, // Renamed to avoid conflict if Home is used elsewhere
  AlertCircle,
  UserCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Simulating the ServiceRequest type for tenant view
interface ServiceRequestTenantView {
  id: string; // For React key
  requestId: string; // Display ID
  dateSubmitted: string;
  category: string;
  fullDescription: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Canceled' | 'On Hold';
  workerAssigned: string | null;
  apartment: string;
  unit: string;
  room: string;
  mediaUploads?: Array<{ id: string, type: 'image' | 'video'; url: string; caption?: string, aiHint?: string }>;
  actionLog?: Array<{ id: string, timestamp: string; user: string; action: string; details?: string }>;
}

// Dummy data - this should ideally match structure in landlord's service request page for consistency
const dummyTenantRequestsData: { [key: string]: ServiceRequestTenantView } = {
  "SR20240725-001": {
    id: "sr001",
    requestId: "SR20240725-001",
    dateSubmitted: "2024-07-25T10:00:00Z",
    category: "Plumbing",
    fullDescription: "The kitchen faucet has been leaking consistently for the past two days. It's a steady drip under the sink, and a small puddle forms. Needs urgent attention to prevent water damage and high bills.",
    priority: "High",
    status: "Pending",
    workerAssigned: null,
    apartment: "Greenwood Heights",
    unit: "A-101",
    room: "Kitchen",
    mediaUploads: [
      { id: "media001", type: 'image', url: 'https://placehold.co/300x200.png', caption: 'Leaking Faucet View 1', aiHint: 'leaky faucet' },
    ],
    actionLog: [
      { id: "log001", timestamp: "2024-07-25 10:00 AM", user: "You", action: "Request Submitted" }
    ]
  },
  "SR20240724-003": {
    id: "sr002",
    requestId: "SR20240724-003",
    dateSubmitted: "2024-07-24T14:30:00Z",
    category: "Plumbing",
    fullDescription: "The main bathroom shower drain is completely clogged. Water backs up significantly during showers, making it unusable.",
    priority: "Medium",
    status: "In Progress",
    workerAssigned: "Mike Ross (Plumber)",
    apartment: "Greenwood Heights",
    unit: "B-201",
    room: "Bathroom",
    mediaUploads: [],
    actionLog: [
      { id: "log002a", timestamp: "2024-07-24 02:30 PM", user: "You", action: "Request Submitted" },
      { id: "log002b", timestamp: "2024-07-24 03:00 PM", user: "Landlord", action: "Worker Assigned", details: "Mike Ross assigned." },
      { id: "log002c", timestamp: "2024-07-25 09:00 AM", user: "Mike Ross", action: "Status Updated", details: "Changed to In Progress." }
    ]
  },
};

const getStatusBadgeVariant = (status: ServiceRequestTenantView['status']): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Pending': return 'secondary';
    case 'In Progress': return 'default';
    case 'Completed': return 'default'; // Using 'default' (primary) for positive completion
    case 'Canceled': return 'destructive';
    case 'On Hold': return 'outline';
    default: return 'outline';
  }
};

const getPriorityBadgeVariant = (priority: ServiceRequestTenantView['priority']): "default" | "secondary" | "destructive" | "outline" => {
  switch (priority) {
      case 'Urgent':
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
  }
};

export default function ServiceRequestDetailsTenantPage() {
  const params = useParams();
  const requestId = params.requestId as string;
  const { toast } = useToast();

  const [request, setRequest] = useState<ServiceRequestTenantView | null | undefined>(undefined); // undefined for loading state

  useEffect(() => {
    const foundRequest = dummyTenantRequestsData[requestId];
    setRequest(foundRequest || null); // null if not found, otherwise the request object
  }, [requestId]);

  const handleContactLandlord = () => {
      toast({
        title: "Contact Landlord",
        description: "Functionality to contact landlord (e.g., via chat or email link) would be here."
      });
  };

  const handleCancelRequest = () => {
      if (confirm("Are you sure you want to cancel this service request? This action cannot be undone.")) {
          // In a real app, this would be an API call.
          // For demo, update local state if request exists
          if (request) {
              setRequest(prev => prev ? { ...prev, status: "Canceled" } : null);
              toast({
                title: "Request Canceled",
                description: `Service Request ${requestId} has been marked as canceled.`,
              });
          } else {
              toast({ title: "Error", description: "Could not find request to cancel.", variant: "destructive"});
          }
      }
  };

  if (request === undefined) { // Explicit loading state
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Wrench className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading request details...</p>
      </div>
    );
  }

  if (!request) { // Request not found after attempting to load
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/tenant/service-requests">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Service Request Not Found</h1>
          </div>
          <Card>
            <CardContent className="pt-6 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <p>The service request with ID <span className="font-mono bg-muted px-1 py-0.5 rounded text-sm">{requestId}</span> could not be found.</p>
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
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
            <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tenant/service-requests">
                <ArrowLeft className="h-5 w-5" />
            </Link>
            </Button>
            <div>
                <Link href="/dashboard/tenant/service-requests" className="text-sm text-muted-foreground hover:text-primary hover:underline">My Service Requests</Link>
                <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                    <Wrench className="mr-3 h-8 w-8" /> Request: {request.requestId}
                </h1>
            </div>
        </div>

        {/* Request Overview Card */}
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                        <CardTitle>Request Overview</CardTitle>
                        <CardDescription>Submitted: {new Date(request.dateSubmitted).toLocaleString()}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={getPriorityBadgeVariant(request.priority)}>{request.priority} Priority</Badge>
                        <Badge variant={getStatusBadgeVariant(request.status)}>{request.status}</Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div><strong>Category:</strong> {request.category}</div>
                <div><strong>Location:</strong> {request.apartment} - {request.unit} ({request.room})</div>
                <div>
                    <h4 className="font-semibold mb-1">Description:</h4>
                    <p className="text-foreground/80 whitespace-pre-wrap">{request.fullDescription}</p>
                </div>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Assigned Worker Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Briefcase className="mr-2 h-5 w-5"/>Assigned Worker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {request.workerAssigned ? (
                <p><strong>Worker:</strong> {request.workerAssigned}</p>
              ) : (
                <p className="text-muted-foreground">Your landlord will assign a worker soon. Please check back for updates.</p>
              )}
            </CardContent>
          </Card>

          {/* Tenant Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><MessageSquare className="mr-2 h-5 w-5"/>Contact & Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>If you have questions or need to provide more information about this request:</p>
              <Button className="w-full" onClick={handleContactLandlord}>Contact Landlord/Property Manager</Button>
              {(request.status === "Pending" || request.status === "In Progress") && (
                  <Button variant="destructive" className="w-full" onClick={handleCancelRequest}>Cancel Request</Button>
              )}
            </CardContent>
          </Card>
        </div>


        {/* Media You Provided Card */}
        {request.mediaUploads && request.mediaUploads.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Paperclip className="mr-2 h-5 w-5"/>Media You Provided</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {request.mediaUploads.map((media) => (
                  <div key={media.id} className="relative aspect-square group">
                    <Image
                        src={media.url}
                        alt={media.caption || 'Service request media'}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                        data-ai-hint={media.aiHint || "repair image"}
                    />
                    {media.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1.5 truncate group-hover:whitespace-normal group-hover:overflow-visible">
                            {media.caption}
                        </div>
                    )}
                  </div>
                ))}
              </div>
          </CardContent>
        </Card>
        )}

        {/* Action Log / History Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Clock className="mr-2 h-5 w-5"/>Activity Log</CardTitle>
            <CardDescription>Updates and history of actions on this request.</CardDescription>
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
                        <p><span className="font-semibold">{logEntry.user}</span> {logEntry.action}</p>
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
          <CardFooter>
              <p className="text-xs text-muted-foreground">Contact your landlord for more details if needed.</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
