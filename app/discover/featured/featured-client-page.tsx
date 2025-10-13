
"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import AiToolCard from "@/components/ai-tool-card";
import type { AiTool } from "@/types";

interface FeaturedClientPageProps {
  featuredTools: AiTool[];
}

export default function FeaturedClientPage({ featuredTools }: FeaturedClientPageProps) {
  const { language } = useLanguage();
  const t = translations[language].featuredPage;

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <Star className="h-7 w-7 text-primary" />
            {t.title}
          </h1>
          <p className="text-muted-foreground mt-2">{t.subtitle}</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/discover">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToDiscover}
          </Link>
        </Button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredTools.map((tool) => (
          <AiToolCard key={tool.id} tool={tool} featured />
        ))}
      </div>
    </div>
  );
}
