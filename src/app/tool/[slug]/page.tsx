
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { aiTools, createSlug } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ArrowUpRight, CheckCircle, Star } from 'lucide-react';
import { getCategoryIcon } from '@/lib/icons';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return aiTools.map((tool) => ({
    slug: createSlug(tool.name),
  }));
}

export default function ToolPage({ params }: ToolPageProps) {
  const { slug } = params;
  const tool = aiTools.find((t) => createSlug(t.name) === slug);

  if (!tool) {
    notFound();
  }

  const CategoryIcon = getCategoryIcon(tool.category);

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn space-y-8">
      <div>
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Tools
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
                {tool.isSponsored && <Badge variant="default">Sponsorisé</Badge>}
              </div>
              <CardTitle className="text-3xl font-bold">{tool.name}</CardTitle>
              <CardDescription className="pt-2">{tool.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 flex-grow mt-6 space-y-4">
              {tool.rating && (
                <div className="flex items-center text-sm">
                  <Star className="h-5 w-5 fill-primary text-primary mr-2" />
                  <span className="font-semibold">{tool.rating.toFixed(1)} / 5.0</span>
                </div>
              )}
              {tool.pricing && (
                <p className="text-sm">
                  <span className="font-semibold">Pricing: </span>
                  <Badge variant="outline">{tool.pricing}</Badge>
                </p>
              )}
              {tool.tags && tool.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
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
                  Visit Website <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Long Description and Features */}
        <div className="p-6 md:p-8 border-t">
          {tool.longDescription && (
            <div className="prose prose-sm max-w-none text-foreground/90">
              <h3 className="font-semibold text-lg mb-2">About {tool.name}</h3>
              <p>{tool.longDescription}</p>
            </div>
          )}

          {tool.features && tool.features.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul className="space-y-2">
                {tool.features.map((feature, index) => (
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
