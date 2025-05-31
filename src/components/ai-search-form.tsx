
"use client";

import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search } from 'lucide-react';
import { suggestAiTool, type SuggestAiToolOutput } from '@/ai/flows/suggest-ai-tool';
import { aiTools } from '@/lib/data'; // To provide list of tools to the AI
import AiSearchResults from './ai-search-results';
import { useToast } from '@/hooks/use-toast';

const searchSchema = z.object({
  prompt: z.string().min(10, { message: "Please describe your needs in at least 10 characters." }),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export default function AiSearchForm() {
  const [isPending, startTransition] = useTransition();
  const [searchResult, setSearchResult] = useState<SuggestAiToolOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit: SubmitHandler<SearchFormValues> = async (data) => {
    setError(null);
    setSearchResult(null);
    startTransition(async () => {
      try {
        const toolNames = aiTools.map(tool => tool.name);
        const result = await suggestAiTool({ prompt: data.prompt, aiToolList: toolNames });
        setSearchResult(result);
      } catch (e) {
        console.error("AI Search Error:", e);
        setError("Failed to get suggestion. Please try again.");
        toast({
          variant: "destructive",
          title: "AI Search Error",
          description: "Could not get a suggestion from the AI. Please try again later.",
        });
      }
    });
  };

  return (
    <Card className="mb-12 shadow-lg border border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">AI-Powered Tool Finder</CardTitle>
        <CardDescription>Describe what you want to achieve, and our AI will suggest the best tool for the job!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Textarea
              placeholder="e.g., 'I need to create a professional presentation with animated charts' or 'Help me write a blog post about climate change'"
              {...form.register('prompt')}
              className="min-h-[100px] focus:border-primary"
              aria-invalid={form.formState.errors.prompt ? "true" : "false"}
            />
            {form.formState.errors.prompt && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.prompt.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Get Suggestion
          </Button>
        </form>
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        {searchResult && <AiSearchResults result={searchResult} />}
      </CardContent>
    </Card>
  );
}
