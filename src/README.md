# IAIA - Votre Compagnon d'Outils IA

Ceci est un projet de démarrage Next.js construit dans Firebase Studio. C'est un annuaire d'outils d'IA, conçu pour aider les utilisateurs à découvrir et à se familiariser avec les dernières nouveautés en matière d'intelligence artificielle.

## Fonctionnalités

- **Liste d'outils IA** : Une liste complète de plus de 90 outils d'IA, classés par catégories pour une navigation facile.
- **Recherche par IA** : Les utilisateurs peuvent décrire leurs besoins en langage naturel, et l'IA de l'application suggérera l'outil le plus approprié.
- **Section "À la une"** : Met en avant les outils d'IA les plus populaires ou sponsorisés.
- **Support multilingue** : Le contenu est disponible en anglais, français et espagnol.
- **Authentification des utilisateurs** : Les utilisateurs peuvent s'inscrire et se connecter pour gérer leur compte.

## Stack Technique

- **Framework :** Next.js (avec App Router)
- **UI :** React, ShadCN UI, Tailwind CSS
- **IA Générative :** Google Gemini via Genkit
- **Backend & Auth :** Firebase

---

## Qualité du Code

Ce projet est configuré avec des outils pour garantir la qualité et la cohérence du code :

- **ESLint :** Pour identifier et corriger les problèmes dans le code JavaScript/TypeScript.
- **Prettier :** Pour formater automatiquement le code afin de maintenir un style cohérent.
- **TypeScript :** Pour la vérification statique des types.

Vous pouvez exécuter les commandes suivantes pour maintenir la qualité du code :

- `npm run lint` : Vérifier les erreurs de linting.
- `npm run lint:fix` : Corriger automatiquement les erreurs de linting.
- `npm run format` : Formater tous les fichiers avec Prettier.
- `npm run typecheck` : Exécuter le compilateur TypeScript pour vérifier les erreurs de type.

---

## Déploiement

Le moyen le plus simple et le plus rentable de déployer cette application est d'utiliser **Firebase App Hosting**. Le projet est déjà configuré pour cela.

### Firebase App Hosting (Recommandé)

Ce service est conçu pour fonctionner de manière transparente avec votre backend Firebase existant.

**Prérequis :**
- Vous avez un projet Firebase créé. [Accédez à votre console Firebase ici](https://console.firebase.google.com/project/iaia-5ecf3/overview).
- Vous avez Node.js installé sur votre machine.

**Étapes :**

1.  **Installez Firebase CLI :** Si vous ne l'avez pas, installez-le globalement.
    ```bash
    npm install -g firebase-tools
    ```

2.  **Connectez-vous à Firebase :**
    ```bash
    firebase login
    ```

3.  **Déployez :** Le backend est déjà créé. Déployez simplement votre application avec cette commande.
    ```bash
    firebase deploy
    ```

    Firebase construira votre application Next.js et la déploiera. Après quelques minutes, il vous fournira une URL publique pour accéder à votre application en direct.

### Alternative : Vercel

Vercel est un autre excellent choix, connu pour son intégration transparente avec Next.js.

1. Poussez votre code vers un dépôt Git (GitHub, GitLab, Bitbucket).
2. Créez un compte Vercel gratuit.
3. Importez votre dépôt Git dans Vercel.
4. Vercel détectera automatiquement qu'il s'agit d'un projet Next.js et le déploiera. Vous devrez ajouter vos variables d'environnement Firebase dans les paramètres du projet Vercel.
