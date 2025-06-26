
"use client";

import { useState, useMemo } from 'react';
import AiToolCard from '@/components/ai-tool-card';
import AiToolFilters from '@/components/ai-tool-filters';
import AiSearchForm from '@/components/ai-search-form';
import { aiTools } from '@/lib/data';
import type { AiToolCategory } from '@/types';
import { Input } from '@/components/ui/input';
import { Search, ArrowUp, Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<AiToolCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();
  const t = translations[language].home;

  const featuredToolsList = useMemo(() => ['VEO3', 'BOLT', 'n8n'], []);
  const featuredTools = useMemo(() => {
    // Find the featured tools and sort them in the desired order
    return aiTools
      .filter(tool => featuredToolsList.includes(tool.name))
      .sort((a, b) => featuredToolsList.indexOf(a.name) - featuredToolsList.indexOf(b.name));
  }, [featuredToolsList]);


  const filteredTools = useMemo(() => {
    return aiTools
      // Exclude featured tools from the main list to avoid duplication
      .filter(tool => !featuredToolsList.includes(tool.name))
      .filter(tool => selectedCategory ? tool.category === selectedCategory : true)
      .filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
  }, [selectedCategory, searchTerm, featuredToolsList]);

  return (
    <div className="space-y-12 animate-slideInUp">
      <section id="ai-search" className="pt-8">
        <AiSearchForm />
      </section>

      {/* Featured AIs Section */}
      {featuredTools.length > 0 && (
        <section id="featured-ais">
          <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-accent">
              <Zap className="inline-block -mt-1 mr-2 h-7 w-7" />
              {t.featuredTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.featuredSubtitle}
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool) => (
              <AiToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </section>
      )}
      
      <section id="tool-listing">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">{t.discoverTitle}</h1>
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
            {filteredTools.map((tool) => (
              <AiToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">{t.noToolsFound}</p>
            <p className="text-sm text-muted-foreground mt-2">{t.tryAdjustingFilters}</p>
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
