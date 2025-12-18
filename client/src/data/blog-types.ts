/**
 * Blog System Type Definitions
 * 
 * This file contains all TypeScript interfaces and types for the blog system.
 * Update these types when adding new fields or changing data structure.
 */

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string; // Format: YYYY-MM-DD
  category: BlogCategory;
  image: string; // Path relative to public folder (e.g., "/image.webp")
  readTime?: string; // Auto-calculated, don't set manually
  tags?: string[]; // Optional tags for future use
  featured?: boolean; // Optional featured flag
}

export type BlogCategory = 
  | 'All' 
  | 'Data Protection' 
  | 'Banking & Finance' 
  | 'Compliance' 
  | 'Corporate Governance'
  | 'Mustarred Insights';

export interface BlogConfig {
  postsPerPage: number;
  defaultCategory: BlogCategory;
  wordsPerMinute: number; // For read time calculation
}

export interface SearchFilters {
  searchTerm: string;
  selectedCategory: BlogCategory;
  sortBy?: 'date' | 'title' | 'readTime';
  sortOrder?: 'asc' | 'desc';
}