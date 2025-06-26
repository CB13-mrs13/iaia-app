import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;

// This check provides a warning in the server console if the Gemini API key is missing.
if (!googleApiKey || googleApiKey.includes("paste_your")) {
    console.warn("WARNING: NEXT_PUBLIC_GOOGLE_AI_API_KEY is not set or is a placeholder in your .env file. AI features will not work correctly.");
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: googleApiKey,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
