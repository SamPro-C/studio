
// src/app/dashboard/worker/schedule/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

// Dummy data for schedule
const dummySchedule = {
  "2024-08-05": [
    { time: "09:00 AM - 12:00 PM", task: "Routine Maintenance", location: "Greenwood Heights (Block A)" },
    { time: "01:00 PM - 03:00 PM", task: "SR005 Inspection", location: "Oceanview Towers (Unit C-505)" },
  ],
  "2024-08-06": [
    { time: "10:00 AM - 01:00 PM", task: "Plumbing Repairs", location: "Mountain Ridge Villas (Villa B)" },
  ],
};

export default function WorkerSchedulePage() {
  const currentDay = "Monday, August 5, 2024"; // Placeholder

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
            <CalendarDays className="mr-3 h-7 w-7" /> My Schedule
          </h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                    <CardTitle>Your Work Schedule</CardTitle>
                    <CardDescription>View your assigned shifts and tasks.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4"/></Button>
                    <span className="font-medium text-sm sm:text-base whitespace-nowrap">{currentDay}</span>
                    <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4"/></Button>
                     <Select defaultValue="day">
                        <SelectTrigger className="w-[100px] h-9 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">Day View</SelectItem>
                            <SelectItem value="week">Week View</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 min-h-[400px]">
              {/* Placeholder for Calendar/Schedule display */}
              <h3 className="font-semibold mb-2">{currentDay}</h3>
              {dummySchedule["2024-08-05"]?.length > 0 ? (
                <ul className="space-y-3">
                  {dummySchedule["2024-08-05"].map(slot => (
                    <li key={slot.time} className="p-3 bg-muted/50 rounded-md border border-primary/20">
                      <p className="font-medium text-primary">{slot.time}</p>
                      <p className="text-sm">{slot.task} @ {slot.location}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-10">No tasks scheduled for this day.</p>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              This is a placeholder schedule. Your actual schedule will be managed by the landlord.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Added missing import
