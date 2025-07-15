import { db } from '@/lib/firebase/config';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc, collection, getDocs, query, where } from "firebase/firestore";
import type { AiTool } from '@/types';
import { createSlug } from '@/lib/utils';

// --- User Favorites Functions ---

// Function to get a user's favorite tools
export async function getUserFavorites(userId: string): Promise<string[]> {
  const userDocRef = doc(db, 'users', userId);
  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      // The `favoriteTools` array stores the `id` field from the tool document (e.g., "1", "2").
      return userDoc.data().favoriteTools || [];
    }
    return [];
  } catch (error) {
    console.error("--- FAVORITES FETCH ERROR ---");
    console.error("Could not fetch user favorites. This is likely due to Firestore security rules.");
    console.error("Ensure your 'firestore.rules' allow authenticated users to read their own document in the 'users' collection. Error details:", error);
    // Return an empty array to prevent the app from crashing.
    return [];
  }
}

// Function to add or remove a tool from favorites
export async function toggleFavoriteTool(userId: string, toolId: string): Promise<string[]> {
  const userDocRef = doc(db, 'users', userId);

  try {
    const userDoc = await getDoc(userDocRef);
    let currentFavorites: string[] = [];

    if (!userDoc.exists()) {
      // If the user document doesn't exist, create it.
      await setDoc(userDocRef, { favoriteTools: [toolId] });
      return [toolId];
    } else {
      currentFavorites = userDoc.data().favoriteTools || [];
    }

    if (currentFavorites.includes(toolId)) {
      // Remove from favorites
      await updateDoc(userDocRef, {
        favoriteTools: arrayRemove(toolId)
      });
      return currentFavorites.filter(id => id !== toolId);
    } else {
      // Add to favorites
      await updateDoc(userDocRef, {
        favoriteTools: arrayUnion(toolId)
      });
      return [...currentFavorites, toolId];
    }
  } catch (error) {
    console.error("Error toggling favorite tool:", error);
    // Re-throw with a more descriptive message for the user.
    throw new Error("Could not update favorites. Please check your Firestore security rules to ensure you are allowed to write to your own document in the 'users' collection.");
  }
}

// --- AI Tools Functions ---

const toolsCollectionRef = collection(db, 'tools');

// Function to get all AI tools from Firestore
export async function getAiTools(): Promise<AiTool[]> {
  try {
    const snapshot = await getDocs(toolsCollectionRef);
    if (snapshot.empty) {
      console.warn("Firestore 'tools' collection is empty. Did you run `npm run import-firestore`?");
      return [];
    }
    // The document data itself contains the 'id' field from the original JSON.
    const tools = snapshot.docs.map(doc => doc.data() as AiTool);
    return tools;
  } catch (error) {
    console.error("--- AI TOOLS FETCH ERROR ---");
    console.error("Could not fetch AI tools. This is likely due to Firestore security rules.");
    console.error("Please ensure your 'firestore.rules' allow public read access to the 'tools' collection. See documentation for the correct rules. Error details:", error);
    return []; // Return empty array on error to prevent app crash
  }
}

// Function to get a single AI tool by its slug
export async function getAiToolBySlug(slug: string): Promise<AiTool | null> {
  try {
    // This function relies on getAiTools which now has robust error handling.
    // We can fetch all and filter, which is efficient enough for a few hundred tools
    // and avoids complex queries.
    const allTools = await getAiTools();
    if (allTools.length === 0) {
      return null;
    }
    
    const foundTool = allTools.find(tool => createSlug(tool.name) === slug);
    return foundTool || null;

  } catch (error) {
    console.error(`Error fetching tool with slug '${slug}':`, error);
    return null;
  }
}