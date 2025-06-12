
// src/app/dashboard/landlord/tenants/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, UserPlus, Search, ArrowLeft, Edit, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Dummy data for tenants - replace with actual data fetching
const tenants = [
  { id: "tenant001", name: "Alice Wonderland", nationalId: "12345678", apartment: "Greenwood Heights", unit: "A-101", room: "Master Bedroom", phone: "555-1234", email: "alice@example.com", paymentStatus: "Paid" },
  { id: "tenant002", name: "Bob The Builder", nationalId: "87654321", apartment: "Greenwood Heights", unit: "B-201", room: "Studio Main Room", phone: "555-5678", email: "bob@example.com", paymentStatus: "Unpaid" },
  { id: "tenant003", name: "Charlie Brown", nationalId: "11223344", apartment: "Oceanview Towers", unit: "C-505", room: "Penthouse Suite", phone: "555-0011", email: "charlie@example.com", paymentStatus: "Paid" },
  { id: "tenant004", name: "Diana Prince", nationalId: "55667788", apartment: "Mountain Ridge Villas", unit: "Villa A", room: "Main Villa Space", phone: "555-9900", email: "diana@example.com", paymentStatus: "Paid"},
];

export default function ManageTenantsPage() {

  const handleViewProfile = (tenantId: string, tenantName: string) => {
    alert(`View profile for: ${tenantName} (ID: ${tenantId}). Functionality to be implemented.`);
    // router.push(`/dashboard/landlord/tenants/${tenantId}`); // Future: navigate to tenant profile
  };

  const handleEditTenant = (tenantId: string, tenantName: string) => {
    alert(`Edit tenant: ${tenantName} (ID: ${tenantId}). Functionality to be implemented.`);
    // router.push(`/dashboard/landlord/tenants/${tenantId}/edit`); // Future: navigate to edit page
  };

  const handleRemoveTenant = (tenantId: string, tenantName: string) => {
    if (confirm(`Are you sure you want to remove tenant ${tenantName}? This will mark their room as vacant.`)) {
      alert(`Remove tenant: ${tenantName} (ID: ${tenantId}). Functionality to be implemented.`);
      // Here you would typically call an action to remove/archive the tenant
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
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Manage Tenants</h1>
          </div>
          <Button asChild>
            <Link href="/dashboard/landlord/tenants/new">
              <UserPlus className="mr-2 h-5 w-5" /> Register New Tenant
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tenant List</CardTitle>
            <CardDescription>View, manage, and search for tenants across your properties.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search by Tenant Name, ID, Phone, Email..." 
                  className="pl-10 w-full" 
                />
              </div>
              <div className="flex gap-2 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Filter by Apartment</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Apartments</DropdownMenuLabel>
                    <DropdownMenuItem>Greenwood Heights</DropdownMenuItem>
                    <DropdownMenuItem>Oceanview Towers</DropdownMenuItem>
                    <DropdownMenuItem>Mountain Ridge Villas</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All Apartments</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Filter by Payment Status</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
                    <DropdownMenuItem>Paid</DropdownMenuItem>
                    <DropdownMenuItem>Unpaid</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {tenants.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell className="font-medium">{tenant.name}</TableCell>
                        <TableCell>{tenant.nationalId}</TableCell>
                        <TableCell>
                          <div>{tenant.apartment}</div>
                          <div className="text-xs text-muted-foreground">{tenant.unit} / {tenant.room}</div>
                        </TableCell>
                        <TableCell>
                          <div>{tenant.email}</div>
                          <div className="text-xs text-muted-foreground">{tenant.phone}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={tenant.paymentStatus === 'Paid' ? 'default' : 'destructive'}>
                            {tenant.paymentStatus}
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
                              <DropdownMenuItem onClick={() => handleViewProfile(tenant.id, tenant.name)}>
                                <Eye className="mr-2 h-4 w-4" /> View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditTenant(tenant.id, tenant.name)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Tenant
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                onClick={() => handleRemoveTenant(tenant.id, tenant.name)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Remove Tenant
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
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No tenants found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get started by registering your first tenant.
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/dashboard/landlord/tenants/new">
                      <UserPlus className="mr-2 h-5 w-5" /> Register New Tenant
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

    
    