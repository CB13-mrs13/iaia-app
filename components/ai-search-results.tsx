
"use client";

import Link from 'next/link';
import type { SuggestAiToolOutput } from '@/ai/flows/suggest-ai-tool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Info } from 'lucide-react';
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
          <h4 className="font-semibold flex items-center text-base"><Info className="h-5 w-5 mr-2 text-primary"/>{t.reasoningLabel}:</h4>
          <p className="text-base text-foreground/90 bg-background p-4 rounded-md border leading-relaxed mt-2">{result.reason}</p>
        </div>
        {result.toolSlug && result.suggestedTool && (
          <div className="mt-6 pt-4 border-t">
            <Link href={`/tool/${result.toolSlug}`}>
              <Button variant="default" size="lg" className="w-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-shadow min-h-[3rem] whitespace-normal">
                {t.learnMoreButton.replace('{toolName}', result.suggestedTool)} →
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
