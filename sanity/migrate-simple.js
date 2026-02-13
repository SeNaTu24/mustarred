import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'o8hkbv97',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_TOKEN,
});

const blogPosts = [
  {
    id: "vaspa-partnership-2026",
    title: "Mustarred Partners with VASPA for 2026 Mastermind Builders' Luncheon",
    excerpt: "We are pleased to partner with VASPA as a sponsor of the 2026 Mastermind Builders' Luncheon",
    content: "We are pleased to partner with VASPA as a sponsor of the 2026 Mastermind Builders' Luncheon, standing alongside builders advancing Nigeria's blockchain ecosystem.",
    author: "Admin Mustarred",
    date: "2025-12-17",
    category: "Mustarred Insights",
  },
  {
    id: "regulatory-roundup-may-2025",
    title: "The Scoop: Regulatory Roundup (May 2025)",
    excerpt: "A comprehensive monthly digest of regulatory developments across Africa and beyond",
    content: "Regulatory developments across Africa covering data protection, digital assets, and fintech innovations.",
    author: "Admin Mustarred",
    date: "2025-05-24",
    category: "Compliance",
  },
  {
    id: "regulatory-roundup-july-2025",
    title: "The Scoop: Regulatory Roundup (July 7-18, 2025)",
    excerpt: "Weekly digest of regulatory developments across Africa and beyond",
    content: "Regulatory and economic developments shaping Africa from fiscal reforms to global trade shifts.",
    author: "Admin Mustarred",
    date: "2025-07-18",
    category: "Compliance",
  },
  {
    id: "cbn-exposure-draft",
    title: "Navigating the Future of AML Compliance: CBN's Draft Baseline Standards",
    excerpt: "Analysis of the Central Bank of Nigeria's latest exposure draft",
    content: "On May 20, 2025, the CBN released an exposure draft on Baseline Standards for Automated AML Solutions.",
    author: "Admin Mustarred",
    date: "2025-05-27",
    category: "Banking & Finance",
  },
  {
    id: "tamara-compliance-framework",
    title: "Building Robust Compliance Frameworks for Growing Businesses",
    excerpt: "Essential strategies for implementing effective compliance management systems",
    content: "As businesses grow, maintaining robust compliance frameworks becomes increasingly critical.",
    author: "Admin Mustarred",
    date: "2025-05-24",
    category: "Corporate Governance",
  },
];

async function migratePosts() {
  console.log('Starting migration of', blogPosts.length, 'blog posts...\n');

  for (const post of blogPosts) {
    try {
      console.log(`Migrating: ${post.title}`);

      const doc = {
        _type: 'blogPost',
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.id,
        },
        author: post.author,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        publishedAt: new Date(post.date).toISOString(),
      };

      const result = await client.create(doc);
      console.log(`✅ Created: ${result._id}\n`);
    } catch (error) {
      console.error(`❌ Error: ${error.message}\n`);
    }
  }

  console.log('Migration complete! Go to https://mustarred.sanity.studio/ to see your posts.');
}

migratePosts().catch(console.error);
