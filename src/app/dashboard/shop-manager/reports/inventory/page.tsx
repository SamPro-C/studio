
// /src/app/dashboard/shop-manager/reports/inventory/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, FileText, Filter, FileDown, PackageSearch, ShoppingBag, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip as ShadTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const dummyInventory: InventoryItem[] = [
  { id: "prod1", name: "Fresh Milk (1L)", sku: "FM001", category: "Groceries", price: 120, stock: 50, lowStockThreshold: 10, status: "In Stock" },
  { id: "prod2", name: "Laundry Soap (2kg)", sku: "LS002", category: "Cleaning Supplies", price: 350, stock: 5, lowStockThreshold: 5, status: "Low Stock" },
  { id: "prod3", name: "20L Water Refill", sku: "WD001", category: "Water Delivery", price: 200, stock: 100, lowStockThreshold: 20, status: "In Stock" },
  { id: "prod4", name: "Imported Coffee Beans", sku: "CB005", category: "Groceries", price: 800, stock: 0, lowStockThreshold: 3, status: "Out of Stock" },
  { id: "prod5", name: "Hand Sanitizer (500ml)", sku: "HS010", category: "Cleaning Supplies", price: 250, stock: 15, lowStockThreshold: 10, status: "In Stock" },
  { id: "prod6", name: "Cooking Oil (2L)", sku: "CO002", category: "Groceries", price: 450, stock: 8, lowStockThreshold: 10, status: "Low Stock" },
];

const lowStockItems = dummyInventory.filter(item => item.status === "Low Stock" || item.status === "Out of Stock");

const stockByCategoryData = [
    { category: "Groceries", stock: dummyInventory.filter(i => i.category === "Groceries").reduce((sum, item) => sum + item.stock, 0) },
    { category: "Cleaning", stock: dummyInventory.filter(i => i.category === "Cleaning Supplies").reduce((sum, item) => sum + item.stock, 0) },
    { category: "Water", stock: dummyInventory.filter(i => i.category === "Water Delivery").reduce((sum, item) => sum + item.stock, 0) },
].filter(c => c.stock > 0);

