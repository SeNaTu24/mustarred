# Sanity CMS Setup Guide for Mustarred

## ✅ What's Been Set Up

Your Mustarred website now has Sanity CMS integrated! Here's what's ready:

### 1. Sanity Studio (Content Management Interface)
- Location: `/sanity` folder
- Your marketer will use this to manage blog posts
- Beautiful, user-friendly interface

### 2. Blog Post Schema
Fields your marketer can manage:
- ✅ Title
- ✅ Slug (auto-generated from title)
- ✅ Author (defaults to "Admin Mustarred")
- ✅ Featured Image (drag & drop upload)
- ✅ Category (dropdown: Mustarred Insights, Compliance, Banking & Finance, Corporate Governance)
- ✅ Excerpt (short description)
- ✅ Content (full article text)
- ✅ Published Date
- ✅ SEO Title (optional)
- ✅ SEO Description (optional)

### 3. React Integration
- Sanity client configured
- Helper functions to fetch blog posts
- Automatic image optimization
- Read time calculation

---

## 🚀 Next Steps (You Need To Do These)

### Step 1: Deploy Sanity Studio

Run these commands:

```bash
cd sanity
npm run deploy
```

This will:
- Build your Sanity Studio
- Deploy it to Sanity's hosting
- Give you a URL like: `https://mustarred.sanity.studio`

### Step 2: Add Your Marketer as User

1. Go to https://www.sanity.io/manage
2. Select your "Mustarred" project
3. Click "Members" in the left sidebar
4. Click "Invite members"
5. Enter her email address
6. Choose role: **Editor** (can create/edit content but not change settings)
7. Click "Send invite"

She'll receive an email to create her account.

### Step 3: Update Your Blog Page to Use Sanity

I'll need to update your blog page to fetch from Sanity instead of the hardcoded data.

**Option A: Keep existing posts + add Sanity posts**
- Your 6 current blog posts stay in code
- New posts come from Sanity
- Good for transition period

**Option B: Migrate all posts to Sanity**
- Move all 6 existing posts to Sanity
- Everything managed through CMS
- Cleaner long-term solution

Which do you prefer?

---

## 📱 How Your Marketer Will Use It

### Adding a New Blog Post:

1. Go to `https://mustarred.sanity.studio`
2. Log in with her email
3. Click "Blog Post" in the sidebar
4. Click "Create new Blog Post"
5. Fill in the fields:
   - **Title**: "New Article Title"
   - **Slug**: Click "Generate" (auto-creates URL-friendly version)
   - **Author**: Already filled as "Admin Mustarred"
   - **Featured Image**: Click to upload or drag & drop
   - **Category**: Select from dropdown
   - **Excerpt**: Write short summary (max 300 characters)
   - **Content**: Write full article
   - **Published at**: Select date/time
   - **SEO fields**: Optional but recommended
6. Click "Publish" button

**The post appears on your website immediately!**

### Editing a Post:

1. Go to studio
2. Click "Blog Post"
3. Find the post in the list
4. Click to open
5. Make changes
6. Click "Publish"

### Unpublishing a Post:

1. Open the post
2. Click the three dots (•••) menu
3. Click "Unpublish"

---

## 🔧 Technical Details

### Sanity Studio Commands:

```bash
cd sanity

# Start studio locally (for testing)
npm run dev
# Opens at http://localhost:3333

# Deploy to production
npm run deploy
```

### React App Integration:

The blog posts are fetched using these functions (already created):

```typescript
import { getAllPosts, getPostBySlug } from '@/lib/sanity-queries';

// Get all posts
const posts = await getAllPosts();

// Get single post
const post = await getPostBySlug('article-slug');
```

### Environment Variables:

Already configured in `client/.env`:
```
VITE_SANITY_PROJECT_ID=o8hkbv97
VITE_SANITY_DATASET=production
```

---

## 🎨 Customization Options

### Adding New Categories:

Edit `sanity/schemaTypes/blogPost.ts`:

```typescript
options: {
  list: [
    {title: 'Mustarred Insights', value: 'Mustarred Insights'},
    {title: 'Compliance', value: 'Compliance'},
    {title: 'Banking & Finance', value: 'Banking & Finance'},
    {title: 'Corporate Governance', value: 'Corporate Governance'},
    {title: 'New Category', value: 'New Category'}, // Add here
  ],
}
```

Then run:
```bash
cd sanity
npm run deploy
```

### Adding New Fields:

You can add fields like:
- Tags
- Related posts
- Video embeds
- PDF attachments
- Custom metadata

Just edit the schema and redeploy.

---

## 💰 Pricing (Free Tier)

Your current setup uses Sanity's free tier:
- ✅ 3 users (you + marketer + 1 more)
- ✅ Unlimited API requests
- ✅ 10GB bandwidth/month
- ✅ 5GB assets storage
- ✅ Unlimited documents

This is more than enough for a blog!

---

## 🆘 Troubleshooting

### "Can't connect to Sanity"
- Check internet connection
- Verify project ID is correct: `o8hkbv97`

### "Images not loading"
- Make sure images are uploaded through Sanity Studio
- Check image URLs in browser console

### "Posts not appearing"
- Verify posts are published (not drafts)
- Check browser console for errors
- Ensure `publishedAt` date is not in the future

---

## 📞 Support

For Sanity-specific issues:
- Docs: https://www.sanity.io/docs
- Community: https://slack.sanity.io

For integration issues, let me know!

---

## ✨ What's Next?

Tell me which option you prefer:
- **Option A**: Keep existing posts in code + new posts in Sanity
- **Option B**: Migrate all posts to Sanity

Then I'll update your blog page accordingly!
