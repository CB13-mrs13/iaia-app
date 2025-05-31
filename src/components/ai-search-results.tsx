
"use client";

import Link from 'next/link';
import type { SuggestAiToolOutput } from '@/ai/flows/suggest-ai-tool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Info } from 'lucide-react';
import { aiTools } from '@/lib/data'; // To find the tool's website

interface AiSearchResultsProps {
  result: SuggestAiToolOutput;
}

export default function AiSearchResults({ result }: AiSearchResultsProps) {
  const suggestedToolDetails = aiTools.find(tool => tool.name === result.suggestedTool);

  return (
    <Card className="mt-6 bg-accent/10 border-accent/30 animate-fadeIn">
      <CardHeader>
        <div className="flex items-center">
          <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
          <CardTitle className="text-xl">AI Suggestion</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg">Suggested Tool: <span className="text-primary">{result.suggestedTool}</span></h3>
          {suggestedToolDetails && (
            <p className="text-sm text-muted-foreground">{suggestedToolDetails.description}</p>
          )}
        </div>
        <div>
          <h4 className="font-semibold flex items-center"><Info className="h-4 w-4 mr-1 text-primary"/>Reasoning:</h4>
          <p className="text-sm text-foreground/80 bg-background p-3 rounded-md border">{result.reason}</p>
        </div>
        {suggestedToolDetails && (
          <Button asChild variant="default" className="mt-2">
            <Link href={suggestedToolDetails.website} target="_blank" rel="noopener noreferrer">
              Visit {result.suggestedTool}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
