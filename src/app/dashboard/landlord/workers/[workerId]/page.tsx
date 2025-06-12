
// src/app/dashboard/landlord/workers/[workerId]/page.tsx
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
    Edit, 
    Trash2, 
    MessageSquare, 
    AlertCircle, 
    Mail,
    Phone,
    UserCircle,
    CalendarDays,
    Clock,
    ListChecks,
    UserCheck,
    UserX,
    IdCard
} from 'lucide-react';

interface AssignedTask {
  id: string;
  taskId: string;
  dateAssigned: string;
  description: string;
  apartmentUnit: string; // e.g. "Greenwood Heights / A-101"
  tenantName: string | null;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Canceled';
  dateCompleted: string | null;
}

interface AttendanceRecord {
  id: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  hoursWorked: number | null;
  location: string | null; // e.g. "Greenwood Heights" or "GPS Coordinates"
}

interface WorkerProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  role: string;
  assignedApartments: string[];
  workingHours: string; // e.g., "Mon-Fri, 9am-5pm"
  workingDays: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  status: 'Active' | 'Inactive';
  assignedTasksHistory: AssignedTask[];
  attendanceHistory: AttendanceRecord[];
}

// Dummy data for worker profiles
const dummyWorkerProfiles: { [key: string]: WorkerProfile } = {
  "worker001": {
    id: "worker001",
    fullName: "Mike Ross",
    email: "mike@example.com",
    phoneNumber: "555-7890",
    nationalId: "30123456",
    role: "Plumber",
    assignedApartments: ["Greenwood Heights", "Oceanview Towers"],
    workingHours: "9:00 AM - 5:00 PM",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    emergencyContactName: "Rachel Zane",
    emergencyContactPhone: "555-0001",
    status: "Active",
    assignedTasksHistory: [
      { id: "task1", taskId: "SR001", dateAssigned: "2024-07-15", description: "Fix leaky faucet in kitchen", apartmentUnit: "Greenwood Heights / A-101", tenantName: "Alice W.", status: "Completed", dateCompleted: "2024-07-16" },
      { id: "task2", taskId: "SR003", dateAssigned: "2024-07-20", description: "Unclog shower drain", apartmentUnit: "Oceanview Towers / C-505", tenantName: "Charlie B.", status: "In Progress", dateCompleted: null },
    ],
    attendanceHistory: [
      { id: "att1", date: "2024-07-15", checkInTime: "09:00", checkOutTime: "17:05", hoursWorked: 8, location: "Greenwood Heights" },
      { id: "att2", date: "2024-07-16", checkInTime: "08:55", checkOutTime: "17:00", hoursWorked: 8, location: "Greenwood Heights" },
    ]
  },
  "worker002": {
    id: "worker002",
    fullName: "Sarah Connor",
    email: "sarah@example.com",
    phoneNumber: "555-1122",
    nationalId: "30654321",
    role: "Electrician",
    assignedApartments: ["Oceanview Towers"],
    workingHours: "8:00 AM - 4:00 PM",
    workingDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    emergencyContactName: "Kyle Reese",
    emergencyContactPhone: "555-0002",
    status: "Active",
    assignedTasksHistory: [
      { id: "taskS1", taskId: "MAINT005", dateAssigned: "2024-07-18", description: "Replace faulty light fixture", apartmentUnit: "Oceanview Towers / D-610", tenantName: null, status: "Pending", dateCompleted: null },
    ],
    attendanceHistory: [
      { id: "attS1", date: "2024-07-18", checkInTime: "08:00", checkOutTime: "16:00", hoursWorked: 8, location: "Oceanview Towers" },
    ]
  },
   "worker003": {
    id: "worker003",
    fullName: "John Cleese",
    email: "john.c@example.com",
    phoneNumber: "555-3344",
    nationalId: "30987654",
    role: "Cleaner",
    assignedApartments: ["Greenwood Heights"],
    workingHours: "10:00 AM - 2:00 PM",
    workingDays: ["Monday", "Wednesday", "Friday"],
    emergencyContactName: "Polly Sherman",
    emergencyContactPhone: "555-0003",
    status: "Inactive",
    assignedTasksHistory: [],
    attendanceHistory: []
  },
};

