
// src/app/dashboard/landlord/apartments/[apartmentId]/units/new/page.tsx
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

// Dummy data for apartment names for context
const dummyApartmentNames: { [key: string]: string } = {
    "apt1": "Greenwood Heights",
    "apt2": "Oceanview Towers",
    "apt3": "Mountain Ridge Villas"
};

export default function AddNewUnitPage() {
  const params = useParams();
  const router = useRouter();
  const apartmentId = params.apartmentId as string;
  const apartmentName = dummyApartmentNames[apartmentId] || "Selected Apartment";

  const [unitName, setUnitName] = useState('');
  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [unitDescription, setUnitDescription] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitName || !numberOfRooms) {
        alert("Please fill in Unit Name/Number and Number of Rooms.");
        return;
    }
    console.log({ 
        apartmentId, 
        unitName, 
        numberOfRooms: parseInt(numberOfRooms, 10), 
        unitDescription 
    });
    alert(`Adding unit "${unitName}" to ${apartmentName}. Data logged to console. This functionality is a placeholder.`);
    // In a real app, you'd call an action to save the unit, then redirect or update UI.
    // For now, let's redirect back to the apartment details page.
    router.push(`/dashboard/landlord/apartments/${apartmentId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/landlord/apartments/${apartmentId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href={`/dashboard/landlord/apartments/${apartmentId}`} className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to {apartmentName}
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">
              Add New Unit to {apartmentName}
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Unit Details</CardTitle>
            <CardDescription>Fill in the information for the new unit in {apartmentName}.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="unitName">Unit Name/Number</Label>
                <Input 
                    id="unitName" 
                    name="unitName" 
                    placeholder="e.g., B-102, Unit 5B" 
                    value={unitName}
                    onChange={(e) => setUnitName(e.target.value)}
                    required 
                />
              </div>
              <div>
                <Label htmlFor="numberOfRooms">Number of Rooms</Label>
                <Input 
                    id="numberOfRooms" 
                    name="numberOfRooms" 
                    type="number" 
                    min="1" 
                    placeholder="e.g., 3" 
                    value={numberOfRooms}
                    onChange={(e) => setNumberOfRooms(e.target.value)}
                    required 
                />
              </div>
              <div>
                <Label htmlFor="unitDescription">Description (Optional)</Label>
                <Textarea 
                    id="unitDescription" 
                    name="unitDescription" 
                    placeholder="Brief description of the unit" 
                    value={unitDescription}
                    onChange={(e) => setUnitDescription(e.target.value)}
                />
              </div>
              
               <div className="p-4 border border-dashed rounded-md bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">
                    Individual room details (name, type) can be added or edited after the unit is created, from the Unit Details page.
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" type="button" asChild>
                  <Link href={`/dashboard/landlord/apartments/${apartmentId}`}>Cancel</Link>
                </Button>
                <Button type="submit">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Unit to {apartmentName}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
