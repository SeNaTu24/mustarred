# Mustarred - Legal Compliance Platform Design Guidelines

## Design Approach

**Reference-Based Approach** drawing inspiration from professional legal and compliance platforms:
- **Modern Law Firms**: Clean, trustworthy, professional aesthetics
- **Compliance Platforms**: Clear information hierarchy, security-focused design
- **Business Consulting**: Sophisticated, corporate-friendly interface
- **Startup Tools**: Approachable yet professional, growth-oriented

**Core Principles:**
1. Professional and trustworthy legal services aesthetic
2. Clear compliance-focused visual hierarchy
3. Startup-friendly approachable design
4. Security and trust-first visual language

---

## Color Palette

### Dark Mode (Primary)
- **Background Primary**: 12 8% 8% (deep charcoal)
- **Background Secondary**: 220 10% 12% (slightly lighter panels)
- **Background Tertiary**: 220 12% 16% (card backgrounds)

### Brand Colors
- **Primary (Mustarred Blue)**: 217 91% 60% (professional trust blue)
- **Primary Hover**: 217 91% 55%
- **Accent**: 142 76% 45% (green for compliance success, certifications)

### Semantic Colors
- **Success**: 142 76% 45% (compliance achieved, certifications)
- **Warning**: 38 92% 50% (compliance deadlines, requirements)
- **Text Primary**: 0 0% 98% (high contrast white)
- **Text Secondary**: 220 9% 65% (muted for descriptions)
- **Text Tertiary**: 220 9% 45% (metadata, service details)

### Gradients (Subtle Use)
- **Hero Background**: Radial gradient from 217 91% 60% 10% to transparent
- **Service Cards**: Linear gradient 217 91% 60% 5% to 142 76% 45% 5%

---

## Typography

**Font Stack:**
- **Primary**: Inter (via Google Fonts CDN) - exceptional readability, modern
- **Code/Accent**: JetBrains Mono (technical elements, code snippets)

**Scale:**
- **Hero Headline**: text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight
- **Section Headers**: text-4xl md:text-5xl font-bold
- **Subsection Headers**: text-2xl md:text-3xl font-semibold
- **Card Titles**: text-xl font-semibold
- **Body Text**: text-base leading-relaxed
- **Metadata**: text-sm text-secondary
- **Code Elements**: font-mono text-sm

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- **Section Padding**: py-20 md:py-32 (generous breathing room)
- **Container Width**: max-w-7xl mx-auto px-6 md:px-8
- **Card Spacing**: p-6 md:p-8
- **Grid Gaps**: gap-6 md:gap-8 lg:gap-12

**Grid Patterns:**
- **3-Column**: AI Discussion Tracks, Resource Categories (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- **2-Column**: Debate Events, Career Fair Companies (grid-cols-1 lg:grid-cols-2)
- **4-Column**: Stats, Quick Links (grid-cols-2 lg:grid-cols-4)

---

## Component Library

### Navigation
- **Fixed header** with blur backdrop (backdrop-blur-xl bg-background/80)
- Logo left, nav links center, "Join Community" CTA right
- Mobile: Hamburger menu with slide-in drawer
- Smooth scroll to sections on click

### Hero Section
- **Full viewport height** (min-h-screen) with centered content
- Background image with startup/business theme
- Mustarred branding prominent but professional
- Hero headline: "Building a startup is hard enough" + "Get ahead with simple compliance"
- Tagline: "Your trusted advisor to startups on law, policy and compliance"
- Primary CTA: "Our Services"
- Scroll indicator at bottom

### Cards (Universal Pattern)
- **Service Cards**: Clean borders with professional icons (Lock, FileCheck, Building2, Handshake)
- **Compliance Cards**: Certification badges, progress indicators, status
- **Resource Cards**: Icon, title, description, "Learn More" CTA
- **Case Studies**: Client logo, challenge, solution, results

### About/Services Section
- 4 core service areas in grid layout
- Each service: Professional icon, name, detailed description
- Services: Data Protection & Security, Regulatory Compliance, Corporate Governance & IP, Transaction Advisory

### Compliance Certifications Section
- **Available Certifications** showcase (ISO, SOC, PCI-DSS, NDPA, HIPAA)
- Each cert: Logo, name, description, "Get Certified" CTA
- Progress tracking for ongoing certifications
- Success stories and testimonials

### Legal Services Section
- Service category breakdown
- **Incorporation & Governance**: Company setup, board management
- **Compliance & Licensing**: CBN, NCC licensing, AML/KYC
- **IP & Transactions**: Patents, M&A, joint ventures

### Client Success Stories
- Case study cards with client testimonials
- Before/after compliance status
- Certification achievements and timelines

### Resources Hub
- Category cards with compliance resources
- Categories: Compliance Guides, Legal Templates, Certification Prep, Regulatory Updates
- Each resource: Icon, title, description, download/view link

### Contact/Consultation Section
- Professional contact form
- Service selection dropdown
- Consultation booking calendar integration
- Contact information and office locations

### FAQ Accordion
- Questions with expand/collapse interaction
- Categories: Getting Started, Certifications, Compliance, Legal Services

### Footer
- 4-column layout: Services, Resources, Company, Contact
- Newsletter signup for compliance updates
- Professional social media (LinkedIn, Twitter)
- Mustarred logo and legal disclaimer

---

## Images

**Required Images:**

1. **Hero Background**: Professional startup/business building image (startupbuilding.webp)
2. **About Section**: Professional team photo or office space
3. **Service Icons**: Professional icons for legal services (mail.png, medal.png, shake.png)
4. **Certification Logos**: ISO, SOC, PCI-DSS, NDPA, HIPAA official logos
5. **Client Testimonials**: Professional headshots or company logos
6. **Resource Graphics**: Legal document templates, compliance checklists

**Image Treatment:**
- All images with rounded corners (rounded-lg to rounded-2xl)
- Subtle shadow on hover (hover:shadow-2xl hover:shadow-primary/20)
- Lazy loading for performance
- Alt text for accessibility

---

## Interactions & States

**Minimal Animations:**
- Smooth scroll between sections (behavior: smooth)
- Card hover: Subtle lift (transform translateY(-4px))
- Button hover: Slight scale (scale-105) - no custom implementations
- Page load: Fade-in sections sequentially (stagger by 100ms)

**Button States (Variant-Specific):**
- **Outline buttons on images**: Add backdrop-blur-md bg-background/10 for legibility
- All other hover/active states handled by component defaults

**No Distracting Effects:**
- No parallax scrolling
- No auto-playing videos
- No excessive motion

---

## Accessibility

- **Dark mode consistent** across all form inputs, text fields, modals
- **Focus indicators** with primary color ring
- **ARIA labels** for interactive elements
- **Keyboard navigation** fully supported
- **Color contrast** WCAG AA compliant minimum
- **Reduced motion** respect prefers-reduced-motion

---

## Unique Design Elements

- **Compliance progress bars**: Visual indicators for certification progress
- **Service category icons**: Professional legal service representations (Lock, FileCheck, Building2, Handshake)
- **Certification badges**: Official certification logos with status indicators
- **Legal document previews**: Template previews with professional styling

This design creates a trustworthy, professional platform that communicates expertise in legal compliance while remaining approachable for startup founders and business leaders.