export default function WorkerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const workerId = params.workerId as string;

  const worker = dummyWorkerProfiles[workerId];

  const handleEditInfo = () => alert(`Edit info for ${worker?.fullName}. To be implemented.`);
  const handleToggleStatus = () => {
    const newStatus = worker?.status === "Active" ? "Inactive" : "Active";
    if (confirm(`Are you sure you want to mark ${worker?.fullName} as ${newStatus}?`)) {
      alert(`Mark ${worker?.fullName} as ${newStatus}. To be implemented.`);
      // Update worker status in dummy data or via API call
    }
  };
  const handleSendNotification = () => alert(`Send notification to ${worker?.fullName}. To be implemented.`);
  const handleAssignTask = () => alert(`Assign new task to ${worker?.fullName}. To be implemented.`);
  const handleViewTaskDetails = (taskId: string) => {
    alert(`View details for task ID: ${taskId}. To be implemented.`);
    // router.push(`/dashboard/landlord/service-requests/${taskId}`); // Or a dedicated task page
  };

  if (!worker) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/landlord/workers">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Worker Not Found</h1>
          </div>
          <Card>
            <CardContent className="pt-6 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <p>The worker profile could not be loaded. The worker ID might be incorrect or the worker does not exist.</p>
              <Button asChild className="mt-6">
                <Link href="/dashboard/landlord/workers">Back to Workers List</Link>
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
        {/* Header and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/landlord/workers">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
                <Link href="/dashboard/landlord/workers" className="text-sm text-muted-foreground hover:text-primary hover:underline">All Workers</Link>
                <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                    <Briefcase className="mr-3 h-8 w-8" /> {worker.fullName}
                </h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleEditInfo}><Edit className="mr-2 h-4 w-4" /> Edit Info</Button>
            <Button 
              variant={worker.status === 'Active' ? "destructive" : "default"} 
              size="sm" 
              onClick={handleToggleStatus}
            >
              {worker.status === 'Active' ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
              {worker.status === 'Active' ? 'Deactivate' : 'Activate'} Worker
            </Button>
            <Button variant="outline" size="sm" onClick={handleSendNotification}><MessageSquare className="mr-2 h-4 w-4" /> Send Notification</Button>
            <Button size="sm" onClick={handleAssignTask}><ListChecks className="mr-2 h-4 w-4" /> Assign Task</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Personal & Contact Info Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Worker Details</CardTitle>
              <CardDescription>Status: <Badge variant={worker.status === 'Active' ? 'default' : 'secondary'}>{worker.status}</Badge></CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div className="flex items-center"><UserCircle className="mr-2 h-4 w-4 text-primary/70" /><strong>Role:</strong><span className="ml-1">{worker.role}</span></div>
              <div className="flex items-center"><Mail className="mr-2 h-4 w-4 text-primary/70" /><strong>Email:</strong><span className="ml-1">{worker.email}</span></div>
              <div className="flex items-center"><Phone className="mr-2 h-4 w-4 text-primary/70" /><strong>Phone:</strong><span className="ml-1">{worker.phoneNumber}</span></div>
              <div className="flex items-center"><IdCard className="mr-2 h-4 w-4 text-primary/70" /><strong>National ID:</strong><span className="ml-1">{worker.nationalId}</span></div>
              
              <div className="sm:col-span-2 border-t pt-4 mt-2">
                <p className="font-medium">Emergency Contact:</p>
                <div className="flex items-center mt-1"><UserCircle className="mr-2 h-4 w-4 text-primary/70" /><strong>Name:</strong><span className="ml-1">{worker.emergencyContactName}</span></div>
                <div className="flex items-center mt-1"><Phone className="mr-2 h-4 w-4 text-primary/70" /><strong>Phone:</strong><span className="ml-1">{worker.emergencyContactPhone}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Assignment & Schedule Card */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment & Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium flex items-center mb-1"><Briefcase className="mr-2 h-4 w-4 text-primary/70" />Assigned Apartments:</p>
                {worker.assignedApartments.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {worker.assignedApartments.map(apt => <li key={apt}>{apt}</li>)}
                    </ul>
                ) : <p className="text-muted-foreground">Not assigned to any apartments.</p>}
              </div>
              <div className="border-t pt-3 mt-3">
                <p className="font-medium flex items-center mb-1"><Clock className="mr-2 h-4 w-4 text-primary/70" />Working Hours:</p>
                <p>{worker.workingHours}</p>
              </div>
              <div className="border-t pt-3 mt-3">
                <p className="font-medium flex items-center mb-1"><CalendarDays className="mr-2 h-4 w-4 text-primary/70" />Working Days:</p>
                <p>{worker.workingDays.join(', ')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Tasks History */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Tasks History</CardTitle>
            <CardDescription>Record of tasks assigned to this worker.</CardDescription>
          </CardHeader>
          <CardContent>
            {worker.assignedTasksHistory.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task ID</TableHead>
                    <TableHead>Date Assigned</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Property/Unit</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Completed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {worker.assignedTasksHistory.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.taskId}</TableCell>
                      <TableCell>{new Date(task.dateAssigned).toLocaleDateString()}</TableCell>
                      <TableCell className="max-w-xs truncate">{task.description}</TableCell>
                      <TableCell>{task.apartmentUnit}</TableCell>
                      <TableCell>{task.tenantName || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge 
                            variant={
                                task.status === 'Completed' ? 'default'
                                : task.status === 'Pending' ? 'secondary'
                                : task.status === 'Canceled' ? 'destructive'
                                : 'outline' // For In Progress
                            }
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.dateCompleted ? new Date(task.dateCompleted).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewTaskDetails(task.taskId)}>
                            View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-4">No tasks assigned to this worker yet.</p>
            )}
          </CardContent>
          <CardFooter>
             <Button onClick={handleAssignTask}><ListChecks className="mr-2 h-4 w-4" /> Assign New Task</Button>
          </CardFooter>
        </Card>

        {/* Attendance History */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>Worker check-in and check-out records (if enabled).</CardDescription>
          </CardHeader>
          <CardContent>
            {worker.attendanceHistory.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Check-in Time</TableHead>
                    <TableHead>Check-out Time</TableHead>
                    <TableHead>Hours Worked</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {worker.attendanceHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{record.checkInTime || 'N/A'}</TableCell>
                      <TableCell>{record.checkOutTime || 'N/A'}</TableCell>
                      <TableCell>{record.hoursWorked !== null ? record.hoursWorked.toFixed(2) : 'N/A'}</TableCell>
                      <TableCell>{record.location || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-4">No attendance records found for this worker.</p>
            )}
          </CardContent>
           <CardFooter>
                <p className="text-xs text-muted-foreground">Attendance tracking features might require worker app usage.</p>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}
