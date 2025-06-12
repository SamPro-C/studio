'use server';

/**
 * @fileOverview A project description generator AI agent.
 *
 * - generateProjectDescription - A function that handles the project description generation process.
 * - GenerateProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - GenerateProjectDescriptionOutput - The return type for the generateProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDescriptionInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectType: z
    .string()
    .describe(
      'The type of the project (e.g., media service, software development, programming project).'
    ),
  projectDetails: z
    .string()
    .describe('Detailed information about the project, including its purpose and features.'),
  targetAudience: z
    .string()
    .describe('The target audience for the project description (e.g., potential clients, investors).'),
  keywords: z.string().describe('Relevant keywords for SEO visibility.'),
});
export type GenerateProjectDescriptionInput = z.infer<
  typeof GenerateProjectDescriptionInputSchema
>;

const GenerateProjectDescriptionOutputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A compelling project description with marketing impact and SEO visibility.'),
});
export type GenerateProjectDescriptionOutput = z.infer<
  typeof GenerateProjectDescriptionOutputSchema
>;

export async function generateProjectDescription(
  input: GenerateProjectDescriptionInput
): Promise<GenerateProjectDescriptionOutput> {
  return generateProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionPrompt',
  input: {schema: GenerateProjectDescriptionInputSchema},
  output: {schema: GenerateProjectDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in generating project descriptions with marketing impact and SEO visibility.

  Based on the project details, generate a compelling project description optimized for search engines.

  Project Name: {{{projectName}}}
  Project Type: {{{projectType}}}
  Project Details: {{{projectDetails}}}
  Target Audience: {{{targetAudience}}}
  Keywords: {{{keywords}}}

  Project Description:`,
});

const generateProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionFlow',
    inputSchema: GenerateProjectDescriptionInputSchema,
    outputSchema: GenerateProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
