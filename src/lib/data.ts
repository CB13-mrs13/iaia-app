
import { db } from './firebase/config';
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
    console.error("Your default 30-day open access may have expired.");
    console.error("To fix this, deploy the rules defined in 'firestore.rules' by running `firebase deploy --only firestore` in your terminal.");
    console.error("The app will continue to function, but favorites will be unavailable until the rules are deployed. Error details:", error);
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
      console.warn("Firestore 'tools' collection is empty. Please populate it with AI tool data from `src/ai-tool-data.json`.");
      return [];
    }
    // The document data itself contains the 'id' field from the original JSON.
    const tools = snapshot.docs.map(doc => doc.data() as AiTool);
    return tools;
  } catch (error) {
    console.error("Error fetching AI tools from Firestore:", error);
    return []; // Return empty array on error to prevent app crash
  }
}

// Function to get a single AI tool by its slug
export async function getAiToolBySlug(slug: string): Promise<AiTool | null> {
  try {
    const q = query(collection(db, "tools"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    // We have to iterate and create slug for each to find the match
    for (const doc of snapshot.docs) {
      const toolData = doc.data() as AiTool;
      if (createSlug(toolData.name) === slug) {
        return toolData;
      }
    }
    return null; // No tool found with the matching slug
  } catch (error) {
    console.error(`Error fetching tool with slug '${slug}':`, error);
    return null;
  }
}
