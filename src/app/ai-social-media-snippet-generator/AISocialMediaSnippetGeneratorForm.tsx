
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateSocialMediaSnippets, type GenerateSocialMediaSnippetsInput, type GenerateSocialMediaSnippetsOutput } from '@/ai/flows/generate-social-media-snippet';
import { Loader2, Sparkles } from 'lucide-react';
import * as z from 'zod';

// Define the schema locally for form validation
const GenerateSocialMediaSnippetsInputSchema = z.object({
  topicOrProductName: z
    .string()
    .min(3, { message: 'Topic or product name must be at least 3 characters.' })
    .max(100, { message: 'Topic or product name must be less than 100 characters.' })
    .describe('The topic or product name to generate snippets for.'),
  platform: z
    .enum(['Twitter', 'LinkedIn', 'Instagram', 'Facebook'], {
      errorMap: () => ({ message: 'Please select a valid platform.' }),
    })
    .describe('The target social media platform.'),
});


type GeneratorFormValues = GenerateSocialMediaSnippetsInput;

const socialMediaPlatforms: GenerateSocialMediaSnippetsInput['platform'][] = ['Twitter', 'LinkedIn', 'Instagram', 'Facebook'];

async function handleGenerateSnippets(data: GenerateSocialMediaSnippetsInput): Promise<GenerateSocialMediaSnippetsOutput> {
  try {
    const result = await generateSocialMediaSnippets(data);
    return result;
  } catch (error) {
    console.error("Error generating snippets:", error);
    throw new Error("Failed to generate snippets due to an AI service error.");
  }
}

export default function AISocialMediaSnippetGeneratorForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedSnippets, setGeneratedSnippets] = useState<string[] | null>(null);

  const form = useForm<GeneratorFormValues>({
    resolver: zodResolver(GenerateSocialMediaSnippetsInputSchema),
    defaultValues: {
      topicOrProductName: '',
      platform: undefined, // Or a default platform like 'Twitter'
    },
  });

  async function onSubmit(data: GeneratorFormValues) {
    setIsSubmitting(true);
    setGeneratedSnippets(null);
    try {
      const result = await handleGenerateSnippets(data);
      if (result && result.snippets && result.snippets.length > 0) {
        setGeneratedSnippets(result.snippets);
        toast({
          title: 'Snippets Generated!',
          description: 'Your AI-powered social media snippets are ready.',
        });
      } else if (result && result.snippets && result.snippets.length === 0) {
        setGeneratedSnippets([]);
        toast({
          title: 'No Snippets Generated',
          description: 'The AI couldn\'t generate snippets for this input. Try adjusting your topic or platform.',
          variant: 'default',
        });
      }
      else {
         throw new Error('AI did not return any snippets.');
      }
    } catch (error: any) {
      toast({
        title: 'Error Generating Snippets',
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
          <FormField
            control={form.control}
            name="topicOrProductName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic or Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., New Summer Collection, AI in Healthcare" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Media Platform</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {socialMediaPlatforms.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                Generate Snippets
              </>
            )}
          </Button>
        </form>
      </Form>

      {generatedSnippets && generatedSnippets.length > 0 && (
        <Card className="mt-8 shadow-inner">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Generated Social Media Snippets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedSnippets.map((snippet, index) => (
              <div key={index}>
                <Textarea
                  readOnly
                  value={snippet}
                  className="min-h-[80px] bg-muted/50 border-dashed"
                  aria-label={`Generated snippet ${index + 1}`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    navigator.clipboard.writeText(snippet);
                    toast({ title: "Copied!", description: `Snippet ${index + 1} copied to clipboard.` });
                  }}
                >
                  Copy Snippet {index + 1}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      {generatedSnippets && generatedSnippets.length === 0 && !isSubmitting && (
          <Card className="mt-8 shadow-inner">
              <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-primary" />
                      Generated Social Media Snippets
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">No snippets were generated for the provided input. Please try adjusting your topic or platform, or try again.</p>
              </CardContent>
          </Card>
      )}
    </>
  );
}
