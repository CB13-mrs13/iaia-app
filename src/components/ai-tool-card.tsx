
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Star } from 'lucide-react';
import type { AiTool } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCategoryIcon } from '@/lib/icons';

interface AiToolCardProps {
  tool: AiTool;
}

export default function AiToolCard({ tool }: AiToolCardProps) {
  const CategoryIcon = getCategoryIcon(tool.category);

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader>
        {tool.imageUrl && (
          <div className="relative w-full h-40 mb-4 overflow-hidden rounded-t-lg">
            <Image
              src={tool.imageUrl}
              alt={tool.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={`${tool.category} technology`}
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{tool.name}</CardTitle>
          {CategoryIcon && <CategoryIcon className="h-6 w-6 text-primary" />}
        </div>
        <CardDescription className="text-sm text-muted-foreground min-h-[3rem]">{tool.description}</CardDescription>
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
            <p className="text-xs text-muted-foreground">Pricing: <Badge variant="outline" className="text-xs">{tool.pricing}</Badge></p>
          )}
          {tool.rating && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Star className="h-4 w-4 fill-primary text-primary mr-1" />
              <span>{tool.rating.toFixed(1)} / 5.0</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={tool.website} target="_blank" rel="noopener noreferrer">
            Visit Website <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
