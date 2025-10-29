
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
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <button
          onClick={() => onSelectCategory(null)}
          className={`filter-btn ${selectedCategory === null ? 'filter-btn-active' : ''}`}
        >
          {t.allToolsButton}
        </button>
        {aiToolCategories.map((category) => {
          const Icon = getCategoryIcon(category);
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`filter-btn ${selectedCategory === category ? 'filter-btn-active' : ''}`}
            >
              <Icon className="mr-1 h-4 w-4" />
              <span className="truncate">{category}</span>
            </button>
          );
        })}
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md hidden md:block">
        <div className="flex space-x-2 pb-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`filter-btn ${selectedCategory === null ? 'filter-btn-active' : ''}`}
          >
            {t.allToolsButton}
          </button>
          {aiToolCategories.map((category) => {
            const Icon = getCategoryIcon(category);
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`filter-btn ${selectedCategory === category ? 'filter-btn-active' : ''}`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {category} 
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
