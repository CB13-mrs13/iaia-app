
"use client";

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { aiToolCategories } from '@/lib/data';
import { getCategoryIcon } from '@/lib/icons';
import type { AiToolCategory } from '@/types';

interface AiToolFiltersProps {
  selectedCategory: AiToolCategory | null;
  onSelectCategory: (category: AiToolCategory | null) => void;
}

export default function AiToolFilters({ selectedCategory, onSelectCategory }: AiToolFiltersProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3">Filter by Category</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-2 pb-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => onSelectCategory(null)}
            className="transition-all duration-200"
          >
            All Tools
          </Button>
          {aiToolCategories.map((category) => {
            const Icon = getCategoryIcon(category);
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
