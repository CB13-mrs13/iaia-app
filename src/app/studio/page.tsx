"use client";

import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { generateImage, type GenerateImageOutput } from '@/ai/flows/generate-image-flow';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import Image from 'next/image';

const studioSchema = z.object({
  prompt: z.string().min(10, "Please describe the image in at least 10 characters.").max(1000, "Prompt is too long."),
});

type StudioFormValues = z.infer<typeof studioSchema>;

export default function StudioPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateImageOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language].studio;

  const form = useForm<StudioFormValues>({
    resolver: zodResolver(studioSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit: SubmitHandler<StudioFormValues> = async (data) => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      try {
        const generatedResult = await generateImage(data.prompt);
        setResult(generatedResult);
      } catch (e: any) {
        console.error("AI Image Generation Error:", e);
        // Use the actual error message from the server if it exists, otherwise use the generic one.
        const errorMessage = e?.message || t.errorDescription;
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: t.errorTitle,
          description: errorMessage,
        });
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </header>
      
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">{t.cardTitle}</CardTitle>
          <CardDescription>{t.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Textarea
                placeholder={t.promptPlaceholder}
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
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {t.button}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isPending && (
         <Card className="text-center p-8">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">{t.loadingText}</p>
            </div>
         </Card>
      )}

      {error && (
        <Card className="mt-4 border-destructive bg-destructive/10">
            <CardHeader>
                <CardTitle className="text-destructive text-lg">Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-destructive">{error}</p>
            </CardContent>
        </Card>
      )}
      
      {result?.imageUrl && (
        <Card className="animate-fadeIn">
            <CardHeader>
                <CardTitle>{t.resultTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                    <Image 
                        src={result.imageUrl} 
                        alt={form.getValues('prompt')}
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </CardContent>
        </Card>
      )}

      {!isPending && !result && !error && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg flex flex-col items-center gap-4 text-muted-foreground">
            <ImageIcon className="h-12 w-12" />
            <h3 className="mt-2 text-lg font-medium">{t.waitingTitle}</h3>
            <p className="mt-1 text-sm">{t.waitingDescription}</p>
        </div>
      )}

    </div>
  );
}
