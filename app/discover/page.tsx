import { getAiTools } from '@/lib/firebase/firestore';
import DiscoverClient from './discover-client';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export const revalidate = 3600; // Revalidate at most every hour

async function DiscoverData() {
  const aiTools = await getAiTools();
  
  // The full history of featured tools by their ID, newest at the end.
  const fullFeaturedList = ['91', '92', '93', '94', '28', '95', '96'];
  
  // The list of tools to actually feature, limited to the latest 6.
  const featuredToolIds = fullFeaturedList.slice(-6);

  // Get the full tool objects for the featured list
  const featuredTools = aiTools
    .filter(tool => featuredToolIds.includes(tool.id))
    .sort((a, b) => featuredToolIds.indexOf(b.id) - featuredToolIds.indexOf(a.id)); // Newest first

  return (
    <DiscoverClient
      aiTools={aiTools}
      featuredToolsList={featuredTools}
    />
  );
}


export default function DiscoverPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-theme(spacing.32))] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <DiscoverData />
    </Suspense>
  );
}
