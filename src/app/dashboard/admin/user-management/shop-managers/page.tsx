
// src/app/dashboard/admin/user-management/shop-managers/page.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, MoreHorizontal, Eye, Edit, UserX, UserCheck, KeyRound, Trash2, ShoppingBag, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ShopManager {
  id: string;
  name: string;
  email: string;
  phone: string;
  shopName?: string; // Optional
  status: 'Active' | 'Inactive' | 'PendingApproval';
}

const dummyShopManagers: ShopManager[] = [
  { id: "shopmgr1", name: "Manager Alpha", email: "alpha.mgr@shop.com", phone: "0712345040", shopName: "Alpha Goods & Services", status: "Active" },
  { id: "shopmgr2", name: "Manager Beta", email: "beta.mgr@shop.com", phone: "0712345041", shopName: "Beta Fresh Produce", status: "PendingApproval" },
  { id: "shopmgr3", name: "Manager Gamma", email: "gamma.mgr@shop.com", phone: "0712345042", status: "Inactive" },
];

export default function ManageShopManagersPage() {
  const { toast } = useToast();

  const handleAction = (action: string, managerName: string) => {
    toast({ title: `${action} Initiated`, description: `Action "${action}" for ${managerName} has been initiated. (Placeholder)` });
  };

  const getStatusVariant = (status: ShopManager['status']) => {
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
            <ShoppingBag className="mr-3 h-7 w-7" /> Manage Shop Managers
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Shop Managers</CardTitle>
            <CardDescription>Oversee and manage all shop manager accounts on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
              <div className="relative lg:col-span-1">
                 <Label htmlFor="searchManagers">Search Managers</Label>
                <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="searchManagers"
                  type="search" 
                  placeholder="Search by Name, Email, Shop..." 
                  className="pl-9 mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="filterStatus">Filter by Status</Label>
                <Select>
                  <SelectTrigger id="filterStatus" className="mt-1"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending Approval</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
            </div>

            {dummyShopManagers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Shop Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyShopManagers.map((manager) => (
                      <TableRow key={manager.id}>
                        <TableCell className="font-medium">{manager.name}</TableCell>
                        <TableCell>
                          <div>{manager.email}</div>
                          <div className="text-xs text-muted-foreground">{manager.phone}</div>
                        </TableCell>
                        <TableCell>{manager.shopName || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(manager.status)}>{manager.status}</Badge>
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
                                <Link href={`/dashboard/admin/user-management/shop-managers/${manager.id}`}>
                                    <Eye className="mr-2 h-4 w-4" /> View Profile
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("Edit Details", manager.name)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Details
                              </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleAction(manager.status === 'Active' ? "Deactivate Account" : (manager.status === 'PendingApproval' ? "Approve Registration" : "Activate Account"), manager.name)}>
                                {manager.status === 'Active' ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                                {manager.status === 'Active' ? "Deactivate" : (manager.status === 'PendingApproval' ? "Approve" : "Activate")}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("Reset Password", manager.name)}>
                                <KeyRound className="mr-2 h-4 w-4" /> Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAction("Delete Account", manager.name)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
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
                    <ShoppingBag className="mx-auto h-12 w-12 mb-3" />
                    <p>No shop managers found or matching your filters.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

