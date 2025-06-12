
// src/app/dashboard/landlord/apartments/new/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Trash2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Room {
  id: string;
  roomNumber: string;
}

interface Unit {
  id: string;
  unitName: string;
  rooms: Room[];
}

export default function AddNewApartmentPage() {
  const router = useRouter(); // Initialize useRouter
  const [apartmentName, setApartmentName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [units, setUnits] = useState<Unit[]>([]);
  const [amenities, setAmenities] = useState<{ [key: string]: boolean }>({
    parking: false,
    gym: false,
    pool: false,
    laundry: false,
  });

  const handleAddUnit = () => {
    setUnits([...units, { id: `unit-${Date.now()}`, unitName: '', rooms: [{ id: `room-${Date.now()}`, roomNumber: '' }] }]);
  };

  const handleRemoveUnit = (unitId: string) => {
    setUnits(units.filter(unit => unit.id !== unitId));
  };

  const handleUnitChange = (unitId: string, field: string, value: string) => {
    setUnits(units.map(unit => unit.id === unitId ? { ...unit, [field]: value } : unit));
  };

  const handleAddRoom = (unitId: string) => {
    setUnits(units.map(unit => 
      unit.id === unitId 
        ? { ...unit, rooms: [...unit.rooms, { id: `room-${Date.now()}`, roomNumber: '' }] }
        : unit
    ));
  };

  const handleRemoveRoom = (unitId: string, roomId: string) => {
    setUnits(units.map(unit =>
      unit.id === unitId
        ? { ...unit, rooms: unit.rooms.filter(room => room.id !== roomId) }
        : unit
    ));
  };

  const handleRoomChange = (unitId: string, roomId: string, value: string) => {
    setUnits(units.map(unit =>
      unit.id === unitId
        ? { ...unit, rooms: unit.rooms.map(room => room.id === roomId ? { ...room, roomNumber: value } : room) }
        : unit
    ));
  };
  
  const handleAmenityChange = (amenity: string) => {
    setAmenities(prev => ({ ...prev, [amenity]: !prev[amenity] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apartmentName || !location || units.length === 0) {
      alert("Please fill in apartment name, location, and add at least one unit.");
      return;
    }
    const selectedAmenities = Object.entries(amenities)
      .filter(([, checked]) => checked)
      .map(([key]) => key);

    console.log({ apartmentName, location, description, units, amenities: selectedAmenities });
    alert("Apartment data submitted (see console). Redirecting to apartments list...");
    router.push('/dashboard/landlord/apartments'); // Redirect after submission
  };


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
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Add New Apartment</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Apartment Details</CardTitle>
            <CardDescription>Fill in the information for the new apartment property.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="apartmentName">Apartment Name</Label>
                <Input id="apartmentName" value={apartmentName} onChange={(e) => setApartmentName(e.target.value)} placeholder="e.g., Greenwood Apartments" required />
              </div>
              <div>
                <Label htmlFor="location">Location/Address</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., 123 Main St, Anytown" required />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the property" />
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Units</Label>
                {units.length === 0 && <p className="text-sm text-muted-foreground">No units added yet. Click "Add Unit" to start.</p>}
                {units.map((unit, unitIndex) => (
                  <Card key={unit.id} className="p-4 space-y-3 bg-muted/50">
                    <div className="flex items-center justify-between">
                       <Label htmlFor={`unitName-${unit.id}`} className="font-medium text-base">Unit {unitIndex + 1}</Label>
                       <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveUnit(unit.id)} aria-label="Remove Unit">
                         <Trash2 className="h-4 w-4 text-destructive" />
                       </Button>
                    </div>
                    <Input 
                      id={`unitName-${unit.id}`} 
                      value={unit.unitName} 
                      onChange={(e) => handleUnitChange(unit.id, 'unitName', e.target.value)} 
                      placeholder="Unit Name/Number (e.g., A-101)" 
                      required 
                    />
                    
                    <div className="ml-4 space-y-2 border-l-2 border-primary/20 pl-4">
                      <Label className="text-sm font-semibold">Rooms in Unit {unit.unitName || unitIndex + 1}</Label>
                      {unit.rooms.length === 0 && <p className="text-xs text-muted-foreground">No rooms added to this unit yet.</p>}
                      {unit.rooms.map((room, roomIndex) => (
                        <div key={room.id} className="flex items-center gap-2">
                           <Input 
                            id={`roomNumber-${room.id}`} 
                            value={room.roomNumber} 
                            onChange={(e) => handleRoomChange(unit.id, room.id, e.target.value)} 
                            placeholder={`Room ${roomIndex + 1} Name/Number`} 
                            required
                            className="flex-grow h-9"
                          />
                          <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveRoom(unit.id, room.id)} aria-label="Remove Room" className="h-9 w-9">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                       <Button type="button" variant="outline" size="sm" onClick={() => handleAddRoom(unit.id)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Room to Unit {unit.unitName || unitIndex + 1}
                      </Button>
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" onClick={handleAddUnit}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Unit
                </Button>
              </div>

              <div>
                <Label className="text-lg font-semibold">Amenities</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {Object.keys(amenities).map(key => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`amenity-${key}`} 
                        checked={amenities[key]} 
                        onCheckedChange={() => handleAmenityChange(key)}
                      />
                      <Label htmlFor={`amenity-${key}`} className="capitalize font-normal">{key}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" asChild type="button">
                  <Link href="/dashboard/landlord/apartments">Cancel</Link>
                </Button>
                <Button type="submit">Save Apartment</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

