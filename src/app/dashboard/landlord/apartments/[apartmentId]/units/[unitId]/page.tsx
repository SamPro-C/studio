
// src/app/dashboard/landlord/apartments/[apartmentId]/units/[unitId]/page.tsx
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Home, UserCircle, Edit, PlusCircle, Trash2, DollarSign, UserPlus, BedDouble, Tv, Utensils, DoorOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';


// Enhanced dummy data for units, now nested under apartments for context
const dummyApartmentsUnitsData = {
  "apt1": { // Greenwood Heights
    name: "Greenwood Heights",
    units: [
      {
        id: "unit101",
        name: "A-101",
        apartmentId: "apt1",
        tenant: { name: "Alice Wonderland", contact: "alice@example.com / 555-1234", id: "tenant001", leaseEnds: "2024-12-31" },
        paymentStatus: "Paid",
        rentAmount: 1200,
        lastPaymentDate: "2024-07-01",
        rooms: [
          { id: "roomA", name: "Master Bedroom", status: "Occupied", type: "Bedroom" },
          { id: "roomB", name: "Living Room", status: "Occupied", type: "Living" },
          { id: "roomC", name: "Kitchen", status: "Occupied", type: "Kitchen" },
          { id: "roomD", name: "Bathroom", status: "Occupied", type: "Bathroom" },
        ]
      },
      {
        id: "unit102",
        name: "A-102",
        apartmentId: "apt1",
        tenant: null,
        paymentStatus: "N/A",
        rentAmount: 950,
        lastPaymentDate: null,
        rooms: [
          { id: "roomE", name: "Bedroom 1", status: "Vacant", type: "Bedroom" },
          { id: "roomF", name: "Living/Kitchenette", status: "Vacant", type: "Living" },
          { id: "roomG", name: "Bathroom", status: "Vacant", type: "Bathroom" },
        ]
      },
       { 
        id: "unit201", 
        name: "B-201", 
        apartmentId: "apt1",
        tenant: { name: "Bob The Builder", contact: "bob@example.com / 555-5678", id: "tenant002", leaseEnds: "2025-06-30" },
        paymentStatus: "Unpaid",
        rentAmount: 1500,
        lastPaymentDate: "2024-05-30",
        rooms: [ { id: "roomH", name: "Studio Main Room", status: "Occupied", type: "Studio" } ]
      },
    ]
  },
  "apt2": { // Oceanview Towers
    name: "Oceanview Towers",
    units: [
      {
        id: "unit505",
        name: "C-505",
        apartmentId: "apt2",
        tenant: { name: "Charlie Brown", contact: "charlie@example.com / 555-0011", id: "tenant003", leaseEnds: "2025-02-28" },
        paymentStatus: "Paid",
        rentAmount: 2500,
        lastPaymentDate: "2024-07-03",
        rooms: [ { id: "roomI", name: "Penthouse Suite", status: "Occupied", type: "Penthouse" } ]
      },
      {
        id: "unit610",
        name: "D-610",
        apartmentId: "apt2",
        tenant: null,
        paymentStatus: "N/A",
        rentAmount: 2800,
        lastPaymentDate: null,
        rooms: [ { id: "roomJ", name: "Luxury Studio", status: "Vacant", type: "Studio" } ]
      },
    ]
  },
   "apt3": { // Mountain Ridge Villas
    name: "Mountain Ridge Villas",
    units: [
        { id: "villaA", name: "Villa A", apartmentId: "apt3", tenant: {name: "Diana Prince", contact: "diana@example.com", id: "tenant004", leaseEnds: "2026-01-31"}, paymentStatus: "Paid", rentAmount: 3200, rooms: [{id: "villaAroom1", name: "Main Villa Space", status: "Occupied", type: "Villa"}] },
        { id: "villaB", name: "Villa B", apartmentId: "apt3", tenant: {name: "Edward Nygma", contact: "edward@example.com", id: "tenant005", leaseEnds: "2024-11-30"}, paymentStatus: "Paid", rentAmount: 2900, rooms: [{id: "villaBroom1", name: "Cozy Villa Retreat", status: "Occupied", type: "Villa"}] },
    ]
  }
};

const getRoomIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'bedroom': return <BedDouble className="mr-2 h-4 w-4 text-primary/70" />;
        case 'living': return <Tv className="mr-2 h-4 w-4 text-primary/70" />;
        case 'kitchen': return <Utensils className="mr-2 h-4 w-4 text-primary/70" />;
        case 'studio': return <Home className="mr-2 h-4 w-4 text-primary/70" />;
        case 'penthouse': return <Home className="mr-2 h-4 w-4 text-primary/70" />; 
        case 'villa': return <Home className="mr-2 h-4 w-4 text-primary/70" />;
        default: return <DoorOpen className="mr-2 h-4 w-4 text-primary/70" />;
    }
}

export default function UnitDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const apartmentId = params.apartmentId as string;
  const unitId = params.unitId as string;

  const apartmentUnits = dummyApartmentsUnitsData[apartmentId as keyof typeof dummyApartmentsUnitsData];
  const unit = apartmentUnits?.units.find(u => u.id === unitId);
  const apartmentName = apartmentUnits?.name || "Apartment";

  const handleEditUnit = () => {
    alert(`Edit unit: Unit ${unit?.name} in ${apartmentName}. Functionality to be implemented.`);
    console.log(`Attempting to edit unit: ${unitId} in apartment: ${apartmentId}`);
  };

  const handleAssignTenant = () => {
    alert(`Assign tenant to Unit ${unit?.name}. Functionality to be implemented.`);
    console.log(`Attempting to assign tenant to unit: ${unitId}`);
    // router.push(`/dashboard/landlord/tenants/new?unitId=${unitId}&apartmentId=${apartmentId}`); // Future: Navigate to tenant registration/assignment page
  };
  
  const handleRemoveTenant = () => {
    if (confirm(`Are you sure you want to remove tenant ${unit?.tenant?.name} from Unit ${unit?.name}? This will mark the unit as vacant.`)) {
      alert(`Remove tenant ${unit?.tenant?.name} from Unit ${unit?.name}. Functionality to be implemented.`);
      console.log(`Attempting to remove tenant from unit: ${unitId}`);
      // Here, you would call an action to update the tenant and unit status
    }
  };

  const handleViewTenantProfile = () => {
    alert(`View profile for tenant: ${unit?.tenant?.name}. Functionality to be implemented.`);
    console.log(`Attempting to view tenant profile for: ${unit?.tenant?.id}`);
    // router.push(`/dashboard/landlord/tenants/${unit?.tenant?.id}`); // Future: Navigate to tenant profile page
  };

  const handleRecordPayment = () => {
    alert(`Record payment for Unit ${unit?.name}. Functionality to be implemented.`);
    console.log(`Attempting to record payment for unit: ${unitId}`);
     // router.push(`/dashboard/landlord/payments/new?unitId=${unitId}`); // Future: Navigate to manual payment page
  };
  
  const handleAddRoom = () => {
    alert(`Add room to Unit ${unit?.name}. Functionality to be implemented.`);
    console.log(`Attempting to add room to unit: ${unitId}`);
    // router.push(`/dashboard/landlord/apartments/${apartmentId}/units/${unitId}/rooms/new`); // Future: Navigate to add room page
  };

  const handleEditRoom = (roomId: string, roomName: string) => {
    alert(`Edit room: ${roomName} (ID: ${roomId}) in Unit ${unit?.name}. Functionality to be implemented.`);
    console.log(`Attempting to edit room: ${roomId} in unit: ${unitId}`);
  };

  const handleDeleteRoom = (roomId: string, roomName: string) => {
    if (confirm(`Are you sure you want to delete room ${roomName} from Unit ${unit?.name}?`)) {
      alert(`Delete room: ${roomName} (ID: ${roomId}) in Unit ${unit?.name}. Functionality to be implemented.`);
      console.log(`Attempting to delete room: ${roomId} from unit: ${unitId}`);
      // Here, you would call an action to delete the room
    }
  };


  if (!unit) {
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
                        <p>The unit details could not be loaded. It might not exist in {apartmentName} or there was an error.</p>
                        <Button asChild className="mt-4">
                            <Link href={`/dashboard/landlord/apartments/${apartmentId}`}>Back to {apartmentName} Units</Link>
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
              <Link href={`/dashboard/landlord/apartments/${apartmentId}`}>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
                <Link href={`/dashboard/landlord/apartments/${apartmentId}`} className="text-sm text-muted-foreground hover:text-primary hover:underline">{apartmentName}</Link>
                <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                    <Home className="mr-3 h-8 w-8" /> Unit {unit.name}
                </h1>
            </div>
          </div>
          <Button variant="outline" onClick={handleEditUnit}>
            <Edit className="mr-2 h-4 w-4" /> Edit Unit Details
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Tenant Information Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center"><UserCircle className="mr-3 h-6 w-6 text-primary/80" /> Tenant Information</CardTitle>
              <CardDescription>Details of the current occupant, if any.</CardDescription>
            </CardHeader>
            <CardContent>
              {unit.tenant ? (
                <div className="space-y-3">
                  <p><strong>Name:</strong> {unit.tenant.name}</p>
                  <p><strong>Contact:</strong> {unit.tenant.contact}</p>
                  <p><strong>National ID:</strong> {unit.tenant.id}</p>
                  <p><strong>Lease Ends:</strong> {unit.tenant.leaseEnds ? new Date(unit.tenant.leaseEnds).toLocaleDateString() : 'N/A'}</p>
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm" onClick={handleViewTenantProfile}>View Tenant Profile</Button>
                      <Button variant="destructive" size="sm" onClick={handleRemoveTenant}>Remove Tenant</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <UserPlus className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground mb-4">This unit is currently vacant.</p>
                  <Button onClick={handleAssignTenant}>
                      <UserPlus className="mr-2 h-4 w-4"/> Assign Tenant
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Status Card */}
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><DollarSign className="mr-3 h-6 w-6 text-primary/80" />Financials</CardTitle>
                <CardDescription>Rent and payment status for this unit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <p><strong>Monthly Rent:</strong> ${unit.rentAmount.toLocaleString()}</p>
                <p><strong>Payment Status:</strong> 
                    <Badge variant={unit.paymentStatus === 'Paid' ? 'default' : (unit.paymentStatus === 'Unpaid' ? 'destructive' : 'secondary')} className="ml-2">
                        {unit.paymentStatus}
                    </Badge>
                </p>
                {unit.tenant && unit.lastPaymentDate && <p><strong>Last Payment:</strong> {new Date(unit.lastPaymentDate).toLocaleDateString()}</p>}
                 {unit.tenant && (
                    <div className="pt-4 border-t mt-4">
                        <Button size="sm" className="w-full" onClick={handleRecordPayment}>Record Payment</Button>
                    </div>
                 )}
            </CardContent>
          </Card>
        </div>


        {/* Rooms List Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
                <CardTitle>Rooms in Unit {unit.name}</CardTitle>
                <CardDescription>Manage individual rooms within this unit.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleAddRoom}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Room
            </Button>
          </CardHeader>
          <CardContent>
            {unit.rooms.length > 0 ? (
              <div className="space-y-3">
                {unit.rooms.map(room => (
                  <Card key={room.id} className="p-4 flex justify-between items-center shadow-sm bg-muted/30 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        {getRoomIcon(room.type)}
                        <div>
                            <p className="font-medium">{room.name} <span className="text-xs text-muted-foreground">({room.type})</span></p>
                            <p className={`text-xs font-semibold ${room.status === 'Occupied' ? 'text-orange-500' : 'text-green-500'}`}>
                                Status: {room.status}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-1 sm:gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Edit ${room.name}`} onClick={() => handleEditRoom(room.id, room.name)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" aria-label={`Delete ${room.name}`} onClick={() => handleDeleteRoom(room.id, room.name)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No rooms have been added to this unit yet.</p>
            )}
          </CardContent>
           {unit.rooms.length > 0 && (
            <CardFooter className="border-t pt-4">
                <p className="text-xs text-muted-foreground">Total Rooms: {unit.rooms.length}</p>
            </CardFooter>
           )}
        </Card>

      </main>
    </div>
  );
}
