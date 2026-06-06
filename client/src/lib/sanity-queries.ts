import { BlogPost } from '../data/blog-types';
import { blogPosts as hardcodedPosts } from '../data/blog-posts';
import { getWPPosts, getWPPostBySlug } from './wordpress';

// Merge WordPress posts with hardcoded posts.
// WordPress posts take precedence, sorted newest first.
function mergePosts(wpPosts: BlogPost[]): BlogPost[] {
  const wpIds = new Set(wpPosts.map(p => p.id));
  const uniqueHardcoded = hardcodedPosts.filter(p => !wpIds.has(p.id));
  const combined = [...wpPosts, ...uniqueHardcoded];
  return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Fetch all blog posts (WordPress + hardcoded, merged and sorted)
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const wpPosts = await getWPPosts();
    return mergePosts(wpPosts);
  } catch {
    // If WordPress is unreachable, fall back to hardcoded posts
    return hardcodedPosts;
  }
}

// Fetch single post by slug (checks WordPress first, then hardcoded)
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await getWPPostBySlug(slug);
    if (post) return post;
  } catch {
    // fall through to hardcoded lookup
  }
  return hardcodedPosts.find(p => p.id === slug) ?? null;
}

// Fetch posts by category (merged)
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const all = await getAllPosts();
  if (category === 'All') return all;
  return all.filter(p => p.category === category);
}

// Fetch latest N posts (merged, newest first)
export async function getLatestPosts(count: number = 3): Promise<BlogPost[]> {
  const all = await getAllPosts();
  return all.slice(0, count);
}
