
"use client";

import { useState, useMemo } from 'react';
import AiToolCard from '@/components/ai-tool-card';
import AiToolFilters from '@/components/ai-tool-filters';
import AiSearchForm from '@/components/ai-search-form';
import { aiTools } from '@/lib/data';
import type { AiToolCategory } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<AiToolCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = useMemo(() => {
    return aiTools
      .filter(tool => selectedCategory ? tool.category === selectedCategory : true)
      .filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
  }, [selectedCategory, searchTerm]);

  return (
    <div className="space-y-12 animate-slideInUp">
      <section id="ai-search" className="pt-8">
        <AiSearchForm />
      </section>
      
      <section id="tool-listing">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Discover Top AI Tools</h1>
          <p className="text-lg text-muted-foreground">
            Browse our curated list of AI tools or use filters to find exactly what you need.
          </p>
        </header>

        <AiToolFilters selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tools by name, description, or tag..."
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
            <p className="text-xl text-muted-foreground">No tools found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}
      </section>
    </div>
  );
}
