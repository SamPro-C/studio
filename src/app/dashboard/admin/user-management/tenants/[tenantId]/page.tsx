
// src/app/dashboard/admin/user-management/tenants/[tenantId]/page.tsx
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    UserCircle, 
    Mail, 
    Phone, 
    Home,
    KeyRound,
    DollarSign,
    ListChecks,
    Edit, 
    UserX, 
    UserCheck, 
    Trash2,
    ShieldAlert,
    Fingerprint,
    CalendarCheck,
    AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResidenceInfo {
  apartmentName: string;
  unitName: string;
  roomNumber: string;
  landlordName: string;
}

interface LeaseSummary {
  moveInDate: string;
  leaseEndDate: string | null;
  monthlyRent: number;
}

interface PaymentSummary {
  lastPaymentDate: string | null;
  lastPaymentAmount: number | null;
  outstandingBalance: number;
}

interface ServiceRequestSummary {
  openRequests: number;
  totalRequests: number;
}

interface TenantProfileAdminView {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  status: 'Active' | 'Inactive' | 'Evicted' | 'PendingApproval';
  registrationDate: string;
  residence: ResidenceInfo;
  leaseInfo: LeaseSummary;
  paymentSummary: PaymentSummary;
  serviceRequestSummary: ServiceRequestSummary;
}

// Dummy data for tenant profiles - Admin View
const dummyAdminTenantProfiles: { [key: string]: TenantProfileAdminView } = {
  "tenantA": {
    id: "tenantA",
    fullName: "Tenant Alpha (Admin View)",
    email: "alpha.admin@tenant.com",
    phoneNumber: "0712345678",
    nationalId: "12345670",
    status: "Active",
    registrationDate: "2023-01-15",
    residence: {
      apartmentName: "Greenwood Heights",
      unitName: "A-101",
      roomNumber: "Main",
      landlordName: "John Landlord",
    },
    leaseInfo: {
      moveInDate: "2023-01-15",
      leaseEndDate: "2025-01-14",
      monthlyRent: 25000,
    },
    paymentSummary: {
      lastPaymentDate: "2024-07-01",
      lastPaymentAmount: 25000,
      outstandingBalance: 0,
    },
    serviceRequestSummary: {
      openRequests: 1,
      totalRequests: 5,
    },
  },
  "tenantB": {
    id: "tenantB",
    fullName: "Tenant Beta (Admin View)",
    email: "beta.admin@tenant.com",
    phoneNumber: "0712345679",
    nationalId: "12345671",
    status: "Inactive",
    registrationDate: "2022-06-10",
    residence: {
      apartmentName: "Oceanview Towers",
      unitName: "C-505",
      roomNumber: "Penthouse",
      landlordName: "Jane Proprietor",
    },
    leaseInfo: {
      moveInDate: "2022-06-10",
      leaseEndDate: "2023-06-09", // Expired lease
      monthlyRent: 45000,
    },
    paymentSummary: {
      lastPaymentDate: "2023-05-01",
      lastPaymentAmount: 45000,
      outstandingBalance: 0, // Assuming settled post-lease
    },
    serviceRequestSummary: {
      openRequests: 0,
      totalRequests: 2,
    },
  },
  "tenantC": { // Example for Pending Approval
    id: "tenantC",
    fullName: "Tenant Gamma (Pending)",
    email: "gamma.pending@tenant.com",
    phoneNumber: "0712345680",
    nationalId: "12345672",
    status: "PendingApproval",
    registrationDate: "2024-07-28",
    residence: {
      apartmentName: "City Center Plaza",
      unitName: "Apt 10",
      roomNumber: "Room 1",
      landlordName: "Peter Estates",
    },
    leaseInfo: {
      moveInDate: "2024-08-01",
      leaseEndDate: "2025-07-31",
      monthlyRent: 18000,
    },
    paymentSummary: {
      lastPaymentDate: null,
      lastPaymentAmount: null,
      outstandingBalance: 0,
    },
    serviceRequestSummary: {
      openRequests: 0,
      totalRequests: 0,
    },
  },
};

