
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
export async function updateUserProfile(profileData: { displayName?: string; photoURL?: string }) {
  if (auth.currentUser) {
    return fbUpdateProfile(auth.currentUser, profileData);
  }
  throw new Error("No user currently signed in.");
}

// Upload Profile Avatar for a specific user (typically the current user)
export async function uploadAvatar(file: File, user: User): Promise<string> {
  // user parameter is the Firebase User object for whom to upload the avatar.
  if (!user) {
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
        console.warn("Could not delete old avatar:", error);
      }
    }
  }

  const avatarRef = ref(storage, `avatars/${user.uid}/${file.name}`);
  await uploadBytes(avatarRef, file);
  const photoURL = await getDownloadURL(avatarRef);
  // Note: fbUpdateProfile on the user object passed in might not be necessary
  // if the calling function handles updating the user's profile with the new photoURL.
  // However, it's good practice to update it here as well to ensure consistency.
  // This will update the auth.currentUser object if 'user' is indeed auth.currentUser.
  await fbUpdateProfile(user, { photoURL }); 
  return photoURL;
}


// Delete User Account
export async function deleteCurrentUserAccount() {
  if (auth.currentUser) {
    const userToDelete = auth.currentUser;
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
