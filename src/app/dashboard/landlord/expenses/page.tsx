
// src/app/dashboard/landlord/expenses/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft, Search, PlusCircle, Filter, FileDown, Edit, Trash2, MoreHorizontal, Receipt } from 'lucide-react';

// Dummy data for expenses - replace with actual data fetching
const dummyExpenses = [
  { id: "exp1", date: "2024-07-10", amount: 150, type: "Maintenance", description: "Replaced kitchen faucet for Unit A-101", apartment: "Greenwood Heights", addedBy: "Landlord" },
  { id: "exp2", date: "2024-07-12", amount: 50, type: "Supplies", description: "Cleaning supplies for common areas", apartment: "Oceanview Towers", addedBy: "Landlord" },
  { id: "exp3", date: "2024-07-15", amount: 500, type: "Repairs", description: "Emergency roof repair", apartment: "Mountain Ridge Villas", addedBy: "Landlord" },
  { id: "exp4", date: "2024-07-20", amount: 200, type: "Utilities", description: "Common area electricity bill", apartment: "Greenwood Heights", addedBy: "System" },
];

export default function ManageExpensesPage() {
  const router = useRouter();

  const handleEditExpense = (id: string, description: string) => {
    alert(`Edit expense: ${description} (ID: ${id}). Functionality to be implemented.`);
    // router.push(`/dashboard/landlord/expenses/${id}/edit`); // Future: navigate to edit page
  };

  const handleDeleteExpense = (id: string, description: string) => {
    if (confirm(`Are you sure you want to delete expense: ${description}?`)) {
      alert(`Delete expense: ${description} (ID: ${id}). Functionality to be implemented.`);
      // Call an action to delete the expense
    }
  };
  
  const handleExportData = () => {
    alert(`Export expense data to CSV/Excel. To be implemented.`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/landlord">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Receipt className="mr-3 h-7 w-7" /> Manage Expenses
            </h1>
          </div>
          <Button asChild>
            <Link href="/dashboard/landlord/expenses/new">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Expense
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <CardTitle>Expense List</CardTitle>
              <CardDescription>Track and manage all property-related expenses.</CardDescription>
            </div>
            <div className="flex gap-2 items-center w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search by description..." className="pl-9 h-9 w-full sm:w-auto" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Date Range</DropdownMenuItem>
                  <DropdownMenuItem>Expense Type</DropdownMenuItem>
                  <DropdownMenuItem>Apartment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" className="h-9" onClick={handleExportData}>
                <FileDown className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {dummyExpenses.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Apartment</TableHead>
                      <TableHead>Added By</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                        <TableCell>${expense.amount.toLocaleString()}</TableCell>
                        <TableCell>{expense.type}</TableCell>
                        <TableCell className="max-w-sm truncate" title={expense.description}>{expense.description}</TableCell>
                        <TableCell>{expense.apartment || 'N/A'}</TableCell>
                        <TableCell>{expense.addedBy}</TableCell>
                        <TableCell className="text-right">
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEditExpense(expense.id, expense.description)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                onClick={() => handleDeleteExpense(expense.id, expense.description)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No expenses recorded yet.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
