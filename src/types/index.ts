
import type { LucideIcon } from 'lucide-react';

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
  description: string;
  longDescription?: string;
  category: AiToolCategory;
  icon?: LucideIcon; // For category icon display, specific to tool or generic for category
  imageUrl?: string;
  website: string;
  rating?: number; // Optional rating 0-5
  tags?: string[];
  pricing?: 'Free' | 'Freemium' | 'Paid' | 'Contact for Pricing';
  features?: string[];
}
