# Blog System Documentation

## 📝 Adding New Articles

### Step 1: Prepare Your Image
1. **Location:** Place images in `client/public/`
2. **Format:** Use `.webp` for best performance (or `.avif`, `.jpg`, `.png`)
3. **Size:** Recommended 1200x675px (16:9 aspect ratio)
4. **Naming:** Use kebab-case: `article-title.webp`

### Step 2: Add Article Data
Edit `blog-posts.ts` and add your article to the `rawBlogPosts` array:

```typescript
{
  id: "unique-article-id", // kebab-case, used in URL
  title: "Your Article Title",
  excerpt: "Brief description shown in blog cards (150-200 chars)",
  content: `# Your Article Title
  
  ## Section 1
  Your content here using **markdown** formatting.
  
  ### Subsection
  - Bullet points work
  - External links: [Link text](https://example.com)
  - Internal references work too
  
  ## Section 2
  More content...
  `,
  author: "Mustarred Team", // Keep consistent
  date: "2025-MM-DD", // YYYY-MM-DD format, determines order
  category: "Compliance", // See categories below
  image: "/your-image.webp", // Path from public folder
}
```

### Step 3: Available Categories
- `"Data Protection"` - GDPR, NDPR, privacy laws
- `"Banking & Finance"` - Financial regulations, CBN guidelines  
- `"Compliance"` - General compliance, regulatory updates
- `"Corporate Governance"` - Board governance, ESG, policies

## 🔧 System Features

### Automatic Features
- ✅ **Read Time:** Auto-calculated at 200 words/minute
- ✅ **External Links:** Open in new tabs automatically
- ✅ **Responsive:** Works on all devices
- ✅ **SEO:** Clean URLs and meta tags
- ✅ **Search:** Full-text search across title/excerpt

### Manual Features
- 🔍 **Search Bar:** Users can search articles
- 🏷️ **Category Filter:** Filter by category
- 📱 **Mobile Optimized:** Touch-friendly interface
- 🔗 **Social Sharing:** Share buttons included

## 📁 File Structure
```
src/data/
├── blog-types.ts      # TypeScript interfaces
├── blog-config.ts     # Configuration & utilities  
├── blog-posts.ts      # Article data (EDIT THIS)
└── README.md         # This documentation
```

## 🎨 Content Guidelines

### Writing Style
- **Tone:** Professional but accessible
- **Length:** 800-2000 words optimal
- **Structure:** Use headings (##, ###) for sections
- **Links:** Always include source links for claims

### Markdown Tips
```markdown
# Main Title (auto-added)
## Section Heading
### Subsection

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

[Link text](https://example.com)

> Quote blocks for important info
```

## 🚨 Important Notes

### DO:
- ✅ Use consistent author: "Mustarred Team"
- ✅ Include source links for all claims
- ✅ Test images load correctly
- ✅ Use proper date format (YYYY-MM-DD)
- ✅ Keep excerpts under 200 characters

### DON'T:
- ❌ Use special characters in IDs
- ❌ Forget to add images to public folder
- ❌ Use very large images (>1MB)
- ❌ Leave broken links
- ❌ Duplicate article IDs

## 🔄 After Adding Articles

1. **Test Locally:** Run `npm run dev` and check your article
2. **Check Mobile:** Test on mobile devices
3. **Verify Links:** Ensure all external links work
4. **Review Content:** Proofread for typos and formatting

## 📞 Need Help?
- Check existing articles in `blog-posts.ts` for examples
- Refer to `blog-types.ts` for data structure
- Test changes locally before deploying