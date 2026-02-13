export interface SanityBlogPost {
  _id: string;
  _createdAt: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  featuredImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
}
