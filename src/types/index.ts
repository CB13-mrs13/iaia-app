
import type { LucideIcon } from 'lucide-react';
import type { SupportedLanguage } from '@/contexts/language-context';

export type AiToolCategory =
  | 'LLM'
  | 'Photo'
  | 'Video'
  | 'Coding'
  | 'Audio'
  | 'Productivity'
  | 'Design'
  | 'Other';

export interface AiTool {
  id: string;
  name: string;
  description: Record<SupportedLanguage, string>;
  longDescription?: Record<SupportedLanguage, string>;
  category: AiToolCategory;
  icon?: LucideIcon; // For category icon display, specific to tool or generic for category
  imageUrl?: string;
  imageKeywords?: string; // One or two keywords for image search/hint
  website: string;
  rating?: number; // Optional rating 0-5
  tags?: string[];
  pricing?: 'Free' | 'Freemium' | 'Paid' | 'Contact for Pricing';
  features?: Record<SupportedLanguage, string[]>;
  isSponsored?: boolean;
}
