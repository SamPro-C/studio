
// src/app/dashboard/landlord/activity-log/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ListChecks, Search, Filter } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Dummy activity log data
const dummyActivities = [
  { id: "act1", timestamp: "2024-07-26 10:00 AM", user: "Landlord Admin", action: "Logged In", details: "Successful login from IP 192.168.1.1" },
  { id: "act2", timestamp: "2024-07-26 10:05 AM", user: "Landlord Admin", action: "Viewed Tenant Profile", details: "Tenant: Alice Wonderland (tenant001)" },
  { id: "act3", timestamp: "2024-07-26 10:10 AM", user: "Landlord Admin", action: "Updated Service Request", details: "SR20240724-003 status to 'In Progress'" },
  { id: "act4", timestamp: "2024-07-25 02:30 PM", user: "Bob The Builder", action: "Submitted Service Request", details: "SR20240724-003: Shower drain clogged" },
  { id: "act5", timestamp: "2024-07-25 09:00 AM", user: "Mike Ross", action: "Updated Task Status", details: "SR20240724-003 to 'In Progress'" },
  { id: "act6", timestamp: "2024-07-24 04:00 PM", user: "Tech Services Inc.", action: "Completed Task", details: "SR20240723-001: AC fixed" },
];

const activityTypes = ["All", "Login", "Tenant Management", "Worker Management", "Service Request", "Payment", "System"];
const usersFilter = ["All", "Landlord Admin", "Alice Wonderland", "Bob The Builder", "Mike Ross", "System"];

export default function ActivityLogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/landlord" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to Dashboard
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <ListChecks className="mr-3 h-7 w-7" /> Activity Log
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System & User Activities</CardTitle>
            <CardDescription>Track important actions performed within the Rentizzi platform.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters Section */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div className="relative">
                    <Label htmlFor="searchActivity">Search Log</Label>
                    <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="searchActivity" type="search" placeholder="Keywords, User, Action..." className="pl-9 mt-1" />
                </div>
                <div>
                    <Label htmlFor="activityType">Activity Type</Label>
                    <Select>
                        <SelectTrigger id="activityType" className="mt-1">
                        <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                        {activityTypes.map(type => <SelectItem key={type} value={type.toLowerCase().replace(' ', '_')}>{type}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="userFilter">User</Label>
                    <Select>
                        <SelectTrigger id="userFilter" className="mt-1">
                        <SelectValue placeholder="All Users" />
                        </SelectTrigger>
                        <SelectContent>
                        {usersFilter.map(user => <SelectItem key={user} value={user.toLowerCase().replace(' ', '_')}>{user}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
            </div>

            {/* Activity Table */}
            {dummyActivities.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="text-xs whitespace-nowrap">{activity.timestamp}</TableCell>
                        <TableCell>{activity.user}</TableCell>
                        <TableCell className="font-medium">{activity.action}</TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-md truncate" title={activity.details}>
                          {activity.details}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No activity logged for the selected filters.</p>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Activity logs are retained for auditing and security purposes. (This is a placeholder implementation with dummy data.)
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
