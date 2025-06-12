
// src/app/dashboard/landlord/apartments/[apartmentId]/page.tsx
"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Home, Edit, PlusCircle, ListChecks, Building2 } from 'lucide-react';

// Dummy data - replace with actual data fetching based on apartmentId
const dummyApartment = {
  id: "apt1",
  name: "Greenwood Heights",
  location: "123 Main St, Anytown",
  description: "A lovely apartment complex with great views and community.",
  totalUnits: 10,
  occupiedUnits: 8,
  vacantUnits: 2,
  amenities: ["parking", "gym"],
  units: [
    { id: "unit101", name: "A-101", rooms: 3, tenant: "Alice Wonderland", status: "Occupied" },
    { id: "unit102", name: "A-102", rooms: 2, tenant: null, status: "Vacant" },
    { id: "unit201", name: "B-201", rooms: 4, tenant: "Bob The Builder", status: "Occupied" },
  ]
};


export default function ApartmentDetailsPage() {
  const params = useParams();
  const apartmentId = params.apartmentId as string;

  // In a real app, fetch apartment data based on apartmentId
  const apartment = dummyApartment; // Using dummy data for now

  if (!apartment || apartment.id !== apartmentId) {
    // Basic check if dummy data matches, replace with proper loading/error state
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
                 <div className="flex items-center gap-2 mb-6">
                    <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/landlord/apartments">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    </Button>
                    <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Apartment Not Found</h1>
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <p>The apartment details could not be loaded. It might not exist or there was an error.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/landlord/apartments">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
                </Button>
                <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                    <Building2 className="mr-3 h-8 w-8" /> {apartment.name}
                </h1>
            </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit Apartment
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Unit
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Apartment Overview</CardTitle>
            <CardDescription>{apartment.location}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{apartment.description || "No description provided."}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div><strong>Total Units:</strong> {apartment.totalUnits}</div>
              <div><strong>Occupied Units:</strong> {apartment.occupiedUnits}</div>
              <div><strong>Vacant Units:</strong> {apartment.vacantUnits}</div>
            </div>
            {apartment.amenities.length > 0 && (
                <div>
                    <h4 className="font-semibold mb-1">Amenities:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {apartment.amenities.map(amenity => <li key={amenity} className="capitalize">{amenity}</li>)}
                    </ul>
                </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Units in {apartment.name}</CardTitle>
            <CardDescription>Manage individual units within this apartment.</CardDescription>
          </CardHeader>
          <CardContent>
            {apartment.units.length > 0 ? (
              <div className="space-y-4">
                {apartment.units.map(unit => (
                  <Card key={unit.id} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg font-medium flex items-center"><Home className="mr-2 h-5 w-5 text-primary/80"/>Unit {unit.name}</CardTitle>
                            <CardDescription>Rooms: {unit.rooms}</CardDescription>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                            <Link href={`/dashboard/landlord/apartments/${apartmentId}/units/${unit.id}`}>View Unit</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-sm font-semibold ${unit.status === 'Occupied' ? 'text-orange-600' : 'text-green-600'}`}>
                            Status: {unit.status}
                        </p>
                        {unit.tenant && <p className="text-sm text-muted-foreground">Tenant: {unit.tenant}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No units have been added to this apartment yet.</p>
            )}
             <div className="mt-6 border-t pt-6">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Unit to {apartment.name}
                </Button>
             </div>
          </CardContent>
        </Card>
        
        {/* Placeholder for Visual Representation */}
        <Card>
            <CardHeader>
                <CardTitle>Visual Layout (Placeholder)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Floor plan / layout view showing occupied/vacant rooms will appear here.</p>
                </div>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
