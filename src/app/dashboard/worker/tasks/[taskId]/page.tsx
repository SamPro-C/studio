
// src/app/dashboard/worker/tasks/[taskId]/page.tsx
"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ListChecks, UserCircle, Home, Paperclip, AlertTriangle, CheckSquare, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

// Dummy data for a task - in a real app, fetch this by taskId
const dummyTaskDetails = {
  id: "SR001",
  title: "Fix leaky faucet",
  fullDescription: "Tenant in Unit A-101 reports a constantly dripping faucet in the kitchen. Requires immediate attention to prevent water wastage and potential damage. Please check washer and valve seat.",
  apartmentName: "Greenwood Heights",
  unitName: "A-101",
  roomNumber: "Kitchen",
  tenantName: "Alice Wonderland", // Only for context, no contact info
  assignedDate: "2024-08-05",
  dueDate: "2024-08-06",
  status: "Pending" as 'Pending' | 'In Progress' | 'Completed',
  priority: "High" as 'Low' | 'Medium' | 'High',
  mediaUploads: [
    { id: "media001", type: 'image', url: 'https://placehold.co/300x200.png', caption: 'Leaking Faucet View 1', aiHint: 'leaky faucet' },
    { id: "media002", type: 'image', url: 'https://placehold.co/300x200.png', caption: 'Puddle under sink', aiHint: 'water damage' }
  ],
  activityLog: [
      { id: "log001", timestamp: "2024-08-05 10:00 AM", user: "Landlord", action: "Task Assigned to You" }
  ]
};

export default function WorkerTaskDetailsPage() {
  const params = useParams();
  const taskId = params.taskId as string;

  const task = taskId === dummyTaskDetails.id ? dummyTaskDetails : null; // Simulate fetching

  const handleUpdateStatus = (newStatus: 'In Progress' | 'Completed') => {
    alert(`Updating task ${taskId} to ${newStatus}. (Placeholder)\n${newStatus === 'Completed' ? 'Prompt for completion notes.' : ''}`);
  };
  
  const handleReportIssue = () => {
    alert(`Reporting an issue with task ${taskId}. Link to Report Issue Page. (Placeholder)`);
    // router.push('/dashboard/worker/report-issue?taskId=' + taskId);
  };

  if (!task) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4"/>
            <h1 className="text-2xl font-bold mb-2">Task Not Found</h1>
            <p className="text-muted-foreground mb-4">The task with ID <span className="font-mono bg-muted px-1">{taskId}</span> could not be found.</p>
            <Button asChild><Link href="/dashboard/worker/tasks">Back to My Tasks</Link></Button>
        </div>
    );
  }
  
  const getStatusBadgeVariant = (status: typeof task.status) => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'In Progress': return 'default';
      case 'Completed': return 'default';
      default: return 'outline';
    }
  };
    const getPriorityBadgeVariant = (priority: typeof task.priority) => {
    switch (priority) {
        case 'Low': return 'outline';
        case 'Medium': return 'secondary';
        case 'High': return 'destructive';
        default: return 'outline';
    }
  };


  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/worker/tasks">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
             <Link href="/dashboard/worker/tasks" className="text-sm text-muted-foreground hover:underline">Back to My Tasks</Link>
             <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                <ListChecks className="mr-3 h-7 w-7" /> Task: {task.id}
             </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{task.title}</CardTitle>
                            <CardDescription>Assigned: {task.assignedDate} | Due: {task.dueDate}</CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <Badge variant={getStatusBadgeVariant(task.status)}>{task.status}</Badge>
                            <Badge variant={getPriorityBadgeVariant(task.priority)}>{task.priority} Priority</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-sm">Full Description:</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{task.fullDescription}</p>
                    </div>
                     <div className="border-t pt-3">
                        <h4 className="font-semibold text-sm mb-1">Location & Tenant:</h4>
                        <p className="text-sm text-muted-foreground flex items-center"><Home className="h-4 w-4 mr-2"/>{task.apartmentName} - Unit {task.unitName} ({task.roomNumber})</p>
                        <p className="text-sm text-muted-foreground flex items-center"><UserCircle className="h-4 w-4 mr-2"/>Tenant: {task.tenantName} (For context only)</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="md:col-span-1 self-start">
                <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    {task.status === "Pending" && <Button className="w-full" onClick={() => handleUpdateStatus('In Progress')}><Clock className="mr-2"/> Mark as In Progress</Button>}
                    {task.status === "In Progress" && <Button className="w-full" onClick={() => handleUpdateStatus('Completed')}><CheckSquare className="mr-2"/> Mark as Completed</Button>}
                    {task.status === "Completed" && <p className="text-sm text-green-600 text-center font-medium">Task is completed!</p>}
                    <Button variant="outline" className="w-full" onClick={handleReportIssue}><AlertTriangle className="mr-2"/> Report Issue with Task</Button>
                </CardContent>
            </Card>
        </div>
        
        {task.mediaUploads && task.mediaUploads.length > 0 && (
            <Card>
                <CardHeader><CardTitle className="flex items-center"><Paperclip className="mr-2"/> Attached Media (from Tenant)</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {task.mediaUploads.map(media => (
                        <div key={media.id} className="relative aspect-video">
                            <Image src={media.url} alt={media.caption || "Task Media"} layout="fill" objectFit="cover" className="rounded-md" data-ai-hint={media.aiHint || "repair job"}/>
                            {media.caption && <p className="text-xs text-center bg-black/50 text-white p-1 absolute bottom-0 w-full rounded-b-md">{media.caption}</p>}
                        </div>
                    ))}
                </CardContent>
            </Card>
        )}

        <Card>
            <CardHeader><CardTitle className="flex items-center"><Clock className="mr-2"/> Activity Log</CardTitle></CardHeader>
            <CardContent>
                {task.activityLog.length > 0 ? (
                    <ul className="space-y-3">
                        {task.activityLog.map(log =>(
                            <li key={log.id} className="text-sm">
                                <span className="font-semibold">{log.user} ({new Date(log.timestamp).toLocaleTimeString()}):</span> {log.action}
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-sm text-muted-foreground">No activity yet.</p>}
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
