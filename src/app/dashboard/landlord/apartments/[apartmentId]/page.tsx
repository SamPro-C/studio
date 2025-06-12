
// src/app/dashboard/landlord/apartments/[apartmentId]/page.tsx
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Home, Edit, PlusCircle, Building2, Users, MapPin, CheckCircle } from 'lucide-react';
import Image from 'next/image';

// Expanded dummy data for apartments
const dummyApartmentsData = [
  {
    id: "apt1",
    name: "Greenwood Heights",
    location: "123 Main St, Anytown, USA",
    description: "A lovely apartment complex with great views, modern amenities, and a vibrant community. Perfect for families and professionals.",
    totalUnits: 10,
    occupiedUnits: 8,
    vacantUnits: 2,
    amenities: ["Secure Parking", "Fitness Center", "Swimming Pool", "Playground"],
    imageUrl: "https://placehold.co/800x400.png",
    aiHint: "modern apartment exterior",
    units: [
      { id: "unit101", name: "A-101", rooms: 3, tenant: "Alice Wonderland", status: "Occupied", rent: 1200 },
      { id: "unit102", name: "A-102", rooms: 2, tenant: null, status: "Vacant", rent: 950 },
      { id: "unit201", name: "B-201", rooms: 4, tenant: "Bob The Builder", status: "Occupied", rent: 1500 },
    ]
  },
  {
    id: "apt2",
    name: "Oceanview Towers",
    location: "456 Beach Rd, Coast City, USA",
    description: "Luxurious apartments with breathtaking ocean views. Features high-end finishes and resort-style living.",
    totalUnits: 20,
    occupiedUnits: 15,
    vacantUnits: 5,
    amenities: ["Underground Parking", "Rooftop Pool", "Private Beach Access", "Concierge Service"],
    imageUrl: "https://placehold.co/800x400.png",
    aiHint: "luxury condos beach",
    units: [
      { id: "unit505", name: "C-505", rooms: 2, tenant: "Charlie Brown", status: "Occupied", rent: 2500 },
      { id: "unit610", name: "D-610", rooms: 3, tenant: null, status: "Vacant", rent: 2800 },
    ]
  },
   {
    id: "apt3",
    name: "Mountain Ridge Villas",
    location: "789 Hill Dr, Summitville, USA",
    description: "Peaceful villas nestled in the mountains, offering tranquility and scenic beauty. Ideal for nature lovers.",
    totalUnits: 5,
    occupiedUnits: 5,
    vacantUnits: 0,
    amenities: ["Garage Parking", "Hiking Trails Access", "Community Garden", "Pet Friendly"],
    imageUrl: "https://placehold.co/800x400.png",
    aiHint: "mountain villas scenic",
    units: [
      { id: "villaA", name: "Villa A", rooms: 5, tenant: "Diana Prince", status: "Occupied", rent: 3200 },
      { id: "villaB", name: "Villa B", rooms: 4, tenant: "Edward Nygma", status: "Occupied", rent: 2900 },
    ]
  }
];


export default function ApartmentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const apartmentId = params.apartmentId as string;

  const apartment = dummyApartmentsData.find(apt => apt.id === apartmentId);

  const handleEditApartment = () => {
    alert(`Edit apartment: ${apartment?.name}. Functionality to be implemented.`);
    console.log(`Attempting to edit apartment with ID: ${apartmentId}`);
    // router.push(`/dashboard/landlord/apartments/${apartmentId}/edit`); // Future: navigate to edit page
  };

  const handleAddUnit = () => {
     router.push(`/dashboard/landlord/apartments/${apartmentId}/units/new`);
  };

  if (!apartment) {
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
                         <Button asChild className="mt-4">
                            <Link href="/dashboard/landlord/apartments">Back to Apartments List</Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/landlord/apartments">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                </Button>
                <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                    <Building2 className="mr-3 h-8 w-8" /> {apartment.name}
                </h1>
            </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEditApartment}>
              <Edit className="mr-2 h-4 w-4" /> Edit Apartment
            </Button>
            <Button onClick={handleAddUnit}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Unit
            </Button>
          </div>
        </div>
        
        <Card className="overflow-hidden">
            <div className="relative h-48 md:h-64 w-full">
                 <Image 
                    src={apartment.imageUrl} 
                    alt={`Image of ${apartment.name}`} 
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint={apartment.aiHint}
                 />
            </div>
            <CardHeader className="border-t">
                <CardTitle className="text-2xl">{apartment.name}</CardTitle>
                <CardDescription className="flex items-center text-md">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    {apartment.location}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">{apartment.description || "No description provided."}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm pt-2">
                    <div className="flex items-center"><Building2 className="h-4 w-4 mr-2 text-primary/70" /><strong>Total Units:</strong><span className="ml-1">{apartment.totalUnits}</span></div>
                    <div className="flex items-center"><Users className="h-4 w-4 mr-2 text-primary/70" /><strong>Occupied Units:</strong><span className="ml-1">{apartment.occupiedUnits}</span></div>
                    <div className="flex items-center"><Home className="h-4 w-4 mr-2 text-primary/70" /><strong>Vacant Units:</strong><span className="ml-1">{apartment.vacantUnits}</span></div>
                </div>
                {apartment.amenities.length > 0 && (
                    <div className="pt-2">
                        <h4 className="font-semibold mb-2 text-md">Amenities:</h4>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                            {apartment.amenities.map(amenity => (
                                <li key={amenity} className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                    {amenity}
                                </li>
                            ))}
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
                  <Card key={unit.id} className="shadow-sm hover:shadow-md transition-shadow bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg font-medium flex items-center"><Home className="mr-2 h-5 w-5 text-primary/80"/>Unit {unit.name}</CardTitle>
                            <CardDescription>Rooms: {unit.rooms}, Rent: ${unit.rent}/month</CardDescription>
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
                         {!unit.tenant && unit.status === 'Vacant' && 
                            <p className="text-sm text-green-600">This unit is available for rent.</p>
                         }
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center py-6 text-muted-foreground">No units have been added to this apartment yet.</p>
            )}
             <div className="mt-6 border-t pt-6">
                <Button onClick={handleAddUnit}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Unit to {apartment.name}
                </Button>
             </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Visual Layout (Placeholder)</CardTitle>
                <CardDescription>Interactive floor plan or layout view will be displayed here.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-64 bg-muted rounded-md flex items-center justify-center border border-dashed">
                    <p className="text-muted-foreground text-center p-4">A visual representation of the apartment's units, showing occupied/vacant status, will appear here. This could be an interactive map or a simple grid.</p>
                </div>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
