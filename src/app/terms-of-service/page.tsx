
"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, ShieldCheck } from "lucide-react";

export default function TermsOfServicePage() {
  const { language } = useLanguage();
  const t = translations[language].legal;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{t.termsTitle}</h1>
        <p className="text-muted-foreground">{t.termsSubtitle}</p>
      </header>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>{t.termsTitle}</CardTitle>
          <CardDescription>{t.lastUpdated}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 prose prose-sm max-w-none text-foreground/90">
            <Alert variant="destructive">
                <ShieldCheck className="h-4 w-4" />
                <AlertTitle>{t.disclaimer}</AlertTitle>
                <AlertDescription>{t.disclaimerText}</AlertDescription>
            </Alert>
            
            <section>
                <h2 className="font-semibold text-lg">{t.introductionTitle}</h2>
                <p>{t.termsIntro}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg">{t.useOfServiceTitle}</h2>
                <p>{t.useOfServiceText}</p>
            </section>
        </CardContent>
      </Card>
    </div>
  );
}

    