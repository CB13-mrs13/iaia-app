
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Star } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { useFavorites } from "@/hooks/use-favorites";
import { aiTools } from "@/lib/data";
import AiToolCard from "@/components/ai-tool-card";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].favoritesPage;
  const { favorites, isLoading: favoritesLoading } = useFavorites();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const isLoading = authLoading || favoritesLoading;

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.32))]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const favoriteTools = aiTools.filter(tool => favorites.includes(tool.id));

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </header>
      
      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTools.map((tool) => (
            <AiToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <Star className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">{t.noFavoritesTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.noFavoritesSubtitle}</p>
        </div>
      )}
    </div>
  );
}
