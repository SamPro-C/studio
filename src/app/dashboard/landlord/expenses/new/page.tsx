
// src/app/dashboard/landlord/expenses/new/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, DollarSign, UploadCloud, PlusCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';

// Dummy data for apartments (replace with actual search/fetch logic)
const dummyApartments = [
  { id: "all", name: "All Apartments (General Expense)" },
  { id: "apt1", name: "Greenwood Heights" },
  { id: "apt2", name: "Oceanview Towers" },
  { id: "apt3", name: "Mountain Ridge Villas" },
];

const expenseTypes = [
  "Maintenance", "Utilities", "Repairs", "Cleaning", "Salaries", "Supplies", "Marketing", "Legal", "Insurance", "Other"
];

export default function AddNewExpensePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    type: '',
    description: '',
    apartmentId: '',
    receiptFile: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData(prev => ({ ...prev, receiptFile: event.target.files![0] }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const expenseData = {
      ...formData,
      fileName: formData.receiptFile?.name,
    };
    console.log("New Expense Data:", expenseData);
    alert("New expense submitted (see console). This is a placeholder action.");
    // In a real app, call an action, then redirect or show success.
    router.push('/dashboard/landlord/expenses'); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord/expenses">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
             <Link href="/dashboard/landlord/expenses" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to Expenses List
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Add New Expense</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Expense Details</CardTitle>
            <CardDescription>Enter the information for the new expense.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              
              <div>
                <Label htmlFor="date">Date of Expense</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="amount">Amount (KES)</Label>
                <Input id="amount" name="amount" type="number" placeholder="e.g., 1500" value={formData.amount} onChange={handleInputChange} required />
              </div>
               <div>
                <Label htmlFor="type">Type of Expense</Label>
                <Select name="type" onValueChange={(value) => handleSelectChange("type", value)} value={formData.type} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select expense type" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseTypes.map(type => (
                      <SelectItem key={type} value={type.toLowerCase().replace(' ', '_')}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="apartmentId">Associated Apartment</Label>
                <Select name="apartmentId" onValueChange={(value) => handleSelectChange("apartmentId", value)} value={formData.apartmentId}>
                  <SelectTrigger id="apartmentId">
                    <SelectValue placeholder="Select apartment (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyApartments.map(apt => (
                      <SelectItem key={apt.id} value={apt.id}>{apt.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    placeholder="Detailed description of the expense" 
                    required 
                />
              </div>
              <div className="md:col-span-2">
                 <Label htmlFor="receiptFile">Upload Receipt (Optional)</Label>
                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md hover:border-primary">
                    <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                        <div className="flex text-sm text-muted-foreground">
                        <label
                            htmlFor="receiptFile"
                            className="relative cursor-pointer rounded-md bg-background font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                        >
                            <span>Upload a file</span>
                            <Input id="receiptFile" name="receiptFile" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,.pdf"/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                        </div>
                        {formData.receiptFile ? (
                            <p className="text-xs text-foreground">{formData.receiptFile.name}</p>
                        ): (
                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB; PDF up to 5MB</p>
                        )}
                    </div>
                </div>
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-3 pt-6 border-t mt-4">
                <Button variant="outline" type="button" onClick={() => router.push('/dashboard/landlord/expenses')}>Cancel</Button>
                <Button type="submit">
                  <PlusCircle className="mr-2 h-4 w-4" /> Save Expense
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
