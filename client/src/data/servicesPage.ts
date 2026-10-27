import {
    FileCheck,
    Lock,
    Search,
    Shield,
    Target,
    Users,
    type LucideIcon,
} from "lucide-react";

export interface ServiceOffering {
    slug: string;
    icon: LucideIcon;
    name: string;
    shortDesc: string;
    fullDesc: string;
    image: string;
    features: string[];
    process: string[];
}

export const serviceOfferings: ServiceOffering[] = [
    {
        slug: "data-protection-training",
        icon: Shield,
        name: "Training for Data Protection & Privacy",
        shortDesc: "Make data protection rules easy to understand and practical to apply",
        fullDesc: "Many organizations find data protection and privacy confusing, with laws like NDPA and GAID often feeling overwhelming. We provide training that makes these rules easy to understand and practical to apply through hands-on sessions, real-life examples, and interactive exercises.",
        image: "/assets/images/home-service-training.jpg",
        features: [
            "Introduction to Data Protection & Privacy (NDPA & GAID)",
            "Principles of Lawful Data Processing",
            "Data Subject Rights & Organisational Responsibilities",
            "Data Handling & Access Control Best Practices",
            "Data Breach & Incident Response",
            "Internal Privacy Compliance & Monitoring",
            "DPIA & Third-Party Risk Awareness",
            "Specialised DPO Training (where applicable)",
        ],
        process: [
            "Training needs assessment",
            "Training content customisation",
            "Team-based and organisation-wide delivery",
            "Practical case studies & scenario walkthroughs",
            "Post-training materials & support",
        ],
    },
    {
        slug: "privacy-programme",
        icon: Lock,
        name: "Privacy Programme Implementation",
        shortDesc: "Design governance frameworks that fit into everyday operations",
        fullDesc: "Implementing privacy programmes can feel daunting. We make privacy compliance practical by designing governance frameworks, policies, and workflows that fit into everyday operations.",
        image: "/assets/images/home-service-privacy.jpg",
        features: [
            "Privacy governance framework",
            "NDPA-compliant policies & procedures",
            "Records of processing activities (ROPA)",
            "DPIA & LIA integration",
            "Data subject rights management framework",
            "Third-party privacy risk controls",
            "Incident response & breach management workflows",
        ],
        process: [
            "Privacy programme assessment",
            "Framework design & documentation",
            "Implementation & operational integration",
            "Staff enablement & adoption",
            "Ongoing compliance readiness",
        ],
    },
    {
        slug: "regulatory-product-compliance",
        icon: FileCheck,
        name: "Regulatory and Product Compliance",
        shortDesc: "Navigate regulatory challenges with confidence",
        fullDesc: "We help organizations make compliance manageable by mapping regulatory requirements, reviewing product compliance, and establishing governance frameworks.",
        image: "/assets/images/home-service-compliance.jpg",
        features: [
            "Regulatory mapping and compliance gap analysis",
            "Product compliance assessment across sectors",
            "Licensing and permit advisory and processing",
            "Market entry and cross-border compliance guidance",
            "Development of compliance frameworks and controls",
            "Governance and accountability structures",
            "Advisory on inspections, audits, and enforcement risks",
        ],
        process: [
            "Regulatory identification and scoping",
            "Product and operational compliance review",
            "Risk classification and prioritisation",
            "Policy and framework development",
            "Continuous monitoring and advisory",
        ],
    },
    {
        slug: "startup-advisory",
        icon: Users,
        name: "Startup Advisory",
        shortDesc: "Build strong foundations for growth",
        fullDesc: "We provide advice that helps founders build strong foundations including guidance on entity selection, equity structuring, and intellectual property protection.",
        image: "/assets/images/home-service-startup.jpg",
        features: [
            "Choice of entity and jurisdiction advisory",
            "Founder equity and control structuring",
            "Drafting and review of commercial contracts",
            "Intellectual property ownership and protection strategy",
            "Legal risk assessment across operations",
            "Internal role clarity and responsibility design",
            "Legal readiness for funding",
            "Advisory on expansion, partnerships, and restructuring",
        ],
        process: [
            "Founder and business advisory",
            "Structure and ownership planning",
            "Documentation and protection setup",
            "Risk advisory",
            "Strategic legal support",
        ],
    },
    {
        slug: "cybersecurity-services",
        icon: Target,
        name: "Cybersecurity Services",
        shortDesc: "Security testing that simulates real-world attacks",
        fullDesc: "We close the gap between having security measures and knowing they work with testing that simulates real-world attacks on your systems.",
        image: "/assets/images/home-service-cybersecurity.jpg",
        features: [
            "External & Internal Network Penetration Testing",
            "Web Application Security Testing (OWASP Top 10)",
            "Mobile Application Security Assessment",
            "API & Cloud Infrastructure Security Testing",
            "Compliance-Aligned Testing (SOC 2, ISO 27001, PCI DSS)",
            "Social Engineering & Phishing Simulation",
            "Vulnerability Assessment & Risk Scoring",
            "Detailed Reporting with Proof-of-Concept Evidence",
            "Remediation Guidance & Fix Instructions",
            "Retesting & Vulnerability Verification",
        ],
        process: [
            "Scope Definition & Rules of Engagement",
            "Reconnaissance & Attack Surface Mapping",
            "Automated Discovery & Manual Validation",
            "Controlled Exploitation & Security Testing",
            "Business Impact Analysis & Risk Prioritization",
            "Comprehensive Reporting & Roadmapping",
            "Results Walkthrough & Technical Debrief",
            "Retesting & Verification of Fixes",
        ],
    },
    {
        slug: "policy-research",
        icon: Search,
        name: "Policy & Research Services",
        shortDesc: "Formalize operations without unnecessary complexity",
        fullDesc: "We provide policy development and research services that formalize your operations without creating unnecessary complexity.",
        image: "/assets/images/home-service-research.jpg",
        features: [
            "Organizational Policy Development",
            "ISO 27001 Policy Framework & Documentation",
            "Access Control & Data Management Policies",
            "Incident Response & Business Continuity Policies",
            "Privacy & Data Protection Policies",
            "Asset Management & Change Control Policies",
            "Third-Party & Supplier Management Policies",
            "Policy Review & Gap Analysis",
            "Compliance Mapping & Regulatory Research",
            "Custom Research & Implementation Guides",
        ],
        process: [
            "Discovery & Organizational Assessment",
            "Stakeholder Consultation & Requirements Gathering",
            "Research & Benchmarking Against Standards",
            "Policy Drafting with Tailored Recommendations",
            "Compliance Alignment & Verification",
            "Documentation Delivery & Implementation Guidance",
            "Training & Awareness Session Facilitation",
            "Periodic Review & Update Cycles",
        ],
    },
];

