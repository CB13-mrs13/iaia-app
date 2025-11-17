import { getAiTools } from "@/lib/firebase/firestore";
import FeaturedClientPage from './featured-client-page';

export const revalidate = 3600; // Revalidate at most every hour

export default async function FeaturedToolsPage() {
  const aiTools = await getAiTools();

  // Get all tools marked as sponsored/featured
  const featuredTools = aiTools
    .filter(tool => tool.isSponsored === true)
    .sort((a, b) => parseInt(b.id) - parseInt(a.id)); // Newest first by ID

  return (
    <FeaturedClientPage featuredTools={featuredTools} />
  );
}
