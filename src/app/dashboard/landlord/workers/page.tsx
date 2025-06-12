
// src/app/dashboard/landlord/workers/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Briefcase, Search, ArrowLeft, Edit, Trash2, Eye, UserCheck, UserX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Dummy data for workers - replace with actual data fetching
const workers = [
  { id: "worker001", name: "Mike Ross", nationalId: "30123456", role: "Plumber", phone: "555-7890", email: "mike@example.com", assignedApartments: ["Greenwood Heights", "Oceanview Towers"], workingHours: "Mon-Fri, 9am-5pm", status: "Active" },
  { id: "worker002", name: "Sarah Connor", nationalId: "30654321", role: "Electrician", phone: "555-1122", email: "sarah@example.com", assignedApartments: ["Oceanview Towers"], workingHours: "Tue-Sat, 8am-4pm", status: "Active" },
  { id: "worker003", name: "John Doe", nationalId: "30987654", role: "Cleaner", phone: "555-3344", email: "john.c@example.com", assignedApartments: ["Greenwood Heights"], workingHours: "Mon, Wed, Fri, 10am-2pm", status: "Inactive" },
];

export default function ManageWorkersPage() {
  const router = useRouter();

  const handleViewProfile = (workerId: string) => {
    // router.push(`/dashboard/landlord/workers/${workerId}`);
    alert(`View profile for worker ID: ${workerId}. To be implemented.`);
  };

  const handleEditWorker = (workerId: string, workerName: string) => {
    alert(`Edit worker: ${workerName} (ID: ${workerId}). Functionality to be implemented.`);
    // router.push(`/dashboard/landlord/workers/${workerId}/edit`); 
  };

  const handleDeleteWorker = (workerId: string, workerName: string) => {
    if (confirm(`Are you sure you want to delete worker ${workerName}? This action cannot be undone.`)) {
      alert(`Delete worker: ${workerName} (ID: ${workerId}). Functionality to be implemented.`);
      // Call an action to delete the worker
    }
  };

  const handleToggleWorkerStatus = (workerId: string, workerName: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    if (confirm(`Are you sure you want to mark worker ${workerName} as ${newStatus}?`)) {
      alert(`Mark worker ${workerName} (ID: ${workerId}) as ${newStatus}. Functionality to be implemented.`);
      // Call an action to update worker status
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
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Manage Workers</h1>
          </div>
          <Button asChild>
            <Link href="/dashboard/landlord/workers/new">
              <Briefcase className="mr-2 h-5 w-5" /> Register New Worker
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Worker List</CardTitle>
            <CardDescription>View, manage, and search for workers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search by Worker Name, ID, Role..." 
                  className="pl-10 w-full" 
                />
              </div>
              <div className="flex gap-2 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Filter by Role</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Roles</DropdownMenuLabel>
                    <DropdownMenuItem>Plumber</DropdownMenuItem>
                    <DropdownMenuItem>Electrician</DropdownMenuItem>
                    <DropdownMenuItem>Cleaner</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All Roles</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Filter by Status</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Inactive</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {workers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workers.map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell className="font-medium">{worker.name}</TableCell>
                        <TableCell>{worker.nationalId}</TableCell>
                        <TableCell>{worker.role}</TableCell>
                        <TableCell>
                          <div>{worker.email}</div>
                          <div className="text-xs text-muted-foreground">{worker.phone}</div>
                        </TableCell>
                        <TableCell>
                            <div className="text-xs text-muted-foreground truncate max-w-xs" title={worker.assignedApartments.join(', ')}>
                                {worker.assignedApartments.join(', ') || 'N/A'}
                            </div>
                             <div className="text-xs text-muted-foreground">{worker.workingHours}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={worker.status === 'Active' ? 'default' : 'secondary'}>
                            {worker.status}
                          </Badge>
                        </TableCell>
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
                              <DropdownMenuItem onClick={() => handleViewProfile(worker.id)}>
                                <Eye className="mr-2 h-4 w-4" /> View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditWorker(worker.id, worker.name)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Worker
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleWorkerStatus(worker.id, worker.name, worker.status)}>
                                {worker.status === "Active" ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                                {worker.status === "Active" ? "Deactivate" : "Activate"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                onClick={() => handleDeleteWorker(worker.id, worker.name)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Worker
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
              <div className="text-center py-10">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No workers found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get started by registering your first worker.
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/dashboard/landlord/workers/new">
                      <Briefcase className="mr-2 h-5 w-5" /> Register New Worker
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
