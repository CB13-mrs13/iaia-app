
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import type { AiTool } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCategoryIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { createSlug } from '@/lib/data';
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
  const t = translations[language].toolPage;
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
          "flex flex-col h-full w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg relative",
          featured && "border-2 border-accent shadow-accent/20"
        )}>
        {user && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-background/70 hover:bg-background"
            onClick={handleFavoriteClick}
            disabled={isToggling}
            aria-label="Toggle Favorite"
          >
            <Star className={cn(
              "h-5 w-5 transition-all",
              isToolFavorite ? "text-primary fill-primary" : "text-muted-foreground"
            )} />
          </Button>
        )}
        <CardHeader>
          {tool.imageUrl && (
            <div className="relative w-full h-40 mb-4 overflow-hidden rounded-t-lg">
              <Image
                src={tool.imageUrl}
                alt={tool.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={aiHint}
              />
            </div>
          )}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
               <CardTitle className="text-xl font-semibold pr-8">{tool.name}</CardTitle>
               {tool.isSponsored && <Badge variant="default">{t.sponsored}</Badge>}
            </div>
            {CategoryIcon && <CategoryIcon className="h-6 w-6 text-primary flex-shrink-0" />}
          </div>
          <CardDescription className="text-sm text-muted-foreground min-h-[3rem] pt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-2">
            {tool.tags && tool.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tool.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            )}
            {tool.pricing && (
              <p className="text-xs text-muted-foreground">{t.pricingLabel}: <Badge variant="outline" className="text-xs">{tool.pricing}</Badge></p>
            )}
            {tool.rating && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                <span>{tool.rating.toFixed(1)} / 5.0</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
