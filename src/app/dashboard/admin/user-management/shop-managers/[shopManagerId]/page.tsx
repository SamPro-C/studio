
// src/app/dashboard/admin/user-management/shop-managers/[shopManagerId]/page.tsx
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
    CalendarCheck, 
    DollarSign, 
    ListChecks,
    Edit, 
    UserX, 
    UserCheck, 
    KeyRound, 
    Trash2,
    ShieldAlert,
    ShoppingBag,
    Package,
    AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShopManagerProfileAdminView {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  shopName?: string;
  status: 'Active' | 'Inactive' | 'PendingApproval';
  registrationDate: string;
  totalSalesThisMonth?: number; // Example metric
  totalOrdersThisMonth?: number; // Example metric
}

const dummyAdminShopManagerProfiles: { [key: string]: ShopManagerProfileAdminView } = {
  "shopmgr1": {
    id: "shopmgr1",
    fullName: "Manager Alpha (Admin View)",
    email: "alpha.mgr@shop.com",
    phoneNumber: "0712345040",
    shopName: "Alpha Goods & Services",
    status: "Active",
    registrationDate: "2023-05-10",
    totalSalesThisMonth: 15000,
    totalOrdersThisMonth: 25,
  },
  "shopmgr2": {
    id: "shopmgr2",
    fullName: "Manager Beta (Admin View)",
    email: "beta.mgr@shop.com",
    phoneNumber: "0712345041",
    shopName: "Beta Fresh Produce",
    status: "PendingApproval",
    registrationDate: "2024-07-20",
  },
  "shopmgr3": {
    id: "shopmgr3",
    fullName: "Manager Gamma (Admin View)",
    email: "gamma.mgr@shop.com",
    phoneNumber: "0712345042",
    status: "Inactive",
    registrationDate: "2023-01-01",
  },
};

export default function AdminShopManagerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const shopManagerId = params.shopManagerId as string;

  const manager = dummyAdminShopManagerProfiles[shopManagerId];

  const handleAction = (action: string, managerName: string) => {
    toast({ title: `${action} Initiated`, description: `Action "${action}" for ${managerName} has been initiated. (Placeholder)` });
  };

  if (!manager) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Shop Manager Not Found</h1>
        <p className="text-muted-foreground mb-4">The shop manager with ID <span className="font-mono bg-muted px-1">{shopManagerId}</span> could not be found.</p>
        <Button asChild><Link href="/dashboard/admin/user-management/shop-managers">Back to Manage Shop Managers</Link></Button>
      </div>
    );
  }

  const getStatusVariant = (status: ShopManagerProfileAdminView['status']) => {
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
                <Link href="/dashboard/admin/user-management/shop-managers">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                </Button>
                <div>
                    <Link href="/dashboard/admin/user-management/shop-managers" className="text-sm text-muted-foreground hover:text-primary hover:underline">Manage Shop Managers</Link>
                    <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                        <UserCircle className="mr-3 h-8 w-8" /> {manager.fullName}
                    </h1>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => handleAction("Edit Profile", manager.fullName)}><Edit className="mr-2 h-4 w-4"/>Edit Details</Button>
                <Button variant={manager.status === 'Active' ? 'destructive' : 'default'} size="sm" onClick={() => handleAction(manager.status === 'Active' ? "Deactivate Account" : (manager.status === 'PendingApproval' ? "Approve Registration" : "Activate Account"), manager.fullName)}>
                    {manager.status === 'Active' ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                    {manager.status === 'Active' ? "Deactivate" : (manager.status === 'PendingApproval' ? "Approve" : "Activate")}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAction("Reset Password", manager.fullName)}><KeyRound className="mr-2 h-4 w-4"/>Reset Password</Button>
                 <Button variant="destructive" size="sm" onClick={() => handleAction("Delete Account", manager.fullName)}><Trash2 className="mr-2 h-4 w-4"/>Delete Account</Button>
            </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Contact & Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground"/> {manager.email}</p>
                    <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground"/> {manager.phoneNumber}</p>
                    <p className="flex items-center"><CalendarCheck className="mr-2 h-4 w-4 text-muted-foreground"/> Registered: {new Date(manager.registrationDate).toLocaleDateString()}</p>
                    <p className="flex items-center">Status: <Badge variant={getStatusVariant(manager.status)} className="ml-2">{manager.status}</Badge></p>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center"><ShoppingBag className="mr-2 h-5 w-5"/>Shop Information</CardTitle>
                    <CardDescription>{manager.shopName || "Shop name not yet assigned."}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-xs text-muted-foreground">Total Sales (This Month)</p>
                        <p className="text-xl font-bold">KES {manager.totalSalesThisMonth?.toLocaleString() || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Total Orders (This Month)</p>
                        <p className="text-xl font-bold">{manager.totalOrdersThisMonth?.toLocaleString() || 'N/A'}</p>
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                     <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/admin/system-oversight/ecommerce-oversight?shopManagerId=${manager.id}`}>
                            <Package className="mr-2 h-4 w-4"/> View Shop Activity
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-5 w-5"/> Admin Actions Log</CardTitle>
                 <CardDescription>History of administrative actions related to this shop manager.</CardDescription>
            </CardHeader>
            <CardContent className="h-40 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Admin actions log for {manager.fullName} will appear here.</p>
            </CardContent>
             <CardFooter className="border-t pt-4">
                <Button variant="outline" onClick={() => handleAction("View Full Audit Trail", manager.fullName)}><ListChecks className="mr-2 h-4 w-4"/>View Full Audit Trail</Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}

