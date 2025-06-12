
// src/app/dashboard/admin/user-management/workers/page.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, MoreHorizontal, Eye, Edit, UserX, UserCheck, KeyRound, Trash2, BriefcaseBusiness, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';


interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  assignedLandlords: string[]; // Names or IDs
  status: 'Active' | 'Inactive' | 'PendingApproval';
}

const dummyWorkers: Worker[] = [
  { id: "worker001", name: "Mike Ross", email: "mike.ross@example.com", phone: "0712345030", role: "Plumber", assignedLandlords: ["John Landlord"], status: "Active" },
  { id: "worker002", name: "Sarah Connor", email: "sarah.connor@example.com", phone: "0712345031", role: "Electrician", assignedLandlords: ["Jane Proprietor", "John Landlord"], status: "Active" },
  { id: "worker003", name: "John Cleese", email: "john.cleese@example.com", phone: "0712345032", role: "Cleaner", assignedLandlords: ["Peter Estates"], status: "Inactive" },
  { id: "worker004", name: "Pending Worker D", email: "worker.d@example.com", phone: "0712345033", role: "Handyman", assignedLandlords: [], status: "PendingApproval" },
];

export default function ManageWorkersPage() {
  const { toast } = useToast();

  const handleAction = (action: string, workerName: string) => {
    toast({ title: `${action} Initiated`, description: `Action "${action}" for ${workerName} has been initiated. (Placeholder)` });
  };

  const getStatusVariant = (status: Worker['status']) => {
    if (status === 'Active') return 'default';
    if (status === 'Inactive') return 'destructive';
    if (status === 'PendingApproval') return 'secondary';
    return 'outline';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/admin/user-management">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <BriefcaseBusiness className="mr-3 h-7 w-7" /> Manage Workers
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Workers</CardTitle>
            <CardDescription>Oversee and manage all worker accounts across the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="relative lg:col-span-2">
                 <Label htmlFor="searchWorkers">Search Workers</Label>
                <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="searchWorkers"
                  type="search" 
                  placeholder="Search by Name, Email, Role..." 
                  className="pl-9 mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="filterRole">Filter by Role</Label>
                <Select>
                  <SelectTrigger id="filterRole" className="mt-1"><SelectValue placeholder="All Roles" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="plumber">Plumber</SelectItem>
                    <SelectItem value="electrician">Electrician</SelectItem>
                    <SelectItem value="cleaner">Cleaner</SelectItem>
                     <SelectItem value="handyman">Handyman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
            </div>

            {dummyWorkers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Assigned Landlord(s)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyWorkers.map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell className="font-medium">{worker.name}</TableCell>
                        <TableCell>
                          <div>{worker.email}</div>
                          <div className="text-xs text-muted-foreground">{worker.phone}</div>
                        </TableCell>
                        <TableCell>{worker.role}</TableCell>
                        <TableCell className="text-xs max-w-xs truncate" title={worker.assignedLandlords.join(', ')}>
                          {worker.assignedLandlords.join(', ') || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(worker.status)}>{worker.status}</Badge>
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
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/admin/user-management/workers/${worker.id}`}>
                                  <Eye className="mr-2 h-4 w-4" /> View Profile
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("Edit Details", worker.name)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Details
                              </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleAction(worker.status === 'Active' ? "Deactivate Account" : (worker.status === 'PendingApproval' ? "Approve Account" : "Activate Account"), worker.name)}>
                                {worker.status === 'Active' ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                                {worker.status === 'Active' ? "Deactivate" : (worker.status === 'PendingApproval' ? "Approve" : "Activate")}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("Reset Password", worker.name)}>
                                <KeyRound className="mr-2 h-4 w-4" /> Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("Force Unassign", worker.name)}>
                                 Unassign Worker
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAction("Delete Account", worker.name)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Account
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
                <div className="text-center py-10 text-muted-foreground">
                    <BriefcaseBusiness className="mx-auto h-12 w-12 mb-3" />
                    <p>No workers found or matching your filters.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

