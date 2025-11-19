export interface Founder {
  name: string;
  title: string;
  bio: string;
  image: string;
  credentials: string[];
  experience: string;
}

export const founder: Founder = {
  name: "Mustarred Team",
  title: "Compliance Experts",
  bio: "Our team consists of seasoned compliance experts with extensive experience helping African startups navigate complex regulatory landscapes. We specialize in data protection, corporate governance, and regulatory compliance across multiple jurisdictions.",
  image: "/images/founder-team.jpg",
  credentials: [
    "Legal & Compliance Expertise",
    "Data Protection Specialists",
    "Corporate Governance Advisors",
    "Regulatory Implementation Experts"
  ],
  experience: "Collective years of regulatory compliance and corporate law expertise"
};