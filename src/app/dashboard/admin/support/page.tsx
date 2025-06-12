
// src/app/dashboard/admin/support/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, LifeBuoy, Ticket, Filter, Search, MessageSquare, UserCog } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SupportTicket {
  id: string;
  ticketId: string;
  dateSubmitted: string;
  submittedBy: string; // e.g., "Landlord: John Doe" or "Tenant: Alice W."
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo: string | null; // Admin user
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
}

const dummyTickets: SupportTicket[] = [
  { id: "tkt1", ticketId: "SPT-202408-001", dateSubmitted: "2024-08-01", submittedBy: "Landlord: Greenwood Estates", subject: "Unable to add new tenant", status: "Open", assignedTo: null, priority: "High" },
  { id: "tkt2", ticketId: "SPT-202408-002", dateSubmitted: "2024-08-02", submittedBy: "Tenant: Alice W. (Oceanview)", subject: "Payment issue, M-Pesa not reflecting", status: "In Progress", assignedTo: "Admin Support User", priority: "Urgent" },
  { id: "tkt3", ticketId: "SPT-202407-015", dateSubmitted: "2024-07-25", submittedBy: "Worker: Mike R.", subject: "Cannot update task status in app", status: "Resolved", assignedTo: "Admin Tech Lead", priority: "Medium" },
];

export default function AdminSupportHelpdeskPage() {
  const { toast } = useToast();

  const handleViewTicket = (ticketId: string) => {
    toast({ title: "View Ticket", description: `Viewing details for ticket ${ticketId}. (Placeholder)` });
  };
  
  const handleAssignTicket = (ticketId: string) => {
    toast({ title: "Assign Ticket", description: `Assigning ticket ${ticketId}. (Placeholder)` });
  };

  const getStatusVariant = (status: SupportTicket['status']) => {
    if (status === 'Open') return 'secondary';
    if (status === 'In Progress') return 'default';
    if (status === 'Resolved' || status === 'Closed') return 'outline';
    return 'outline';
  };
  
  const getPriorityVariant = (priority: SupportTicket['priority']) => {
    if (priority === 'Urgent') return 'destructive';
    if (priority === 'High') return 'destructive'; // Using destructive for high as well for visibility
    if (priority === 'Medium') return 'secondary';
    return 'outline';
  };

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
            <LifeBuoy className="mr-3 h-7 w-7" /> Support & Helpdesk
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Escalated Support Tickets</CardTitle>
            <CardDescription>Manage and resolve support tickets from users.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="relative lg:col-span-1">
                <Label htmlFor="searchTickets">Search Tickets</Label>
                <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="searchTickets" type="search" placeholder="Ticket ID, Subject, User..." className="pl-9 mt-1" />
              </div>
              <div>
                <Label htmlFor="filterStatus">Filter by Status</Label>
                <Select><SelectTrigger id="filterStatus" className="mt-1"><SelectValue placeholder="All Statuses" /></SelectTrigger><SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="open">Open</SelectItem><SelectItem value="in_progress">In Progress</SelectItem><SelectItem value="resolved">Resolved</SelectItem><SelectItem value="closed">Closed</SelectItem></SelectContent></Select>
              </div>
               <div>
                <Label htmlFor="filterPriority">Filter by Priority</Label>
                <Select><SelectTrigger id="filterPriority" className="mt-1"><SelectValue placeholder="All Priorities" /></SelectTrigger><SelectContent><SelectItem value="all">All Priorities</SelectItem><SelectItem value="urgent">Urgent</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="low">Low</SelectItem></SelectContent></Select>
              </div>
              <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
            </div>

            {dummyTickets.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.ticketId}</TableCell>
                        <TableCell className="text-xs whitespace-nowrap">{new Date(ticket.dateSubmitted).toLocaleDateString()}</TableCell>
                        <TableCell>{ticket.submittedBy}</TableCell>
                        <TableCell className="max-w-xs truncate" title={ticket.subject}>{ticket.subject}</TableCell>
                        <TableCell><Badge variant={getPriorityVariant(ticket.priority)}>{ticket.priority}</Badge></TableCell>
                        <TableCell><Badge variant={getStatusVariant(ticket.status)}>{ticket.status}</Badge></TableCell>
                        <TableCell>{ticket.assignedTo || "Unassigned"}</TableCell>
                        <TableCell className="text-right">
                           <Button variant="ghost" size="sm" onClick={() => handleViewTicket(ticket.ticketId)} className="mr-1">
                             <Eye className="mr-1 h-3 w-3" /> View
                           </Button>
                           <Button variant="outline" size="sm" onClick={() => handleAssignTicket(ticket.ticketId)}>
                             <UserCog className="mr-1 h-3 w-3" /> Assign
                           </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <Ticket className="mx-auto h-12 w-12 mb-3" />
                    <p>No support tickets matching your filters.</p>
                </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader><CardTitle>Helpdesk Configuration (Placeholder)</CardTitle></CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    This section would include settings for defining support categories, escalation rules, automated responses, and integration with external helpdesk systems if any.
                </p>
                <div className="mt-4 p-4 border border-dashed rounded-md bg-muted/50 text-center">
                    <p className="text-muted-foreground">Helpdesk settings UI to be developed.</p>
                </div>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}

