
// src/app/dashboard/admin/support/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, LifeBuoy, Ticket, Filter, Search, MessageSquare, UserCog, Eye } from 'lucide-react';
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
  submittedBy: string; 
  submittedByRole: 'Landlord' | 'Tenant' | 'Worker' | 'Shop Manager';
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Escalated';
  assignedTo: string | null; // Admin user email or ID
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  lastReplyDate: string | null;
}

const dummyTickets: SupportTicket[] = [
  { id: "tkt1", ticketId: "SPT-202408-001", dateSubmitted: "2024-08-01", submittedBy: "Greenwood Estates", submittedByRole: "Landlord", subject: "Unable to add new tenant", status: "Open", assignedTo: null, priority: "High", lastReplyDate: null },
  { id: "tkt2", ticketId: "SPT-202408-002", dateSubmitted: "2024-08-02", submittedBy: "Alice W. (Oceanview)", submittedByRole: "Tenant", subject: "Payment issue, M-Pesa not reflecting", status: "In Progress", assignedTo: "support_admin@rentizzi.app", priority: "Urgent", lastReplyDate: "2024-08-03" },
  { id: "tkt3", ticketId: "SPT-202407-015", dateSubmitted: "2024-07-25", submittedBy: "Mike R.", submittedByRole: "Worker", subject: "Cannot update task status in app", status: "Resolved", assignedTo: "tech_lead@rentizzi.app", priority: "Medium", lastReplyDate: "2024-07-26" },
  { id: "tkt4", ticketId: "SPT-202408-003", dateSubmitted: "2024-08-03", submittedBy: "Shop Alpha", submittedByRole: "Shop Manager", subject: "Product inventory sync error", status: "Escalated", assignedTo: "dev_team@rentizzi.app", priority: "High", lastReplyDate: "2024-08-04" },
  { id: "tkt5", ticketId: "SPT-202407-020", dateSubmitted: "2024-07-28", submittedBy: "Landlord Beta LLC", submittedByRole: "Landlord", subject: "Question about report generation", status: "Closed", assignedTo: "support_admin@rentizzi.app", priority: "Low", lastReplyDate: "2024-07-29" },
];

const adminUsers = ["All Admins", "support_admin@rentizzi.app", "tech_lead@rentizzi.app", "dev_team@rentizzi.app", "Unassigned"];

export default function AdminSupportHelpdeskPage() {
  const { toast } = useToast();

  const handleViewTicket = (ticketId: string) => {
    toast({ title: "View Ticket", description: `Viewing details for ticket ${ticketId}. (Placeholder)` });
  };
  
  const handleAssignTicket = (ticketId: string) => {
    toast({ title: "Assign Ticket", description: `Opening modal to assign ticket ${ticketId}. (Placeholder)` });
  };

  const getStatusVariant = (status: SupportTicket['status']): "default" | "secondary" | "destructive" | "outline" => {
    if (status === 'Open' || status === 'Escalated') return 'secondary';
    if (status === 'In Progress') return 'default'; 
    if (status === 'Resolved' || status === 'Closed') return 'default';
    return 'outline';
  };
  
  const getPriorityVariant = (priority: SupportTicket['priority']): "default" | "secondary" | "destructive" | "outline" => {
    if (priority === 'Urgent') return 'destructive';
    if (priority === 'High') return 'destructive'; 
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
            <LifeBuoy className="mr-3 h-7 w-7" /> Support &amp; Helpdesk
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Escalated Support Tickets</CardTitle>
            <CardDescription>Manage and resolve support tickets from users.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
              <div className="relative lg:col-span-1">
                <Label htmlFor="searchTickets">Search Tickets</Label>
                <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="searchTickets" type="search" placeholder="Ticket ID, Subject, User..." className="pl-9 mt-1" />
              </div>
              <div>
                <Label htmlFor="filterStatus">Filter by Status</Label>
                <Select><SelectTrigger id="filterStatus" className="mt-1"><SelectValue placeholder="All Statuses" /></SelectTrigger><SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {(['Open', 'In Progress', 'Resolved', 'Closed', 'Escalated'] as SupportTicket['status'][]).map(s=><SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
                </SelectContent></Select>
              </div>
               <div>
                <Label htmlFor="filterPriority">Filter by Priority</Label>
                <Select><SelectTrigger id="filterPriority" className="mt-1"><SelectValue placeholder="All Priorities" /></SelectTrigger><SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    {(['Urgent', 'High', 'Medium', 'Low'] as SupportTicket['priority'][]).map(p=><SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>)}
                </SelectContent></Select>
              </div>
               <div>
                <Label htmlFor="filterAssignedTo">Assigned To</Label>
                <Select><SelectTrigger id="filterAssignedTo" className="mt-1"><SelectValue placeholder="All Admins" /></SelectTrigger><SelectContent>
                    {adminUsers.map(admin => <SelectItem key={admin} value={admin === "All Admins" ? "all" : admin}>{admin}</SelectItem>)}
                </SelectContent></Select>
              </div>
              <Button className="w-full sm:w-auto self-end lg:col-start-4"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
            </div>

            {dummyTickets.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Submitted By (Role)</TableHead>
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
                        <TableCell>{ticket.submittedBy} <span className="text-xs text-muted-foreground">({ticket.submittedByRole})</span></TableCell>
                        <TableCell className="max-w-[200px] truncate" title={ticket.subject}>{ticket.subject}</TableCell>
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
    