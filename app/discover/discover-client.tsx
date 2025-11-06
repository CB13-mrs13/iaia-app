
"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useInView } from 'react-intersection-observer';

interface DiscoverClientProps {
  aiTools: AiTool[];
  featuredToolsList: AiTool[];
}

const ITEMS_PER_PAGE = 12;

export default function DiscoverClient({ aiTools, featuredToolsList }: DiscoverClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<AiToolCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();
  const t = translations[language].home;
  const { user, loading } = useAuth();
  const router = useRouter();
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Redirect unauthenticated users to signup
  useEffect(() => {
    if (!loading && !user) {
      router.push('/signup');
    }
  }, [user, loading, router]);

  const priorityOrder: AiToolCategory[] = ['Gratuit', 'Photo', 'Video', 'LLM'];

  const sortedTools = useMemo(() => {
    const sponsoredTools = aiTools.filter(tool => tool.isSponsored);
    const nonSponsoredTools = aiTools.filter(tool => !tool.isSponsored);

    nonSponsoredTools.sort((a, b) => {
      const aPriority = priorityOrder.indexOf(a.category);
      const bPriority = priorityOrder.indexOf(b.category);

      // Both have priority: sort by priority order
      if (aPriority !== -1 && bPriority !== -1) {
        if (aPriority < bPriority) return -1;
        if (aPriority > bPriority) return 1;
      }
      // Only A has priority: A comes first
      if (aPriority !== -1) return -1;
      // Only B has priority: B comes first
      if (bPriority !== -1) return 1;
      
      // No priority for either, sort by ID (newest first)
      return parseInt(b.id, 10) - parseInt(a.id, 10);
    });

    return [...sponsoredTools, ...nonSponsoredTools];
  }, [aiTools]);


  const filteredTools = useMemo(() => {
    return sortedTools
      .filter(tool => selectedCategory ? tool.category === selectedCategory : true)
      .filter(tool => {
        const description = tool.description[language] || tool.description.en;
        return (
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
        );
      });
  }, [selectedCategory, searchTerm, language, sortedTools]);

  // Infinite scroll effect
  useEffect(() => {
    if (inView && visibleCount < filteredTools.length) {
      setVisibleCount(prevCount => Math.min(prevCount + ITEMS_PER_PAGE, filteredTools.length));
    }
  }, [inView, filteredTools.length, visibleCount]);
  
  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory, searchTerm]);

  const applyCarouselStyles = useCallback((api: CarouselApi) => {
    if (!api) return;
    api.slideNodes().forEach((slide, index) => {
      const distance = Math.abs(api.selectedScrollSnap() - index);
      const scale = 1 - distance * 0.15; // Plus prononcé : 0.85 pour distance=1
      const opacity = distance > 1 ? 0.4 : 1 - distance * 0.3; // Plus visible
      const zIndex = 10 - distance;
      const translateY = distance * 10; // Décalage vertical pour effet d'empilement

      const slideEl = slide as HTMLElement;
      slideEl.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      slideEl.style.opacity = `${opacity}`;
      slideEl.style.zIndex = `${zIndex}`;
    });
  }, []);
  
  const resetCarouselStyles = useCallback((api: CarouselApi) => {
      if (!api) return;
      api.slideNodes().forEach((slide) => {
          const slideEl = slide as HTMLElement;
          slideEl.style.transform = '';
          slideEl.style.opacity = '';
          slideEl.style.zIndex = '';
      });
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
        // Update current slide index
        setCurrentSlide(carouselApi.selectedScrollSnap());
        
        if (isMobile) {
            applyCarouselStyles(carouselApi);
        } else {
            resetCarouselStyles(carouselApi);
        }
    };
    
    // Initial setup
    handleSelect();

    carouselApi.on('select', handleSelect);
    carouselApi.on('reInit', handleSelect);

    return () => {
        if (carouselApi) {
            // Clean up styles when component unmounts or effect re-runs
            resetCarouselStyles(carouselApi);
            carouselApi.off('select', handleSelect);
            carouselApi.off('reInit', handleSelect);
        }
    };
}, [carouselApi, isMobile, applyCarouselStyles, resetCarouselStyles]);

  
  if (loading && !user) { // Show loader only during the initial auth check
    return (
      <div className="flex min-h-[calc(100vh-theme(spacing.32))] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fadeIn bg-transparent">
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
          <>
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "center", // Toujours centré
                loop: true,
              }}
              className="w-full mx-auto px-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
            >
              <CarouselContent className={cn(isMobile ? "h-auto min-h-[520px]" : "")}>
                {featuredToolsList.map((tool, index) => (
                  <CarouselItem key={tool.id} className={cn(
                    "transition-all duration-300 relative",
                    isMobile ? "basis-[90%] px-2" : "sm:basis-1/2 lg:basis-1/3 px-2"
                  )}>
                    <div className="h-full">
                      <AiToolCard tool={tool} featured />
                    </div>
                    {/* Numéro de carte visible sur mobile */}
                    {isMobile && (
                      <div className="absolute top-2 left-4 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
                        {index + 1} / {featuredToolsList.length}
                      </div>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Navigation visible partout, style adapté mobile/desktop */}
              {isMobile ? (
                <>
                  <button
                    onClick={() => carouselApi?.scrollPrev()}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all"
                    aria-label="Carte précédente"
                  >
                    <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => carouselApi?.scrollNext()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all"
                    aria-label="Carte suivante"
                  >
                    <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="hidden md:block">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              )}
            </Carousel>
            
            {/* Indicateurs de pagination interactifs pour mobile */}
            {isMobile && (
              <div className="flex justify-center gap-2 mt-6">
                {featuredToolsList.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={cn(
                      "transition-all duration-300 rounded-full",
                      currentSlide === index
                        ? "w-8 h-2 bg-primary"
                        : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Aller à la carte ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <div className="text-center mt-8">
          <Link href="/discover/featured" className="btn-yellow inline-flex items-center justify-center">
            {t.viewFeaturedButton}
          </Link>
        </div>
      </section>

      {/* Beta Toolbox Section */}
      <section id="toolbox-beta">
        <div className="bg-orange text-white rounded-xl p-8 shadow-lg text-center flex flex-col items-center gap-2">
          <Wrench className="h-8 w-8" />
          <h3 className="text-2xl font-bold">{t.toolboxTitle}</h3>
          <p className="mt-1 text-lg">{t.toolboxText}</p>
        </div>
      </section>
      
      <section id="tool-listing">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">{t.discoverTitle}</h1>
          <p className="text-lg text-muted-foreground">
            {t.discoverSubtitle}
          </p>
        </header>

        <AiToolFilters selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 text-lg h-14 rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-base"
            aria-label="Search AI tools"
          />
        </div>

        {filteredTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.slice(0, visibleCount).map((tool, index) => (
                <div key={tool.id} className="animate-slideInUp" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
                    <AiToolCard tool={tool} />
                </div>
              ))}
            </div>
            {visibleCount < filteredTools.length && (
              <div ref={loadMoreRef} className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
          </>
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
