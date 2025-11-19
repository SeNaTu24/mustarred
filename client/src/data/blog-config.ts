/**
 * Blog System Configuration
 * 
 * Central configuration for blog settings.
 * Modify these values to change blog behavior globally.
 */

import { BlogConfig, BlogCategory } from './blog-types';

export const BLOG_CONFIG: BlogConfig = {
  postsPerPage: 12,
  defaultCategory: 'All',
  wordsPerMinute: 200, // Average reading speed
};

export const BLOG_CATEGORIES: readonly BlogCategory[] = [
  'All',
  'Data Protection',
  'Banking & Finance', 
  'Compliance',
  'Corporate Governance'
] as const;

/**
 * Calculate reading time based on word count
 * @param content - Article content string
 * @returns Formatted read time string (e.g., "5 min read")
 */
export function calculateReadTime(content: string): string {
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / BLOG_CONFIG.wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Format date for display
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}