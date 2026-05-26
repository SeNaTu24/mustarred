# Blog Post Migration Guide

## Step 1: Get Your Sanity Token

1. Go to https://www.sanity.io/manage
2. Select "Mustarred" project
3. Click "API" in left sidebar
4. Click "Tokens" tab
5. Click "+ Add API token"
6. Name: "Migration Token"
7. Permissions: **Editor**
8. Click "Add token"
9. **Copy the token** (you won't see it again!)

## Step 2: Run Migration

Open terminal in the `sanity` folder and run:

```bash
# Windows PowerShell
$env:SANITY_TOKEN="your-token-here"
node migrate.js

# Windows CMD
set SANITY_TOKEN=your-token-here
node migrate.js
```

Replace `your-token-here` with the token you copied.

## What It Does

The script will:
1. Upload all 6 blog post images to Sanity
2. Create all 6 blog posts in Sanity
3. Preserve all data (title, content, dates, categories, etc.)

## After Migration

1. Go to https://mustarred.sanity.studio/
2. Click "Blog Post" - you should see all 6 posts
3. Visit your website `/our-insights` - all posts will appear!

## Troubleshooting

**"Image not found" errors**: Some images might not exist in the paths specified. The script will skip them and continue.

**"Unauthorized" error**: Your token is invalid or expired. Generate a new one.

**Posts already exist**: If you run the script twice, it will create duplicates. Delete them manually in the studio.
