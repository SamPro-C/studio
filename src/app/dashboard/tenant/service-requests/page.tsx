
// src/app/dashboard/tenant/service-requests/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Wrench, PlusCircle, Filter, Eye, XCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

interface ServiceRequestRecord {
  id: string;
  requestId: string;
  dateSubmitted: string;
  requestType: string;
  description: string; // summary
  status: 'Pending' | 'In Progress' | 'Completed' | 'Canceled';
  assignedWorker: string | null;
  lastUpdated: string;
}

// Dummy service request data for tenant
const dummyTenantServiceRequests: ServiceRequestRecord[] = [
  { id: "tsr1", requestId: "SR20240726-001", dateSubmitted: "2024-07-26", requestType: "Plumbing", description: "Kitchen sink leaking badly.", status: "Pending", assignedWorker: null, lastUpdated: "2024-07-26" },
  { id: "tsr2", requestId: "SR20240720-005", dateSubmitted: "2024-07-20", requestType: "Electrical", description: "Living room light not working.", status: "In Progress", assignedWorker: "Sarah Connor", lastUpdated: "2024-07-22" },
  { id: "tsr3", requestId: "SR20240715-002", dateSubmitted: "2024-07-15", requestType: "HVAC", description: "AC making strange noises.", status: "Completed", assignedWorker: "Tech Services Inc.", lastUpdated: "2024-07-18" },
  { id: "tsr4", requestId: "SR20240710-001", dateSubmitted: "2024-07-10", requestType: "Pest Control", description: "Ants in the kitchen.", status: "Canceled", assignedWorker: null, lastUpdated: "2024-07-11" },
];

export default function ViewServiceRequestsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleViewDetails = (requestId: string) => {
    router.push(`/dashboard/tenant/service-requests/${requestId}`);
  };

  const handleCancelRequest = (requestId: string) => {
    // In a real app, this would trigger an API call
    console.log(`Canceling request ${requestId}`);
    toast({
      title: "Request Canceled",
      description: `Service Request ${requestId} has been canceled.`,
    });
    // Here you might want to update the local state or refetch data
  };
  
  const getStatusBadgeVariant = (status: ServiceRequestRecord['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'In Progress': return 'default'; // Using 'default' which is primary-colored
      case 'Completed': return 'default'; // Using 'default' which is primary-colored, consider a green one if 'success' variant exists
      case 'Canceled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/tenant">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Wrench className="mr-3 h-7 w-7" /> My Service Requests
            </h1>
          </div>
          <Button asChild>
            <Link href="/dashboard/tenant/service-requests/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Submit New Request
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Your Submitted Requests</CardTitle>
            <CardDescription>Track the status of all your service and maintenance requests.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters Section */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-grow">
                    <Label htmlFor="filterStatus">Filter by Status</Label>
                    <Select>
                        <SelectTrigger id="filterStatus" className="mt-1">
                        <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="outline" className="w-full sm:w-auto"><Filter className="mr-2 h-4 w-4"/>Apply Filter</Button>
            </div>

            {/* Service Request Table */}
            {dummyTenantServiceRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Date Submitted</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Worker</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyTenantServiceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.requestId}</TableCell>
                        <TableCell>{new Date(request.dateSubmitted).toLocaleDateString()}</TableCell>
                        <TableCell>{request.requestType}</TableCell>
                        <TableCell className="max-w-xs truncate" title={request.description}>{request.description}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(request.status)}>{request.status}</Badge>
                        </TableCell>
                        <TableCell>{request.assignedWorker || 'N/A'}</TableCell>
                        <TableCell>{new Date(request.lastUpdated).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handleViewDetails(request.requestId)}>
                            <Eye className="h-4 w-4 mr-1 sm:mr-2" /> Details
                          </Button>
                          {request.status === 'Pending' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                  <XCircle className="h-4 w-4 mr-1 sm:mr-2"/> Cancel
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will cancel your service request ({request.requestId}).
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Keep Request</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleCancelRequest(request.requestId)} className="bg-destructive hover:bg-destructive/90">
                                    Yes, Cancel Request
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">You haven't submitted any service requests yet.</p>
            )}
          </CardContent>
          <CardFooter>
             <p className="text-xs text-muted-foreground">
                Please allow reasonable time for your landlord or assigned worker to address your requests.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