export const servicePathways = [
    {
        number: "01",
        title: "Privacy & data protection",
        description: "Training and practical privacy programmes for data-handling responsibilities.",
        serviceSlugs: ["data-protection-training", "privacy-programme"],
    },
    {
        number: "02",
        title: "Regulation & product",
        description: "Regulatory mapping, product compliance, and policies to support your obligations.",
        serviceSlugs: ["regulatory-product-compliance", "policy-research"],
    },
    {
        number: "03",
        title: "Business & security readiness",
        description: "Startup legal foundations and security testing for growing businesses.",
        serviceSlugs: ["startup-advisory", "cybersecurity-services"],
    },
];

export const engagementStages = [
    { number: "01", title: "Assess", description: "Understand your goals, obligations, and current position." },
    { number: "02", title: "Plan", description: "Set priorities and agree on a practical way forward." },
    { number: "03", title: "Implement", description: "Work through the agreed advisory, training, documentation, or testing." },
    { number: "04", title: "Review", description: "Walk through findings and clarify the next steps." },
];

export const clientLogos = [
    { name: "Cleva", src: "/assets/icons/cleva-logo2.svg" },
    { name: "Fincra", src: "/assets/icons/fincra.png" },
    { name: "Heala", src: "/assets/icons/heala_logo.svg" },
    { name: "Renmoney", src: "/assets/icons/renmoney.jpeg" },
    { name: "Enta Afrika", src: "/assets/icons/enta_afrika.jpg" },
    { name: "Radease", src: "/assets/icons/radease.png" },
    { name: "Roqqu", src: "/assets/icons/roqqu.png" },
    { name: "OA", src: "/assets/icons/oa_logo.png" },
];
