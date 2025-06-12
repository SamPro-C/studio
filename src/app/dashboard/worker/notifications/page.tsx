
// src/app/dashboard/worker/notifications/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Bell, CheckSquare, Square, Trash2, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WorkerNotification {
  id: string;
  date: string;
  type: 'New Task' | 'Schedule Update' | 'General Announcement' | 'Task Update';
  subject: string;
  messageSnippet: string;
  isRead: boolean;
}

const dummyNotifications: WorkerNotification[] = [
  { id: "wn1", date: "2024-08-05", type: "New Task", subject: "Task SR005 Assigned", messageSnippet: "Urgent: Broken pipe in Villa C requires attention...", isRead: false },
  { id: "wn2", date: "2024-08-04", type: "Schedule Update", subject: "Shift Change for Aug 6th", messageSnippet: "Your shift for August 6th now starts at 10 AM...", isRead: true },
  { id: "wn3", date: "2024-08-01", type: "General Announcement", subject: "Tool Maintenance Reminder", messageSnippet: "Please ensure all tools are cleaned and stored properly...", isRead: true },
];

export default function WorkerNotificationsPage() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<WorkerNotification[]>(dummyNotifications);

  const toggleReadStatus = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? {...n, isRead: !n.isRead} : n));
    toast({ description: "Notification status updated." });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({ description: "Notification deleted." });
  };
  
  const viewNotificationDetails = (notification: WorkerNotification) => {
    alert(`Viewing details for: ${notification.subject}\n\n${notification.messageSnippet}`);
  };
  
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({...n, isRead: true})));
    toast({ description: "All notifications marked as read." });
  }


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
            <Bell className="mr-3 h-7 w-7" /> My Notifications
          </h1>
        </div>
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
                <CardTitle>Notifications Inbox</CardTitle>
                <CardDescription>Stay updated with communications from your landlord/manager.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleMarkAllRead}>Mark All as Read</Button>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px] text-center">Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.map((notif) => (
                      <TableRow key={notif.id} className={!notif.isRead ? "bg-primary/5 font-medium" : ""}>
                        <TableCell className="text-center">
                            <Button variant="ghost" size="icon" onClick={() => toggleReadStatus(notif.id)} title={notif.isRead ? "Mark Unread" : "Mark Read"}>
                                {notif.isRead ? <Square className="h-4 w-4 text-muted-foreground"/> : <CheckSquare className="h-4 w-4 text-primary"/>}
                            </Button>
                        </TableCell>
                        <TableCell>{notif.date}</TableCell>
                        <TableCell>{notif.type}</TableCell>
                        <TableCell>{notif.subject}</TableCell>
                        <TableCell className="max-w-sm truncate" title={notif.messageSnippet}>{notif.messageSnippet}</TableCell>
                        <TableCell className="text-right space-x-1">
                           <Button variant="ghost" size="sm" onClick={() => viewNotificationDetails(notif)}><Eye className="h-4 w-4"/></Button>
                           <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => deleteNotification(notif.id)}><Trash2 className="h-4 w-4"/></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">You have no notifications.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
