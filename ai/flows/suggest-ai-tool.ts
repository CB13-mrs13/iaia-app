

// src/ai/flows/suggest-ai-tool.ts
'use server';

/**
 * @fileOverview This file defines a flow for suggesting the most suitable AI tool based on a user-provided prompt.
 *
 * - suggestAiTool - A function that takes a user prompt and returns a suggested AI tool.
 * - SuggestAiToolInput - The input type for the suggestAiTool function.
 * - SuggestAiToolOutput - The return type for the suggestAiTool function.
 */

import type { SupportedLanguage } from '@/contexts/language-context';
import { getAiTools } from '@/lib/firebase/firestore';
import { createSlug } from '@/lib/utils';

export interface SuggestAiToolInput {
  prompt: string;
  language: string;
}

export interface SuggestAiToolOutput {
  suggestedTool: string;
  reason: string;
  toolSlug?: string | null;
}

const languageMap: Record<SupportedLanguage, string> = {
  en: 'English',
  fr: 'French',
  es: 'Spanish',
};

export async function suggestAiTool(input: SuggestAiToolInput): Promise<SuggestAiToolOutput> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  
  if (!apiKey || apiKey.includes("paste_your")) {
    throw new Error("Google AI API key is not configured");
  }

  const aiTools = await getAiTools();
  const languageName = languageMap[input.language as SupportedLanguage] || 'English';
  
  // Pré-filtrer les outils pertinents basé sur des mots-clés du prompt
  const promptLower = input.prompt.toLowerCase();
  
  // Catégories de mots-clés
  const keywords = {
    image: ['image', 'photo', 'picture', 'visual', 'graphic', 'logo', 'design', 'illustration'],
    video: ['video', 'film', 'movie', 'animation', 'montage'],
    text: ['text', 'writing', 'content', 'article', 'blog', 'copy', 'rédaction', 'écrire'],
    code: ['code', 'programming', 'developer', 'app', 'website', 'développement'],
    chat: ['chat', 'conversation', 'assistant', 'talk', 'dialogue'],
    music: ['music', 'audio', 'sound', 'musique', 'son'],
  };
  
  // Trouver les catégories pertinentes
  let relevantTools = aiTools;
  const matchedCategories: string[] = [];
  
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => promptLower.includes(word))) {
      matchedCategories.push(category);
    }
  }
  
  // Si on a des catégories matchées, filtrer par catégorie
  if (matchedCategories.length > 0) {
    relevantTools = aiTools.filter(tool => {
      const categoryMatch = matchedCategories.some(cat => tool.category?.toLowerCase().includes(cat));
      const descFr = tool.description?.fr?.toLowerCase() || '';
      const descEn = tool.description?.en?.toLowerCase() || '';
      const descEs = tool.description?.es?.toLowerCase() || '';
      const descMatch = matchedCategories.some(cat => 
        descFr.includes(cat) || descEn.includes(cat) || descEs.includes(cat)
      );
      return categoryMatch || descMatch;
    });
  }
  
  // Si le filtrage donne trop peu ou trop de résultats, prendre un échantillon
  if (relevantTools.length < 20) {
    relevantTools = aiTools.slice(0, 50); // Top 50 outils
  } else if (relevantTools.length > 60) {
    relevantTools = relevantTools.slice(0, 60); // Limiter à 60
  }
  
  const toolNames = relevantTools.map(tool => tool.name).join(', ');

  const promptText = `AI tool expert. Respond in ${languageName}.

User: ${input.prompt}

Tools: ${toolNames}

Suggest ONE tool and explain why (2-3 sentences) in JSON:
{"suggestedTool":"name","reason":"detailed explanation"}`;

  try {
    // Utiliser l'API REST v1beta avec le modèle gemini-2.5-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: promptText
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Google AI API Error:", response.status, errorData);
      throw new Error(`API returned ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!text) {
      throw new Error("Empty response from AI");
    }
    
    console.log("[AI Response]", text); // Debug log
    
    // Extraire tool et reason même si le JSON est tronqué
    let suggestedTool = 'ChatGPT';
    let reason = 'Outil polyvalent recommandé.';
    
    // Nettoyer les code blocks markdown
    const cleanText = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    // Extraire suggestedTool
    const toolMatch = cleanText.match(/"suggestedTool"\s*:\s*"([^"]+)"/);
    if (toolMatch) {
      suggestedTool = toolMatch[1];
    }
    
    // Extraire reason (même si tronqué) - capturer jusqu'au " OU jusqu'à la fin
    const reasonMatch = cleanText.match(/"reason"\s*:\s*"([^"]+)/);
    if (reasonMatch) {
      reason = reasonMatch[1];
      // Si la raison ne se termine pas normalement, ajouter ...
      if (!cleanText.includes(`"reason": "${reason}"`)) {
        reason += '...';
      }
    }
    
    const suggestedToolLower = suggestedTool.toLowerCase();
    const suggestedSlug = createSlug(suggestedTool);
    const matchedTool =
      aiTools.find(tool => tool.name.toLowerCase() === suggestedToolLower) ||
      aiTools.find(tool => createSlug(tool.name) === suggestedSlug) ||
      aiTools.find(tool => tool.name.toLowerCase().includes(suggestedToolLower)) ||
      aiTools.find(tool => suggestedToolLower.includes(tool.name.toLowerCase()));

    const resolvedToolName = matchedTool?.name || suggestedTool;
    const resolvedToolSlug = matchedTool ? createSlug(matchedTool.name) : null;

    console.log("[Parsed]", { suggestedTool: resolvedToolName, reason, resolvedToolSlug });
    
    return {
      suggestedTool: resolvedToolName,
      reason,
      toolSlug: resolvedToolSlug,
    };
  } catch (error) {
    console.error("Error calling Google AI:", error);
    throw new Error("Failed to get AI suggestion");
  }
}
