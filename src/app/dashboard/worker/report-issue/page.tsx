
// src/app/dashboard/worker/report-issue/page.tsx
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
import { ArrowLeft, AlertTriangle, UploadCloud, Paperclip } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Dummy data - replace with actual data
const dummyApartmentsForWorker = [
  { id: "apt1", name: "Greenwood Heights" },
  { id: "apt2", name: "Oceanview Towers" },
];
const dummyUnits: { [key: string]: { id: string, name: string }[] } = {
  "apt1": [{ id: "unit101", name: "A-101" }, { id: "unit102", name: "A-102" }],
  "apt2": [{ id: "unit505", name: "C-505" }, { id: "unit610", name: "D-610" }],
};

export default function WorkerReportIssuePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    apartmentId: '',
    unitId: '',
    description: '',
  });
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [availableUnits, setAvailableUnits] = useState<{ id: string, name: string }[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "apartmentId") {
      setAvailableUnits(dummyUnits[value] || []);
      setFormData(prev => ({ ...prev, unitId: '' }));
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      if (mediaFiles.length + newFiles.length > 3) {
        toast({ title: "Upload Limit", description: "Max 3 files.", variant: "destructive"});
        return;
      }
      setMediaFiles(prev => [...prev, ...newFiles].slice(0,3));
    }
  };
  
  const removeFile = (fileName: string) => {
    setMediaFiles(prev => prev.filter(file => file.name !== fileName));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
        toast({ title: "Missing Information", description: "Please fill title and description.", variant: "destructive"});
        return;
    }
    const submissionData = {
      ...formData,
      mediaFileNames: mediaFiles.map(f => f.name),
    };
    console.log("Worker Issue Report:", submissionData);
    toast({
      title: "Issue Reported Successfully",
      description: "Your report has been sent to the landlord.",
    });
    router.push('/dashboard/worker');
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
            <AlertTriangle className="mr-3 h-7 w-7" /> Report an Issue
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Describe the Issue</CardTitle>
            <CardDescription>Report any problems, damages, or supply needs to your landlord.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <Label htmlFor="title">Report Title*</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Damaged tool, Supply shortage" required />
              </div>
               <div className="md:col-span-2">
                <Label htmlFor="description">Detailed Description*</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Explain the issue, location, and any impact." required rows={5}/>
              </div>
              <div>
                <Label htmlFor="apartmentId">Associated Apartment (Optional)</Label>
                <Select name="apartmentId" onValueChange={(value) => handleSelectChange("apartmentId", value)} value={formData.apartmentId}>
                  <SelectTrigger id="apartmentId"><SelectValue placeholder="Select apartment" /></SelectTrigger>
                  <SelectContent>{dummyApartmentsForWorker.map(apt => <SelectItem key={apt.id} value={apt.id}>{apt.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="unitId">Associated Unit (Optional)</Label>
                <Select name="unitId" onValueChange={(value) => handleSelectChange("unitId", value)} value={formData.unitId} disabled={!formData.apartmentId || availableUnits.length === 0}>
                  <SelectTrigger id="unitId"><SelectValue placeholder="Select unit" /></SelectTrigger>
                  <SelectContent>{availableUnits.map(unit => <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                 <Label htmlFor="mediaUpload">Attach Image/Video (Optional)</Label>
                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md hover:border-primary">
                    {/* File upload UI from service request page */}
                    <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                        <div className="flex text-sm text-muted-foreground">
                        <label htmlFor="mediaUpload" className="relative cursor-pointer rounded-md bg-background font-medium text-primary hover:text-primary/80">
                            <span>Upload files</span>
                            <Input id="mediaUpload" name="mediaUpload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,video/*" multiple/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Max 3 files, 5MB each</p>
                    </div>
                </div>
                {mediaFiles.length > 0 && (
                    <div className="mt-3 space-y-2 text-sm">
                        {mediaFiles.map(file => (
                            <div key={file.name} className="flex items-center justify-between p-1 border-b">
                                <span><Paperclip className="inline mr-1 h-3 w-3"/>{file.name}</span>
                                <Button type="button" variant="ghost" size="xs" onClick={() => removeFile(file.name)}>Remove</Button>
                            </div>
                        ))}
                    </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-6 border-t">
                <Button type="submit" size="lg" className="w-full md:w-auto">
                    <AlertTriangle className="mr-2 h-5 w-5" /> Submit Report
                </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