export default function AdminTenantProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const tenantId = params.tenantId as string;

  const tenant = dummyAdminTenantProfiles[tenantId];

  const handleAction = (action: string, tenantName: string) => {
    toast({ title: `${action} Initiated`, description: `Action "${action}" for ${tenantName} has been initiated. (Placeholder)` });
  };

  if (!tenant) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Tenant Not Found</h1>
        <p className="text-muted-foreground mb-4">The tenant with ID <span className="font-mono bg-muted px-1">{tenantId}</span> could not be found.</p>
        <Button asChild><Link href="/dashboard/admin/user-management/tenants">Back to Manage Tenants</Link></Button>
      </div>
    );
  }

  const getStatusVariant = (status: TenantProfileAdminView['status']) => {
    if (status === 'Active') return 'default';
    if (status === 'Inactive') return 'secondary';
    if (status === 'Evicted') return 'destructive';
    if (status === 'PendingApproval') return 'outline'; // Using 'outline' as it often implies pending
    return 'outline';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/admin/user-management/tenants">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                </Button>
                <div>
                    <Link href="/dashboard/admin/user-management/tenants" className="text-sm text-muted-foreground hover:text-primary hover:underline">Manage Tenants</Link>
                    <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                        <UserCircle className="mr-3 h-8 w-8" /> {tenant.fullName}
                    </h1>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => handleAction("Edit Details", tenant.fullName)}><Edit className="mr-2 h-4 w-4"/>Edit Details</Button>
                <Button 
                    variant={tenant.status === 'Active' ? 'destructive' : (tenant.status === 'PendingApproval' ? 'default' : 'default')} 
                    size="sm" 
                    onClick={() => handleAction(
                        tenant.status === 'Active' ? "Deactivate Account" : (tenant.status === 'PendingApproval' ? "Approve Registration" : "Activate Account"), 
                        tenant.fullName
                    )}
                >
                    {tenant.status === 'Active' ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                    {tenant.status === 'Active' ? "Deactivate" : (tenant.status === 'PendingApproval' ? "Approve" : "Activate")}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAction("Reset Password", tenant.fullName)}><KeyRound className="mr-2 h-4 w-4"/>Reset Password</Button>
                 <Button variant="destructive" size="sm" onClick={() => handleAction("Force Remove Tenant", tenant.fullName)}><Trash2 className="mr-2 h-4 w-4"/>Force Remove</Button>
            </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Contact & Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground"/> {tenant.email}</p>
                    <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground"/> {tenant.phoneNumber}</p>
                    <p className="flex items-center"><Fingerprint className="mr-2 h-4 w-4 text-muted-foreground"/> National ID: {tenant.nationalId}</p>
                    <p className="flex items-center"><CalendarCheck className="mr-2 h-4 w-4 text-muted-foreground"/> Registered: {new Date(tenant.registrationDate).toLocaleDateString()}</p>
                    <p className="flex items-center">Status: <Badge variant={getStatusVariant(tenant.status)} className="ml-2">{tenant.status}</Badge></p>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Residence & Landlord</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p className="flex items-center"><Home className="mr-2 h-4 w-4 text-muted-foreground"/>Apartment: {tenant.residence.apartmentName}</p>
                    <p className="flex items-center"><Home className="mr-2 h-4 w-4 text-muted-foreground"/>Unit: {tenant.residence.unitName}</p>
                    <p className="flex items-center"><Home className="mr-2 h-4 w-4 text-muted-foreground"/>Room: {tenant.residence.roomNumber}</p>
                    <p className="flex items-center"><UserCircle className="mr-2 h-4 w-4 text-muted-foreground"/>Landlord: {tenant.residence.landlordName}</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <Card>
                <CardHeader><CardTitle>Lease Summary</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p>Move-in Date: {new Date(tenant.leaseInfo.moveInDate).toLocaleDateString()}</p>
                    <p>Lease End Date: {tenant.leaseInfo.leaseEndDate ? new Date(tenant.leaseInfo.leaseEndDate).toLocaleDateString() : 'Ongoing'}</p>
                    <p>Monthly Rent: KES {tenant.leaseInfo.monthlyRent.toLocaleString()}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle className="flex items-center"><DollarSign className="mr-2 h-5 w-5"/>Payment Summary</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p>Last Payment: {tenant.paymentSummary.lastPaymentDate ? `${new Date(tenant.paymentSummary.lastPaymentDate).toLocaleDateString()} (KES ${tenant.paymentSummary.lastPaymentAmount?.toLocaleString() || 'N/A'})` : 'N/A'}</p>
                    <p className={tenant.paymentSummary.outstandingBalance > 0 ? 'text-destructive font-semibold' : ''}>
                        Outstanding Balance: KES {tenant.paymentSummary.outstandingBalance.toLocaleString()}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5"/>Service Request Summary</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p>Open Requests: {tenant.serviceRequestSummary.openRequests}</p>
                    <p>Total Requests: {tenant.serviceRequestSummary.totalRequests}</p>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-5 w-5"/> Admin Actions Log</CardTitle>
                 <CardDescription>History of administrative actions related to this tenant.</CardDescription>
            </CardHeader>
            <CardContent className="h-40 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Admin actions log for {tenant.fullName} will appear here.</p>
            </CardContent>
             <CardFooter className="border-t pt-4">
                <Button variant="outline" onClick={() => handleAction("View Full Audit Trail", tenant.fullName)}><ListChecks className="mr-2 h-4 w-4"/>View Full Audit Trail</Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}

