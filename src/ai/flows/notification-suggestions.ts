// src/ai/flows/notification-suggestions.ts
'use server';

/**
 * @fileOverview A notification suggestion AI agent.
 *
 * - generateNotificationSuggestion - A function that handles the notification suggestion process.
 * - NotificationSuggestionInput - The input type for the generateNotificationSuggestion function.
 * - NotificationSuggestionOutput - The return type for the generateNotificationSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NotificationSuggestionInputSchema = z.object({
  propertyDetails: z.string().describe('Details of the property including number of units, location, and any relevant rules or policies.'),
  tenantHistory: z.string().describe('A summary of the tenant history, including payment behavior, service requests, and any past communications.'),
  workerSchedule: z.string().describe('The current worker schedule, including assigned tasks and availability.'),
  notificationType: z.enum(['RentReminder', 'ServiceRequestUpdate', 'GeneralAnnouncement']).describe('The type of notification to generate.'),
  tone: z.enum(['Formal', 'Informal', 'Friendly']).default('Friendly').describe('The tone of the notification.'),
});
export type NotificationSuggestionInput = z.infer<typeof NotificationSuggestionInputSchema>;

const NotificationSuggestionOutputSchema = z.object({
  title: z.string().describe('The suggested title for the notification.'),
  body: z.string().describe('The suggested body for the notification.'),
});
export type NotificationSuggestionOutput = z.infer<typeof NotificationSuggestionOutputSchema>;

export async function generateNotificationSuggestion(input: NotificationSuggestionInput): Promise<NotificationSuggestionOutput> {
  return notificationSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'notificationSuggestionPrompt',
  input: {schema: NotificationSuggestionInputSchema},
  output: {schema: NotificationSuggestionOutputSchema},
  prompt: `You are an AI assistant designed to help landlords generate optimized notifications for their tenants.

  Based on the provided property details, tenant history, worker schedule, notification type and desired tone, suggest a notification title and body that is timely and relevant.

  Property Details: {{{propertyDetails}}}
  Tenant History: {{{tenantHistory}}}
  Worker Schedule: {{{workerSchedule}}}
  Notification Type: {{{notificationType}}}
  Tone: {{{tone}}}

  Follow these guidelines:
  - Be concise and clear.
  - Tailor the message to the specific tenant and situation based on their history.
  - For rent reminders, clearly state the amount due and the due date.
  - For service request updates, provide a brief summary of the current status and any next steps.
  - For general announcements, ensure the message is relevant and informative.
  - Use the specified tone throughout the message.

  Output the title and body in a JSON format.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const notificationSuggestionFlow = ai.defineFlow(
  {
    name: 'notificationSuggestionFlow',
    inputSchema: NotificationSuggestionInputSchema,
    outputSchema: NotificationSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
