
'use server';

import { db } from './config';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";

// Function to get a user's favorite tools
export async function getUserFavorites(userId: string): Promise<string[]> {
  const userDocRef = doc(db, 'users', userId);
  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
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
