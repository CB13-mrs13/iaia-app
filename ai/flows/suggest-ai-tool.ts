

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

export interface SuggestAiToolInput {
  prompt: string;
  language: string;
}

export interface SuggestAiToolOutput {
  suggestedTool: string;
  reason: string;
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
  const toolNames = aiTools.map(tool => tool.name).join(', ');

  const promptText = `You are an AI tool suggestion expert. You MUST generate your entire response, including the reasoning, in ${languageName}.

User Prompt: ${input.prompt}

Available AI Tools: ${toolNames}

Please respond in JSON format with exactly these two fields:
{
  "suggestedTool": "exact name of ONE tool from the list above",
  "reason": "explanation in ${languageName} of why this tool is best"
}`;

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
            maxOutputTokens: 1024,
            responseMimeType: "application/json",
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
    
    // Try to parse JSON from the response - try multiple patterns
    try {
      // Pattern 1: JSON code block with ```json
      let jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
      if (!jsonMatch) {
        // Pattern 2: Plain JSON object
        jsonMatch = text.match(/\{[\s\S]*"suggestedTool"[\s\S]*\}/);
      }
      if (!jsonMatch) {
        // Pattern 3: Any JSON object
        jsonMatch = text.match(/\{[\s\S]*\}/);
      }
      
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        const parsed = JSON.parse(jsonStr);
        console.log("[Parsed JSON]", parsed); // Debug log
        
        return {
          suggestedTool: parsed.suggestedTool || parsed.tool || parsed.name || '',
          reason: parsed.reason || parsed.explanation || parsed.description || text
        };
      }
    } catch (parseError) {
      console.error("[JSON Parse Error]", parseError);
    }
    
    // Fallback: try to extract tool name and reason from text manually
    console.log("[Fallback parsing]", text);
    const lines = text.split('\n').filter((line: string) => line.trim());
    
    // Look for tool name in common patterns
    let toolName = 'ChatGPT';
    const toolPattern = /"suggestedTool"\s*:\s*"([^"]+)"/;
    const toolMatch = text.match(toolPattern);
    if (toolMatch) {
      toolName = toolMatch[1];
    }
    
    return {
      suggestedTool: toolName,
      reason: lines.slice(1).join(' ') || text
    };
  } catch (error) {
    console.error("Error calling Google AI:", error);
    throw new Error("Failed to get AI suggestion");
  }
}
