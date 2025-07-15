
import { notFound } from 'next/navigation';
import { getAiTools, getAiToolBySlug } from '@/lib/firebase/firestore';
import ToolPageClient from './tool-page-client';
import { createSlug } from '@/lib/utils';

export const revalidate = 3600; // Revalidate at most every hour

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const aiTools = await getAiTools();
  return aiTools.map((tool) => ({
    slug: createSlug(tool.name),
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = params;
  const tool = await getAiToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <ToolPageClient tool={tool} />;
}
