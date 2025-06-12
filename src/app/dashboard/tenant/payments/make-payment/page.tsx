
// src/app/dashboard/tenant/payments/make-payment/page.tsx
"use client";

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, DollarSign, Smartphone, CreditCard, Banknote, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Dummy data - replace with actual data fetching
const rentDetails = {
  amountDue: 1200,
  currency: "KES",
  month: "August 2024",
  paybillNumber: "123456",
  accountNumber: "UNIT-A101",
};

export default function MakePaymentPage() {
  const { toast } = useToast();
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);

  const handleMpesaPayment = (e: FormEvent) => {
    e.preventDefault();
    console.log("M-Pesa payment initiated for phone:", mpesaPhone, "Amount:", rentDetails.amountDue);
    toast({
      title: "M-Pesa Payment Processing",
      description: `STK push sent to ${mpesaPhone} for KES ${rentDetails.amountDue}. Please enter PIN.`,
    });
    // Simulate success after a delay
    setTimeout(() => {
        toast({
            title: "M-Pesa Payment Successful",
            description: `Payment of KES ${rentDetails.amountDue} received.`,
        });
    }, 3000);
  };
  
  const handleCardPayment = (e: FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) {
        toast({ title: "Card Payment Error", description: "Please fill all card details.", variant: "destructive"});
        return;
    }
    console.log("Card payment initiated:", { cardNumber, cardExpiry, cardCvv }, "Amount:", rentDetails.amountDue);
    toast({
      title: "Card Payment Processing",
      description: "Processing your card payment...",
    });
     setTimeout(() => {
        toast({
            title: "Card Payment Successful",
            description: `Payment of KES ${rentDetails.amountDue} received.`,
        });
    }, 3000);
  };

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setProofFile(e.target.files[0]);
        toast({ description: `File "${e.target.files[0].name}" selected for upload.` });
    }
  };

  const handleBankTransferSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!proofFile) {
        toast({title: "Upload Required", description: "Please upload proof of payment.", variant: "destructive"});
        return;
    }
    console.log("Bank transfer proof submitted:", proofFile.name, "Amount:", rentDetails.amountDue);
    toast({
      title: "Proof of Payment Submitted",
      description: "Your proof of payment has been submitted for verification.",
    });
  };


  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tenant">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <DollarSign className="mr-3 h-7 w-7" /> Make a Payment
          </h1>
        </div>

        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg text-primary/90">Rent Due for {rentDetails.month}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">
              {rentDetails.currency} {rentDetails.amountDue.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Please select your preferred payment method below.</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {/* M-Pesa Payment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Smartphone className="mr-2 h-5 w-5 text-green-600"/> Pay with M-Pesa</CardTitle>
              <CardDescription>Use M-Pesa for a quick and easy payment.</CardDescription>
            </CardHeader>
            <form onSubmit={handleMpesaPayment}>
                <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
                    <Input 
                        id="mpesaPhone" 
                        type="tel" 
                        placeholder="e.g., 0712345678" 
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        required 
                    />
                </div>
                <div className="text-sm text-muted-foreground">
                    <p>Instructions for STK Push (Default):</p>
                    <ol className="list-decimal list-inside pl-2 text-xs">
                        <li>Ensure your M-Pesa phone is on and unlocked.</li>
                        <li>Click "Pay with M-Pesa" below.</li>
                        <li>You will receive an STK push to enter your M-Pesa PIN.</li>
                    </ol>
                    <p className="mt-2">Alternatively, use Paybill:</p>
                    <p className="text-xs">Paybill: <strong>{rentDetails.paybillNumber}</strong> | Account: <strong>{rentDetails.accountNumber}</strong></p>
                </div>
                </CardContent>
                <CardFooter>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Smartphone className="mr-2 h-4 w-4" /> Pay KES {rentDetails.amountDue.toLocaleString()} with M-Pesa
                </Button>
                </CardFooter>
            </form>
          </Card>

          {/* Card Payment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5 text-blue-600"/> Pay with Card</CardTitle>
              <CardDescription>Use your Debit or Credit Card.</CardDescription>
            </CardHeader>
            <form onSubmit={handleCardPayment}>
                <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="•••• •••• •••• ••••" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input id="cardExpiry" placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} required/>
                    </div>
                    <div>
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input id="cardCvv" placeholder="•••" value={cardCvv} onChange={e => setCardCvv(e.target.value)} required/>
                    </div>
                </div>
                 <p className="text-xs text-muted-foreground text-center pt-2">
                    Secure payment processing by (Payment Gateway Placeholder).
                </p>
                </CardContent>
                <CardFooter>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <CreditCard className="mr-2 h-4 w-4" /> Pay KES {rentDetails.amountDue.toLocaleString()} with Card
                </Button>
                </CardFooter>
            </form>
          </Card>

          {/* Bank Transfer Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Banknote className="mr-2 h-5 w-5 text-purple-600"/> Bank Transfer</CardTitle>
              <CardDescription>Transfer directly to our bank account.</CardDescription>
            </CardHeader>
            <form onSubmit={handleBankTransferSubmit}>
                <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                    <p>Please transfer KES {rentDetails.amountDue.toLocaleString()} to the following account:</p>
                    <ul className="mt-2 text-xs">
                    <li><strong>Bank Name:</strong> Propero Bank PLC</li>
                    <li><strong>Account Name:</strong> Rentizzi Collections</li>
                    <li><strong>Account Number:</strong> 0123456789012</li>
                    <li><strong>Branch Code:</strong> 001 (City Square)</li>
                    <li><strong>SWIFT Code:</strong> PROPKEXXX</li>
                    <li><strong>Reference:</strong> Your Unit ({rentDetails.accountNumber})</li>
                    </ul>
                </div>
                <div>
                    <Label htmlFor="proofUpload" className="block mb-1">Upload Proof of Payment (Screenshot/Receipt)</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md hover:border-primary">
                        <div className="space-y-1 text-center">
                            <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                            <div className="flex text-sm text-muted-foreground">
                            <label
                                htmlFor="proofUpload"
                                className="relative cursor-pointer rounded-md bg-background font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                            >
                                <span>Upload a file</span>
                                <Input id="proofUpload" name="proofUpload" type="file" className="sr-only" onChange={handleProofUpload} accept="image/*,.pdf"/>
                            </label>
                            <p className="pl-1">or drag and drop</p>
                            </div>
                            {proofFile ? (
                                <p className="text-xs text-foreground">{proofFile.name}</p>
                            ): (
                                <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 5MB</p>
                            )}
                        </div>
                    </div>
                </div>
                </CardContent>
                <CardFooter>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={!proofFile}>
                    <UploadCloud className="mr-2 h-4 w-4" /> Submit Proof of Payment
                </Button>
                </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}


    