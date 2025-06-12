
// src/app/dashboard/admin/audit-logs/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ListFilter, Search, ShieldAlert } from 'lucide-react';

interface SystemLogEntry {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  affectedEntity: string;
  ipAddress: string;
}

interface AdminLogEntry {
  id: string;
  timestamp: string;
  adminUser: string;
  action: string;
  details: string;
}

const dummySystemLogs: SystemLogEntry[] = [
  { id: "syslog1", timestamp: "2024-08-05 10:00:15", user: "landlord@example.com", userRole: "Landlord", action: "Logged In", affectedEntity: "User: landlord1", ipAddress: "192.168.1.10" },
  { id: "syslog2", timestamp: "2024-08-05 10:05:30", user: "tenant@example.com", userRole: "Tenant", action: "Submitted Service Request", affectedEntity: "SR-20240805-001", ipAddress: "10.0.0.5" },
  { id: "syslog3", timestamp: "2024-08-05 10:10:00", user: "admin@rentizzi.app", userRole: "Admin", action: "Approved Landlord Registration", affectedEntity: "User: landlord_new", ipAddress: "203.0.113.45" },
  { id: "syslog4", timestamp: "2024-08-05 10:15:22", user: "system", userRole: "System", action: "Payment Processed", affectedEntity: "Transaction: TXN789", ipAddress: "N/A" },
];

const dummyAdminLogs: AdminLogEntry[] = [
  { id: "adminlog1", timestamp: "2024-08-05 10:10:00", adminUser: "admin@rentizzi.app", action: "Approved Landlord Registration", details: "Landlord 'New Landlord Co.' (landlord_new) approved." },
  { id: "adminlog2", timestamp: "2024-08-05 11:00:00", adminUser: "superadmin@rentizzi.app", action: "Deactivated Tenant Account", details: "Tenant 'Problem Tenant' (tenant_xyz) deactivated due to policy violation." },
  { id: "adminlog3", timestamp: "2024-08-05 11:30:00", adminUser: "admin@rentizzi.app", action: "Sent System Announcement", details: "Announcement Title: 'Scheduled Maintenance This Weekend'" },
];

export default function AdminAuditLogsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <ShieldAlert className="mr-3 h-7 w-7" /> Audit & Activity Logs
          </h1>
        </div>

        <Tabs defaultValue="system_wide">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 lg:w-1/3">
            <TabsTrigger value="system_wide">System-Wide Activity</TabsTrigger>
            <TabsTrigger value="admin_actions">Admin Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="system_wide">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>System-Wide Activity Log</CardTitle>
                <CardDescription>Chronological record of major system events.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <div className="relative lg:col-span-1">
                    <Label htmlFor="searchSystemLog">Search Log</Label>
                    <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="searchSystemLog" type="search" placeholder="User, Action, Entity..." className="pl-9 mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="filterUserRole">User Role</Label>
                    <Select><SelectTrigger id="filterUserRole" className="mt-1"><SelectValue placeholder="All Roles" /></SelectTrigger><SelectContent><SelectItem value="all">All Roles</SelectItem><SelectItem value="landlord">Landlord</SelectItem><SelectItem value="tenant">Tenant</SelectItem><SelectItem value="worker">Worker</SelectItem><SelectItem value="admin">Admin</SelectItem><SelectItem value="system">System</SelectItem></SelectContent></Select>
                  </div>
                  <div>
                    <Label htmlFor="filterActionType">Action Type</Label>
                    <Select><SelectTrigger id="filterActionType" className="mt-1"><SelectValue placeholder="All Actions" /></SelectTrigger><SelectContent><SelectItem value="all">All Actions</SelectItem><SelectItem value="login">Login</SelectItem><SelectItem value="registration">Registration</SelectItem><SelectItem value="payment">Payment</SelectItem><SelectItem value="update">Update</SelectItem></SelectContent></Select>
                  </div>
                  <Button className="w-full sm:w-auto self-end"><ListFilter className="mr-2 h-4 w-4"/>Apply Filters</Button>
                </div>
                
                {dummySystemLogs.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Affected Entity</TableHead>
                          <TableHead>IP Address</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dummySystemLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="text-xs whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</TableCell>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>{log.userRole}</TableCell>
                            <TableCell className="font-medium">{log.action}</TableCell>
                            <TableCell>{log.affectedEntity}</TableCell>
                            <TableCell>{log.ipAddress}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                    <p className="text-muted-foreground text-center py-4">No system activity logs found for the selected filters.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin_actions">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Admin Activity Log</CardTitle>
                <CardDescription>Specific log of actions performed by administrators.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                  <div className="relative lg:col-span-1">
                    <Label htmlFor="searchAdminLog">Search Admin Log</Label>
                    <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="searchAdminLog" type="search" placeholder="Admin User, Action..." className="pl-9 mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="filterAdminUser">Admin User</Label>
                    <Select><SelectTrigger id="filterAdminUser" className="mt-1"><SelectValue placeholder="All Admins" /></SelectTrigger><SelectContent><SelectItem value="all">All Admins</SelectItem><SelectItem value="admin1">admin@rentizzi.app</SelectItem><SelectItem value="admin2">superadmin@rentizzi.app</SelectItem></SelectContent></Select>
                  </div>
                  <Button className="w-full sm:w-auto self-end"><ListFilter className="mr-2 h-4 w-4"/>Apply Filters</Button>
                </div>

                {dummyAdminLogs.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Admin User</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dummyAdminLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="text-xs whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</TableCell>
                            <TableCell>{log.adminUser}</TableCell>
                            <TableCell className="font-medium">{log.action}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{log.details}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                    <p className="text-muted-foreground text-center py-4">No admin activity logs found for the selected filters.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
