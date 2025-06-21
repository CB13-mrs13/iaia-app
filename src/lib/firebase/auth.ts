
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

// Update Profile (displayName, photoURL for the currently authenticated user or a specific user)
export async function updateUserProfile(profileData: { displayName?: string; photoURL?: string }, userToUpdate?: User | null) {
  const targetUser = userToUpdate || auth.currentUser;
  if (targetUser) {
    return fbUpdateProfile(targetUser, profileData);
  }
  throw new Error("No user available to update profile.");
}

// Uploads an avatar, sets it on the user profile, deletes the old one, and returns the new URL.
export async function uploadAvatar(file: File, user: User): Promise<string> {
  if (!user) {
    throw new Error("User object not provided for avatar upload.");
  }
  
  const oldPhotoURL = user.photoURL;

  // Define reference for new avatar
  const avatarRef = ref(storage, `avatars/${user.uid}/${Date.now()}_${file.name}`);
  
  // Upload the new file
  await uploadBytes(avatarRef, file);
  const newPhotoURL = await getDownloadURL(avatarRef);

  // **Crucial Step**: Update the user's profile with the new photoURL
  await fbUpdateProfile(user, { photoURL: newPhotoURL });

  // After successful upload and profile update, try to delete the old one.
  if (oldPhotoURL && oldPhotoURL.includes("firebasestorage.googleapis.com")) {
    try {
      const oldAvatarRef = ref(storage, oldPhotoURL);
      await deleteObject(oldAvatarRef);
    } catch (error: any) {
      if (error.code !== 'storage/object-not-found') {
        console.warn("Could not delete old avatar, but new upload was successful:", error);
      }
    }
  }

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
