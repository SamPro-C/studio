'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateProjectDescription, type GenerateProjectDescriptionInput, type GenerateProjectDescriptionOutput } from '@/ai/flows/generate-project-description';
import { Loader2, Sparkles } from 'lucide-react';

const generatorFormSchema = z.object({
  projectName: z.string().min(2, { message: 'Project name must be at least 2 characters.' }),
  projectType: z.string().min(3, { message: 'Project type must be at least 3 characters (e.g., SaaS, mobile app, video series).' }),
  projectDetails: z.string().min(20, { message: 'Project details must be at least 20 characters.' }).max(1000, { message: 'Project details must be less than 1000 characters.' }),
  targetAudience: z.string().min(3, { message: 'Target audience must be at least 3 characters (e.g., developers, small businesses).' }),
  keywords: z.string().min(3, { message: 'Please provide at least one keyword.' }),
});

type GeneratorFormValues = z.infer<typeof generatorFormSchema>;

async function handleGenerateDescription(data: GenerateProjectDescriptionInput): Promise<GenerateProjectDescriptionOutput> {
  try {
    const result = await generateProjectDescription(data);
    return result;
  } catch (error) {
    console.error("Error generating description:", error);
    throw new Error("Failed to generate description due to an AI service error.");
  }
}


export default function AIDescriptionGeneratorForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState<string | null>(null);

  const form = useForm<GeneratorFormValues>({
    resolver: zodResolver(generatorFormSchema),
    defaultValues: {
      projectName: '',
      projectType: '',
      projectDetails: '',
      targetAudience: '',
      keywords: '',
    },
  });

  async function onSubmit(data: GeneratorFormValues) {
    setIsSubmitting(true);
    setGeneratedDescription(null);
    try {
      const result = await handleGenerateDescription(data);
      if (result && result.projectDescription) {
        setGeneratedDescription(result.projectDescription);
        toast({
          title: 'Description Generated!',
          description: 'Your AI-powered project description is ready.',
        });
      } else {
         throw new Error('AI did not return a description.');
      }
    } catch (error: any) {
      toast({
        title: 'Error Generating Description',
        description: error.message || 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., My Awesome App" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Media Service, Software, App" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="projectDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the project's purpose, key features, and main goals..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Audience</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Small businesses, Tech enthusiasts, Gamers" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords (comma-separated)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., innovation, user-friendly, scalable" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Description
              </>
            )}
          </Button>
        </form>
      </Form>

      {generatedDescription && (
        <Card className="mt-8 shadow-inner">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Generated Project Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              readOnly
              value={generatedDescription}
              className="min-h-[150px] bg-muted/50 border-dashed"
              aria-label="Generated project description"
            />
             <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  navigator.clipboard.writeText(generatedDescription);
                  toast({ title: "Copied!", description: "Description copied to clipboard." });
                }}
              >
                Copy to Clipboard
              </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
