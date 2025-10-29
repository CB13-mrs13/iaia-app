
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import type { AiTool } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCategoryIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { createSlug } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { useAuth } from '@/hooks/use-auth';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from './ui/button';

interface AiToolCardProps {
  tool: AiTool;
  featured?: boolean;
}

export default function AiToolCard({ tool, featured = false }: AiToolCardProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const toolT = t.toolPage;
  const badgesT = t.badges;
  const { user } = useAuth();
  const { isFavorite, toggleFavorite, isToggling } = useFavorites();
  const CategoryIcon = getCategoryIcon(tool.category);
  const slug = createSlug(tool.name);
  const isToolFavorite = isFavorite(tool.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the tool page
    e.stopPropagation();
    if (!isToggling) {
      toggleFavorite(tool.id);
    }
  };

  const aiHint = tool.imageKeywords || tool.name.toLowerCase().split(' ').slice(0, 2).join(' ') || `${tool.category.toLowerCase()} abstract`;
  const description = tool.description[language] || tool.description.en;

  return (
    <Link href={`/tool/${slug}`} className="flex h-full">
      <Card className={cn(
          "ai-tool-card flex flex-col h-full w-full overflow-hidden transition-all duration-300 relative group",
          featured && "featured",
          tool.pricing === 'Free' && "bg-gradient-to-br from-green-50/50 to-emerald-50/50"
        )}>
        {user && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300"
            onClick={handleFavoriteClick}
            disabled={isToggling}
            aria-label="Toggle Favorite"
          >
            <Star className={cn(
              "h-5 w-5 transition-all duration-300",
              isToolFavorite ? "text-[#FACC15] fill-[#FACC15] scale-110" : "text-muted-foreground fill-transparent"
            )} />
          </Button>
        )}
        <CardHeader className="flex-shrink-0 p-5">
          {tool.imageUrl && (
            <div className="relative w-full h-44 mb-4 overflow-hidden rounded-lg group-hover:scale-[1.02] transition-transform duration-300">
              {/* Test temporaire : img natif pour debug chemin */}
              <img
                src={tool.imageUrl}
                alt={tool.name}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                data-ai-hint={aiHint}
                className="brightness-95 group-hover:brightness-100 transition-all duration-300"
              />
              {/* Remettre <Image ... /> après debug */}
            </div>
          )}
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-xl font-bold leading-tight">{tool.name}</CardTitle>
            {CategoryIcon && <CategoryIcon className="h-7 w-7 text-primary flex-shrink-0 mt-0.5" />}
          </div>
          <div className="flex flex-wrap gap-2 pt-3 min-h-[2.25rem]">
             {(featured || tool.isSponsored) && (
              <Badge variant="default" className={cn(
                "font-semibold shadow-sm",
                featured && !tool.isSponsored && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}>
                {tool.isSponsored ? toolT.sponsored : (featured ? badgesT.featured : "")}
              </Badge>
            )}
            {tool.pricing === 'Free' && (
               <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700 font-semibold shadow-sm">
                {badgesT.free}
              </Badge>
            )}
          </div>
          <CardDescription className="text-sm text-muted-foreground min-h-[3rem] pt-2 leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end p-5 pt-0">
           <div className="space-y-3 mt-auto">
            {tool.tags && tool.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tool.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border border-black bg-transparent">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
              {tool.pricing && (
                <p className="font-medium pt-2">
                  {toolT.pricingLabel}: 
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ml-1.5",
                    tool.pricing === 'Free' 
                      ? "bg-green-600 text-white" 
                      : "border border-black text-black bg-transparent"
                  )}>
                    {tool.pricing}
                  </span>
                </p>
              )}
              {tool.rating && (
                <div className="flex items-center font-medium pt-2">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1.5" />
                  <span className="text-foreground">{tool.rating.toFixed(1)}</span>
                  <span className="mx-0.5">/</span>
                  <span>5.0</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
