
import { notFound } from 'next/navigation';
import { aiTools, createSlug } from '@/lib/data';
import ToolPageClient from './tool-page-client';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
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

  return <ToolPageClient tool={tool} />;
}
