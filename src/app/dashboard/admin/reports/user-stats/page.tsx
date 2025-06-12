
// src/app/dashboard/admin/reports/user-stats/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Users, Filter, FileDown, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function UserStatisticsReportPage() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({ title: "Exporting Report", description: "User statistics report export initiated (Placeholder)." });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/admin/reports">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <Users className="mr-3 h-7 w-7" /> User Statistics Report
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Report Filters</CardTitle>
            <CardDescription>Filter user statistics by date range and user role.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
            <div>
              <Label htmlFor="userRole">User Role</Label>
              <Select>
                <SelectTrigger id="userRole"><SelectValue placeholder="All Roles" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="landlord">Landlord</SelectItem>
                  <SelectItem value="tenant">Tenant</SelectItem>
                  <SelectItem value="worker">Worker</SelectItem>
                  <SelectItem value="shop_manager">Shop Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Landlords</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">150</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Tenants</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">1,200</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active Users (Last 30d)</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">850</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">New Registrations (Last 30d)</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">25</div></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary/80"/> User Growth Trends</CardTitle>
            <CardDescription>Chart displaying user registration trends over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-80 bg-muted rounded-md flex items-center justify-center border border-dashed">
            <p className="text-muted-foreground">User Growth Chart Placeholder</p>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Detailed User Breakdown</CardTitle>
                <CardDescription>Table view of user counts by role, status, etc.</CardDescription>
            </CardHeader>
            <CardContent className="h-60 bg-muted rounded-md flex items-center justify-center border border-dashed">
                <p className="text-muted-foreground">Detailed User Table Placeholder</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
                <Button variant="outline" onClick={handleExport}><FileDown className="mr-2 h-4 w-4" /> Export Report</Button>
            </CardFooter>
        </Card>

      </main>
    </div>
  );
}
