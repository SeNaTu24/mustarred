# Mustarred Developer Guide

## 🏗️ Project Architecture

### Frontend Stack
- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **Routing:** Wouter (lightweight React router)
- **UI Components:** Custom components + shadcn/ui
- **Build Tool:** Vite
- **Font:** Satoshi (primary), system fallbacks

### Project Structure
```
mustarrd/
├── client/                     # Frontend application
│   ├── public/                 # Static assets
│   │   ├── *.webp             # Blog article images
│   │   ├── *.avif             # Alternative image formats
│   │   └── favicon.png        # Site favicon
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── layout/        # Layout components (Header, Footer)
│   │   │   ├── sections/      # Page sections (Hero, Services, etc.)
│   │   │   └── ui/            # Base UI components (Button, Card, etc.)
│   │   ├── data/              # Data management & configuration
│   │   │   ├── blog-posts.ts  # 📝 EDIT HERE: Add new articles
│   │   │   ├── blog-types.ts  # TypeScript interfaces
│   │   │   ├── blog-config.ts # Configuration & utilities
│   │   │   └── README.md      # Blog system documentation
│   │   ├── pages/             # Page components
│   │   │   ├── Blog.tsx       # Blog listing page
│   │   │   ├── BlogPost.tsx   # Individual article page
│   │   │   └── Home.tsx       # Homepage
│   │   ├── lib/               # Utilities & helpers
│   │   ├── index.css          # Global styles & CSS variables
│   │   └── main.tsx           # App entry point
│   ├── package.json           # Dependencies & scripts
│   └── tailwind.config.js     # Tailwind configuration
├── design_guidelines.md       # Brand guidelines & design system
├── README.md                  # Project overview
└── DEVELOPER_GUIDE.md         # This file
```

## 🆕 Adding New Content

### Blog Articles (Most Common Task)
1. **Add Image:**
   ```bash
   # Place image in public folder
   cp your-image.webp client/public/
   ```

2. **Add Article:**
   ```typescript
   // Edit: client/src/data/blog-posts.ts
   {
     id: "unique-article-id",
     title: "Your Article Title",
     excerpt: "Brief description (150-200 chars)",
     content: `# Article content in markdown...`,
     author: "Mustarred Team",
     date: "2025-MM-DD",
     category: "Compliance", // See available categories
     image: "/your-image.webp",
   }
   ```

3. **Available Categories:**
   - `"Data Protection"` - GDPR, NDPR, privacy laws
   - `"Banking & Finance"` - Financial regulations, CBN
   - `"Compliance"` - General compliance, updates
   - `"Corporate Governance"` - Board governance, ESG

### Brand Assets
- **Colors:** Edit CSS variables in `client/src/index.css`
- **Fonts:** Update font imports in `client/index.html`
- **Logo:** Replace files in `client/public/`

## 🎨 Design System

### Colors (CSS Variables)
```css
--brand-primary: #4b4ba3;    /* Deep Indigo */
--brand-accent: #a49fe7;     /* Lavender Blue */
--brand-muted: #f5f5fa;      /* Mist Gray */
--brand-text: #1a1a1a;       /* Charcoal Black */
```

### Typography
- **Primary:** Satoshi font family
- **Headings:** Font weights 500-600
- **Body:** Font weight 400, line-height 1.6
- **Responsive:** Scales down on mobile

### Spacing Scale
- **Base:** 0.25rem (4px)
- **Common:** 1rem (16px), 1.5rem (24px), 2rem (32px)
- **Large:** 3rem (48px), 4rem (64px)

## 📱 Responsive Design

### Breakpoints
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Large desktops */
```

### Mobile-First Approach
```jsx
// Base styles for mobile, then scale up
<div className="text-sm md:text-base lg:text-lg">
  Content
</div>
```

## 🔧 Development Workflow

### Setup
```bash
cd client
npm install
npm run dev
```

### Common Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Standards
- **Components:** PascalCase (`BlogPost.tsx`)
- **Files:** kebab-case (`blog-posts.ts`)
- **Functions:** camelCase (`calculateReadTime`)
- **Constants:** UPPER_SNAKE_CASE (`BLOG_CONFIG`)

## 🚀 Performance Optimizations

### Images
- **Format:** WebP preferred, AVIF for modern browsers
- **Size:** Max 1200x675px (16:9 ratio)
- **Compression:** Keep under 500KB
- **Loading:** Lazy loading implemented

### Code Splitting
- **Pages:** Automatically split by Vite
- **Components:** Use dynamic imports for large components
- **Data:** Separate data files for better caching

### SEO
- **Meta tags:** Implemented in each page
- **URLs:** Clean, semantic URLs
- **Images:** Alt tags required
- **Performance:** Lighthouse score >90

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] Test on mobile, tablet, desktop
- [ ] Check all external links work
- [ ] Verify images load correctly
- [ ] Test search and filter functionality
- [ ] Validate form submissions
- [ ] Check accessibility (keyboard navigation)

### Browser Support
- **Modern:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile:** iOS Safari, Chrome Mobile
- **Fallbacks:** Graceful degradation for older browsers

## 🔒 Security Best Practices

### External Links
- All external links open in new tabs
- `rel="noopener noreferrer"` for security
- Validate all URLs before adding

### Content Security
- Sanitize all user inputs
- Validate image uploads
- Use HTTPS for all external resources

## 📊 Analytics & Monitoring

### Performance Monitoring
- **Core Web Vitals:** Monitor LCP, FID, CLS
- **Bundle Size:** Keep JavaScript under 500KB
- **Image Optimization:** Use modern formats

### User Experience
- **Loading States:** Show loading indicators
- **Error Handling:** Graceful error messages
- **Accessibility:** WCAG 2.1 AA compliance

## 🚨 Common Issues & Solutions

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Image Loading Issues
- Check file path is correct (`/image.webp`)
- Verify image exists in `public/` folder
- Ensure proper file permissions

### Styling Issues
- Check Tailwind classes are valid
- Verify CSS variables are defined
- Test in different browsers

## 📞 Support & Resources

### Documentation
- **React:** https://react.dev/
- **Tailwind:** https://tailwindcss.com/
- **TypeScript:** https://www.typescriptlang.org/

### Internal Resources
- `src/data/README.md` - Blog system guide
- `design_guidelines.md` - Brand guidelines
- Component documentation in respective folders

### Getting Help
1. Check existing documentation
2. Review similar implementations in codebase
3. Test changes locally before deploying
4. Document any new patterns or solutions