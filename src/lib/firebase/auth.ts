
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
  updatePassword as fbUpdatePassword,
  updateProfile as fbUpdateProfile,
  deleteUser as fbDeleteUser,
  type User,
} from 'firebase/auth';
import { auth, storage } from './config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Sign Up
export async function signUpWithEmail(email: string, password: string, displayName?: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName && userCredential.user) {
    await fbUpdateProfile(userCredential.user, { displayName });
  }
  return userCredential;
}

// Sign In
export async function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Sign Out
export async function signOutUser() {
  return signOut(auth);
}

// Password Reset
export async function sendPasswordResetEmail(email: string) {
  return fbSendPasswordResetEmail(auth, email);
}

// Update Password
export async function updateUserPassword(newPassword: string) {
  if (auth.currentUser) {
    return fbUpdatePassword(auth.currentUser, newPassword);
  }
  throw new Error("No user currently signed in.");
}

// Update Profile (displayName, photoURL for the currently authenticated user)
// This function now specifically targets auth.currentUser if no user is passed.
export async function updateUserProfile(profileData: { displayName?: string; photoURL?: string }, user?: User | null) {
  const targetUser = user || auth.currentUser;
  if (targetUser) {
    return fbUpdateProfile(targetUser, profileData);
  }
  throw new Error("No user available to update profile.");
}

// Upload Profile Avatar for a specific user (typically the current user)
export async function uploadAvatar(file: File, user: User): Promise<string> {
  // user parameter IS the Firebase User object (typically auth.currentUser)
  if (!user) { // Should ideally not happen if called correctly
    throw new Error("User object not provided for avatar upload.");
  }

  const oldPhotoURL = user.photoURL;
  // Delete old avatar if it exists and is a Firebase Storage URL
  if (oldPhotoURL && oldPhotoURL.includes("firebasestorage.googleapis.com")) {
    try {
      const oldAvatarRef = ref(storage, oldPhotoURL);
      await deleteObject(oldAvatarRef);
    } catch (error: any) {
      if (error.code !== 'storage/object-not-found') {
        // Log warning but don't let this block the new avatar upload
        console.warn("Could not delete old avatar:", error);
      }
    }
  }

  const avatarRef = ref(storage, `avatars/${user.uid}/${file.name}`);
  await uploadBytes(avatarRef, file);
  const newPhotoURL = await getDownloadURL(avatarRef);
  
  // Update the photoURL on the Firebase Auth user object
  await fbUpdateProfile(user, { photoURL: newPhotoURL }); 
  
  return newPhotoURL;
}


// Delete User Account
export async function deleteCurrentUserAccount() {
  const userToDelete = auth.currentUser;
  if (userToDelete) {
    // Consider deleting user data from Firestore/Storage here as well
    if (userToDelete.photoURL && userToDelete.photoURL.includes("firebasestorage.googleapis.com")) {
       try {
        const avatarRef = ref(storage, userToDelete.photoURL);
        await deleteObject(avatarRef);
      } catch (error: any) {
        // Ignore object-not-found, it might have been deleted or was not a storage object
        if (error.code !== 'storage/object-not-found') {
          console.warn("Could not delete avatar during account deletion:", error);
        }
      }
    }
    return fbDeleteUser(userToDelete);
  }
  throw new Error("No user currently signed in.");
}

// Get current user (client-side)
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
