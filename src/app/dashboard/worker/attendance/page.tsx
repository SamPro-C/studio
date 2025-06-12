
// src/app/dashboard/worker/attendance/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, CalendarCheck, LogIn, LogOut, Filter } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const dummyAttendanceLog = [
  { id: "att1", date: "2024-08-05", checkIn: "08:58 AM", checkOut: "05:03 PM", hours: 8.1, location: "Greenwood Heights" },
  { id: "att2", date: "2024-08-04", checkIn: "09:02 AM", checkOut: "05:00 PM", hours: 7.9, location: "Oceanview Towers" },
  { id: "att3", date: "2024-08-03", checkIn: "N/A", checkOut: "N/A", hours: 0, location: "Day Off" },
];

export default function WorkerAttendancePage() {
  const handleCheckIn = () => alert("Simulating Check-in. Location might be captured via GPS if enabled.");
  const handleCheckOut = () => alert("Simulating Check-out.");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/worker">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <CalendarCheck className="mr-3 h-7 w-7" /> My Attendance
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>Check-in when you start your shift and check-out when you finish.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white" onClick={handleCheckIn}>
                <LogIn className="mr-2"/> Check-In
            </Button>
            <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white" onClick={handleCheckOut}>
                <LogOut className="mr-2"/> Check-Out
            </Button>
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground">
                GPS-based location check and QR code scanning might be used for verification if enabled by landlord.
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Log</CardTitle>
            <CardDescription>Your record of past check-ins and check-outs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row gap-2 items-end">
              <div>
                <Label htmlFor="dateRangeStart">From:</Label>
                <Input type="date" id="dateRangeStart" className="h-9"/>
              </div>
              <div>
                <Label htmlFor="dateRangeEnd">To:</Label>
                <Input type="date" id="dateRangeEnd" className="h-9"/>
              </div>
              <Button variant="outline" size="sm" className="h-9"><Filter className="mr-2 h-4 w-4"/>Filter Log</Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Check-In Time</TableHead>
                    <TableHead>Check-Out Time</TableHead>
                    <TableHead className="text-right">Hours Worked</TableHead>
                    <TableHead>Location/Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyAttendanceLog.map(log => (
                    <TableRow key={log.id}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.checkIn}</TableCell>
                      <TableCell>{log.checkOut}</TableCell>
                      <TableCell className="text-right">{log.hours.toFixed(1)}</TableCell>
                      <TableCell>{log.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
             {dummyAttendanceLog.length === 0 && <p className="text-center text-muted-foreground py-6">No attendance records found for the selected period.</p>}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
