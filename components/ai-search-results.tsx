
"use client";

import Link from 'next/link';
import type { SuggestAiToolOutput } from '@/ai/flows/suggest-ai-tool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Info } from 'lucide-react';
import { createSlug } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';

interface AiSearchResultsProps {
  result: SuggestAiToolOutput;
}

export default function AiSearchResults({ result }: AiSearchResultsProps) {
  const { language } = useLanguage();
  const t = translations[language].aiSearchResults;

  return (
    <Card className="mt-6 bg-accent/10 border-accent/30 animate-fadeIn">
      <CardHeader>
        <div className="flex items-center">
          <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
          <CardTitle className="text-xl">{t.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg">{t.suggestedToolLabel}: <span className="text-primary">{result.suggestedTool}</span></h3>
          
        </div>
        <div>
          <h4 className="font-semibold flex items-center"><Info className="h-4 w-4 mr-1 text-primary"/>{t.reasoningLabel}:</h4>
          <p className="text-sm text-foreground/80 bg-background p-3 rounded-md border">{result.reason}</p>
        </div>
        {result.suggestedTool && (
          <Button asChild variant="default" className="mt-2">
            <Link href={`/tool/${createSlug(result.suggestedTool)}`}>
              {t.learnMoreButton.replace('{toolName}', result.suggestedTool)}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
