
// src/app/dashboard/landlord/tenants/[tenantId]/page.tsx
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    UserCircle, 
    Edit, 
    Trash2, 
    DollarSign, 
    MessageSquare, 
    FileText, 
    AlertCircle, 
    Home,
    Mail,
    Phone,
    Briefcase,
    CalendarDays,
    Id,
    Users as GenderIcon
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  monthYear: string;
  amountDue: number;
  amountPaid: number;
  paymentDate: string | null;
  paymentMethod: string | null;
  transactionId: string | null;
  status: 'Paid' | 'Unpaid' | 'Partial';
}

interface ServiceRequestRecord {
  id: string;
  requestId: string;
  dateSubmitted: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Resolved' | 'Canceled';
  workerAssigned: string | null;
}

interface TenantProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  residence: {
    apartmentName: string;
    unitName: string;
    roomNumber: string;
  };
  leaseInfo: {
    moveInDate: string;
    monthlyRent: number;
    securityDeposit: number;
    leaseStartDate: string;
    leaseEndDate: string | null;
    leaseDocumentUrl?: string;
  };
  paymentHistory: PaymentRecord[];
  serviceRequestHistory: ServiceRequestRecord[];
}

// Dummy data for tenant profiles
const dummyTenantProfiles: { [key: string]: TenantProfile } = {
  "tenant001": {
    id: "tenant001",
    fullName: "Alice Wonderland",
    email: "alice@example.com",
    phoneNumber: "555-1234",
    nationalId: "12345678",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    emergencyContactName: "Mad Hatter",
    emergencyContactPhone: "555-4321",
    residence: {
      apartmentName: "Greenwood Heights",
      unitName: "A-101",
      roomNumber: "Master Bedroom"
    },
    leaseInfo: {
        moveInDate: "2023-01-15",
        monthlyRent: 1200,
        securityDeposit: 1200,
        leaseStartDate: "2023-01-15",
        leaseEndDate: "2024-01-14",
        leaseDocumentUrl: "/path/to/alice_lease.pdf"
    },
    paymentHistory: [
      { id: "pay1", monthYear: "July 2024", amountDue: 1200, amountPaid: 1200, paymentDate: "2024-07-01", paymentMethod: "M-Pesa", transactionId: "SGH7ABCD", status: "Paid" },
      { id: "pay2", monthYear: "June 2024", amountDue: 1200, amountPaid: 1200, paymentDate: "2024-06-01", paymentMethod: "Card", transactionId: "txn_123", status: "Paid" },
      { id: "pay3", monthYear: "May 2024", amountDue: 1200, amountPaid: 1000, paymentDate: "2024-05-05", paymentMethod: "M-Pesa", transactionId: "SGE5EFGH", status: "Partial" },
    ],
    serviceRequestHistory: [
      { id: "req1", requestId: "SR001", dateSubmitted: "2024-06-15", description: "Leaky faucet in kitchen", status: "Completed", workerAssigned: "John Plumber" },
      { id: "req2", requestId: "SR002", dateSubmitted: "2024-07-10", description: "Broken window pane in living room", status: "In Progress", workerAssigned: "Glass Repairs Inc." },
    ]
  },
  "tenant002": {
    id: "tenant002",
    fullName: "Bob The Builder",
    email: "bob@example.com",
    phoneNumber: "555-5678",
    nationalId: "87654321",
    dateOfBirth: "1985-10-20",
    gender: "Male",
    emergencyContactName: "Wendy",
    emergencyContactPhone: "555-8765",
    residence: {
      apartmentName: "Greenwood Heights",
      unitName: "B-201",
      roomNumber: "Studio Main Room"
    },
    leaseInfo: {
        moveInDate: "2022-11-01",
        monthlyRent: 1500,
        securityDeposit: 1500,
        leaseStartDate: "2022-11-01",
        leaseEndDate: null, // Ongoing
    },
    paymentHistory: [
      { id: "payB1", monthYear: "July 2024", amountDue: 1500, amountPaid: 0, paymentDate: null, paymentMethod: null, transactionId: null, status: "Unpaid" },
      { id: "payB2", monthYear: "June 2024", amountDue: 1500, amountPaid: 1500, paymentDate: "2024-06-02", paymentMethod: "Bank Transfer", transactionId: "BANK00567", status: "Paid" },
    ],
    serviceRequestHistory: []
  },
  // Add more dummy profiles if needed for testing other tenant IDs
};

