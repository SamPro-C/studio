
'use server';
/**
 * @fileOverview An AI agent for generating social media snippets.
 *
 * - generateSocialMediaSnippets - A function that handles snippet generation.
 * - GenerateSocialMediaSnippetsInput - The input type.
 * - GenerateSocialMediaSnippetsOutput - The return type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
export type GenerateSocialMediaSnippetsInput = z.infer<typeof GenerateSocialMediaSnippetsInputSchema>;

const GenerateSocialMediaSnippetsOutputSchema = z.object({
  snippets: z
    .array(z.string().describe('A short, catchy social media snippet.'))
    .describe('A list of generated social media snippets (typically 3-5).'),
});
export type GenerateSocialMediaSnippetsOutput = z.infer<typeof GenerateSocialMediaSnippetsOutputSchema>;

export async function generateSocialMediaSnippets(
  input: GenerateSocialMediaSnippetsInput
): Promise<GenerateSocialMediaSnippetsOutput> {
  return generateSocialMediaSnippetsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialMediaSnippetsPrompt',
  input: {schema: GenerateSocialMediaSnippetsInputSchema},
  output: {schema: GenerateSocialMediaSnippetsOutputSchema},
  prompt: `You are an expert social media copywriter. Your task is to generate 3-5 short, catchy, and engaging social media snippets.

  Topic/Product: {{{topicOrProductName}}}
  Platform: {{{platform}}}

  Tailor the snippets for the specified platform.
  - For Twitter, be very concise and consider using relevant hashtags.
  - For LinkedIn, maintain a professional tone and focus on value.
  - For Instagram, make it visually appealing, consider emojis, and include a call to action.
  - For Facebook, aim for a friendly and engaging tone, allowing for slightly longer content.
  
  Generate distinct snippets. Ensure the output is an array of strings under the 'snippets' key.
  `,
});

const generateSocialMediaSnippetsFlow = ai.defineFlow(
  {
    name: 'generateSocialMediaSnippetsFlow',
    inputSchema: GenerateSocialMediaSnippetsInputSchema,
    outputSchema: GenerateSocialMediaSnippetsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output || !Array.isArray(output.snippets)) {
        // If the AI doesn't return the expected structure, return an empty array.
        return { snippets: [] };
    }
    return output;
  }
);
