
// src/app/dashboard/shop-manager/products/[productId]/edit/page.tsx
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Save, UploadCloud, Image as ImageIcon, ListChecks, Tag, Box, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from '@/hooks/use-toast';
import { useState, FormEvent, useEffect } from 'react';

// Dummy categories (consistent with add new product page)
const productCategories = ["Groceries", "Cleaning Supplies", "Home Maintenance", "Water Delivery", "Laundry Services", "Appliance Repair", "Pest Control", "Local Food Deliveries", "Other"];

interface ProductFormData {
  productName: string;
  description: string;
  category: string;
  price: string;
  sku: string;
  inventoryQuantity: string;
  isService: boolean;
  weight: string;
  length: string;
  width: string;
  height: string;
  attributes: string;
  serviceDuration: string;
  availabilitySlots: string;
}

// Dummy product data for editing
const dummyProductData: { [key: string]: ProductFormData } = {
  "prod1": {
    productName: "Fresh Milk (1L)",
    description: "Full cream pasteurized fresh milk.",
    category: "Groceries",
    price: "120",
    sku: "FM001",
    inventoryQuantity: "50",
    isService: false,
    weight: "1",
    length: "7",
    width: "7",
    height: "20",
    attributes: "Brand: KCC, Type: Full Cream",
    serviceDuration: "",
    availabilitySlots: "",
  },
  "prod4": {
    productName: "Basic Plumbing Check",
    description: "Comprehensive check of all plumbing fixtures in one unit.",
    category: "Home Maintenance",
    price: "1500",
    sku: "HM001",
    inventoryQuantity: "", // N/A for service
    isService: true,
    weight: "",
    length: "",
    width: "",
    height: "",
    attributes: "Includes: Tap check, Drain check, Leak detection",
    serviceDuration: "Approx. 1-2 hours",
    availabilitySlots: "Mon-Fri, 9am-4pm, By Appointment",
  }
};


