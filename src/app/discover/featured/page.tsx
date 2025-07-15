import { getAiTools } from "@/lib/firebase/firestore";
import FeaturedClientPage from './featured-client-page';

export const revalidate = 3600; // Revalidate at most every hour

export default async function FeaturedToolsPage() {
  const aiTools = await getAiTools();

  // The full history of featured tools, newest at the end.
  const fullFeaturedList = ['VEO3', 'BOLT', 'n8n', 'Lovable', 'Canva AI Image Generator', 'Deepseek', 'Mammouth AI'];
  
  // The list of tools to actually feature, limited to the latest 6.
  const featuredToolsList = fullFeaturedList.slice(-6);

  // Find the featured tools and sort them in the desired order
  const featuredTools = aiTools
    .filter(tool => featuredToolsList.includes(tool.name))
    .sort((a, b) => featuredToolsList.indexOf(a.name) - featuredToolsList.indexOf(b.name));

  return (
    <FeaturedClientPage featuredTools={featuredTools} />
  );
}
