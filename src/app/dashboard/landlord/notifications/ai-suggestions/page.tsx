
// src/app/dashboard/landlord/notifications/ai-suggestions/page.tsx
"use client";

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, BotMessageSquare, Copy, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  generateNotificationSuggestion, 
  type NotificationSuggestionInput, 
  type NotificationSuggestionOutput 
} from '@/ai/flows/notification-suggestions';

export default function AiNotificationSuggestionsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<NotificationSuggestionOutput | null>(null);
  const [copiedField, setCopiedField] = useState<'title' | 'body' | null>(null);

  const [formData, setFormData] = useState<NotificationSuggestionInput>({
    propertyDetails: '',
    tenantHistory: '',
    workerSchedule: '',
    notificationType: 'GeneralAnnouncement',
    tone: 'Friendly',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof NotificationSuggestionInput, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await generateNotificationSuggestion(formData);
      setSuggestion(result);
      toast({
        title: "Suggestion Generated",
        description: "AI has provided a notification suggestion.",
      });
    } catch (error) {
      console.error("Error generating notification suggestion:", error);
      toast({
        title: "Error",
        description: "Failed to generate notification suggestion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, field: 'title' | 'body') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
      toast({ description: `${field.charAt(0).toUpperCase() + field.slice(1)} copied to clipboard!` });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({ description: `Failed to copy ${field}.`, variant: "destructive" });
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/landlord/notifications">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Link href="/dashboard/landlord/notifications" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Back to Notifications Center
            </Link>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <BotMessageSquare className="mr-3 h-7 w-7" /> AI Notification Assistant
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Provide Context</CardTitle>
              <CardDescription>
                Fill in the details below to help the AI generate a relevant notification.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="propertyDetails">Property Details</Label>
                  <Textarea
                    id="propertyDetails"
                    name="propertyDetails"
                    value={formData.propertyDetails}
                    onChange={handleInputChange}
                    placeholder="e.g., 10-unit building at 123 Main St. Quiet hours 10 PM - 8 AM. No pets."
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tenantHistory">Tenant History / Context</Label>
                  <Textarea
                    id="tenantHistory"
                    name="tenantHistory"
                    value={formData.tenantHistory}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe in Unit 5B. Usually pays on time. Recently reported a leaky faucet."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="workerSchedule">Worker Schedule / Context</Label>
                  <Textarea
                    id="workerSchedule"
                    name="workerSchedule"
                    value={formData.workerSchedule}
                    onChange={handleInputChange}
                    placeholder="e.g., Plumber Mike available Mon-Fri 9-5. Electrician booked for next week."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="notificationType">Notification Type</Label>
                  <Select
                    name="notificationType"
                    value={formData.notificationType}
                    onValueChange={(value) => handleSelectChange('notificationType', value)}
                    required
                  >
                    <SelectTrigger id="notificationType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RentReminder">Rent Reminder</SelectItem>
                      <SelectItem value="ServiceRequestUpdate">Service Request Update</SelectItem>
                      <SelectItem value="GeneralAnnouncement">General Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tone">Desired Tone</Label>
                  <Select
                    name="tone"
                    value={formData.tone}
                    onValueChange={(value) => handleSelectChange('tone', value)}
                    required
                  >
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Formal">Formal</SelectItem>
                      <SelectItem value="Informal">Informal</SelectItem>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Suggestion"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="lg:sticky lg:top-24 self-start">
            <CardHeader>
              <CardTitle>AI Suggested Notification</CardTitle>
              <CardDescription>
                Review the AI-generated title and body below. Copy and use as needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading && (
                <div className="flex items-center justify-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {!isLoading && !suggestion && (
                <div className="text-center py-10 text-muted-foreground">
                  <BotMessageSquare className="mx-auto h-12 w-12 mb-2" />
                  <p>Your AI-generated notification will appear here once you submit the form.</p>
                </div>
              )}
              {suggestion && (
                <>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <Label htmlFor="suggestedTitle" className="font-semibold">Suggested Title</Label>
                      <Button variant="ghost" size="sm" onClick={() => handleCopy(suggestion.title, 'title')}>
                        {copiedField === 'title' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        <span className="ml-1">{copiedField === 'title' ? 'Copied!' : 'Copy'}</span>
                      </Button>
                    </div>
                    <Input id="suggestedTitle" value={suggestion.title} readOnly className="bg-muted" />
                  </div>
                  <div>
                     <div className="flex justify-between items-center mb-1">
                        <Label htmlFor="suggestedBody" className="font-semibold">Suggested Body</Label>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(suggestion.body, 'body')}>
                            {copiedField === 'body' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            <span className="ml-1">{copiedField === 'body' ? 'Copied!' : 'Copy'}</span>
                        </Button>
                    </div>
                    <Textarea
                      id="suggestedBody"
                      value={suggestion.body}
                      readOnly
                      rows={10}
                      className="bg-muted"
                    />
                  </div>
                </>
              )}
            </CardContent>
            {suggestion && (
                 <CardFooter>
                    <p className="text-xs text-muted-foreground">
                        Remember to review and customize the suggestion to perfectly fit your needs before sending.
                    </p>
                 </CardFooter>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