export default function TenantProfilePage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;

  const tenant = dummyTenantProfiles[tenantId];

  const handleEditInfo = () => alert(`Edit info for ${tenant?.fullName}. To be implemented.`);
  const handleDeleteInfo = () => {
    if (confirm(`Are you sure you want to delete tenant ${tenant?.fullName}? This action cannot be undone.`)) {
      alert(`Delete tenant ${tenant?.fullName}. To be implemented.`);
      // router.push('/dashboard/landlord/tenants');
    }
  };
  const handleAddManualPayment = () => {
    // Navigate to the Add Manual Payment page, potentially pre-filling tenantId
    router.push(`/dashboard/landlord/payments/new?tenantId=${tenantId}`);
  };
  const handleSendNotification = () => alert(`Send notification to ${tenant?.fullName}. To be implemented.`);
  const handleMarkPayment = (status: string) => alert(`Mark current month's rent as ${status} for ${tenant?.fullName}. To be implemented.`);
  const handleViewLease = () => {
    if(tenant?.leaseInfo?.leaseDocumentUrl){
        alert(`Opening lease document for ${tenant?.fullName}. To be implemented. Path: ${tenant.leaseInfo.leaseDocumentUrl}`);
        // window.open(tenant.leaseInfo.leaseDocumentUrl, '_blank');
    } else {
        alert(`No lease document uploaded for ${tenant?.fullName}.`);
    }
  }
  const handleViewServiceRequestDetails = (requestId: string) => {
    alert(`View details for service request ID: ${requestId}. To be implemented.`);
    // router.push(`/dashboard/landlord/service-requests/${requestId}`);
  };


  if (!tenant) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/landlord/tenants">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">Tenant Not Found</h1>
          </div>
          <Card>
            <CardContent className="pt-6 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <p>The tenant profile could not be loaded. The tenant ID might be incorrect or the tenant does not exist.</p>
              <Button asChild className="mt-6">
                <Link href="/dashboard/landlord/tenants">Back to Tenants List</Link>
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
        {/* Header and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/landlord/tenants">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
                <Link href="/dashboard/landlord/tenants" className="text-sm text-muted-foreground hover:text-primary hover:underline">All Tenants</Link>
                <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                    <UserCircle className="mr-3 h-8 w-8" /> {tenant.fullName}
                </h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleEditInfo}><Edit className="mr-2 h-4 w-4" /> Edit Info</Button>
            <Button variant="outline" size="sm" onClick={handleSendNotification}><MessageSquare className="mr-2 h-4 w-4" /> Send Notification</Button>
            <Button variant="destructive" size="sm" onClick={handleDeleteInfo}><Trash2 className="mr-2 h-4 w-4" /> Delete Tenant</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Personal & Contact Info Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div className="flex items-center"><Mail className="mr-2 h-4 w-4 text-primary/70" /><strong>Email:</strong><span className="ml-1">{tenant.email}</span></div>
              <div className="flex items-center"><Phone className="mr-2 h-4 w-4 text-primary/70" /><strong>Phone:</strong><span className="ml-1">{tenant.phoneNumber}</span></div>
              <div className="flex items-center"><Id className="mr-2 h-4 w-4 text-primary/70" /><strong>National ID:</strong><span className="ml-1">{tenant.nationalId}</span></div>
              <div className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary/70" /><strong>Date of Birth:</strong><span className="ml-1">{new Date(tenant.dateOfBirth).toLocaleDateString()}</span></div>
              <div className="flex items-center"><GenderIcon className="mr-2 h-4 w-4 text-primary/70" /><strong>Gender:</strong><span className="ml-1">{tenant.gender}</span></div>
              <div className="sm:col-span-2 border-t pt-4 mt-2">
                <p className="font-medium">Emergency Contact:</p>
                <div className="flex items-center mt-1"><UserCircle className="mr-2 h-4 w-4 text-primary/70" /><strong>Name:</strong><span className="ml-1">{tenant.emergencyContactName}</span></div>
                <div className="flex items-center mt-1"><Phone className="mr-2 h-4 w-4 text-primary/70" /><strong>Phone:</strong><span className="ml-1">{tenant.emergencyContactPhone}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Residence & Lease Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Residence & Lease</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center"><Home className="mr-2 h-4 w-4 text-primary/70" /><strong>Apartment:</strong><span className="ml-1">{tenant.residence.apartmentName}</span></div>
              <div className="flex items-center"><Home className="mr-2 h-4 w-4 text-primary/70" /><strong>Unit:</strong><span className="ml-1">{tenant.residence.unitName}</span></div>
              <div className="flex items-center"><Home className="mr-2 h-4 w-4 text-primary/70" /><strong>Room:</strong><span className="ml-1">{tenant.residence.roomNumber}</span></div>
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary/70" /><strong>Move-in:</strong><span className="ml-1">{new Date(tenant.leaseInfo.moveInDate).toLocaleDateString()}</span></div>
                <div className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-primary/70" /><strong>Rent:</strong><span className="ml-1">${tenant.leaseInfo.monthlyRent}/month</span></div>
                <div className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-primary/70" /><strong>Deposit:</strong><span className="ml-1">${tenant.leaseInfo.securityDeposit}</span></div>
                <div className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary/70" /><strong>Lease Start:</strong><span className="ml-1">{new Date(tenant.leaseInfo.leaseStartDate).toLocaleDateString()}</span></div>
                <div className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary/70" /><strong>Lease End:</strong><span className="ml-1">{tenant.leaseInfo.leaseEndDate ? new Date(tenant.leaseInfo.leaseEndDate).toLocaleDateString() : 'Ongoing'}</span></div>
              </div>
              {tenant.leaseInfo.leaseDocumentUrl && (
                <div className="border-t pt-3 mt-3">
                    <Button variant="link" className="p-0 h-auto text-sm" onClick={handleViewLease}>
                        <FileText className="mr-2 h-4 w-4" /> View Lease Agreement
                    </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            <div>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Record of rent payments and statuses.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" onClick={() => handleMarkPayment('Unpaid')}>Mark Unpaid</Button>
                <Button variant="outline" size="sm" onClick={() => handleMarkPayment('Paid')}>Mark Paid</Button>
                <Button size="sm" onClick={handleAddManualPayment}><DollarSign className="mr-2 h-4 w-4" />Add Manual Payment</Button>
            </div>
          </CardHeader>
          <CardContent>
            {tenant.paymentHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month/Year</TableHead>
                      <TableHead>Amount Due</TableHead>
                      <TableHead>Amount Paid</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tenant.paymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.monthYear}</TableCell>
                        <TableCell>${payment.amountDue.toLocaleString()}</TableCell>
                        <TableCell>${payment.amountPaid.toLocaleString()}</TableCell>
                        <TableCell>{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'N/A'}</TableCell>
                        <TableCell>{payment.paymentMethod || 'N/A'}</TableCell>
                        <TableCell>{payment.transactionId || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant={
                              payment.status === 'Paid' ? 'default' 
                              : payment.status === 'Unpaid' ? 'destructive' 
                              : 'secondary' // For Partial
                          }>
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No payment history found.</p>
            )}
          </CardContent>
        </Card>

        {/* Service Request History */}
        <Card>
          <CardHeader>
            <CardTitle>Service Request History</CardTitle>
            <CardDescription>Record of maintenance and service requests.</CardDescription>
          </CardHeader>
          <CardContent>
            {tenant.serviceRequestHistory.length > 0 ? (
               <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Date Submitted</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Worker Assigned</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tenant.serviceRequestHistory.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.requestId}</TableCell>
                        <TableCell>{new Date(request.dateSubmitted).toLocaleDateString()}</TableCell>
                        <TableCell className="max-w-xs truncate">{request.description}</TableCell>
                        <TableCell>{request.workerAssigned || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge 
                              variant={
                                  request.status === 'Completed' || request.status === 'Resolved' ? 'default'
                                  : request.status === 'Pending' ? 'secondary'
                                  : request.status === 'Canceled' ? 'destructive'
                                  : 'outline' // For In Progress or other
                              }
                          >
                              {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewServiceRequestDetails(request.requestId)}>
                              View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No service request history found.</p>
            )}
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
