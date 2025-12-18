# Mustarred - Project Structure Guide

## 📁 Complete Directory Structure

```
mustarrd/
├── client/                          # Frontend React Application
│   ├── public/                      # Static Assets
│   │   ├── assets/                  # Organized Assets
│   │   │   ├── icons/              # Favicons & Icons
│   │   │   │   ├── favicon.png
│   │   │   │   ├── favicon.svg
│   │   │   │   └── favicon-logo.png
│   │   │   ├── images/             # All Images
│   │   │   │   ├── blog/           # Blog Article Images
│   │   │   │   │   ├── tamara1.avif
│   │   │   │   │   ├── tamara2.avif
│   │   │   │   │   ├── tamara2.webp
│   │   │   │   │   └── cbnexposure.webp
│   │   │   │   └── brand/          # Brand Assets
│   │   │   │       └── logo-rounded.png
│   │   ├── _redirects              # Netlify redirects
│   │   └── site.webmanifest        # PWA manifest
│   ├── src/                        # Source Code
│   │   ├── components/             # React Components
│   │   │   ├── layout/            # Layout Components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── BlogHeader.tsx
│   │   │   ├── sections/          # Page Sections
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── ContactSection.tsx
│   │   │   │   ├── FAQSection.tsx
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   ├── ResourceHubSection.tsx
│   │   │   │   └── ServicesHighlightSection.tsx
│   │   │   ├── ui/                # Base UI Components (Radix)
│   │   │   ├── Chatbot.tsx        # AI Chatbot
│   │   │   └── MailchimpNewsletter.tsx
│   │   ├── data/                  # Data & Configuration
│   │   │   ├── blog-posts.ts      # Blog Articles Data
│   │   │   ├── blog-types.ts      # TypeScript Interfaces
│   │   │   ├── blog-config.ts     # Blog Configuration
│   │   │   ├── chatbot-knowledge.ts
│   │   │   ├── services.ts
│   │   │   ├── testimonials.ts
│   │   │   ├── faqs.ts
│   │   │   ├── resources.ts
│   │   │   ├── founder.ts
│   │   │   └── README.md          # Data Management Guide
│   │   ├── pages/                 # Page Components
│   │   │   ├── Home.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── BlogPost.tsx
│   │   │   ├── AboutUs.tsx
│   │   │   ├── Consultation.tsx
│   │   │   ├── DCMICompliance.tsx
│   │   │   └── not-found.tsx
│   │   ├── lib/                   # Utilities & Configuration
│   │   │   ├── utils.ts
│   │   │   ├── queryClient.ts
│   │   │   └── emailjs-config.ts  # Email Service Config
│   │   ├── hooks/                 # Custom React Hooks
│   │   ├── App.tsx               # Main App Component
│   │   ├── main.tsx              # Entry Point
│   │   └── index.css             # Global Styles
│   ├── index.html                # HTML Template
│   ├── package.json              # Client Dependencies
│   ├── tailwind.config.js        # Tailwind Configuration
│   ├── tsconfig.json             # TypeScript Config
│   └── vite.config.ts            # Vite Build Config
├── attached_assets/              # Original Assets (Archive)
├── docs/                         # Documentation
│   ├── README.md                 # Project Overview
│   ├── DEVELOPER_GUIDE.md        # Development Guidelines
│   ├── SCALING_GUIDE.md          # Scaling Strategy
│   ├── EMAILJS_SETUP.md          # Email Setup Guide
│   └── PROJECT_STRUCTURE.md      # This File
├── package.json                  # Root Package Config
├── components.json               # Shadcn/UI Config
└── design_guidelines.md          # Brand Guidelines
```

## 🎯 Key Locations for Updates

### Adding Blog Articles
1. **Images**: Place in `client/public/assets/images/blog/`
2. **Content**: Edit `client/src/data/blog-posts.ts`
3. **Guide**: See `client/src/data/README.md`

### Brand Assets
- **Logo**: `client/public/assets/brand/`
- **Icons**: `client/public/assets/icons/`
- **Colors**: `client/src/index.css` (CSS variables)

### Configuration Files
- **Email Setup**: `client/src/lib/emailjs-config.ts`
- **Chatbot**: `client/src/data/chatbot-knowledge.ts`
- **Services**: `client/src/data/services.ts`

## 🚀 Quick Commands

### Development
```bash
cd client
npm install
npm run dev
```

### Build for Production
```bash
cd client
npm run build
```

### Type Checking
```bash
cd client
npm run check
```

## 📝 File Naming Conventions

- **Components**: PascalCase (`BlogPost.tsx`)
- **Files**: kebab-case (`blog-posts.ts`)
- **Images**: kebab-case (`article-name.webp`)
- **Folders**: lowercase (`components/`, `pages/`)

## 🔧 Developer Handover Checklist

- [ ] Review `DEVELOPER_GUIDE.md` for coding standards
- [ ] Check `EMAILJS_SETUP.md` for email configuration
- [ ] Understand blog system in `client/src/data/README.md`
- [ ] Review brand guidelines in `design_guidelines.md`
- [ ] Test development environment with `npm run dev`
- [ ] Verify build process with `npm run build`

## 📞 Support

For questions about the codebase structure or development process, refer to the documentation files in the `/docs` folder.