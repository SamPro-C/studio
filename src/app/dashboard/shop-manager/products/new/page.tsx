
// src/app/dashboard/shop-manager/products/new/page.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, PlusCircle, UploadCloud, Image as ImageIcon, Video, ListChecks, Tag, Box, Weight,Ruler } from 'lucide-react';
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
  const [files, setFiles] = useState<File[]>([]);

  // New fields
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [attributes, setAttributes] = useState(''); // e.g., "Color: Red, Size: M"
  const [serviceDuration, setServiceDuration] = useState(''); // e.g., "1 hour", "2-3 days"
  const [availabilitySlots, setAvailabilitySlots] = useState(''); // e.g., "Mon-Fri 9-5"

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!productName || !category || !price || (!isService && !inventoryQuantity)) {
        toast({title: "Error", description: "Please fill all required fields (Name, Category, Price, and Inventory for products).", variant: "destructive"});
        return;
    }
    const newProductData = {
      productName, description, category, price, sku, 
      inventoryQuantity: isService ? 'N/A' : inventoryQuantity,
      isService,
      weight, length, width, height, attributes,
      serviceDuration: isService ? serviceDuration : undefined,
      availabilitySlots: isService ? availabilitySlots : undefined,
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
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="md:col-span-2">
                  <Label htmlFor="productName">Product/Service Name*</Label>
                  <Input id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g., Premium Coffee Beans" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed information about the item" rows={3}/>
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
                <div className="flex items-center space-x-2 mt-2 md:mt-0 md:self-end md:pb-1.5">
                    <Checkbox id="isService" checked={isService} onCheckedChange={(checked) => setIsService(checked as boolean)} />
                    <Label htmlFor="isService" className="text-sm font-medium leading-none">This is a Service</Label>
                </div>
              </div>

              {/* Inventory / Service Specifics */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-primary/90 mb-2 flex items-center">
                    {isService ? <ListChecks className="mr-2 h-5 w-5"/> : <Box className="mr-2 h-5 w-5"/>}
                    {isService ? "Service Details" : "Inventory & Physical Details"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {!isService && (
                        <div>
                            <Label htmlFor="inventoryQuantity">Inventory Quantity*</Label>
                            <Input id="inventoryQuantity" type="number" value={inventoryQuantity} onChange={(e) => setInventoryQuantity(e.target.value)} placeholder="e.g., 100" required={!isService} />
                        </div>
                    )}
                    {isService && (
                        <>
                         <div>
                            <Label htmlFor="serviceDuration">Service Duration (e.g., per session)</Label>
                            <Input id="serviceDuration" value={serviceDuration} onChange={(e) => setServiceDuration(e.target.value)} placeholder="e.g., 1 hour, 2-3 days" />
                         </div>
                         <div>
                            <Label htmlFor="availabilitySlots">Availability / Slots</Label>
                            <Input id="availabilitySlots" value={availabilitySlots} onChange={(e) => setAvailabilitySlots(e.target.value)} placeholder="e.g., Mon-Fri 9am-5pm, 10 slots/day" />
                         </div>
                        </>
                    )}
                    {!isService && (
                        <>
                        <div>
                            <Label htmlFor="weight">Weight (kg, Optional)</Label>
                            <Input id="weight" type="number" step="0.01" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 0.5" />
                        </div>
                        <div className="md:col-span-2 grid grid-cols-3 gap-x-4">
                            <div><Label htmlFor="length">Length (cm)</Label><Input id="length" type="number" step="0.1" value={length} onChange={(e) => setLength(e.target.value)} placeholder="L" /></div>
                            <div><Label htmlFor="width">Width (cm)</Label><Input id="width" type="number" step="0.1" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="W" /></div>
                            <div><Label htmlFor="height">Height (cm)</Label><Input id="height" type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="H" /></div>
                        </div>
                        </>
                    )}
                    <div className="md:col-span-2">
                        <Label htmlFor="attributes">Attributes (e.g., Color: Red, Size: M - Optional)</Label>
                        <Textarea id="attributes" value={attributes} onChange={(e) => setAttributes(e.target.value)} placeholder="Enter attributes as comma-separated pairs or one per line." rows={2}/>
                    </div>
                </div>
              </div>
              
              {/* Media Upload */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-primary/90 mb-2 flex items-center"><ImageIcon className="mr-2 h-5 w-5"/>Media</h3>
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
              </div>
            </CardContent>
            <CardFooter className="pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => router.back()} className="mr-auto">Cancel</Button>
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
