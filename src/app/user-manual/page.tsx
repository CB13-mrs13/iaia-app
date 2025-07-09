
"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookUser, Compass, Sparkles, Star, UserCog, Info, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

export default function UserManualPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = translations[language].userManualPage;
  const userNavT = translations[language].userNav;
  const homeLink = user ? "/discover" : "/";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
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
          <CardTitle className="flex items-center gap-2"><BookUser className="h-6 w-6" /> {t.introTitle}</CardTitle>
          <CardDescription>{t.introText}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 prose prose-sm max-w-none text-foreground/90">
            <section>
                <h2 className="font-semibold text-lg flex items-center gap-2"><Compass className="h-5 w-5 text-primary" />{t.discoverTitle}</h2>
                <p dangerouslySetInnerHTML={{ __html: t.discoverText1 }} />
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: t.discoverText2 }} />
            </section>

            <section>
                <h2 className="font-semibold text-lg flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />{t.aiSearchTitle}</h2>
                <p>{t.aiSearchText1}</p>
                <p dangerouslySetInnerHTML={{ __html: t.aiSearchText2 }} />
            </section>

            <section>
                <h2 className="font-semibold text-lg flex items-center gap-2"><Star className="h-5 w-5 text-primary" />{t.favoritesTitle}</h2>
                <p>{t.favoritesText1}</p>
                <p dangerouslySetInnerHTML={{ __html: t.favoritesText2 }} />
            </section>

            <section>
                <h2 className="font-semibold text-lg flex items-center gap-2"><UserCog className="h-5 w-5 text-primary" />{t.accountTitle}</h2>
                <p>{t.accountText1}</p>
            </section>

            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>{t.tipTitle}</AlertTitle>
                <AlertDescription>{t.tipText}</AlertDescription>
            </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
