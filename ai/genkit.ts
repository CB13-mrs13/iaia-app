import {genkit} from 'genkit';
import {googleAI, gemini15Flash} from '@genkit-ai/googleai';

const googleApiKey = process.env.GOOGLE_AI_API_KEY;

// This check provides a warning in the server console if the Gemini API key is missing.
if (!googleApiKey || googleApiKey.includes("paste_your")) {
    console.warn("WARNING: GOOGLE_AI_API_KEY is not set or is a placeholder in your .env or .env.local file. AI features will not work correctly.");
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: googleApiKey,
    }),
  ],
});

export { gemini15Flash };
