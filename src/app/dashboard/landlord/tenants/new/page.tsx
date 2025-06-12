
// src/app/dashboard/landlord/tenants/new/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useState, FormEvent } from 'react';

// Dummy data - replace with actual data fetching
const dummyApartments = [
  { id: "apt1", name: "Greenwood Heights" },
  { id: "apt2", name: "Oceanview Towers" },
  { id: "apt3", name: "Mountain Ridge Villas" },
];

const dummyUnits: { [key: string]: { id: string, name: string }[] } = {
  "apt1": [{ id: "unit101", name: "A-101" }, { id: "unit102", name: "A-102 (Vacant)" }],
  "apt2": [{ id: "unit505", name: "C-505" }, { id: "unit610", name: "D-610 (Vacant)" }],
  "apt3": [{ id: "villaA", name: "Villa A" }, { id: "villaB", name: "Villa B (Vacant)" }],
};

const dummyRooms: { [key: string]: { id: string, name: string }[] } = {
  "unit101": [{ id: "roomA", name: "Master Bedroom" }, { id: "roomB", name: "Living Room" }],
  "unit102": [{ id: "roomC", name: "Bedroom 1 (Vacant)" }],
  "unit505": [{ id: "roomD", name: "Penthouse Suite" }],
  "unit610": [{ id: "roomE", name: "Luxury Studio (Vacant)" }],
  "villaA": [{id: "villaAroom1", name: "Main Villa Space"}],
  "villaB": [{id: "villaBroom1", name: "Cozy Villa Retreat (Vacant)"}],
};


export default function RegisterNewTenantPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    apartmentId: '',
    unitId: '',
    roomId: '',
    moveInDate: '',
    monthlyRent: '',
    securityDeposit: '',
    leaseStartDate: '',
    leaseEndDate: '',
    password: '',
  });

  const [availableUnits, setAvailableUnits] = useState<{ id: string, name: string }[]>([]);
  const [availableRooms, setAvailableRooms] = useState<{ id: string, name: string }[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "apartmentId") {
      setAvailableUnits(dummyUnits[value] || []);
      setFormData(prev => ({ ...prev, unitId: '', roomId: '' })); // Reset unit and room
      setAvailableRooms([]);
    } else if (name === "unitId") {
      setAvailableRooms(dummyRooms[value] || []);
      setFormData(prev => ({ ...prev, roomId: '' })); // Reset room
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Registering new tenant with data:", formData);
    alert("Tenant registration submitted (see console). This is a placeholder action.");
    // In a real app, call an action to save the tenant, then redirect or update UI.
    // For now, let's redirect back to a general tenants page (which we'll create soon)
    // router.push('/dashboard/landlord/tenants'); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Register New Tenant</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tenant Information</CardTitle>
            <CardDescription>Enter the details for the new tenant.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Personal Details */}
              <div className="md:col-span-2 font-semibold text-lg text-primary/90 pb-2 border-b mb-2">Personal Details</div>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="e.g., Jane Doe" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="tenant@example.com" required />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} placeholder="+2547XXXXXXXX" required />
              </div>
              <div>
                <Label htmlFor="nationalId">National ID Number</Label>
                <Input id="nationalId" name="nationalId" value={formData.nationalId} onChange={handleInputChange} placeholder="e.g., 12345678" required />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender" onValueChange={(value) => handleSelectChange("gender", value)} value={formData.gender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                <Input id="emergencyContactName" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" value={formData.emergencyContactPhone} onChange={handleInputChange} />
              </div>

              {/* Apartment Assignment */}
              <div className="md:col-span-2 font-semibold text-lg text-primary/90 pb-2 border-b mt-4 mb-2">Apartment Assignment</div>
              <div>
                <Label htmlFor="apartmentId">Apartment</Label>
                <Select name="apartmentId" onValueChange={(value) => handleSelectChange("apartmentId", value)} value={formData.apartmentId} required>
                  <SelectTrigger id="apartmentId">
                    <SelectValue placeholder="Select apartment" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyApartments.map(apt => <SelectItem key={apt.id} value={apt.id}>{apt.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="unitId">Unit</Label>
                <Select name="unitId" onValueChange={(value) => handleSelectChange("unitId", value)} value={formData.unitId} disabled={!formData.apartmentId || availableUnits.length === 0} required>
                  <SelectTrigger id="unitId">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUnits.map(unit => <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="roomId">Room</Label>
                <Select name="roomId" onValueChange={(value) => handleSelectChange("roomId", value)} value={formData.roomId} disabled={!formData.unitId || availableRooms.length === 0} required>
                  <SelectTrigger id="roomId">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                     {availableRooms.map(room => <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
               <div>
                <Label htmlFor="moveInDate">Move-in Date</Label>
                <Input id="moveInDate" name="moveInDate" type="date" value={formData.moveInDate} onChange={handleInputChange} required />
              </div>

              {/* Lease & Financial Details */}
              <div className="md:col-span-2 font-semibold text-lg text-primary/90 pb-2 border-b mt-4 mb-2">Lease & Financials</div>
              <div>
                <Label htmlFor="monthlyRent">Monthly Rent Amount (KES)</Label>
                <Input id="monthlyRent" name="monthlyRent" type="number" value={formData.monthlyRent} onChange={handleInputChange} placeholder="e.g., 25000" required />
              </div>
              <div>
                <Label htmlFor="securityDeposit">Security Deposit Amount (KES)</Label>
                <Input id="securityDeposit" name="securityDeposit" type="number" value={formData.securityDeposit} onChange={handleInputChange} placeholder="e.g., 25000" />
              </div>
               <div>
                <Label htmlFor="leaseStartDate">Lease Start Date</Label>
                <Input id="leaseStartDate" name="leaseStartDate" type="date" value={formData.leaseStartDate} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="leaseEndDate">Lease End Date (Optional)</Label>
                <Input id="leaseEndDate" name="leaseEndDate" type="date" value={formData.leaseEndDate} onChange={handleInputChange} />
              </div>

              {/* Account Details */}
              <div className="md:col-span-2 font-semibold text-lg text-primary/90 pb-2 border-b mt-4 mb-2">Account Setup</div>
               <div>
                <Label htmlFor="password">Initial Password for Tenant</Label>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Min. 8 characters" required />
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-3 pt-6 border-t mt-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit">
                  <UserPlus className="mr-2 h-4 w-4" /> Register Tenant
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

    