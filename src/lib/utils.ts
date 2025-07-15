import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to create a slug from a name
export const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\./g, '-') // Replace dots with hyphens
    .replace(/\s+/g, '-') // Replace whitespace with hyphens
    .replace(/[^\w-]+/g, '') // Remove special characters except word characters and hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Trim leading/trailing hyphens
    .trim();
};