export default function EditShopProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ProductFormData | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    // Simulate fetching product data
    const productToEdit = dummyProductData[productId];
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData(null); // Product not found
    }
  }, [productId]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSelectChange = (name: keyof ProductFormData, value: string) => {
     setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleCheckboxChange = (name: keyof ProductFormData, checked: boolean) => {
    setFormData(prev => prev ? { ...prev, [name]: checked } : null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData) {
        toast({title: "Error", description: "Product data not loaded.", variant: "destructive"});
        return;
    }
    if (!formData.productName || !formData.category || !formData.price || (!formData.isService && !formData.inventoryQuantity)) {
        toast({title: "Error", description: "Please fill all required fields (Name, Category, Price, and Inventory for products).", variant: "destructive"});
        return;
    }
    const updatedProductData = {
      ...formData,
      fileNames: files.map(f => f.name)
    };
    console.log("Updated Product/Service Data for ID " + productId + ":", updatedProductData);
    toast({ title: "Product Updated", description: `${formData.productName} has been updated successfully.` });
    router.push('/dashboard/shop-manager/products');
  };

  if (formData === null && productId) { // If product ID exists but data is null (not found)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-4">The product with ID <span className="font-mono bg-muted px-1">{productId}</span> could not be found for editing.</p>
        <Button asChild><Link href="/dashboard/shop-manager/products">Back to Products</Link></Button>
      </div>
    );
  }
  
  if (!formData) { // Initial loading state before useEffect sets data
      return <div className="flex min-h-screen items-center justify-center"><p>Loading product data...</p></div>;
  }


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
            Edit: {formData.productName || "Product/Service"}
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Edit Product/Service Details</CardTitle>
            <CardDescription>Modify the information for this item in your shop catalog.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="md:col-span-2">
                  <Label htmlFor="productName">Product/Service Name*</Label>
                  <Input id="productName" name="productName" value={formData.productName} onChange={handleInputChange} placeholder="e.g., Premium Coffee Beans" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Detailed information about the item" rows={3}/>
                </div>
                <div>
                  <Label htmlFor="category">Category*</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)} required>
                    <SelectTrigger id="category"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>{productCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Price (KES)*</Label>
                  <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="e.g., 500" required />
                </div>
                <div>
                  <Label htmlFor="sku">SKU (Optional)</Label>
                  <Input id="sku" name="sku" value={formData.sku} onChange={handleInputChange} placeholder="e.g., COF-PREM-250G" />
                </div>
                <div className="flex items-center space-x-2 mt-2 md:mt-0 md:self-end md:pb-1.5">
                    <Checkbox id="isService" name="isService" checked={formData.isService} onCheckedChange={(checked) => handleCheckboxChange("isService", checked as boolean)} />
                    <Label htmlFor="isService" className="text-sm font-medium leading-none">This is a Service</Label>
                </div>
              </div>

              {/* Inventory / Service Specifics */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-primary/90 mb-2 flex items-center">
                    {formData.isService ? <ListChecks className="mr-2 h-5 w-5"/> : <Box className="mr-2 h-5 w-5"/>}
                    {formData.isService ? "Service Details" : "Inventory & Physical Details"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {!formData.isService && (
                        <div>
                            <Label htmlFor="inventoryQuantity">Inventory Quantity*</Label>
                            <Input id="inventoryQuantity" name="inventoryQuantity" type="number" value={formData.inventoryQuantity} onChange={handleInputChange} placeholder="e.g., 100" required={!formData.isService} />
                        </div>
                    )}
                    {formData.isService && (
                        <>
                         <div>
                            <Label htmlFor="serviceDuration">Service Duration (e.g., per session)</Label>
                            <Input id="serviceDuration" name="serviceDuration" value={formData.serviceDuration} onChange={handleInputChange} placeholder="e.g., 1 hour, 2-3 days" />
                         </div>
                         <div>
                            <Label htmlFor="availabilitySlots">Availability / Slots</Label>
                            <Input id="availabilitySlots" name="availabilitySlots" value={formData.availabilitySlots} onChange={handleInputChange} placeholder="e.g., Mon-Fri 9am-5pm, 10 slots/day" />
                         </div>
                        </>
                    )}
                    {!formData.isService && (
                        <>
                        <div>
                            <Label htmlFor="weight">Weight (kg, Optional)</Label>
                            <Input id="weight" name="weight" type="number" step="0.01" value={formData.weight} onChange={handleInputChange} placeholder="e.g., 0.5" />
                        </div>
                        <div className="md:col-span-2 grid grid-cols-3 gap-x-4">
                            <div><Label htmlFor="length">Length (cm)</Label><Input id="length" name="length" type="number" step="0.1" value={formData.length} onChange={handleInputChange} placeholder="L" /></div>
                            <div><Label htmlFor="width">Width (cm)</Label><Input id="width" name="width" type="number" step="0.1" value={formData.width} onChange={handleInputChange} placeholder="W" /></div>
                            <div><Label htmlFor="height">Height (cm)</Label><Input id="height" name="height" type="number" step="0.1" value={formData.height} onChange={handleInputChange} placeholder="H" /></div>
                        </div>
                        </>
                    )}
                    <div className="md:col-span-2">
                        <Label htmlFor="attributes">Attributes (e.g., Color: Red, Size: M - Optional)</Label>
                        <Textarea id="attributes" name="attributes" value={formData.attributes} onChange={handleInputChange} placeholder="Enter attributes as comma-separated pairs or one per line." rows={2}/>
                    </div>
                </div>
              </div>
              
              {/* Media Upload */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-primary/90 mb-2 flex items-center"><ImageIcon className="mr-2 h-5 w-5"/>Media</h3>
                <div className="md:col-span-2">
                    <Label htmlFor="mediaUpload">Upload New Images/Videos (Replaces existing. Max 3 files, 5MB each)</Label>
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
                            Selected new files: {files.map(f => f.name).join(', ')}
                        </div>
                    )}
                    {/* Placeholder to show existing files if any */}
                    <p className="text-xs text-muted-foreground mt-2">Current media files will be replaced if new ones are uploaded.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => router.back()} className="mr-auto">Cancel</Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
