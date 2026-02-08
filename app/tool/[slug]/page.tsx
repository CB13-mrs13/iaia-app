export const dynamic = "force-dynamic";

import { notFound } from 'next/navigation';
import { getAiTools, getAiToolBySlug, getAiToolById } from '@/lib/firebase/firestore';
import ToolPageClient from './tool-page-client';
import { createSlug } from '@/lib/utils';

export const revalidate = 3600; // Revalidate at most every hour

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: {
    id?: string;
  };
}

export async function generateStaticParams() {
  const aiTools = await getAiTools();
  return aiTools.map((tool) => ({
    slug: createSlug(tool.name),
  }));
}

export default async function ToolPage({ params, searchParams }: ToolPageProps) {
  const { slug } = await params;
  let tool = await getAiToolBySlug(slug);

  if (!tool && searchParams?.id) {
    tool = await getAiToolById(searchParams.id);
  }

  if (!tool) {
    notFound();
  }

  return <ToolPageClient tool={tool} />;
}
