import { getAiTools } from "@/lib/firebase/firestore";
import FeaturedClientPage from './featured-client-page';

export const revalidate = 3600; // Revalidate at most every hour

export default async function FeaturedToolsPage() {
  const aiTools = await getAiTools();

  // The full history of featured tools by their ID, newest at the end.
  const fullFeaturedList = ['91', '92', '93', '94', '28', '95', '96', '97'];
  
  // The list of tools to actually feature, limited to the latest 6.
  const featuredToolIds = fullFeaturedList.slice(-6);

  // Find the featured tools and sort them in the desired order
  const featuredTools = aiTools
    .filter(tool => featuredToolIds.includes(tool.id))
    .sort((a, b) => featuredToolIds.indexOf(a.id) - featuredToolIds.indexOf(b.id));

  return (
    <FeaturedClientPage featuredTools={featuredTools} />
  );
}
