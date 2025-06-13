
// src/app/dashboard/admin/system-oversight/all-apartments/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building, Search, MoreHorizontal, Eye, FileSearch, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ApartmentOverview {
  id: string;
  name: string;
  location: string;
  landlordName: string;
  landlordId: string;
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  status: 'Active' | 'Under Review' | 'Suspended';
}

const dummyApartments: ApartmentOverview[] = [
  { id: "apt1", name: "Greenwood Heights", location: "123 Main St, Anytown", landlordName: "John Landlord", landlordId: "landlord1", totalUnits: 10, occupiedUnits: 8, vacantUnits: 2, status: "Active" },
  { id: "apt2", name: "Oceanview Towers", location: "456 Beach Rd, Coast City", landlordName: "Jane Proprietor", landlordId: "landlord2", totalUnits: 20, occupiedUnits: 15, vacantUnits: 5, status: "Active" },
  { id: "apt3", name: "Mountain Ridge Villas", location: "789 Hill Dr, Summitville", landlordName: "Peter Estates", landlordId: "landlord3", totalUnits: 5, occupiedUnits: 5, vacantUnits: 0, status: "Under Review" },
  { id: "apt4", name: "Downtown Lofts", location: "101 Center Ave, Metro City", landlordName: "Alice Realty", landlordId: "landlord4", totalUnits: 50, occupiedUnits: 25, vacantUnits: 25, status: "Suspended" },
];

export default function AllApartmentsOverviewPage() {
  const { toast } = useToast();

  const handleViewDetails = (apartmentName: string) => {
    toast({ title: "View Details", description: `Viewing details for ${apartmentName}. (Placeholder)` });
    // router.push(`/dashboard/landlord/apartments/${apartmentId}`); // Requires access to specific landlord context or a generic admin view
  };
  
  const handleAuditApartment = (apartmentName: string) => {
    toast({ title: "Audit Initiated", description: `Auditing data for ${apartmentName}. (Placeholder)` });
  };

  const getStatusVariant = (status: ApartmentOverview['status']) => {
    if (status === 'Active') return 'default';
    if (status === 'Under Review') return 'secondary';
    if (status === 'Suspended') return 'destructive';
    return 'outline';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/admin/system-oversight">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <Building className="mr-3 h-7 w-7" /> All Apartments Overview
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Platform-Wide Apartment List</CardTitle>
            <CardDescription>Monitor all registered apartments and their high-level statistics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
              <div className="relative lg:col-span-1">
                <Label htmlFor="searchApartments">Search Apartments</Label>
                <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="searchApartments"
                  type="search" 
                  placeholder="Search by Name, Location, Landlord..." 
                  className="pl-9 mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="filterLandlord">Filter by Landlord</Label>
                <Select>
                  <SelectTrigger id="filterLandlord" className="mt-1"><SelectValue placeholder="All Landlords" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Landlords</SelectItem>
                    {/* Populate with actual landlords dynamically */}
                    <SelectItem value="landlord1">John Landlord</SelectItem>
                    <SelectItem value="landlord2">Jane Proprietor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
            </div>

            {dummyApartments.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Apartment Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Landlord</TableHead>
                      <TableHead className="text-center">Total Units</TableHead>
                      <TableHead className="text-center">Occupied</TableHead>
                      <TableHead className="text-center">Vacant</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyApartments.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell className="font-medium">{apt.name}</TableCell>
                        <TableCell>{apt.location}</TableCell>
                        <TableCell>{apt.landlordName}</TableCell>
                        <TableCell className="text-center">{apt.totalUnits}</TableCell>
                        <TableCell className="text-center">{apt.occupiedUnits}</TableCell>
                        <TableCell className="text-center">{apt.vacantUnits}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(apt.status)}>{apt.status}</Badge>
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
                              <DropdownMenuItem onClick={() => handleViewDetails(apt.name)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAuditApartment(apt.name)}>
                                <FileSearch className="mr-2 h-4 w-4" /> Audit Apartment Data
                              </DropdownMenuItem>
                              {/* More actions like "Suspend Apartment Listing" if needed */}
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
                    <p>No apartments found or matching your filters.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

    
