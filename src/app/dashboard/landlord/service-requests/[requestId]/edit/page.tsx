
// src/app/dashboard/landlord/service-requests/[requestId]/edit/page.tsx
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, AlertCircle, Wrench } from 'lucide-react';
import { dummyServiceRequests, ServiceRequest } from '../page'; // Import from parent page

type RequestStatus = ServiceRequest['status'];
type RequestPriority = ServiceRequest['priority'];

const serviceCategories = ["Plumbing", "HVAC", "Electrical", "Fixtures", "General Maintenance", "Pest Control", "Other"];
const requestPriorities: RequestPriority[] = ["Low", "Medium", "High", "Urgent"];
const requestStatuses: RequestStatus[] = ["Pending", "In Progress", "On Hold", "Completed", "Canceled"];

// Dummy worker list for assignment (can be fetched later)
const dummyWorkers = [
    { id: "worker001", name: "Mike Ross (Plumber)"},
    { id: "worker002", name: "Sarah Connor (Electrician)"},
    { id: "workerExternal001", name: "Tech Services Inc."},
    { id: "none", name: "Unassign / No Worker"}
];

export default function EditServiceRequestPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId as string;

  const [request, setRequest] = useState<ServiceRequest | null | undefined>(null); // undefined initially, null if not found
  const [formData, setFormData] = useState({
    category: '',
    priority: '' as RequestPriority,
    status: '' as RequestStatus,
    fullDescription: '',
    workerAssigned: '', // Store worker name for display, can be workerId for actual save
    landlordComment: '',
  });

  useEffect(() => {
    const foundRequest = dummyServiceRequests.find(req => req.requestId === requestId);
    setRequest(foundRequest);
    if (foundRequest) {
      setFormData({
        category: foundRequest.category,
        priority: foundRequest.priority,
        status: foundRequest.status,
        fullDescription: foundRequest.fullDescription,
        workerAssigned: foundRequest.workerAssigned || '',
        landlordComment: '', // Reset comment on load
      });
    }
  }, [requestId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        ...(name === "workerAssigned" && value === "none" ? { workerAssigned: '' } : {}) // Clear workerAssigned if "none" selected
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Updated Service Request Data for SR:", requestId, formData);
    alert(`Service Request ${requestId} updated (see console). This is a placeholder action.`);
    // In a real app, call an action to save data, then redirect.
    router.push(`/dashboard/landlord/service-requests/${requestId}`);
  };

  if (request === undefined) {
    return ( // Loading state or initial state before useEffect runs
        <div className="flex flex-col min-h-screen items-center justify-center">
            <Wrench className="h-12 w-12 text-primary animate-spin mb-4" />
            <p>Loading request details...</p>
        </div>
    );
  }

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
              <p>The service request details could not be loaded for editing. The ID might be incorrect or the request does not exist.</p>
              <Button asChild className="mt-6">
                <Link href="/dashboard/landlord/service-requests">Back to Service Requests</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/landlord/service-requests/${requestId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href={`/dashboard/landlord/service-requests/${requestId}`} className="text-sm text-muted-foreground hover:text-primary hover:underline">
                Back to SR-{requestId} Details
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Edit Service Request: {request.requestId}</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Modify Request Details</CardTitle>
            <CardDescription>
              Tenant: {request.tenantName} | Property: {request.apartment} - {request.unit} ({request.room})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              
              <div className="md:col-span-2">
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea 
                    id="fullDescription" 
                    name="fullDescription" 
                    value={formData.fullDescription} 
                    onChange={handleInputChange} 
                    placeholder="Detailed description of the service required" 
                    required 
                    rows={5}
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select name="category" onValueChange={(value) => handleSelectChange("category", value)} value={formData.category} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select name="priority" onValueChange={(value) => handleSelectChange("priority", value as RequestPriority)} value={formData.priority} required>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {requestPriorities.map(prio => <SelectItem key={prio} value={prio}>{prio}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select name="status" onValueChange={(value) => handleSelectChange("status", value as RequestStatus)} value={formData.status} required>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {requestStatuses.map(stat => <SelectItem key={stat} value={stat}>{stat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="workerAssigned">Assign/Reassign Worker</Label>
                 <Select name="workerAssigned" onValueChange={(value) => handleSelectChange("workerAssigned", value)} value={formData.workerAssigned || 'none'}>
                  <SelectTrigger id="workerAssigned">
                    <SelectValue placeholder="Select worker or Unassign" />
                  </SelectTrigger>
                  <SelectContent>
                     {dummyWorkers.map(worker => (
                        <SelectItem key={worker.id} value={worker.id === 'none' ? 'none' : worker.name}>
                            {worker.name}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="landlordComment">Landlord Comment (Optional)</Label>
                <Textarea 
                    id="landlordComment" 
                    name="landlordComment" 
                    value={formData.landlordComment} 
                    onChange={handleInputChange} 
                    placeholder="Add any internal notes about this update or edit" 
                />
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-3 pt-6 border-t mt-4">
                <Button variant="outline" type="button" onClick={() => router.push(`/dashboard/landlord/service-requests/${requestId}`)}>Cancel</Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

