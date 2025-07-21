# Instructions pour récupérer les clés API

Voici les étapes pour retrouver toutes les clés API nécessaires au bon fonctionnement de l'application IAIA.

**Fichier à modifier :** `.env.local` à la racine de votre projet.

---

### 1. Clés API Firebase (`NEXT_PUBLIC_FIREBASE_*`)

Ces clés permettent à votre application de se connecter à votre base de données et à l'authentification Firebase.

1.  **Allez à la console Firebase :** [https://console.firebase.google.com/](https://console.firebase.google.com/)
2.  **Sélectionnez votre projet :** `iaia-5ecf3`.
3.  Cliquez sur l'icône **roue crantée (⚙️)** en haut à gauche, à côté de "Project Overview", puis sélectionnez **"Project settings"**.
4.  Dans l'onglet "General", faites défiler vers le bas jusqu'à la section **"Your apps"**.
5.  Vous devriez voir votre application web. Dans la section "Firebase SDK snippet", cliquez sur le bouton **"Config"**.
6.  Une fenêtre apparaîtra avec un objet `firebaseConfig`. Copiez les valeurs correspondantes pour chaque variable dans votre fichier `.env.local`.

    *   `apiKey` -> `NEXT_PUBLIC_FIREBASE_API_KEY`
    *   `authDomain` -> `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    *   `projectId` -> `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    *   `storageBucket` -> `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    *   `messagingSenderId` -> `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    *   `appId` -> `NEXT_PUBLIC_FIREBASE_APP_ID`

---

### 2. Clé API Google AI / Gemini (`NEXT_PUBLIC_GOOGLE_AI_API_KEY`)

Cette clé est nécessaire pour que les fonctionnalités d'IA (comme la suggestion d'outils) fonctionnent.

1.  **Allez à Google AI Studio :** [https://aistudio.google.com/](https://aistudio.google.com/)
2.  Connectez-vous avec votre compte Google.
3.  Dans le menu de gauche, cliquez sur **"Get API key"**.
4.  Vous pouvez soit **copier une clé existante**, soit cliquer sur **"Create API key in new project"** pour en générer une nouvelle.
5.  Copiez cette clé et collez-la pour la variable `NEXT_PUBLIC_GOOGLE_AI_API_KEY` dans votre `.env.local`.

---

### 3. Clé API Resend (`RESEND_API_KEY`)

Cette clé est utilisée pour envoyer l'e-mail depuis votre formulaire de contact.

1.  **Connectez-vous à votre compte Resend :** [https://resend.com/login](https://resend.com/login)
2.  Dans le menu de gauche, cliquez sur **"API Keys"**.
3.  Cliquez sur le bouton **"+ Create API Key"** en haut à droite.
4.  Une petite fenêtre va apparaître. C'est ici que vous pouvez :
    *   **Donner un nom à votre clé :** Dans le champ "Name", écrivez par exemple `IAIA App`.
    *   **Définir les permissions :** Laissez le champ "Permission" sur **"Full access"**.
    *   Cliquez ensuite sur le bouton **"Add"**.
5.  **Important :** Resend n'affiche la clé complète qu'une seule fois, sur l'écran suivant (celui de votre capture d'écran). Copiez-la immédiatement et collez-la pour la variable `RESEND_API_KEY` dans votre `.env.local`. Si vous avez déjà une clé mais que vous ne l'avez pas copiée, vous devrez en créer une nouvelle.

---

**ACTION FINALE :** Après avoir rempli toutes ces clés dans votre fichier `.env.local`, n'oubliez pas de **redémarrer le serveur de développement** pour que les modifications soient prises en compte.
