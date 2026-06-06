import { BlogPost } from '../data/blog-types';
import { calculateReadTime } from '../data/blog-config';

const WP_URL = import.meta.env.DEV 
  ? '/wp-api'
  : 'https://mustarredblog.infinityfreeapp.com/wp/wp-json/wp/v2';

interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ name: string }>>;
    author?: Array<{ name: string }>;
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function convertWPPost(wp: WPPost): BlogPost {
  const image = wp._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '';
  const category = wp._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'Mustarred Insights';
  const author = wp._embedded?.author?.[0]?.name ?? 'Admin Mustarred';
  const content = wp.content.rendered;
  const plainText = stripHtml(content);

  return {
    id: wp.slug,
    title: stripHtml(wp.title.rendered),
    excerpt: stripHtml(wp.excerpt.rendered),
    content,
    author,
    date: wp.date.split('T')[0],
    category: category as BlogPost['category'],
    image,
    readTime: calculateReadTime(plainText),
  };
}

export async function getWPPosts(): Promise<BlogPost[]> {
  console.log('Fetching from WordPress...');
  const res = await fetch(`${WP_URL}/posts?_embed&per_page=100`);
  console.log('WordPress response status:', res.status);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  const text = await res.text();
  console.log('WordPress raw response:', text.slice(0, 200));
  const posts: WPPost[] = JSON.parse(text);
  console.log('WordPress posts fetched:', posts.length);
  return posts.map(convertWPPost);
}

export async function getWPPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${WP_URL}/posts?slug=${slug}&_embed`);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  const posts: WPPost[] = await res.json();
  if (!posts.length) return null;
  return convertWPPost(posts[0]);
}
