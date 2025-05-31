// src/ai/flows/suggest-ai-tool.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting the most suitable AI tool based on a user-provided prompt.
 *
 * - suggestAiTool - A function that takes a user prompt and returns a suggested AI tool.
 * - SuggestAiToolInput - The input type for the suggestAiTool function.
 * - SuggestAiToolOutput - The return type for the suggestAiTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAiToolInputSchema = z.object({
  prompt: z.string().describe('A description of the user\u2019s needs.'),
  aiToolList: z.array(z.string()).describe('A list of available AI tools.'),
});
export type SuggestAiToolInput = z.infer<typeof SuggestAiToolInputSchema>;

const SuggestAiToolOutputSchema = z.object({
  suggestedTool: z.string().describe('The name of the most suitable AI tool.'),
  reason: z.string().describe('The reason why this tool is suggested.'),
});
export type SuggestAiToolOutput = z.infer<typeof SuggestAiToolOutputSchema>;

export async function suggestAiTool(input: SuggestAiToolInput): Promise<SuggestAiToolOutput> {
  return suggestAiToolFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAiToolPrompt',
  input: {schema: SuggestAiToolInputSchema},
  output: {schema: SuggestAiToolOutputSchema},
  prompt: `You are an AI tool suggestion expert. Given the user's prompt and a list of available AI tools, you will suggest the most suitable AI tool and explain why.

User Prompt: {{{prompt}}}

Available AI Tools: {{#each aiToolList}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
`,
});

const suggestAiToolFlow = ai.defineFlow(
  {
    name: 'suggestAiToolFlow',
    inputSchema: SuggestAiToolInputSchema,
    outputSchema: SuggestAiToolOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
