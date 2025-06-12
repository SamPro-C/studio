
// src/app/dashboard/worker/tasks/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ListChecks, Filter, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Canceled';

const dummyTasks = [
  { id: "SR001", title: "Fix leaky faucet", description: "Tenant reports leaky faucet in kitchen.", apartment: "Greenwood", unit: "A-101", assignedDate: "2024-08-05", dueDate: "2024-08-06", status: "Pending" as TaskStatus, priority: "High" },
  { id: "SR003", title: "Unclog shower drain", description: "Water not draining in main bathroom.", apartment: "Oceanview", unit: "C-505", assignedDate: "2024-08-05", dueDate: "2024-08-07", status: "In Progress" as TaskStatus, priority: "Medium" },
  { id: "INST005", title: "Install new shelving", description: "New shelves for tenant storage.", apartment: "Mountain Ridge", unit: "Villa A", assignedDate: "2024-08-04", dueDate: "2024-08-05", status: "Completed" as TaskStatus, priority: "Low" },
];

export default function WorkerTasksPage() {
  const router = useRouter();

  const handleViewDetails = (taskId: string) => {
    router.push(`/dashboard/worker/tasks/${taskId}`);
  };

  const handleUpdateStatus = (taskId: string, newStatus: TaskStatus) => {
    alert(`Updating task ${taskId} to ${newStatus}. (Placeholder)`);
  };

  const getStatusBadgeVariant = (status: TaskStatus) => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'In Progress': return 'default';
      case 'Completed': return 'default'; // Consider a 'success' variant
      case 'Canceled': return 'destructive';
      default: return 'outline';
    }
  };

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
            <ListChecks className="mr-3 h-7 w-7" /> My Tasks
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assigned Tasks Overview</CardTitle>
            <CardDescription>Manage and update your assigned tasks.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by title or description..." className="pl-8" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Apply</Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Apartment/Unit</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.id}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.apartment} / {task.unit}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell><Badge variant={getStatusBadgeVariant(task.status)}>{task.status}</Badge></TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(task.id)}>View</Button>
                        {task.status === "Pending" && <Button size="sm" onClick={() => handleUpdateStatus(task.id, "In Progress")}>Start</Button>}
                        {task.status === "In Progress" && <Button size="sm" onClick={() => handleUpdateStatus(task.id, "Completed")}>Complete</Button>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {dummyTasks.length === 0 && <p className="text-center text-muted-foreground py-6">No tasks assigned or matching filters.</p>}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
