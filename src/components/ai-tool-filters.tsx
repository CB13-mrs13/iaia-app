
"use client";

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { aiToolCategories, getCategoryIcon } from '@/lib/icons';
import type { AiToolCategory } from '@/types';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';

interface AiToolFiltersProps {
  selectedCategory: AiToolCategory | null;
  onSelectCategory: (category: AiToolCategory | null) => void;
}

export default function AiToolFilters({ selectedCategory, onSelectCategory }: AiToolFiltersProps) {
  const { language } = useLanguage();
  const t = translations[language].filters;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3">{t.title}</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-2 pb-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => onSelectCategory(null)}
            className="transition-all duration-200"
          >
            {t.allToolsButton}
          </Button>
          {aiToolCategories.map((category) => {
            const Icon = getCategoryIcon(category);
            // Category names themselves are data and not translated in this simple setup
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => onSelectCategory(category)}
                className="transition-all duration-200"
              >
                <Icon className="mr-2 h-4 w-4" />
                {category} 
              </Button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
