
// src/app/dashboard/tenant/service-requests/new/page.tsx
"use client";

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, PlusCircle, UploadCloud, Paperclip } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const requestTypes = ["Plumbing", "Electrical", "HVAC", "Pest Control", "Leak", "General Maintenance", "Appliance Repair", "Other"];
const locations = ["Bathroom", "Kitchen", "Living Room", "Bedroom 1", "Bedroom 2", "Balcony", "General Area", "Other"];
const priorities = ["Normal", "Urgent"];

export default function SubmitServiceRequestPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    requestType: '',
    location: '',
    description: '',
    priority: 'Normal',
  });
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      // Basic validation (e.g., max 3 files, max 5MB each)
      if (mediaFiles.length + newFiles.length > 3) {
        toast({ title: "Upload Limit", description: "You can upload a maximum of 3 files.", variant: "destructive"});
        return;
      }
      newFiles.forEach(file => {
        if (file.size > 5 * 1024 * 1024) { // 5MB
          toast({ title: "File Too Large", description: `${file.name} exceeds 5MB.`, variant: "destructive"});
          return;
        }
      });
      setMediaFiles(prev => [...prev, ...newFiles.filter(f => f.size <= 5 * 1024 * 1024)].slice(0,3));
    }
  };
  
  const removeFile = (fileName: string) => {
    setMediaFiles(prev => prev.filter(file => file.name !== fileName));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.requestType || !formData.location || !formData.description) {
        toast({ title: "Missing Information", description: "Please fill all required fields.", variant: "destructive"});
        return;
    }
    const submissionData = {
      ...formData,
      mediaFileNames: mediaFiles.map(f => f.name),
    };
    console.log("New Service Request Data:", submissionData);
    toast({
      title: "Service Request Submitted",
      description: "Your request has been sent to the landlord. Request ID: SR" + Date.now().toString().slice(-4), // Placeholder ID
    });
    // Reset form or redirect
    router.push('/dashboard/tenant/service-requests');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tenant/service-requests">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
           <div>
            <Link href="/dashboard/tenant/service-requests" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to My Requests
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
                <PlusCircle className="mr-3 h-7 w-7" /> Submit New Service Request
            </h1>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>Please provide as much detail as possible about the issue.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <Label htmlFor="requestType">Request Type*</Label>
                <Select name="requestType" onValueChange={(value) => handleSelectChange("requestType", value)} value={formData.requestType} required>
                  <SelectTrigger id="requestType">
                    <SelectValue placeholder="Select type of issue" />
                  </SelectTrigger>
                  <SelectContent>
                    {requestTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location of Issue*</Label>
                <Select name="location" onValueChange={(value) => handleSelectChange("location", value)} value={formData.location} required>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Detailed Description*</Label>
                <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    placeholder="Describe the issue clearly. What happened? When did it start? Any specific observations?" 
                    required 
                    rows={5}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select name="priority" onValueChange={(value) => handleSelectChange("priority", value)} value={formData.priority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map(prio => <SelectItem key={prio} value={prio}>{prio}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                 <Label htmlFor="mediaUpload">Attach Image/Video (Optional, Max 3 files, 5MB each)</Label>
                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md hover:border-primary">
                    <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                        <div className="flex text-sm text-muted-foreground">
                        <label
                            htmlFor="mediaUpload"
                            className="relative cursor-pointer rounded-md bg-background font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                        >
                            <span>Upload files</span>
                            <Input id="mediaUpload" name="mediaUpload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,video/*" multiple/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF, MP4, MOV up to 5MB per file</p>
                    </div>
                </div>
                {mediaFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                        <p className="text-sm font-medium">Selected files:</p>
                        <ul className="list-disc pl-5 text-sm">
                        {mediaFiles.map(file => (
                            <li key={file.name} className="flex items-center justify-between">
                                <span><Paperclip className="inline mr-1 h-3 w-3"/>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                                <Button type="button" variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => removeFile(file.name)}>Remove</Button>
                            </li>
                        ))}
                        </ul>
                    </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-6 border-t">
                <Button type="submit" size="lg" className="w-full md:w-auto">
                    <PlusCircle className="mr-2 h-5 w-5" /> Submit Service Request
                </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
