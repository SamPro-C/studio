
// src/app/dashboard/admin/user-management/approvals/page.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft, MoreHorizontal, CheckCircle, XCircle, UserCheck, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserType = 'Landlord' | 'Tenant' | 'Worker' | 'ShopManager';

interface PendingUser {
  id: string;
  userType: UserType;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
}

const dummyPendingUsers: PendingUser[] = [
  { id: "user1", userType: "Landlord", name: "Pending Landlord One", email: "landlord1@pending.com", phone: "0712345001", registrationDate: "2024-08-01" },
  { id: "user2", userType: "Tenant", name: "Pending Tenant Alpha", email: "tenantA@pending.com", phone: "0712345002", registrationDate: "2024-08-02" },
  { id: "user3", userType: "Worker", name: "Pending Worker Beta", email: "workerB@pending.com", phone: "0712345003", registrationDate: "2024-08-02" },
  { id: "user4", userType: "ShopManager", name: "Pending Shop Gamma", email: "shopG@pending.com", phone: "0712345004", registrationDate: "2024-08-03" },
  { id: "user5", userType: "Landlord", name: "Another Landlord Req", email: "landlord2@req.com", phone: "0712345005", registrationDate: "2024-08-04" },
];

export default function UserApprovalQueuePage() {
  const { toast } = useToast();
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const handleSelectUser = (userId: string, checked: boolean) => {
    setSelectedUserIds(prev => 
      checked ? [...prev, userId] : prev.filter(id => id !== userId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedUserIds(checked ? dummyPendingUsers.map(u => u.id) : []);
  };

  const handleApprove = (userId: string, userName: string) => {
    toast({ title: "User Approved", description: `${userName} (ID: ${userId}) has been approved.` });
    // In a real app, filter out the user from dummyPendingUsers or refetch
  };

  const handleReject = (userId: string, userName: string) => {
    toast({ title: "User Rejected", description: `${userName} (ID: ${userId}) has been rejected.`, variant: "destructive" });
    // In a real app, filter out the user
  };

  const handleReviewDetails = (userId: string) => {
    alert(`Reviewing details for User ID: ${userId}. This would open a modal or a detailed view.`);
  };
  
  const handleBatchApprove = () => {
    if (selectedUserIds.length === 0) {
        toast({ title: "No Users Selected", description: "Please select users to approve.", variant: "destructive"});
        return;
    }
    toast({ title: "Batch Approve", description: `Approving ${selectedUserIds.length} selected users.`});
    setSelectedUserIds([]); // Clear selection
    // Implement actual approval logic
  };

  const handleBatchReject = () => {
     if (selectedUserIds.length === 0) {
        toast({ title: "No Users Selected", description: "Please select users to reject.", variant: "destructive"});
        return;
    }
    toast({ title: "Batch Reject", description: `Rejecting ${selectedUserIds.length} selected users.`, variant: "destructive"});
    setSelectedUserIds([]); // Clear selection
    // Implement actual rejection logic
  };
  
  const isAllSelected = selectedUserIds.length > 0 && selectedUserIds.length === dummyPendingUsers.length;
  const isSomeSelected = selectedUserIds.length > 0 && selectedUserIds.length < dummyPendingUsers.length;


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
            <UserCheck className="mr-3 h-7 w-7" /> User Approval Queue
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Registrations</CardTitle>
            <CardDescription>Review and approve or reject new user registrations.</CardDescription>
          </CardHeader>
          <CardContent>
            {dummyPendingUsers.length > 0 ? (
            <>
              <div className="mb-4 flex flex-col sm:flex-row gap-2">
                <Button onClick={handleBatchApprove} disabled={selectedUserIds.length === 0}>
                    <CheckCircle className="mr-2 h-4 w-4"/> Approve Selected ({selectedUserIds.length})
                </Button>
                <Button variant="destructive" onClick={handleBatchReject} disabled={selectedUserIds.length === 0}>
                    <XCircle className="mr-2 h-4 w-4"/> Reject Selected ({selectedUserIds.length})
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                            checked={isAllSelected || (isSomeSelected && "indeterminate")}
                            onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                            aria-label="Select all rows"
                        />
                      </TableHead>
                      <TableHead>User Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyPendingUsers.map((user) => (
                      <TableRow key={user.id} data-state={selectedUserIds.includes(user.id) ? "selected" : ""}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedUserIds.includes(user.id)}
                            onCheckedChange={(checked) => handleSelectUser(user.id, Boolean(checked))}
                            aria-label={`Select row ${user.id}`}
                          />
                        </TableCell>
                        <TableCell>{user.userType}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{new Date(user.registrationDate).toLocaleDateString()}</TableCell>
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
                              <DropdownMenuItem onClick={() => handleApprove(user.id, user.name)}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReject(user.id, user.name)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                <XCircle className="mr-2 h-4 w-4" /> Reject
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleReviewDetails(user.id)}>
                                View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <Users className="mx-auto h-12 w-12 mb-3" />
                    <p>No users currently pending approval.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

