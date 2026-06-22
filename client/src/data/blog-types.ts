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
  date: string;
  category: BlogCategory;
  image: string;
  readTime?: string;
  tags?: string[];
  featured?: boolean;
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