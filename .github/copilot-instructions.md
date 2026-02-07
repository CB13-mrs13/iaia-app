# Instructions Copilot — IAIA

## Vue d’ensemble
- App Next.js App Router avec pages serveur + composants client. Les providers globaux (React Query, langue, auth, UI) sont câblés dans [app/layout.tsx](app/layout.tsx).
- La découverte des outils est SSR/ISR côté page puis filtrée côté client : [app/discover/page.tsx](app/discover/page.tsx) charge via `getAiTools()` puis passe à [app/discover/discover-client.tsx](app/discover/discover-client.tsx).

## Données & Firebase
- Firebase est la source de vérité : config dans [lib/firebase/config.ts](lib/firebase/config.ts). Collections clés :
  - `tools` (liste d’outils) et `users` (champ `favoriteTools` = tableau d’`id` d’outil) dans [lib/firebase/firestore.ts](lib/firebase/firestore.ts).
  - `contact-messages` pour les formulaires de contact via [app/contact/actions-firestore.ts](app/contact/actions-firestore.ts).
- L’import initial des outils provient de ai-tool-data.json via [scripts/import-firestore.js](scripts/import-firestore.js) (commande `npm run import-firestore`).
- Les règles Firestore utilisées sont dans [firestore.rules](firestore.rules) — utiles si les lectures/écritures échouent.

## IA (suggestions d’outils)
- Le flux d’IA est une action serveur dans [ai/flows/suggest-ai-tool.ts](ai/flows/suggest-ai-tool.ts), appelée côté client depuis [components/ai-search-form.tsx](components/ai-search-form.tsx).
- L'API Gemini est appelée en REST et exige `GOOGLE_AI_API_KEY` côté serveur (voir [ai/genkit.ts](ai/genkit.ts) pour l'initialisation Genkit).

## Internationalisation
- Les textes UI sont centralisés dans [lib/translations.ts](lib/translations.ts) et sélectionnés via le contexte langue [contexts/language-context.tsx](contexts/language-context.tsx) + hook [hooks/use-language.ts](hooks/use-language.ts).

## Auth & accès
- Auth Firebase géré via le contexte [contexts/auth-context.tsx](contexts/auth-context.tsx) et le hook [hooks/use-auth.ts](hooks/use-auth.ts). Certains écrans redirigent si non authentifié (ex. [app/discover/discover-client.tsx](app/discover/discover-client.tsx)).

## Workflows clés
- Dev: `npm run dev` (Turbopack).
- Build: `npm run build`.
- Lint: `npm run lint`.
- Import Firestore: `npm run import-firestore`.

## Conventions UI
- Design system basé sur ShadCN + Tailwind; composants UI dans [components/ui](components/ui).
- Les composants client sont explicitement marqués `"use client"` (voir [components/ai-search-form.tsx](components/ai-search-form.tsx)).
