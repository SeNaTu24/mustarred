import { client } from './sanity';
import { SanityBlogPost } from './sanity-types';
import { BlogPost } from '../data/blog-types';
import { calculateReadTime } from '../data/blog-config';
import { urlFor } from './sanity';

// Convert Sanity post to app BlogPost format
function convertSanityPost(sanityPost: SanityBlogPost): BlogPost {
  return {
    id: sanityPost.slug.current,
    title: sanityPost.title,
    excerpt: sanityPost.excerpt,
    content: sanityPost.content,
    author: sanityPost.author,
    date: sanityPost.publishedAt,
    category: sanityPost.category,
    image: sanityPost.featuredImage 
      ? urlFor(sanityPost.featuredImage).width(1200).url() 
      : '/assets/images/blog/default.jpg',
    readTime: calculateReadTime(sanityPost.content),
  };
}

// Fetch all blog posts
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
  
  const posts = await client.fetch<SanityBlogPost[]>(query);
  return posts.map(convertSanityPost);
}

// Fetch single post by slug
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
  
  const post = await client.fetch<SanityBlogPost>(query, { slug });
  return post ? convertSanityPost(post) : null;
}

// Fetch posts by category
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
  
  const posts = await client.fetch<SanityBlogPost[]>(query, { category });
  return posts.map(convertSanityPost);
}

// Fetch latest posts
export async function getLatestPosts(count: number = 3): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) [0...${count}] {
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
  
  const posts = await client.fetch<SanityBlogPost[]>(query);
  return posts.map(convertSanityPost);
}
