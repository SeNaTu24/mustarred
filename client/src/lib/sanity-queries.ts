import { client } from './sanity';
import { SanityBlogPost } from './sanity-types';
import { BlogPost } from '../data/blog-types';
import { calculateReadTime } from '../data/blog-config';
import { urlFor } from './sanity';
import { blogPosts as hardcodedPosts } from '../data/blog-posts';

// Merge hardcoded posts with Sanity posts.
// Sanity posts take precedence (deduplicated by id), sorted newest first.
function mergePosts(sanityPosts: BlogPost[]): BlogPost[] {
  const sanityIds = new Set(sanityPosts.map(p => p.id));
  const uniqueHardcoded = hardcodedPosts.filter(p => !sanityIds.has(p.id));
  const combined = [...sanityPosts, ...uniqueHardcoded];
  return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Convert Sanity post to app BlogPost format
function convertSanityPost(sanityPost: SanityBlogPost): BlogPost {
  return {
    id: sanityPost.slug.current,
    title: sanityPost.title,
    excerpt: sanityPost.excerpt,
    content: sanityPost.content,
    author: sanityPost.author,
    date: sanityPost.publishedAt,
    category: sanityPost.category as any,
    image: sanityPost.featuredImage 
      ? urlFor(sanityPost.featuredImage).width(1200).url() 
      : '/assets/images/blog/default.jpg',
    readTime: calculateReadTime(sanityPost.content),
  };
}

// Fetch all blog posts (Sanity + hardcoded, merged and sorted)
export async function getAllPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    content,
    author,
    publishedAt,
    category,
    featuredImage,
    seoTitle,
    seoDescription
  }`;
  
  try {
    const posts = await client.fetch<SanityBlogPost[]>(query);
    return mergePosts(posts.map(convertSanityPost));
  } catch {
    // If Sanity is unreachable, fall back to hardcoded posts only
    return hardcodedPosts;
  }
}

// Fetch single post by slug (checks Sanity first, then hardcoded)
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    content,
    author,
    publishedAt,
    category,
    featuredImage,
    seoTitle,
    seoDescription
  }`;
  
  try {
    const post = await client.fetch<SanityBlogPost>(query, { slug });
    if (post) return convertSanityPost(post);
  } catch {
    // fall through to hardcoded lookup
  }
  
  // Fall back to hardcoded post
  return hardcodedPosts.find(p => p.id === slug) ?? null;
}

// Fetch posts by category (merged)
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  if (category === 'All') {
    return getAllPosts();
  }
  
  const query = `*[_type == "blogPost" && category == $category] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    content,
    author,
    publishedAt,
    category,
    featuredImage,
    seoTitle,
    seoDescription
  }`;
  
  try {
    const posts = await client.fetch<SanityBlogPost[]>(query, { category });
    const sanityConverted = posts.map(convertSanityPost);
    const hardcodedFiltered = hardcodedPosts.filter(p => p.category === category);
    const sanityIds = new Set(sanityConverted.map(p => p.id));
    const uniqueHardcoded = hardcodedFiltered.filter(p => !sanityIds.has(p.id));
    const combined = [...sanityConverted, ...uniqueHardcoded];
    return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return hardcodedPosts.filter(p => p.category === category);
  }
}

// Fetch latest N posts (merged, newest first)
export async function getLatestPosts(count: number = 3): Promise<BlogPost[]> {
  const all = await getAllPosts();
  return all.slice(0, count);
}
