import { BlogPost } from '../data/blog-types';
import { calculateReadTime } from '../data/blog-config';

const WP_URL = import.meta.env.VITE_WP_URL
  ? import.meta.env.VITE_WP_URL
  : import.meta.env.DEV
    ? '/wp-api'
    : '/wp-proxy';

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

const NAMED_HTML_ENTITIES: Record<string, string> = {
  amp: '&',
  apos: "'",
  bull: '•',
  copy: '©',
  gt: '>',
  hellip: '…',
  ldquo: '“',
  lsquo: '‘',
  lt: '<',
  mdash: '—',
  nbsp: ' ',
  ndash: '–',
  quot: '"',
  rdquo: '”',
  reg: '®',
  rsquo: '’',
  trade: '™',
};

function decodeHtmlEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      const codePoint = Number.parseInt(entity.slice(2), 16);
      if (Number.isInteger(codePoint) && codePoint > 0 && codePoint <= 0x10ffff) {
        return String.fromCodePoint(codePoint);
      }
      return match;
    }
    if (entity.startsWith('#')) {
      const codePoint = Number.parseInt(entity.slice(1), 10);
      if (Number.isInteger(codePoint) && codePoint > 0 && codePoint <= 0x10ffff) {
        return String.fromCodePoint(codePoint);
      }
      return match;
    }
    const named = NAMED_HTML_ENTITIES[entity.toLowerCase()];
    return named ?? match;
  });
}

function stripHtml(html: string): string {
  if (!html) return '';
  // Preserve spacing at block boundaries before stripping HTML tags
  const withoutTags = html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|div|li|h[1-6]|blockquote)>/gi, ' ')
    .replace(/<[^>]*>/g, '');

  // Decode entities once to plain text (never parsed as HTML/DOM)
  const decoded = decodeHtmlEntities(withoutTags);

  // Normalize WordPress truncation markers like "[&hellip;]" or "[...]" into clean ellipsis
  return decoded
    .replace(/\s*\[\s*(?:…|\.\.\.)\s*\]/g, '…')
    .replace(/\s+/g, ' ')
    .trim();
}

function convertWPPost(wp: WPPost): BlogPost {
  const image = wp._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? (wp as any).jetpack_featured_media_url ?? '';
  const rawCategory = wp._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'Mustarred Insights';
  const rawAuthor = wp._embedded?.author?.[0]?.name ?? 'Admin Mustarred';
  const content = wp.content.rendered;
  const plainText = stripHtml(content);

  return {
    id: wp.slug,
    title: stripHtml(wp.title.rendered),
    excerpt: stripHtml(wp.excerpt.rendered),
    content,
    author: stripHtml(rawAuthor),
    date: wp.date.split('T')[0],
    category: stripHtml(rawCategory) as BlogPost['category'],
    image,
    readTime: calculateReadTime(plainText),
  };
}

export async function getWPPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${WP_URL}/posts?_embed&per_page=100`);
    if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(`WordPress API returned non-JSON response (${contentType || 'empty'})`);
    }
    const posts: WPPost[] = await res.json();
    return posts.map(convertWPPost);
  } catch (error) {
    console.warn('WordPress API unavailable, falling back to static content:', error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function getWPPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${WP_URL}/posts?slug=${slug}&_embed`);
    if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(`WordPress API returned non-JSON response (${contentType || 'empty'})`);
    }
    const posts: WPPost[] = await res.json();
    if (!posts.length) return null;
    return convertWPPost(posts[0]);
  } catch {
    return null;
  }
}
