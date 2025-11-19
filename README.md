# Mustarred - Legal Compliance Platform

## 🚀 Quick Start
```bash
cd client
npm install
npm run dev
```

## 📁 Project Structure
```
mustarrd/
├── client/                 # Frontend React app
│   ├── public/            # Static assets
│   │   ├── images/        # Article images
│   │   └── *.webp         # Blog images
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── layout/    # Layout components
│   │   │   ├── sections/  # Page sections
│   │   │   └── ui/        # Base UI components
│   │   ├── data/          # Data & configuration
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities & helpers
│   │   └── styles/        # Global styles
│   └── package.json
├── design_guidelines.md   # Brand guidelines
└── README.md             # This file
```

## 🆕 Adding New Content

### Blog Articles
1. **Add Images:** Place in `client/public/` (use .webp format)
2. **Add Content:** Edit `client/src/data/blog-posts.ts`
3. **Categories:** Data Protection, Banking & Finance, Compliance, Corporate Governance

### Brand Assets
- **Colors:** See `client/src/index.css` CSS variables
- **Fonts:** Satoshi (primary), system fallbacks
- **Logo:** Update in `client/public/`

## 🛠️ Development Guidelines

### Code Standards
- **TypeScript:** Strict mode enabled
- **Components:** Functional components with hooks
- **Styling:** Tailwind CSS + CSS variables
- **State:** React hooks (useState, useEffect)

### File Naming
- **Components:** PascalCase (`BlogPost.tsx`)
- **Files:** kebab-case (`blog-posts.ts`)
- **Images:** kebab-case (`article-name.webp`)

## 🎨 Design System
- **Primary:** Lavender Blue (#a49fe7)
- **Accent:** Deep Indigo (#4b4ba3)
- **Typography:** Satoshi font family
- **Spacing:** Tailwind scale (4, 8, 16, 24, 32...)

## 📱 Responsive Design
- **Mobile First:** Base styles for mobile
- **Breakpoints:** sm(640px), md(768px), lg(1024px), xl(1280px)
- **Testing:** Test on mobile, tablet, desktop

## 🔧 Key Features
- ✅ Blog system with auto read-time
- ✅ Newsletter integration (Mailchimp)
- ✅ Chatbot with knowledge base
- ✅ Contact forms
- ✅ SEO optimized
- ✅ Performance optimized

## 🚀 Deployment
```bash
npm run build
# Deploy dist/ folder to hosting platform
```

## 📞 Support
For development questions, refer to component documentation in respective folders.