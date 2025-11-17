
import { Brain, Image as ImageIcon, Video as VideoIcon, Code2, Music, Briefcase, Palette, Shapes, Bot, Edit3, Film, Mic2, Zap, LayoutDashboard, PackageCheck, Pen, Share2, TrendingUp, GraduationCap, Heart, DollarSign } from 'lucide-react';
import type { AiToolCategory } from '@/types';
import type { LucideIcon } from 'lucide-react';

export const aiToolCategories: AiToolCategory[] = [
  'Gratuit',
  'LLM',
  'Photo',
  'Video',
  'Coding',
  'Audio',
  'Productivity',
  'Design',
  'Writing',
  'Social Media',
  'Marketing',
  'Education',
  'Health',
  'Finance',
  'Other',
];

export const categoryIcons: Record<AiToolCategory, LucideIcon> = {
  LLM: Bot, // Changed Brain to Bot for more direct AI representation
  Photo: ImageIcon,
  Video: Film, // Changed VideoIcon to Film for better visual
  Coding: Code2,
  Audio: Mic2, // Changed Music to Mic2
  Productivity: Zap, // Changed Briefcase to Zap for dynamism
  Design: Edit3, // Changed Palette to Edit3 for a more active icon
  Writing: Pen,
  'Social Media': Share2,
  Marketing: TrendingUp,
  Education: GraduationCap,
  Health: Heart,
  Finance: DollarSign,
  Gratuit: PackageCheck,
  Other: LayoutDashboard, // Changed Shapes to a more generic 'dashboard' or 'various' icon
};

export const getCategoryIcon = (category: AiToolCategory): LucideIcon => {
  return categoryIcons[category] || Shapes; // Default to Shapes if category not found
};
