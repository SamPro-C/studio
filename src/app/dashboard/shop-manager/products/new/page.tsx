
// src/app/dashboard/shop-manager/products/new/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, PlusCircle, UploadCloud, Image as ImageIcon, Video, ListChecks, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from '@/hooks/use-toast';
import { useState, FormEvent } from 'react';

// Dummy categories
const productCategories = ["Groceries", "Cleaning Supplies", "Home Maintenance", "Water Delivery", "Laundry Services", "Appliance Repair", "Pest Control", "Local Food Deliveries", "Other"];

export default function AddNewShopProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [inventoryQuantity, setInventoryQuantity] = useState('');
  const [isService, setIsService] = useState(false);
  // Placeholder for images/videos
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!productName || !category || !price || (!isService && !inventoryQuantity)) {
        toast({title: "Error", description: "Please fill all required fields.", variant: "destructive"});
        return;
    }
    const newProductData = {
      productName, description, category, price, sku, 
      inventoryQuantity: isService ? 'N/A' : inventoryQuantity,
      isService,
      fileNames: files.map(f => f.name)
    };
    console.log("New Product/Service Data:", newProductData);
    toast({ title: "Product Added", description: `${productName} has been added to the catalog.` });
    router.push('/dashboard/shop-manager/products');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/shop-manager/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
            <PlusCircle className="mr-3 h-7 w-7" /> Add New Product or Service
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Product/Service Details</CardTitle>
            <CardDescription>Fill in the information for the new item in your shop catalog.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2">
                <Label htmlFor="productName">Product/Service Name*</Label>
                <Input id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g., Premium Coffee Beans" required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed information about the item" rows={4}/>
              </div>
              <div>
                <Label htmlFor="category">Category*</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>{productCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price (KES)*</Label>
                <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 500" required />
              </div>
              <div>
                <Label htmlFor="sku">SKU (Optional)</Label>
                <Input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g., COF-PREM-250G" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1 mt-2">
                    <Checkbox id="isService" checked={isService} onCheckedChange={(checked) => setIsService(checked as boolean)} />
                    <Label htmlFor="isService" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        This is a Service (not a physical product)
                    </Label>
                </div>
                <Label htmlFor="inventoryQuantity">{isService ? "Available Slots/Capacity" : "Inventory Quantity*"}</Label>
                <Input id="inventoryQuantity" type="number" value={inventoryQuantity} onChange={(e) => setInventoryQuantity(e.target.value)} placeholder={isService ? "e.g., 10 (available slots)" : "e.g., 100"} required={!isService} />
              </div>
              
              <div className="md:col-span-2">
                 <Label htmlFor="mediaUpload">Images/Videos (Max 3 files, 5MB each)</Label>
                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md hover:border-primary">
                    <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                        <div className="flex text-sm text-muted-foreground">
                        <label htmlFor="mediaUpload" className="relative cursor-pointer rounded-md bg-background font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                            <span>Upload files</span>
                            <Input id="mediaUpload" name="mediaUpload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,video/*" multiple/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-muted-foreground">PNG, JPG, MP4 up to 5MB each</p>
                    </div>
                </div>
                {files.length > 0 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                        Selected: {files.map(f => f.name).join(', ')}
                    </div>
                )}
              </div>
              {/* TODO: Add fields for Attributes (color, size), Weight/Dimensions, Service Duration/Availability if !isService */}
            </CardContent>
            <CardFooter className="pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => router.back()} className="mr-2">Cancel</Button>
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Product/Service
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
