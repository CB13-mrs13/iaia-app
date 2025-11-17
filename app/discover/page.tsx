import { getAiTools } from '@/lib/firebase/firestore';
import DiscoverClient from './discover-client';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export const revalidate = 3600; // Revalidate at most every hour

async function DiscoverData() {
  const aiTools = await getAiTools();
  
  // Get all tools marked as sponsored/featured
  const featuredTools = aiTools
    .filter(tool => tool.isSponsored === true)
    .sort((a, b) => parseInt(b.id) - parseInt(a.id)); // Newest first by ID

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
