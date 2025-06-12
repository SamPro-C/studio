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
    Tool
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Dummy worker data
const workerData = {
  name: "Mike Ross",
  role: "Plumber",
  profilePicUrl: "https://placehold.co/100x100.png",
  aiProfileHint: "profile man worker",
  stats: {
    pendingTasks: 3,
    tasksToday: 2,
    completedThisWeek: 8,
  },
  priorityTasks: [
    { id: "SR001", description: "Fix leaky faucet, Unit A-101", location: "Greenwood Heights", status: "Pending" as const, priority: "High" as const},
    { id: "SR003", description: "Unclog shower drain, Unit C-505", location: "Oceanview Towers", status: "In Progress" as const, priority: "Medium" as const },
    { id: "INST005", description: "Install new shelving, Villa A", location: "Mountain Ridge", status: "Pending" as const, priority: "Low" as const },
  ],
};

const quickLinks = [
    { title: "My Full Task List", href: "/dashboard/worker/tasks", icon: ListChecks, description: "View all assigned tasks." },
    { title: "My Schedule", href: "/dashboard/worker/schedule", icon: CalendarDays, description: "Check your work calendar." },
    { title: "Notifications", href: "/dashboard/worker/notifications", icon: Bell, description: "Recent alerts and updates." },
    { title: "Report Issue/Supply Need", onClick: () => alert("Functionality to report an issue or request supplies."), icon: AlertTriangle, description: "Request assistance or materials." },
];

const getStatusBadgeVariant = (status: 'Pending' | 'In Progress' | 'Completed') => {
    switch (status) {
        case 'Pending': return 'secondary';
        case 'In Progress': return 'default';
        case 'Completed': return 'default'; // Consider a 'success' variant if available
        default: return 'outline';
    }
};
const getPriorityBadgeVariant = (priority: 'Low' | 'Medium' | 'High') => {
    switch (priority) {
        case 'Low': return 'outline';
        case 'Medium': return 'secondary';
        case 'High': return 'destructive';
        default: return 'outline';
    }
};


export default function WorkerDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        {/* Welcome Message & Profile Snippet */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary">
              Welcome back, {workerData.name}!
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Your role: {workerData.role}. Here's your task overview for today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={workerData.profilePicUrl} alt={workerData.name} data-ai-hint={workerData.aiProfileHint} />
              <AvatarFallback>{workerData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/worker/profile">
                <Settings className="mr-2 h-4 w-4" /> My Profile
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workerData.stats.pendingTasks}</div>
              <p className="text-xs text-muted-foreground">Tasks awaiting your action</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks for Today</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workerData.stats.tasksToday}</div>
              <p className="text-xs text-muted-foreground">Scheduled or high priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workerData.stats.completedThisWeek}</div>
              <p className="text-xs text-muted-foreground">Successfully resolved tasks</p>
            </CardContent>
          </Card>
        </section>

        {/* Today's Priority Tasks Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5" /> Today's Priority Tasks</CardTitle>
              <CardDescription>Focus on these tasks. Click to view details (placeholder).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {workerData.priorityTasks.length > 0 ? (
                workerData.priorityTasks.map(task => (
                  <Card 
                    key={task.id} 
                    className="p-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => alert(`View details for task ${task.id}`)}
                  >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-sm">{task.description}</p>
                            <p className="text-xs text-muted-foreground">{task.location}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <Badge variant={getStatusBadgeVariant(task.status)}>{task.status}</Badge>
                            <Badge variant={getPriorityBadgeVariant(task.priority)} className="text-xs">{task.priority} Priority</Badge>
                        </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No priority tasks for today. Great job!</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/worker/tasks">
                  <ListChecks className="mr-2 h-4 w-4" /> View All My Tasks
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </section>

        {/* Quick Links/Actions Section */}
        <section>
            <h2 className="font-headline text-xl font-semibold text-primary mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickLinks.map(link => (
                     <Card key={link.title} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                           <link.icon className="h-6 w-6 text-primary mb-2" />
                           <CardTitle className="text-md font-semibold">{link.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                           <p className="text-xs text-muted-foreground mb-3">{link.description}</p>
                           {link.href ? (
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link href={link.href}>Go to {link.title.split(" ")[0]}</Link>
                                </Button>
                           ) : (
                                <Button variant="outline" size="sm" className="w-full" onClick={link.onClick}>
                                    {link.title.split(" ")[0]} Action
                                </Button>
                           )}
                        </CardContent>
                     </Card>
                ))}
            </div>
        </section>
        
        <div className="p-6 border border-dashed rounded-md bg-muted/50 text-center">
          <Tool className="mx-auto h-8 w-8 text-muted-foreground mb-2"/>
          <p className="text-muted-foreground">
            Future features may include map integration for task locations and direct communication tools with tenants/landlord.
          </p>
        </div>

      </main>
    </div>
  );
}
