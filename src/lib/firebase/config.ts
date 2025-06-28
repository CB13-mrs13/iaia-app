
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// This function checks if a value is missing or a placeholder.
const isInvalidConfig = (value: string | undefined) => !value || value.includes("paste_your");

// Check all required keys.
const missingKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => isInvalidConfig(value))
  .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`);

if (missingKeys.length > 0) {
  console.error(`
🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  Firebase configuration is MISSING or INCOMPLETE!
  Authentication and database features will FAIL,
  likely causing the app to hang on a loading screen.
  
  The following environment variables are missing or are
  placeholders in your .env or .env.local file:
  - ${missingKeys.join('\n  - ')}
  
  Please copy these values from your Firebase project's
  web app configuration and add them to your .env.local
  file in the project's root directory.
  
  IMPORTANT: You must RESTART the development server
  after editing the file.
🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

`);
}


let app: FirebaseApp;
// Initialize Firebase only if it hasn't been initialized yet
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
