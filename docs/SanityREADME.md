# Mustarred Sanity Studio

This folder contains the Sanity Studio configuration for managing blog content.

## Quick Commands

```bash
# Start studio locally (for testing)
npm run dev
# Opens at http://localhost:3333

# Deploy to production
npm run deploy
# Deploys to https://mustarred.sanity.studio

# Build for production
npm run build
```

## Project Details

- **Project ID**: o8hkbv97
- **Dataset**: production
- **Studio URL**: https://mustarred.sanity.studio (after deployment)

## First Time Setup

1. Deploy the studio:
```bash
npm run deploy
```

2. Add team members:
   - Go to https://www.sanity.io/manage
   - Select "Mustarred" project
   - Click "Members" → "Invite members"
   - Add email and select "Editor" role

## Schema

The blog post schema includes:
- Title
- Slug (auto-generated)
- Author
- Featured Image
- Category (Mustarred Insights, Compliance, Banking & Finance, Corporate Governance)
- Excerpt
- Content
- Published Date
- SEO fields

## Documentation

See `/docs/SANITY_SETUP.md` for complete setup guide.
See `/docs/MARKETER_GUIDE.md` for content management guide.