const stockCategoryChartConfig = {
  stock: { label: "Total Stock" },
  Groceries: { label: "Groceries", color: "hsl(var(--chart-1))" },
  Cleaning: { label: "Cleaning", color: "hsl(var(--chart-2))" },
  Water: { label: "Water", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const stockStatusDistributionData = [
  { name: "In Stock", value: dummyInventory.filter(i => i.status === "In Stock").length, fill: "hsl(var(--chart-2))" },
  { name: "Low Stock", value: dummyInventory.filter(i => i.status === "Low Stock").length, fill: "hsl(var(--chart-4))" },
  { name: "Out of Stock", value: dummyInventory.filter(i => i.status === "Out of Stock").length, fill: "hsl(var(--chart-5))" },
].filter(s => s.value > 0);

const stockStatusChartConfig = {
  value: { label: "Item Count" },
  "In Stock": { label: "In Stock", color: "hsl(var(--chart-2))" },
  "Low Stock": { label: "Low Stock", color: "hsl(var(--chart-4))" },
  "Out of Stock": { label: "Out of Stock", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;


export default function ShopInventoryReportsPage() {
  const { toast } = useToast();
  const handleExport = (reportType: 'low_stock' | 'full_inventory') => toast({ title: "Exporting Report", description: `${reportType.replace('_', ' ')} report export initiated (Placeholder).` });

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
            <PackageSearch className="mr-3 h-7 w-7" /> Inventory Reports
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5 text-primary/80"/> Report Filters</CardTitle>
            <CardDescription>Filter inventory data by category, stock level, etc.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="categoryFilter">Category</Label>
              <Select><SelectTrigger id="categoryFilter"><SelectValue placeholder="All Categories"/></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="groceries">Groceries</SelectItem><SelectItem value="cleaning">Cleaning Supplies</SelectItem><SelectItem value="water">Water Delivery</SelectItem></SelectContent></Select>
            </div>
            <div>
              <Label htmlFor="stockStatusFilter">Stock Status</Label>
              <Select><SelectTrigger id="stockStatusFilter"><SelectValue placeholder="All Statuses"/></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="in_stock">In Stock</SelectItem><SelectItem value="low_stock">Low Stock</SelectItem><SelectItem value="out_of_stock">Out of Stock</SelectItem></SelectContent></Select>
            </div>
            <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary/80"/> Stock Levels by Category</CardTitle>
                    <CardDescription>Total stock quantity for major product categories.</CardDescription>
                </CardHeader>
                <CardContent>
                    {stockByCategoryData.length > 0 ? (
                        <ChartContainer config={stockCategoryChartConfig} className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stockByCategoryData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} className="text-xs"/>
                            <YAxis allowDecimals={false} tickLine={false} axisLine={false} tickMargin={8} width={30} className="text-xs"/>
                            <ShadTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="stock" fill="var(--color-stock)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        </ChartContainer>
                    ) : (
                        <div className="h-[300px] bg-muted rounded-md flex items-center justify-center border border-dashed">
                            <p className="text-muted-foreground">No stock data for category chart.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><PieChartIcon className="mr-2 h-5 w-5 text-primary/80"/> Stock Status Distribution</CardTitle>
                    <CardDescription>Overall distribution of item stock statuses.</CardDescription>
                </CardHeader>
                <CardContent>
                    {stockStatusDistributionData.length > 0 ? (
                        <ChartContainer config={stockStatusChartConfig} className="mx-auto aspect-square max-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                            <ShadTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="name" />} />
                            <Pie data={stockStatusDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                {stockStatusDistributionData.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                        </ChartContainer>
                    ) : (
                        <div className="h-[300px] bg-muted rounded-md flex items-center justify-center border border-dashed">
                            <p className="text-muted-foreground">No stock status data for chart.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Low Stock / Out of Stock Items</CardTitle>
             <Button variant="outline" size="sm" onClick={() => handleExport('low_stock')}><FileDown className="mr-2 h-4 w-4" /> Export Low Stock</Button>
          </CardHeader>
          <CardContent>
            {lowStockItems.length > 0 ? (
              <Table>
                <TableHeader><TableRow><TableHead>Product Name</TableHead><TableHead>SKU</TableHead><TableHead className="text-right">Current Stock</TableHead><TableHead className="text-right">Threshold</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {lowStockItems.map(item => (
                    <TableRow key={item.id} className={item.status === 'Out of Stock' ? 'bg-destructive/10' : item.status === 'Low Stock' ? 'bg-amber-500/10' : ''}>
                      <TableCell>{item.name}</TableCell><TableCell>{item.sku}</TableCell><TableCell className="text-right">{item.stock}</TableCell><TableCell className="text-right">{item.lowStockThreshold}</TableCell><TableCell><Badge variant={item.status === 'Out of Stock' ? 'destructive' : 'secondary'}>{item.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-6">No items are currently low on stock or out of stock.</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Full Inventory List</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleExport('full_inventory')}><FileDown className="mr-2 h-4 w-4" /> Export Full Inventory</Button>
          </CardHeader>
          <CardContent>
             {dummyInventory.length > 0 ? (
              <Table>
                <TableHeader><TableRow><TableHead>Product Name</TableHead><TableHead>SKU</TableHead><TableHead>Category</TableHead><TableHead className="text-right">Price</TableHead><TableHead className="text-right">Stock</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {dummyInventory.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell><TableCell>{item.sku}</TableCell><TableCell>{item.category}</TableCell><TableCell className="text-right">{item.price.toLocaleString()}</TableCell><TableCell className="text-right">{item.stock}</TableCell><TableCell><Badge variant={item.status === 'Out of Stock' ? 'destructive' : item.status === 'Low Stock' ? 'secondary' : 'default'}>{item.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-6">No inventory items found.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
