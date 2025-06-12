
// src/app/dashboard/shop-manager/products/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, PackagePlus, Filter, Search, MoreHorizontal, Eye, Edit, Trash2, Power, PowerOff, PlusCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

type ProductStatus = 'Active' | 'Inactive';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sku: string;
  stock: number;
  status: ProductStatus;
}

const dummyProducts: Product[] = [
  { id: "prod1", name: "Fresh Milk (1L)", category: "Groceries", price: 120, sku: "FM001", stock: 50, status: "Active" },
  { id: "prod2", name: "Laundry Soap (2kg)", category: "Cleaning Supplies", price: 350, sku: "LS002", stock: 0, status: "Inactive" },
  { id: "prod3", name: "Water Delivery (20L)", category: "Water Delivery", price: 250, sku: "WD001", stock: 1000, status: "Active" }, // Stock for services can be high
  { id: "prod4", name: "Basic Plumbing Check", category: "Home Maintenance", price: 1500, sku: "HM001", stock: 10, status: "Active" }, // Stock for services = available slots
];

export default function ShopProductManagementPage() {
  const { toast } = useToast();

  const handleEditProduct = (productId: string) => toast({ title: "Edit Product", description: `Editing product ${productId}. (Placeholder)` });
  const handleDeleteProduct = (productId: string) => toast({ title: "Delete Product", description: `Product ${productId} deleted. (Placeholder)`, variant: 'destructive' });
  const handleToggleStatus = (productId: string, currentStatus: ProductStatus) => toast({ title: "Toggle Status", description: `Product ${productId} status toggled to ${currentStatus === 'Active' ? 'Inactive' : 'Active'}. (Placeholder)` });

  const getStatusBadgeVariant = (status: ProductStatus) => {
    return status === 'Active' ? 'default' : 'secondary';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/shop-manager">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <PackagePlus className="mr-3 h-7 w-7" /> Product Management
            </h1>
          </div>
          <Button asChild>
            <Link href="/dashboard/shop-manager/products/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Product/Service
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Product & Service Catalog</CardTitle>
            <CardDescription>Manage your shop's inventory, add new items, and update existing ones.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
              <div className="relative lg:col-span-1">
                <label htmlFor="searchProducts" className="text-sm font-medium">Search Products</label>
                <Search className="absolute left-3 top-9 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="searchProducts" type="search" placeholder="Name, SKU..." className="pl-9 mt-1" />
              </div>
              <div>
                <label htmlFor="filterCategory" className="text-sm font-medium">Category</label>
                <Select><SelectTrigger id="filterCategory" className="mt-1"><SelectValue placeholder="All Categories" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="groceries">Groceries</SelectItem><SelectItem value="cleaning">Cleaning</SelectItem></SelectContent></Select>
              </div>
              <Button className="w-full sm:w-auto self-end"><Filter className="mr-2 h-4 w-4"/>Apply Filters</Button>
            </div>

            {dummyProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price (KES)</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">{product.price.toLocaleString()}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell className="text-right">{product.stock}</TableCell>
                        <TableCell><Badge variant={getStatusBadgeVariant(product.status)}>{product.status}</Badge></TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEditProduct(product.id)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(product.id, product.status)}>
                                {product.status === 'Active' ? <PowerOff className="mr-2 h-4 w-4"/> : <Power className="mr-2 h-4 w-4"/>}
                                {product.status === 'Active' ? 'Set Inactive' : 'Set Active'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-destructive focus:text-destructive">
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
              <p className="text-muted-foreground text-center py-8">No products or services added yet.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
