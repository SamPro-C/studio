
// src/app/dashboard/admin/user-management/tenants/page.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Search, MoreHorizontal, Eye, Edit, UserX, UserCheck, KeyRound, Trash2, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Tenant {
  id: string;
  name: string;
  nationalId: string;
  email: string;
  phone: string;
  apartment: string;
  unit: string;
  room: string;
  landlordName: string;
  status: 'Active' | 'Inactive' | 'Evicted';
}

const dummyTenants: Tenant[] = [
  { id: "tenantA", name: "Tenant Alpha", nationalId: "12345670", email: "alpha@tenant.com", phone: "0712345020", apartment: "Greenwood Heights", unit: "A-101", room: "Main", landlordName: "John Landlord", status: "Active" },
  { id: "tenantB", name: "Tenant Beta", nationalId: "12345671", email: "beta@tenant.com", phone: "0712345021", apartment: "Oceanview Towers", unit: "C-505", room: "Penthouse", landlordName: "Jane Proprietor", status: "Active" },
  { id: "tenantC", name: "Tenant Gamma", nationalId: "12345672", email: "gamma@tenant.com", phone: "0712345022", apartment: "Greenwood Heights", unit: "B-201", room: "Studio", landlordName: "John Landlord", status: "Inactive" },
];

export default function ManageTenantsPage() {
  const { toast } = useToast();

  const handleAction = (action: string, tenantName: string) => {
    toast({ title: `${action} Initiated`, description: `Action "${action}" for ${tenantName} has been initiated. (Placeholder)` });
  };

  const getStatusVariant = (status: Tenant['status']) => {
    if (status === 'Active') return 'default';
    if (status === 'Inactive') return 'secondary';
    if (status === 'Evicted') return 'destructive';
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
            <Users className="mr-3 h-7 w-7" /> Manage Tenants
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Tenants</CardTitle>
            <CardDescription>Oversee and manage all tenant accounts across the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="relative lg:col-span-2">
                 <Label htmlFor="searchTenants">Search Tenants</Label>
                <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="searchTenants"
                  type="search" 
                  placeholder="Search by Name, ID, Email, Phone..." 
                  className="pl-9 mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="filterLandlord">Filter by Landlord</Label>
                <Select>
                  <SelectTrigger id="filterLandlord" className="mt-1"><SelectValue placeholder="All Landlords" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Landlords</SelectItem>
                    <SelectItem value="john">John Landlord</SelectItem>
                    <SelectItem value="jane">Jane Proprietor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
            </div>

            {dummyTenants.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>National ID</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Landlord</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyTenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell className="font-medium">{tenant.name}</TableCell>
                        <TableCell>{tenant.nationalId}</TableCell>
                        <TableCell>
                          <div>{tenant.email}</div>
                          <div className="text-xs text-muted-foreground">{tenant.phone}</div>
                        </TableCell>
                        <TableCell>
                          {tenant.apartment} / {tenant.unit} / {tenant.room}
                        </TableCell>
                        <TableCell>{tenant.landlordName}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(tenant.status)}>{tenant.status}</Badge>
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
                              <DropdownMenuItem onClick={() => handleAction("View Profile", tenant.name)}>
                                <Eye className="mr-2 h-4 w-4" /> View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("Edit Details", tenant.name)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Details
                              </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleAction(tenant.status === 'Active' ? "Deactivate Account" : "Activate Account", tenant.name)}>
                                {tenant.status === 'Active' ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                                {tenant.status === 'Active' ? "Deactivate" : "Activate"}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("Reset Password", tenant.name)}>
                                <KeyRound className="mr-2 h-4 w-4" /> Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAction("Force Remove Tenant", tenant.name)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                <Trash2 className="mr-2 h-4 w-4" /> Force Remove
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
                    <Users className="mx-auto h-12 w-12 mb-3" />
                    <p>No tenants found or matching your filters.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
