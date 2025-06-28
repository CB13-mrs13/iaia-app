import { aiTools } from '@/lib/data';
import DiscoverClient from './discover-client';

export default function DiscoverPage() {
  // The full history of featured tools, newest at the end.
  const fullFeaturedList = ['VEO3', 'BOLT', 'n8n', 'Lovable', 'Canva AI Image Generator', 'Deepseek', 'Mammouth AI'];
  
  // The list of tools to actually feature, limited to the latest 6.
  const featuredToolsList = fullFeaturedList.slice(-6);

  // Find the featured tools and sort them in the desired order
  const featuredTools = aiTools
    .filter(tool => featuredToolsList.includes(tool.name))
    .sort((a, b) => featuredToolsList.indexOf(a.name) - featuredToolsList.indexOf(b.name));

  return (
    <DiscoverClient
      aiTools={aiTools}
      featuredTools={featuredTools}
      featuredToolsList={featuredToolsList}
    />
  );
}
