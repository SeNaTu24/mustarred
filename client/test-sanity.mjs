import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'o8hkbv97',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-01-01',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

function calculateReadTime(content) {
  if (!content) return "0 min read";
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
}

function convertSanityPost(sanityPost) {
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

async function main() {
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
    const posts = await client.fetch(query);
    const mapped = posts.map(convertSanityPost);
    console.log(mapped.map(m => ({ title: m.title, excerpt: m.excerpt, category: m.category, content: m.content ? 'exists' : 'missing' })));
  } catch (err) {
    console.error(err);
  }
}

main().catch(console.error);
