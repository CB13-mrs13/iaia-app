
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Star, Home } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { useFavorites } from "@/hooks/use-favorites";
import AiToolCard from "@/components/ai-tool-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAiTools } from "@/lib/firebase/firestore";
import type { AiTool } from "@/types";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].favoritesPage;
  const { favorites, isLoading: favoritesLoading } = useFavorites();

  const { data: allAiTools = [], isLoading: toolsLoading } = useQuery<AiTool[]>({
    queryKey: ['aiTools'],
    queryFn: getAiTools,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const isLoading = authLoading || favoritesLoading || toolsLoading;

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.32))]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const favoriteTools = allAiTools.filter(tool => favorites.includes(tool.id));

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/discover">
            <Home className="mr-2 h-4 w-4" />
            {t.discoverTools}
          </Link>
        </Button>
      </header>
      
      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTools.map((tool) => (
            <AiToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg flex flex-col items-center gap-4">
          <Star className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">{t.noFavoritesTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.noFavoritesSubtitle}</p>
        </div>
      )}
    </div>
  );
}
