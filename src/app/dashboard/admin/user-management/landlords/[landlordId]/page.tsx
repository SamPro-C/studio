
// src/app/dashboard/admin/user-management/landlords/[landlordId]/page.tsx
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    Building, 
    UserCircle, 
    Mail, 
    Phone, 
    CalendarCheck, 
    DollarSign, 
    Users, 
    Briefcase, 
    Edit, 
    UserX, 
    UserCheck, 
    KeyRound, 
    ShieldAlert,
    ListChecks
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApartmentManaged {
  id: string;
  name: string;
  location: string;
  totalUnits: number;
  occupiedUnits: number;
}

interface LandlordProfileData {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
  status: 'Active' | 'Inactive' | 'PendingApproval';
  apartmentsCount: number;
  totalUnits: number;
  totalTenants: number;
  totalWorkers: number;
  totalRentCollectedThisMonth: number; // Example metric
  apartmentsManaged: ApartmentManaged[];
}

const dummyLandlordProfiles: { [key: string]: LandlordProfileData } = {
  "landlord1": {
    id: "landlord1",
    fullName: "John Landlord",
    email: "john.landlord@example.com",
    phoneNumber: "0712345010",
    registrationDate: "2023-01-15",
    status: "Active",
    apartmentsCount: 3,
    totalUnits: 35,
    totalTenants: 30,
    totalWorkers: 5,
    totalRentCollectedThisMonth: 150000,
    apartmentsManaged: [
      { id: "apt1", name: "Greenwood Heights", location: "123 Main St", totalUnits: 10, occupiedUnits: 8 },
      { id: "apt2", name: "City Center Plaza", location: "456 Center Ave", totalUnits: 20, occupiedUnits: 18 },
      { id: "apt4", name: "Riverside Complex", location: "789 River Rd", totalUnits: 5, occupiedUnits: 4 },
    ],
  },
  "landlord2": {
    id: "landlord2",
    fullName: "Jane Proprietor",
    email: "jane.prop@example.com",
    phoneNumber: "0712345011",
    registrationDate: "2023-03-20",
    status: "Active",
    apartmentsCount: 1,
    totalUnits: 20,
    totalTenants: 15,
    totalWorkers: 2,
    totalRentCollectedThisMonth: 95000,
    apartmentsManaged: [
      { id: "apt3", name: "Oceanview Towers", location: "101 Beach Front", totalUnits: 20, occupiedUnits: 15 },
    ],
  },
};

export default function AdminLandlordProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const landlordId = params.landlordId as string;

  const landlord = dummyLandlordProfiles[landlordId];

  const handleAction = (action: string, landlordName: string) => {
    toast({ title: `${action} Initiated`, description: `Action "${action}" for ${landlordName} has been initiated. (Placeholder)` });
  };

  if (!landlord) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Landlord Not Found</h1>
        <p className="text-muted-foreground mb-4">The landlord with ID <span className="font-mono bg-muted px-1">{landlordId}</span> could not be found.</p>
        <Button asChild><Link href="/dashboard/admin/user-management/landlords">Back to Manage Landlords</Link></Button>
      </div>
    );
  }

  const getStatusVariant = (status: LandlordProfileData['status']) => {
    if (status === 'Active') return 'default';
    if (status === 'Inactive') return 'destructive';
    if (status === 'PendingApproval') return 'secondary';
    return 'outline';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/admin/user-management/landlords">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                </Button>
                <div>
                    <Link href="/dashboard/admin/user-management/landlords" className="text-sm text-muted-foreground hover:text-primary hover:underline">Manage Landlords</Link>
                    <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                        <UserCircle className="mr-3 h-8 w-8" /> {landlord.fullName}
                    </h1>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => handleAction("Edit Profile", landlord.fullName)}><Edit className="mr-2 h-4 w-4"/>Edit Profile</Button>
                <Button variant={landlord.status === 'Active' ? 'destructive' : 'default'} size="sm" onClick={() => handleAction(landlord.status === 'Active' ? "Deactivate Account" : "Activate Account", landlord.fullName)}>
                    {landlord.status === 'Active' ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                    {landlord.status === 'Active' ? "Deactivate" : "Activate"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAction("Reset Password", landlord.fullName)}><KeyRound className="mr-2 h-4 w-4"/>Reset Password</Button>
            </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Contact & Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground"/> {landlord.email}</p>
                    <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground"/> {landlord.phoneNumber}</p>
                    <p className="flex items-center"><CalendarCheck className="mr-2 h-4 w-4 text-muted-foreground"/> Registered: {new Date(landlord.registrationDate).toLocaleDateString()}</p>
                    <p className="flex items-center">Status: <Badge variant={getStatusVariant(landlord.status)} className="ml-2">{landlord.status}</Badge></p>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Property Portfolio Overview</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div><p className="text-xs text-muted-foreground">Apartments</p><p className="text-xl font-bold">{landlord.apartmentsCount}</p></div>
                    <div><p className="text-xs text-muted-foreground">Total Units</p><p className="text-xl font-bold">{landlord.totalUnits}</p></div>
                    <div><p className="text-xs text-muted-foreground">Tenants</p><p className="text-xl font-bold">{landlord.totalTenants}</p></div>
                    <div><p className="text-xs text-muted-foreground">Workers</p><p className="text-xl font-bold">{landlord.totalWorkers}</p></div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                     <p className="text-sm">Rent Collected (This Month): <span className="font-semibold text-green-600">KES {landlord.totalRentCollectedThisMonth.toLocaleString()}</span></p>
                </CardFooter>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><Building className="mr-2 h-5 w-5"/> Apartments Managed</CardTitle>
            </CardHeader>
            <CardContent>
                {landlord.apartmentsManaged.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Apartment Name</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead className="text-center">Total Units</TableHead>
                                    <TableHead className="text-center">Occupied Units</TableHead>
                                    <TableHead className="text-center">Occupancy</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {landlord.apartmentsManaged.map(apt => (
                                    <TableRow key={apt.id}>
                                        <TableCell className="font-medium">{apt.name}</TableCell>
                                        <TableCell>{apt.location}</TableCell>
                                        <TableCell className="text-center">{apt.totalUnits}</TableCell>
                                        <TableCell className="text-center">{apt.occupiedUnits}</TableCell>
                                        <TableCell className="text-center">
                                            {apt.totalUnits > 0 ? ((apt.occupiedUnits / apt.totalUnits) * 100).toFixed(0) + '%' : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-4">This landlord has not registered any apartments yet.</p>
                )}
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-5 w-5"/> Admin Actions Log</CardTitle>
                 <CardDescription>History of administrative actions related to this landlord.</CardDescription>
            </CardHeader>
            <CardContent className="h-40 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Admin actions log for {landlord.fullName} will appear here.</p>
            </CardContent>
             <CardFooter className="border-t pt-4">
                <Button variant="outline" onClick={() => handleAction("View Full Audit Trail", landlord.fullName)}><ListChecks className="mr-2 h-4 w-4"/>View Full Audit Trail</Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}
