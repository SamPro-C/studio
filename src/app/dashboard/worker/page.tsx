
// src/app/dashboard/worker/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
    Briefcase, 
    ListChecks, 
    CalendarDays, 
    Bell, 
    Settings, 
    AlertTriangle, 
    CheckCircle, 
    Clock,
    LogIn, 
    LogOut,
    Building
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Dummy worker data (enhanced based on new spec)
const workerData = {
  name: "Mike Ross",
  role: "Plumber",
  profilePicUrl: "https://placehold.co/100x100.png",
  aiProfileHint: "profile man worker",
  todaySchedule: {
    shift: "9:00 AM - 5:00 PM",
    assignedApartments: ["Greenwood Heights (Unit A-101, B-203)", "Oceanview Towers (Common Areas)"],
    pendingTasksToday: 2,
  },
  stats: {
    totalApartmentsAssigned: 3,
    tasksPending: 5, // Overall pending
    tasksCompletedThisWeek: 8,
    currentAvailabilityStatus: "On Shift" as "On Shift" | "Off Shift" | "On Break",
  },
  recentNotifications: [
    { id: "n1", title: "New Task Assigned", message: "SR005: Urgent - Broken pipe in Villa C", date: "2h ago", read: false },
    { id: "n2", title: "Schedule Change", message: "Your shift tomorrow starts at 10 AM.", date: "1d ago", read: true },
  ],
};

export default function WorkerDashboardPage() {

  const handleCheckInOut = () => {
    alert(`Simulating ${workerData.stats.currentAvailabilityStatus === "On Shift" ? "Check-out" : "Check-in"}. Attendance tracking to be implemented.`);
    // In a real app, update workerData.stats.currentAvailabilityStatus
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        {/* Welcome Message & Profile Snippet */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">
              Hello, {workerData.name}!
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Your role: {workerData.role}. Here's your overview.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={workerData.profilePicUrl} alt={workerData.name} data-ai-hint={workerData.aiProfileHint}/>
              <AvatarFallback>{workerData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/worker/profile">
                <Settings className="mr-2 h-4 w-4" /> My Profile
              </Link>
            </Button>
          </div>
        </div>

        {/* Today's Schedule Summary */}
        <Card className="bg-primary/5">
            <CardHeader>
                <CardTitle className="text-lg text-primary/90 flex items-center"><CalendarDays className="mr-2 h-5 w-5"/> Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p><strong>Shift:</strong> {workerData.todaySchedule.shift}</p>
                <div>
                    <strong>Assigned Locations:</strong>
                    <ul className="list-disc list-inside ml-4 text-xs">
                        {workerData.todaySchedule.assignedApartments.map((loc, idx) => <li key={idx}>{loc}</li>)}
                    </ul>
                </div>
                <p><strong>Pending Tasks for Today:</strong> {workerData.todaySchedule.pendingTasksToday}</p>
            </CardContent>
        </Card>

        {/* Quick Stats Cards */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assigned Apartments</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workerData.stats.totalApartmentsAssigned}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Pending Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workerData.stats.tasksPending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workerData.stats.completedThisWeek}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Availability Status</CardTitle>
              {workerData.stats.currentAvailabilityStatus === "On Shift" ? <LogIn className="h-4 w-4 text-green-500" /> : <LogOut className="h-4 w-4 text-red-500" />}
            </CardHeader>
            <CardContent>
              <div className={`text-xl font-bold ${workerData.stats.currentAvailabilityStatus === "On Shift" ? "text-green-600" : "text-red-600"}`}>
                {workerData.stats.currentAvailabilityStatus}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Action Buttons */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button asChild size="lg"><Link href="/dashboard/worker/schedule"><CalendarDays className="mr-2"/> My Schedule</Link></Button>
            <Button asChild size="lg"><Link href="/dashboard/worker/tasks"><ListChecks className="mr-2"/> My Tasks</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/dashboard/worker/report-issue"><AlertTriangle className="mr-2"/> Report Issue</Link></Button>
            <Button size="lg" variant="outline" onClick={handleCheckInOut}>
              {workerData.stats.currentAvailabilityStatus === "On Shift" ? <LogOut className="mr-2"/> : <LogIn className="mr-2"/>}
              {workerData.stats.currentAvailabilityStatus === "On Shift" ? "Check-Out" : "Check-In"}
            </Button>
        </section>


        {/* Recent Notifications Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5" /> Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {workerData.recentNotifications.length > 0 ? (
                workerData.recentNotifications.map(notif => (
                  <div key={notif.id} className={`p-3 rounded-md border ${!notif.read ? 'bg-primary/5 border-primary/30' : 'bg-muted/50'}`}>
                    <div className="flex justify-between items-center">
                      <h4 className={`font-semibold text-sm ${!notif.read ? 'text-primary' : ''}`}>{notif.title}</h4>
                      {!notif.read && <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                    <p className="text-xs text-muted-foreground/80 mt-1">{notif.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No recent notifications.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/worker/notifications">View All Notifications</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
}
