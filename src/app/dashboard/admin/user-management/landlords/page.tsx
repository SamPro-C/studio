
// src/app/dashboard/admin/user-management/landlords/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, MoreHorizontal, Eye, Edit, UserX, UserCheck, KeyRound, Trash2, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Landlord {
  id: string;
  name: string;
  email: string;
  phone: string;
  apartmentsCount: number;
  status: 'Active' | 'Inactive' | 'PendingApproval';
}

const dummyLandlords: Landlord[] = [
  { id: "landlord1", name: "John Landlord", email: "john.landlord@example.com", phone: "0712345010", apartmentsCount: 3, status: "Active" },
  { id: "landlord2", name: "Jane Proprietor", email: "jane.prop@example.com", phone: "0712345011", apartmentsCount: 1, status: "Active" },
  { id: "landlord3", name: "Peter Estates", email: "peter.estates@example.com", phone: "0712345012", apartmentsCount: 5, status: "Inactive" },
  { id: "landlord4", name: "Alice Realty", email: "alice.realty@example.com", phone: "0712345013", apartmentsCount: 0, status: "PendingApproval" },
];

export default function ManageLandlordsPage() {
  const { toast } = useToast();

  const handleAction = (action: string, landlordName: string) => {
    toast({ title: `${action} Initiated`, description: `Action "${action}" for ${landlordName} has been initiated. (Placeholder)` });
  };

  const getStatusVariant = (status: Landlord['status']) => {
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
            <Building className="mr-3 h-7 w-7" /> Manage Landlords
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Landlords</CardTitle>
            <CardDescription>Oversee and manage all landlord accounts on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search by Name, Email, Phone..." 
                  className="pl-10 w-full sm:w-2/3 lg:w-1/2" 
                />
              </div>
              {/* Add more filters (e.g., by Status) if needed */}
            </div>

            {dummyLandlords.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="text-center">Properties</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyLandlords.map((landlord) => (
                      <TableRow key={landlord.id}>
                        <TableCell className="font-medium">{landlord.name}</TableCell>
                        <TableCell>{landlord.email}</TableCell>
                        <TableCell>{landlord.phone}</TableCell>
                        <TableCell className="text-center">{landlord.apartmentsCount}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(landlord.status)}>{landlord.status}</Badge>
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
                                <Link href={`/dashboard/admin/user-management/landlords/${landlord.id}`}>
                                  <Eye className="mr-2 h-4 w-4" /> View Profile
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("Edit Details", landlord.name)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction(landlord.status === 'Active' ? "Deactivate Account" : "Activate Account", landlord.name)}>
                                {landlord.status === 'Active' ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                                {landlord.status === 'Active' ? "Deactivate" : "Activate"}
                              </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleAction("Reset Password", landlord.name)}>
                                <KeyRound className="mr-2 h-4 w-4" /> Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAction("Delete Account", landlord.name)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
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
                    <Building className="mx-auto h-12 w-12 mb-3" />
                    <p>No landlords found or matching your filters.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
