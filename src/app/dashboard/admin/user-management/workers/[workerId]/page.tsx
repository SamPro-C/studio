
// src/app/dashboard/admin/user-management/workers/[workerId]/page.tsx
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    Briefcase, 
    UserCircle, 
    Mail, 
    Phone, 
    CalendarCheck, 
    ListChecks,
    Edit, 
    UserX, 
    UserCheck, 
    KeyRound, 
    ShieldAlert,
    Building,
    AlertTriangle,
    IdCard,
    Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssignedTask {
  id: string;
  taskId: string; // Could be ServiceRequest ID
  description: string;
  dateAssigned: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  propertyUnit: string;
}

interface WorkerProfileData {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  role: string;
  status: 'Active' | 'Inactive' | 'PendingApproval';
  assignedApartments: string[]; // Names of apartments
  workingHours: string; // e.g., "Mon-Fri, 9 AM - 5 PM"
  assignedTasks: AssignedTask[];
}

const dummyWorkerProfiles: { [key: string]: WorkerProfileData } = {
  "worker001": {
    id: "worker001",
    fullName: "Mike Ross",
    email: "mike.ross@example.com",
    phoneNumber: "0712345030",
    nationalId: "30000001",
    role: "Plumber",
    status: "Active",
    assignedApartments: ["Greenwood Heights", "Oceanview Towers"],
    workingHours: "Mon-Fri, 9 AM - 5 PM",
    assignedTasks: [
      { id: "task1", taskId: "SR20240724-003", description: "Unclog shower drain", dateAssigned: "2024-07-24", status: "In Progress", propertyUnit: "Greenwood Heights / B-201" },
      { id: "task2", taskId: "SR20240725-001", description: "Leaky faucet under sink", dateAssigned: "2024-07-25", status: "Completed", propertyUnit: "Greenwood Heights / A-101" },
    ],
  },
  "worker002": {
    id: "worker002",
    fullName: "Sarah Connor",
    email: "sarah.connor@example.com",
    phoneNumber: "0712345031",
    nationalId: "30000002",
    role: "Electrician",
    status: "Active",
    assignedApartments: ["Oceanview Towers"],
    workingHours: "Tue-Sat, 10 AM - 6 PM",
    assignedTasks: [
      { id: "task3", taskId: "SR20240723-001", description: "AC not cooling", dateAssigned: "2024-07-23", status: "Completed", propertyUnit: "Oceanview Towers / C-505" },
    ],
  },
};

export default function AdminWorkerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const workerId = params.workerId as string;

  const worker = dummyWorkerProfiles[workerId];

  const handleAction = (action: string, workerName: string) => {
    toast({ title: `${action} Initiated`, description: `Action "${action}" for ${workerName} has been initiated. (Placeholder)` });
  };

  if (!worker) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Worker Not Found</h1>
        <p className="text-muted-foreground mb-4">The worker with ID <span className="font-mono bg-muted px-1">{workerId}</span> could not be found.</p>
        <Button asChild><Link href="/dashboard/admin/user-management/workers">Back to Manage Workers</Link></Button>
      </div>
    );
  }

  const getStatusVariant = (status: WorkerProfileData['status']) => {
    if (status === 'Active') return 'default';
    if (status === 'Inactive') return 'destructive';
    if (status === 'PendingApproval') return 'secondary';
    return 'outline';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/admin/user-management/workers">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                </Button>
                <div>
                    <Link href="/dashboard/admin/user-management/workers" className="text-sm text-muted-foreground hover:text-primary hover:underline">Manage Workers</Link>
                    <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                        <UserCircle className="mr-3 h-8 w-8" /> {worker.fullName}
                    </h1>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => handleAction("Edit Profile", worker.fullName)}><Edit className="mr-2 h-4 w-4"/>Edit Profile</Button>
                <Button variant={worker.status === 'Active' ? 'destructive' : 'default'} size="sm" onClick={() => handleAction(worker.status === 'Active' ? "Deactivate Account" : "Activate Account", worker.fullName)}>
                    {worker.status === 'Active' ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                    {worker.status === 'Active' ? "Deactivate" : "Activate"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAction("Reset Password", worker.fullName)}><KeyRound className="mr-2 h-4 w-4"/>Reset Password</Button>
            </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Contact &amp; Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground"/> {worker.email}</p>
                    <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground"/> {worker.phoneNumber}</p>
                    <p className="flex items-center"><IdCard className="mr-2 h-4 w-4 text-muted-foreground"/> National ID: {worker.nationalId}</p>
                    <p className="flex items-center"><Briefcase className="mr-2 h-4 w-4 text-muted-foreground"/> Role: {worker.role}</p>
                    <p className="flex items-center">Status: <Badge variant={getStatusVariant(worker.status)} className="ml-2">{worker.status}</Badge></p>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Assignment &amp; Schedule Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div>
                        <p className="font-medium flex items-center"><Building className="mr-2 h-4 w-4 text-muted-foreground"/> Assigned Apartments:</p>
                        {worker.assignedApartments.length > 0 ? (
                             <ul className="list-disc pl-5 text-muted-foreground">
                                {worker.assignedApartments.map(apt => <li key={apt}>{apt}</li>)}
                            </ul>
                        ) : <p className="text-muted-foreground">Not assigned to any apartments.</p>}
                    </div>
                    <div className="flex items-center"><Clock className="mr-2 h-4 w-4 text-muted-foreground"/> <strong>Working Hours:</strong> <span className="ml-1">{worker.workingHours}</span></div>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5"/> Assigned Tasks</CardTitle>
                <CardDescription>Recent tasks assigned to this worker.</CardDescription>
            </CardHeader>
            <CardContent>
                {worker.assignedTasks.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Task ID</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Property/Unit</TableHead>
                                    <TableHead>Date Assigned</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {worker.assignedTasks.map(task => (
                                    <TableRow key={task.id}>
                                        <TableCell className="font-medium">{task.taskId}</TableCell>
                                        <TableCell className="max-w-xs truncate" title={task.description}>{task.description}</TableCell>
                                        <TableCell>{task.propertyUnit}</TableCell>
                                        <TableCell>{new Date(task.dateAssigned).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={task.status === 'Completed' ? 'default' : task.status === 'Pending' ? 'secondary' : 'outline'}>
                                                {task.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-4">No tasks currently assigned or history available.</p>
                )}
            </CardContent>
             <CardFooter>
                 <Button variant="outline" size="sm" onClick={() => handleAction("View Full Task History", worker.fullName)}>
                    <ListChecks className="mr-2 h-4 w-4" /> View Full Task History
                </Button>
            </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-5 w-5"/> Admin Actions Log</CardTitle>
                 <CardDescription>History of administrative actions related to this worker.</CardDescription>
            </CardHeader>
            <CardContent className="h-40 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Admin actions log for {worker.fullName} will appear here.</p>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}

