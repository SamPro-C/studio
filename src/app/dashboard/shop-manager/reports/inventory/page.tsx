
// src/app/dashboard/shop-manager/reports/inventory/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, FileText, Filter, FileDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ShopInventoryReportsPage() {
  const { toast } = useToast();
  const handleExport = () => toast({ title: "Exporting Report", description: "Inventory report export initiated (Placeholder)." });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/shop-manager/reports">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <FileText className="mr-3 h-7 w-7" /> Inventory Reports
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Report Filters</CardTitle>
            <CardDescription>Filter inventory data by category, stock level, etc.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            {/* Add filters like category, stock status (low, out) */}
            <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Low Stock Items</CardTitle></CardHeader>
          <CardContent className="h-60 bg-muted rounded-md flex items-center justify-center border border-dashed">
            <p className="text-muted-foreground">Low Stock Items Table Placeholder</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Full Inventory List</CardTitle></CardHeader>
          <CardContent className="h-96 bg-muted rounded-md flex items-center justify-center border border-dashed">
            <p className="text-muted-foreground">Full Inventory Table Placeholder</p>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" onClick={handleExport}><FileDown className="mr-2 h-4 w-4" /> Export Full Report</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
