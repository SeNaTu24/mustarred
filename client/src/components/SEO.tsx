import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

const DEFAULT_TITLE = "Mustarred Africa | Legal Compliance for African Businesses";
const DEFAULT_DESC = "Turn complexity into confidence. Expert guidance on data protection, CAC registration, regulatory compliance, corporate governance, and business advisory for African businesses.";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Mustarred Africa | Legal Compliance & Business Advisory",
    description: "Turn complexity into confidence. Expert guidance on data protection, CAC registration, regulatory compliance, and corporate governance for African businesses.",
  },
  "/about": {
    title: "About Us | Mustarred Africa",
    description: "Learn about Mustarred Africa — our mission, team, and commitment to helping African businesses navigate compliance and governance.",
  },
  "/services": {
    title: "Our Services | Compliance, Governance & Advisory | Mustarred Africa",
    description: "Explore Mustarred Africa's full range of services including data protection, CAC registration, corporate governance, AI governance, and business advisory.",
  },
  "/cac-registration": {
    title: "CAC Company Registration | Nigeria, Ghana, Kenya, UK | Mustarred Africa",
    description: "Register your company in Nigeria, Ghana, Kenya or the UK with Mustarred Africa. We handle the entire CAC registration process — no back and forth.",
  },
  "/dcmi-compliance": {
    title: "DCMI/DCPMI Registration | Nigeria Data Protection Act | Mustarred Africa",
    description: "Register as a Data Controller or Processor of Major Importance under the Nigeria Data Protection Act 2023. Fast, professional DCMI compliance service.",
  },
  "/incorporation": {
    title: "Business Incorporation Services | Mustarred Africa",
    description: "Professional business incorporation and structuring services for startups and growing businesses across Africa.",
  },
  "/training": {
    title: "Compliance Training | Mustarred Africa",
    description: "Professional compliance and governance training programs for teams, DPOs, and business leaders across Africa.",
  },
  "/consultation": {
    title: "Book a Consultation | Mustarred Africa",
    description: "Schedule a consultation with our compliance and legal experts. Get tailored advice for your business needs.",
  },
  "/our-insights": {
    title: "Insights & Updates | Compliance News | Mustarred Africa",
    description: "Stay informed with expert insights on compliance, data protection, regulations, and governance best practices for African businesses.",
  },
  "/blog": {
    title: "Blog | Regulatory & Compliance Articles | Mustarred Africa",
    description: "Read the latest articles on regulatory compliance, data protection, corporate governance, and business law across Africa.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Mustarred Africa",
    description: "Read Mustarred Africa's privacy policy and understand how we collect, use, and protect your personal data.",
  },
  "/terms-of-service": {
    title: "Terms of Service | Mustarred Africa",
    description: "Read the terms and conditions governing the use of Mustarred Africa's website and services.",
  },
  "/ate2026": {
    title: "Regulatory Readiness Check | Africa Tech Expo 2026 | Mustarred Africa",
    description: "Take Mustarred Africa's free regulatory readiness assessment at Africa Tech Expo 2026. Find out how compliant your business is in minutes.",
  },
};

export function SEO() {
  const [location] = useLocation();
  const meta = PAGE_META[location] ?? { title: DEFAULT_TITLE, description: DEFAULT_DESC };

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content="/assets/brand/logo.png" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
    </Helmet>
  );
}
