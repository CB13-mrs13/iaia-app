import { getAiTools } from '@/lib/firebase/firestore';
import DiscoverClient from './discover-client';

export const revalidate = 3600; // Revalidate at most every hour

export default async function DiscoverPage() {
  const aiTools = await getAiTools();
  
  // The full history of featured tools, newest at the end.
  const fullFeaturedList = ['VEO3', 'BOLT', 'n8n', 'Lovable', 'Canva AI Image Generator', 'Deepseek', 'Mammouth AI'];
  
  // The list of tools to actually feature, limited to the latest 6.
  const featuredToolsNameList = fullFeaturedList.slice(-6);

  // Get the full tool objects for the featured list
  const featuredTools = aiTools
    .filter(tool => featuredToolsNameList.includes(tool.name))
    .sort((a, b) => featuredToolsNameList.indexOf(a.name) - featuredToolsNameList.indexOf(b.name));

  return (
    <DiscoverClient
      aiTools={aiTools}
      featuredToolsList={featuredTools}
    />
  );
}
