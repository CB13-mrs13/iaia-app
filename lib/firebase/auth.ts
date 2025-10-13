
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
import { auth } from './config';

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

// Delete User Account
export async function deleteCurrentUserAccount() {
  const userToDelete = auth.currentUser;
  if (userToDelete) {
    // The avatar deletion logic was removed as part of simplifying the feature.
    return fbDeleteUser(userToDelete);
  }
  throw new Error("No user currently signed in.");
}

// Get current user (client-side)
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
