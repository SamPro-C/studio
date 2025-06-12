
// src/app/dashboard/landlord/workers/new/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Briefcase, UserPlus } from 'lucide-react';
import { useState, FormEvent } from 'react';

// Dummy data - replace with actual data fetching
const dummyApartments = [
  { id: "apt1", name: "Greenwood Heights" },
  { id: "apt2", name: "Oceanview Towers" },
  { id: "apt3", name: "Mountain Ridge Villas" },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function RegisterNewWorkerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    nationalId: '',
    role: '',
    assignedApartments: [] as string[],
    workingHoursStart: '',
    workingHoursEnd: '',
    workingDays: [] as string[],
    emergencyContactName: '',
    emergencyContactPhone: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (day: string) => {
    setFormData(prev => {
      const newWorkingDays = prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day];
      return { ...prev, workingDays: newWorkingDays };
    });
  };
  
  const handleMultiSelectApartmentChange = (apartmentId: string) => {
    setFormData(prev => {
        const newAssignedApartments = prev.assignedApartments.includes(apartmentId)
        ? prev.assignedApartments.filter(id => id !== apartmentId)
        : [...prev.assignedApartments, apartmentId];
        return {...prev, assignedApartments: newAssignedApartments};
    });
  };


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Registering new worker with data:", formData);
    alert("Worker registration submitted (see console). This is a placeholder action.");
    // In a real app, call an action to save the worker, then redirect or update UI.
    // router.push('/dashboard/landlord/workers'); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord"> {/* Or /dashboard/landlord/workers if that page exists */}
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Register New Worker</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Worker Information</CardTitle>
            <CardDescription>Enter the details for the new worker.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Personal Details */}
              <div className="md:col-span-2 font-semibold text-lg text-primary/90 pb-2 border-b mb-2">Worker Details</div>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="e.g., Mike Ross" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="worker@example.com" required />
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
                <Label htmlFor="role">Role/Job Title</Label>
                <Input id="role" name="role" value={formData.role} onChange={handleInputChange} placeholder="e.g., Plumber, Electrician, Cleaner" required />
              </div>
               <div>
                <Label htmlFor="password">Initial Password for Worker</Label>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Min. 8 characters" required />
              </div>


              {/* Assignment & Schedule */}
              <div className="md:col-span-2 font-semibold text-lg text-primary/90 pb-2 border-b mt-4 mb-2">Assignment & Schedule</div>
              <div className="md:col-span-2">
                <Label>Assigned Apartments (Multi-select)</Label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 border rounded-md max-h-40 overflow-y-auto">
                    {dummyApartments.map(apt => (
                        <div key={apt.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`apt-${apt.id}`}
                                checked={formData.assignedApartments.includes(apt.id)}
                                onCheckedChange={() => handleMultiSelectApartmentChange(apt.id)}
                            />
                            <Label htmlFor={`apt-${apt.id}`} className="font-normal text-sm">{apt.name}</Label>
                        </div>
                    ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="workingHoursStart">Working Hours - Start Time</Label>
                <Input id="workingHoursStart" name="workingHoursStart" type="time" value={formData.workingHoursStart} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="workingHoursEnd">Working Hours - End Time</Label>
                <Input id="workingHoursEnd" name="workingHoursEnd" type="time" value={formData.workingHoursEnd} onChange={handleInputChange} />
              </div>

              <div className="md:col-span-2">
                <Label>Working Days</Label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-3 border rounded-md">
                  {daysOfWeek.map(day => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`day-${day}`}
                        checked={formData.workingDays.includes(day)}
                        onCheckedChange={() => handleCheckboxChange(day)}
                      />
                      <Label htmlFor={`day-${day}`} className="font-normal text-sm">{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="md:col-span-2 font-semibold text-lg text-primary/90 pb-2 border-b mt-4 mb-2">Emergency Contact</div>
              <div>
                <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                <Input id="emergencyContactName" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" value={formData.emergencyContactPhone} onChange={handleInputChange} />
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-3 pt-6 border-t mt-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit">
                  <Briefcase className="mr-2 h-4 w-4" /> Register Worker
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
