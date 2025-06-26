# IAIA - Your AI Tool Companion

This is a Next.js starter project built in Firebase Studio. It's a curated directory of AI tools, designed to help users discover and learn about the latest in artificial intelligence.

## Features

- **Curated List of AI Tools:** A comprehensive list of over 90 AI tools, categorized for easy browsing.
- **AI-Powered Search:** Users can describe their needs in natural language, and the app's AI will suggest the most suitable tool.
- **Featured Section:** Highlights the most popular or sponsored AI tools.
- **Multi-language Support:** Content is available in English, French, and Spanish.
- **User Authentication:** Users can sign up and log in to manage their account.

## Tech Stack

- **Framework:** Next.js (with App Router)
- **UI:** React, ShadCN UI, Tailwind CSS
- **Generative AI:** Google Gemini via Genkit
- **Backend & Auth:** Firebase

---

## Deployment

The simplest and most cost-effective way to deploy this application is using **Firebase App Hosting**. The project is already configured for it.

### Firebase App Hosting (Recommended)

This service is designed to work seamlessly with your existing Firebase backend.

**Prerequisites:**
- You have a Firebase project created.
- You have Node.js installed on your machine.

**Steps:**

1.  **Install Firebase CLI:** If you don't have it, install it globally.
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase:**
    ```bash
    firebase login
    ```

3.  **Initialize App Hosting:** In your project's root directory, run this command. It will associate your code with your Firebase project and set up the backend.
    ```bash
    firebase apphosting:backends:create
    ```
    Follow the prompts to select your Firebase project and choose a region for the backend.

4.  **Deploy:** Once the backend is created, deploy your application with this command.
    ```bash
    firebase apphosting:backends:deploy
    ```

    Firebase will build your Next.js application and deploy it. After a few minutes, it will provide you with a public URL to access your live application.

### Alternative: Vercel

Vercel is another excellent choice, known for its seamless integration with Next.js.

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2. Sign up for a free Vercel account.
3. Import your Git repository into Vercel.
4. Vercel will automatically detect that it's a Next.js project and deploy it. You will need to add your Firebase environment variables to the Vercel project settings.
