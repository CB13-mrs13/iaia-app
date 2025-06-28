
"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, ShieldCheck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function TermsOfServicePage() {
  const { language } = useLanguage();
  const t = translations[language].legal;
  const userNavT = translations[language].userNav;


  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.termsTitle}</h1>
          <p className="text-muted-foreground">{t.termsSubtitle}</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/discover">
            <Home className="mr-2 h-4 w-4" />
            {userNavT.home}
          </Link>
        </Button>
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

    