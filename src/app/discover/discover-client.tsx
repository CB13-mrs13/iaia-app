
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AiToolCard from '@/components/ai-tool-card';
import AiToolFilters from '@/components/ai-tool-filters';
import AiSearchForm from '@/components/ai-search-form';
import type { AiTool, AiToolCategory } from '@/types';
import { Input } from '@/components/ui/input';
import { Search, ArrowUp, Wrench, PackageSearch, Star, Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface DiscoverClientProps {
  aiTools: AiTool[];
  featuredToolsList: AiTool[];
}

export default function DiscoverClient({ aiTools, featuredToolsList }: DiscoverClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<AiToolCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();
  const t = translations[language].home;
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const filteredTools = useMemo(() => {
    return aiTools
      .filter(tool => selectedCategory ? tool.category === selectedCategory : true)
      .filter(tool => {
        const description = tool.description[language] || tool.description.en;
        return (
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
        );
      });
  }, [selectedCategory, searchTerm, language, aiTools]);
  
  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-theme(spacing.32))] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fadeIn">
      <section id="ai-search" className="pt-8">
        <AiSearchForm />
      </section>

      {/* Featured AIs Carousel Section */}
      <section id="featured-ais">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground flex items-center justify-center gap-2">
            <Star className="h-7 w-7 text-primary" />
            {t.featuredTitle}
          </h2>
          <p className="text-lg text-muted-foreground">{t.featuredSubtitle}</p>
        </div>
        
        {featuredToolsList.length > 0 && (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
          >
            <CarouselContent>
              {featuredToolsList.map((tool) => (
                <CarouselItem key={tool.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <AiToolCard tool={tool} featured />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/discover/featured">
              {t.viewFeaturedButton}
            </Link>
          </Button>
        </div>
      </section>

      {/* Beta Toolbox Section */}
      <section id="toolbox-beta">
        <div className="bg-accent text-accent-foreground rounded-lg p-8 shadow-lg text-center flex flex-col items-center gap-2">
          <Wrench className="h-8 w-8" />
          <h3 className="text-2xl font-bold">{t.toolboxTitle}</h3>
          <p className="mt-1 text-lg">{t.toolboxText}</p>
        </div>
      </section>
      
      <section id="tool-listing">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">{t.discoverTitle}</h1>
          <p className="text-lg text-muted-foreground">
            {t.discoverSubtitle}
          </p>
        </header>

        <AiToolFilters selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 text-base h-12 rounded-md shadow-sm focus:border-primary"
          />
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <div key={tool.id} className="animate-slideInUp" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
                  <AiToolCard 
                    tool={tool} 
                  />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 flex flex-col items-center gap-4 border-2 border-dashed rounded-lg">
            <PackageSearch className="h-16 w-16 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">{t.noToolsFound}</p>
            <p className="text-sm text-muted-foreground mt-2">{t.tryAdjustingFilters}</p>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}>
              {t.backToDiscovery}
            </Button>
          </div>
        )}

        {filteredTools.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline">
              <Link href="#ai-search">
                <ArrowUp className="mr-2 h-4 w-4" />
                {t.backToTop}
              </Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
