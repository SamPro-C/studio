
// src/app/dashboard/landlord/apartments/[apartmentId]/units/[unitId]/page.tsx
"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Home, UserCircle, Edit, PlusCircle, Trash2, DollarSign, UserPlus } from 'lucide-react';

// Dummy data - replace with actual data fetching based on apartmentId and unitId
const dummyUnit = {
  id: "unit101",
  name: "A-101",
  apartmentName: "Greenwood Heights", 
  apartmentId: "apt1",
  tenant: { name: "Alice Wonderland", contact: "alice@example.com / 555-1234", id: "tenant001" },
  paymentStatus: "Paid", // Paid, Unpaid
  rooms: [
    { id: "roomA", name: "Master Bedroom", status: "Occupied" },
    { id: "roomB", name: "Living Room", status: "Occupied" },
    { id: "roomC", name: "Kitchen", status: "Occupied" },
  ]
};

const dummyVacantUnit = {
  id: "unit102",
  name: "A-102",
  apartmentName: "Greenwood Heights",
  apartmentId: "apt1",
  tenant: null,
  paymentStatus: "N/A",
  rooms: [
    { id: "roomD", name: "Bedroom 1", status: "Vacant" },
    { id: "roomE", name: "Bedroom 2", status: "Vacant" },
  ]
};


export default function UnitDetailsPage() {
  const params = useParams();
  const apartmentId = params.apartmentId as string;
  const unitId = params.unitId as string;

  // In a real app, fetch unit data based on apartmentId and unitId
  // For this example, we'll pick one based on a simple condition
  const unit = unitId === "unit101" ? dummyUnit : (unitId === "unit102" ? dummyVacantUnit : null);


  if (!unit || unit.apartmentId !== apartmentId) {
     return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
                 <div className="flex items-center gap-2 mb-6">
                    <Button variant="outline" size="icon" asChild>
                    <Link href={`/dashboard/landlord/apartments/${apartmentId}`}>
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    </Button>
                    <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Unit Not Found</h1>
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <p>The unit details could not be loaded. It might not exist or there was an error.</p>
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
              <Link href={`/dashboard/landlord/apartments/${apartmentId}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
                <Link href={`/dashboard/landlord/apartments/${apartmentId}`} className="text-sm text-muted-foreground hover:underline">{unit.apartmentName}</Link>
                <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                    <Home className="mr-3 h-8 w-8" /> Unit {unit.name}
                </h1>
            </div>
          </div>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Edit Unit
          </Button>
        </div>

        {/* Tenant Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><UserCircle className="mr-2 h-6 w-6 text-primary/80" /> Tenant Information</CardTitle>
          </CardHeader>
          <CardContent>
            {unit.tenant ? (
              <div className="space-y-2">
                <p><strong>Name:</strong> {unit.tenant.name}</p>
                <p><strong>Contact:</strong> {unit.tenant.contact}</p>
                <p><strong>National ID:</strong> {unit.tenant.id}</p>
                <p><strong>Payment Status (Current Month):</strong> 
                  <span className={`font-semibold ml-1 ${unit.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                    {unit.paymentStatus}
                  </span>
                </p>
                <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">View Tenant Profile</Button>
                    <Button variant="destructive" size="sm" >Remove Tenant</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">This unit is currently vacant.</p>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4"/> Assign Tenant
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rooms List Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Rooms in Unit {unit.name}</CardTitle>
            <Button variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Room
            </Button>
          </CardHeader>
          <CardContent>
            {unit.rooms.length > 0 ? (
              <div className="space-y-3">
                {unit.rooms.map(room => (
                  <Card key={room.id} className="p-4 flex justify-between items-center shadow-sm">
                    <div>
                        <p className="font-medium">{room.name}</p>
                        <p className={`text-xs ${room.status === 'Occupied' ? 'text-orange-500' : 'text-green-500'}`}>
                            Status: {room.status}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No rooms have been added to this unit yet.</p>
            )}
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
