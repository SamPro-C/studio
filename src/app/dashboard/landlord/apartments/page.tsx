
// src/app/dashboard/landlord/apartments/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, Home, ArrowLeft } from 'lucide-react';

// Dummy data for apartments - replace with actual data fetching
const apartments = [
  { id: "apt1", name: "Greenwood Heights", location: "123 Main St, Anytown", totalUnits: 10, occupiedUnits: 8, vacantUnits: 2 },
  { id: "apt2", name: "Oceanview Towers", location: "456 Beach Rd, Coast City", totalUnits: 20, occupiedUnits: 15, vacantUnits: 5 },
  { id: "apt3", name: "Mountain Ridge", location: "789 Hill Dr, Summitville", totalUnits: 5, occupiedUnits: 5, vacantUnits: 0 },
];

export default function ManageApartmentsPage() {
  const handleEditApartment = (id: string, name: string) => {
    alert(`Edit apartment: ${name} (ID: ${id}). Functionality to be implemented.`);
    console.log(`Attempting to edit apartment with ID: ${id}`);
  };

  const handleDeleteApartment = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}? This action cannot be undone and may affect associated units and tenants.`)) {
      alert(`Delete apartment: ${name} (ID: ${id}). Functionality to be implemented.`);
      console.log(`Attempting to delete apartment with ID: ${id}`);
      // Here you would typically call an action to delete the apartment
      // and then refresh the list or remove it from the client-side state.
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/landlord">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Manage Your Apartments</h1>
          </div>
          <Button asChild>
            <Link href="/dashboard/landlord/apartments/new">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Apartment
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Apartment Listings</CardTitle>
            <CardDescription>View, edit, or delete your registered apartments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search by Apartment Name or Location..." 
                  className="pl-10 w-full sm:w-1/2 lg:w-1/3" 
                />
              </div>
            </div>

            {apartments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apartments.map((apt) => (
                  <Card key={apt.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Home className="h-6 w-6 text-primary" />
                        <CardTitle className="font-headline text-xl">{apt.name}</CardTitle>
                      </div>
                      <CardDescription>{apt.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-2 text-sm">
                        <p><strong>Total Units:</strong> {apt.totalUnits}</p>
                        <p><strong>Occupied Units:</strong> {apt.occupiedUnits}</p>
                        <p><strong>Vacant Units:</strong> {apt.vacantUnits}</p>
                      </div>
                    </CardContent>
                    <div className="p-4 border-t flex flex-col sm:flex-row gap-2">
                       <Button variant="outline" className="w-full sm:w-auto" asChild>
                         <Link href={`/dashboard/landlord/apartments/${apt.id}`}>View Details</Link>
                       </Button>
                       <Button 
                          variant="secondary" 
                          className="w-full sm:w-auto"
                          onClick={() => handleEditApartment(apt.id, apt.name)}
                        >
                          Edit
                        </Button>
                       <Button 
                          variant="destructive" 
                          className="w-full sm:w-auto"
                          onClick={() => handleDeleteApartment(apt.id, apt.name)}
                        >
                          Delete
                        </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Home className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No apartments found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get started by adding your first apartment.
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/dashboard/landlord/apartments/new">
                      <PlusCircle className="mr-2 h-5 w-5" /> Add New Apartment
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
