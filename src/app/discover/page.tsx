import { getAiTools } from '@/lib/firebase/firestore';
import DiscoverClient from './discover-client';

export const revalidate = 3600; // Revalidate at most every hour

export default async function DiscoverPage() {
  const aiTools = await getAiTools();
  
  // The full history of featured tools by their ID, newest at the end.
  const fullFeaturedList = ['91', '92', '93', '94', '28', '95', '96', '97'];
  
  // The list of tools to actually feature, limited to the latest 6.
  const featuredToolIds = fullFeaturedList.slice(-6);

  // Get the full tool objects for the featured list
  const featuredTools = aiTools
    .filter(tool => featuredToolIds.includes(tool.id))
    .sort((a, b) => featuredToolIds.indexOf(a.id) - featuredToolIds.indexOf(b.id));

  return (
    <DiscoverClient
      aiTools={aiTools}
      featuredToolsList={featuredTools}
    />
  );
}
