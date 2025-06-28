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
import type { SupportedLanguage } from '@/contexts/language-context';

const SuggestAiToolInputSchema = z.object({
  prompt: z.string().describe('A description of the user’s needs.'),
  aiToolList: z.array(z.string()).describe('A list of available AI tools.'),
  language: z.string().describe('The language for the response (e.g., "en", "fr", "es").'),
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

const languageMap: Record<SupportedLanguage, string> = {
  en: 'English',
  fr: 'French',
  es: 'Spanish',
};

const prompt = ai.definePrompt({
  name: 'suggestAiToolPrompt',
  input: {schema: SuggestAiToolInputSchema.extend({ languageName: z.string() })},
  output: {schema: SuggestAiToolOutputSchema},
  prompt: `You are an AI tool suggestion expert. You MUST generate your entire response, including the reasoning, in the following language: {{{languageName}}}.

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
  async (input) => {
    const languageName = languageMap[input.language as SupportedLanguage] || 'English';
    const finalInput = {...input, languageName};
    const {output} = await prompt(finalInput);
    return output!;
  }
);
