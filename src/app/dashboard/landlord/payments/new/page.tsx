
// src/app/dashboard/landlord/payments/new/page.tsx
"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, DollarSign, UploadCloud } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';

// Dummy data for tenants (replace with actual search/fetch logic)
const dummyTenants = [
  { id: "tenant001", name: "Alice Wonderland", apartment: "Greenwood Heights", unit: "A-101", room: "Master Bedroom" },
  { id: "tenant002", name: "Bob The Builder", apartment: "Greenwood Heights", unit: "B-201", room: "Studio Main Room" },
  { id: "tenant003", name: "Charlie Brown", apartment: "Oceanview Towers", unit: "C-505", room: "Penthouse Suite" },
];

export default function AddManualPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tenantIdFromQuery = searchParams.get('tenantId');

  const [selectedTenantId, setSelectedTenantId] = useState(tenantIdFromQuery || '');
  const [apartment, setApartment] = useState('');
  const [unit, setUnit] = useState('');
  const [room, setRoom] = useState('');
  const [paymentMonthYear, setPaymentMonthYear] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);


  useEffect(() => {
    if (selectedTenantId) {
      const tenant = dummyTenants.find(t => t.id === selectedTenantId);
      if (tenant) {
        setApartment(tenant.apartment);
        setUnit(tenant.unit);
        setRoom(tenant.room);
      }
    } else {
      setApartment('');
      setUnit('');
      setRoom('');
    }
  }, [selectedTenantId]);

  const handleTenantChange = (value: string) => {
    setSelectedTenantId(value);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const paymentData = {
      tenantId: selectedTenantId,
      apartment,
      unit,
      room,
      paymentMonthYear,
      amountPaid,
      paymentMethod,
      transactionId,
      paymentDate,
      notes,
      fileName: file?.name
    };
    console.log("Manual Payment Data:", paymentData);
    alert("Manual payment submitted (see console). This is a placeholder action.");
    // In a real app, call an action, then redirect or show success.
    router.push('/dashboard/landlord/payments'); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord/payments">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
             <Link href="/dashboard/landlord/payments" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to Payment Overview
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Add Manual Payment</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Record New Payment</CardTitle>
            <CardDescription>Enter the details of the payment received.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              
              {/* Tenant and Property Info */}
              <div className="md:col-span-2 font-semibold text-lg text-primary/90 pb-2 border-b mb-2">Tenant & Property Details</div>
              <div>
                <Label htmlFor="tenantId">Select Tenant</Label>
                <Select name="tenantId" onValueChange={handleTenantChange} value={selectedTenantId} required>
                  <SelectTrigger id="tenantId">
                    <SelectValue placeholder="Search and select tenant..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyTenants.map(tenant => (
                      <SelectItem key={tenant.id} value={tenant.id}>{tenant.name} ({tenant.apartment} - {tenant.unit})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="apartment">Apartment</Label>
                <Input id="apartment" name="apartment" value={apartment} readOnly disabled placeholder="Auto-filled"/>
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" name="unit" value={unit} readOnly disabled placeholder="Auto-filled"/>
              </div>
              <div>
                <Label htmlFor="room">Room Number</Label>
                <Input id="room" name="room" value={room} readOnly disabled placeholder="Auto-filled"/>
              </div>

              {/* Payment Details */}
              <div className="md:col-span-2 font-semibold text-lg text-primary/90 pb-2 border-b mt-4 mb-2">Payment Details</div>
              <div>
                <Label htmlFor="paymentMonthYear">Payment For (Month/Year)</Label>
                <Input id="paymentMonthYear" name="paymentMonthYear" type="month" value={paymentMonthYear} onChange={e => setPaymentMonthYear(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="amountPaid">Amount Paid (KES)</Label>
                <Input id="amountPaid" name="amountPaid" type="number" placeholder="e.g., 25000" value={amountPaid} onChange={e => setAmountPaid(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select name="paymentMethod" onValueChange={setPaymentMethod} value={paymentMethod} required>
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <div>
                <Label htmlFor="transactionId">Transaction ID / M-Pesa Code / Reference</Label>
                <Input id="transactionId" name="transactionId" value={transactionId} onChange={e => setTransactionId(e.target.value)} placeholder="e.g., SGH7ABCD, TXN123"/>
              </div>
              <div>
                <Label htmlFor="paymentDate">Payment Date</Label>
                <Input id="paymentDate" name="paymentDate" type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" name="notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any additional details about the payment" />
              </div>
              <div className="md:col-span-2">
                 <Label htmlFor="paymentScreenshot">Upload Screenshot (Optional)</Label>
                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md hover:border-primary">
                    <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                        <div className="flex text-sm text-muted-foreground">
                        <label
                            htmlFor="paymentScreenshot"
                            className="relative cursor-pointer rounded-md bg-background font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                        >
                            <span>Upload a file</span>
                            <Input id="paymentScreenshot" name="paymentScreenshot" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,.pdf"/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                        </div>
                        {file ? (
                            <p className="text-xs text-foreground">{file.name}</p>
                        ): (
                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB; PDF up to 5MB</p>
                        )}
                    </div>
                </div>
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-3 pt-6 border-t mt-4">
                <Button variant="outline" type="button" onClick={() => router.push('/dashboard/landlord/payments')}>Cancel</Button>
                <Button type="submit">
                  <DollarSign className="mr-2 h-4 w-4" /> Submit Payment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
