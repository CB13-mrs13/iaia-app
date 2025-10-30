
"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";


export default function TermsOfServicePage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = translations[language].legal;
  const userNavT = translations[language].userNav;
  const homeLink = user ? "/discover" : "/";


  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.termsTitle}</h1>
          <p className="text-muted-foreground">{t.termsSubtitle}</p>
        </div>
        <Button asChild variant="outline">
          <Link href={homeLink}>
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

            <section>
                <h2 className="font-semibold text-lg">{t.accountsTitle}</h2>
                <p>{t.accountsText}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg">{t.userContentTitle}</h2>
                <p>{t.userContentText}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg">{t.intellectualPropertyTitle}</h2>
                <p>{t.intellectualPropertyText}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg">{t.trademarkTitle}</h2>
                <p>{t.trademarkText}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg">{t.terminationTitle}</h2>
                <p>{t.terminationText}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg">{t.disclaimersTitle}</h2>
                <p>{t.disclaimersText}</p>
            </section>
            
            <section>
                <h2 className="font-semibold text-lg">{t.limitationTitle}</h2>
                <p>{t.limitationText}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg">{t.changesTitle}</h2>
                <p>{t.changesText}</p>
            </section>
            
            <section>
                <h2 className="font-semibold text-lg">{t.contactTitle}</h2>
                <p dangerouslySetInnerHTML={{ __html: t.contactText }}/>
            </section>
        </CardContent>
      </Card>
    </div>
  );
}
