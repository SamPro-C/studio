
// src/app/dashboard/tenant/notifications/page.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Bell, Trash2, Eye, CheckSquare, Square, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotificationMessage {
  id: string;
  date: string;
  type: 'Rent Reminder' | 'Maintenance Update' | 'General Announcement' | 'Payment Confirmation';
  subject: string;
  messageSnippet: string;
  isRead: boolean;
  fullMessage?: string; // For detailed view
}

const dummyNotifications: NotificationMessage[] = [
  { id: "notif1", date: "2024-07-28T10:00:00Z", type: "Rent Reminder", subject: "August Rent Due Soon", messageSnippet: "Just a friendly reminder that your rent for August is due on the 5th...", isRead: false, fullMessage: "Full message about August rent due soon..."},
  { id: "notif2", date: "2024-07-25T14:30:00Z", type: "Maintenance Update", subject: "Plumbing Work Scheduled", messageSnippet: "Please be advised that plumbing maintenance is scheduled for Aug 2nd in the building...", isRead: true, fullMessage: "Full message about plumbing work..."},
  { id: "notif3", date: "2024-07-22T09:15:00Z", type: "General Announcement", subject: "Community Meeting Next Week", messageSnippet: "Join us for a community meeting on July 30th to discuss upcoming events...", isRead: true, fullMessage: "Full message about community meeting..."},
  { id: "notif4", date: "2024-07-01T17:00:00Z", type: "Payment Confirmation", subject: "July Rent Payment Received", messageSnippet: "Thank you! We have successfully received your rent payment for July.", isRead: true, fullMessage: "Full message about July rent payment receipt."},
];

export default function TenantNotificationsPage() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationMessage[]>(dummyNotifications);
  // Add state for selected notification for modal if implementing detailed view

  const toggleReadStatus = (id: string) => {
    setNotifications(prev => 
        prev.map(n => n.id === id ? {...n, isRead: !n.isRead} : n)
    );
    toast({ description: "Notification status updated." });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({ description: "Notification deleted." });
  };

  const viewNotificationDetails = (notification: NotificationMessage) => {
    // Placeholder for viewing full details - could be a modal or expanding row
    alert(`Viewing details for: ${notification.subject}\n\n${notification.fullMessage || notification.messageSnippet}`);
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
            <Link href="/dashboard/tenant">
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
                <CardTitle>Notification Inbox</CardTitle>
                <CardDescription>Stay updated with all communications from your landlord.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleMarkAllRead}>Mark All as Read</Button>
          </CardHeader>
          <CardContent>
            {/* Filters Section */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
                <div>
                    <Label htmlFor="filterStatus">Filter by Status</Label>
                    <Select>
                        <SelectTrigger id="filterStatus" className="mt-1">
                        <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="filterType">Filter by Type</Label>
                    <Select>
                        <SelectTrigger id="filterType" className="mt-1">
                        <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="rent">Rent Reminder</SelectItem>
                        <SelectItem value="maintenance">Maintenance Update</SelectItem>
                        <SelectItem value="announcement">General Announcement</SelectItem>
                        <SelectItem value="payment">Payment Confirmation</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="filterDate">Filter by Date</Label>
                    <Input type="date" id="filterDate" className="mt-1" />
                </div>
            </div>

            {/* Notifications Table */}
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
                      <TableHead className="text-right w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.map((notif) => (
                      <TableRow key={notif.id} className={!notif.isRead ? "bg-primary/5 font-medium" : ""}>
                        <TableCell className="text-center">
                            <Button variant="ghost" size="icon" onClick={() => toggleReadStatus(notif.id)} title={notif.isRead ? "Mark as Unread" : "Mark as Read"}>
                                {notif.isRead ? <Square className="h-4 w-4 text-muted-foreground"/> : <CheckSquare className="h-4 w-4 text-primary"/>}
                            </Button>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{new Date(notif.date).toLocaleDateString()}</TableCell>
                        <TableCell>{notif.type}</TableCell>
                        <TableCell>{notif.subject}</TableCell>
                        <TableCell className="max-w-sm truncate" title={notif.messageSnippet}>{notif.messageSnippet}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => viewNotificationDetails(notif)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => deleteNotification(notif.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
          <CardFooter>
             <p className="text-xs text-muted-foreground">
                Important notifications may also be sent to your registered email or phone number.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
