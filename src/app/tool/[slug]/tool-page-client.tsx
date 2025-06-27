
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ArrowUpRight, CheckCircle, Star, Loader2 } from 'lucide-react';
import { getCategoryIcon } from '@/lib/icons';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import type { AiTool } from '@/types';
import { useAuth } from '@/hooks/use-auth';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';

interface ToolPageClientProps {
  tool: AiTool;
}

export default function ToolPageClient({ tool }: ToolPageClientProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite, isToggling } = useFavorites();
  
  const t = translations[language].toolPage;
  const CategoryIcon = getCategoryIcon(tool.category);

  const description = tool.description[language] || tool.description.en;
  const longDescription = tool.longDescription?.[language] || tool.longDescription?.en;
  const features = tool.features?.[language] || tool.features?.en;
  const isToolFavorite = isFavorite(tool.id);

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn space-y-8">
      <div>
        <Button variant="outline" asChild>
          <Link href="/discover">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToAllTools}
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-64 md:h-full">
            {tool.imageUrl ? (
              <Image
                src={tool.imageUrl}
                alt={tool.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted">
                <CategoryIcon className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{tool.category}</Badge>
                {tool.isSponsored && <Badge variant="default">{t.sponsored}</Badge>}
              </div>
              <div className="flex items-center gap-4">
                <CardTitle className="text-3xl font-bold">{tool.name}</CardTitle>
                {user && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 flex-shrink-0 rounded-full"
                    onClick={() => !isToggling && toggleFavorite(tool.id)}
                    disabled={isToggling}
                    aria-label="Toggle Favorite"
                  >
                    {isToggling ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Star className={cn(
                        "h-5 w-5 transition-all",
                        isToolFavorite ? "text-primary fill-primary" : "text-muted-foreground"
                      )} />
                    )}
                  </Button>
                )}
              </div>
              <CardDescription className="pt-2">{description}</CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 flex-grow mt-6 space-y-4">
              {tool.rating && (
                <div className="flex items-center text-sm">
                  <Star className="h-5 w-5 fill-primary text-primary mr-2" />
                  <span className="font-semibold">{tool.rating.toFixed(1)} / 5.0</span>
                  <span className="text-muted-foreground ml-1">({t.ratingLabel})</span>
                </div>
              )}
              {tool.pricing && (
                <p className="text-sm">
                  <span className="font-semibold">{t.pricingLabel}: </span>
                  <Badge variant="outline">{tool.pricing}</Badge>
                </p>
              )}
              {tool.tags && tool.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">{t.tagsLabel}</h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>

            <div className="pt-6 mt-auto">
              <Button asChild className="w-full">
                <a href={tool.website} target="_blank" rel="noopener noreferrer">
                  {t.visitWebsite} <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Long Description and Features */}
        <div className="p-6 md:p-8 border-t">
          {longDescription && (
            <div className="prose prose-sm max-w-none text-foreground/90">
              <h3 className="font-semibold text-lg mb-2">{t.aboutTitle.replace('{toolName}', tool.name)}</h3>
              <p>{longDescription}</p>
            </div>
          )}

          {features && features.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-3">{t.featuresTitle}</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
