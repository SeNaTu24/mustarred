import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, FileCheck, Users, Target, Search, ArrowRight, CheckCircle, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

interface Service {
    icon: React.ElementType;
    name: string;
    shortDesc: string;
    fullDesc: string;
    image: string;
    features: string[];
    process: string[];
    color: string;
    gradient: string;
}

export default function Services() {
    const { openModal } = useModal();
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
    
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const services: Service[] = [
        {
            icon: Shield,
            name: "Training for Data Protection & Privacy",
            shortDesc: "Make data protection rules easy to understand and practical to apply",
            fullDesc: "Many organizations find data protection and privacy confusing, with laws like NDPA and GAID often feeling overwhelming. We provide training that makes these rules easy to understand and practical to apply through hands-on sessions, real-life examples, and interactive exercises.",
            image: "/assets/images/datapro.avif",
            color: "from-blue-500 to-indigo-600",
            gradient: "bg-gradient-to-br from-blue-50 to-indigo-50",
            features: [
                "Introduction to Data Protection & Privacy (NDPA & GAID)",
                "Principles of Lawful Data Processing",
                "Data Subject Rights & Organisational Responsibilities",
                "Data Handling & Access Control Best Practices",
                "Data Breach & Incident Response",
                "Internal Privacy Compliance & Monitoring",
                "DPIA & Third-Party Risk Awareness",
                "Specialised DPO Training (where applicable)"
            ],
            process: [
                "Training needs assessment",
                "Training content customisation",
                "Team-based and organisation-wide delivery",
                "Practical case studies & scenario walkthroughs",
                "Post-training materials & support"
            ]
        },
        {
            icon: Lock,
            name: "Privacy Programme Implementation",
            shortDesc: "Design governance frameworks that fit into everyday operations",
            fullDesc: "Implementing privacy programmes can feel daunting. We make privacy compliance practical by designing governance frameworks, policies, and workflows that fit into everyday operations.",
            image: "/assets/images/privacyprogram.avif",
            color: "from-purple-500 to-pink-600",
            gradient: "bg-gradient-to-br from-purple-50 to-pink-50",
            features: [
                "Privacy governance framework",
                "NDPA-compliant policies & procedures",
                "Records of processing activities (ROPA)",
                "DPIA & LIA integration",
                "Data subject rights management framework",
                "Third-party privacy risk controls",
                "Incident response & breach management workflows"
            ],
            process: [
                "Privacy programme assessment",
                "Framework design & documentation",
                "Implementation & operational integration",
                "Staff enablement & adoption",
                "Ongoing compliance readiness"
            ]
        },
        {
            icon: FileCheck,
            name: "Regulatory and Product Compliance",
            shortDesc: "Navigate regulatory challenges with confidence",
            fullDesc: "We help organizations make compliance manageable by mapping regulatory requirements, reviewing product compliance, and establishing governance frameworks.",
            image: "/compliance.webp",
            color: "from-emerald-500 to-teal-600",
            gradient: "bg-gradient-to-br from-emerald-50 to-teal-50",
            features: [
                "Regulatory mapping and compliance gap analysis",
                "Product compliance assessment across sectors",
                "Licensing and permit advisory and processing",
                "Market entry and cross-border compliance guidance",
                "Development of compliance frameworks and controls",
                "Governance and accountability structures",
                "Advisory on inspections, audits, and enforcement risks"
            ],
            process: [
                "Regulatory identification and scoping",
                "Product and operational compliance review",
                "Risk classification and prioritisation",
                "Policy and framework development",
                "Continuous monitoring and advisory"
            ]
        },
        {
            icon: Users,
            name: "Startup Advisory",
            shortDesc: "Build strong foundations for growth",
            fullDesc: "We provide advice that helps founders build strong foundations including guidance on entity selection, equity structuring, and intellectual property protection.",
            image: "/assets/images/startupadvisory.avif",
            color: "from-orange-500 to-red-600",
            gradient: "bg-gradient-to-br from-orange-50 to-red-50",
            features: [
                "Choice of entity and jurisdiction advisory",
                "Founder equity and control structuring",
                "Drafting and review of commercial contracts",
                "Intellectual property ownership and protection strategy",
                "Legal risk assessment across operations",
                "Internal role clarity and responsibility design",
                "Legal readiness for funding",
                "Advisory on expansion, partnerships, and restructuring"
            ],
            process: [
                "Founder and business advisory",
                "Structure and ownership planning",
                "Documentation and protection setup",
                "Risk advisory",
                "Strategic legal support"
            ]
        },
        {
            icon: Target,
            name: "Cybersecurity Services",
            shortDesc: "Security testing that simulates real-world attacks",
            fullDesc: "We close the gap between having security measures and knowing they work with testing that simulates real-world attacks on your systems.",
            image: "/assets/images/cybersecurity.avif",
            color: "from-cyan-500 to-blue-600",
            gradient: "bg-gradient-to-br from-cyan-50 to-blue-50",
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
                "Retesting & Vulnerability Verification"
            ],
            process: [
                "Scope Definition & Rules of Engagement",
                "Reconnaissance & Attack Surface Mapping",
                "Automated Discovery & Manual Validation",
                "Controlled Exploitation & Security Testing",
                "Business Impact Analysis & Risk Prioritization",
                "Comprehensive Reporting & Roadmapping",
                "Results Walkthrough & Technical Debrief",
                "Retesting & Verification of Fixes"
            ]
        },
        {
            icon: Search,
            name: "Policy & Research Services",
            shortDesc: "Formalize operations without unnecessary complexity",
            fullDesc: "We provide policy development and research services that formalize your operations without creating unnecessary complexity.",
            image: "/research.jpg",
            color: "from-violet-500 to-purple-600",
            gradient: "bg-gradient-to-br from-violet-50 to-purple-50",
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
                "Custom Research & Implementation Guides"
            ],
            process: [
                "Discovery & Organizational Assessment",
                "Stakeholder Consultation & Requirements Gathering",
                "Research & Benchmarking Against Standards",
                "Policy Drafting with Tailored Recommendations",
                "Compliance Alignment & Verification",
                "Documentation Delivery & Implementation Guidance",
                "Training & Awareness Session Facilitation",
                "Periodic Review & Update Cycles"
            ]
        }
    ];

    const handleServiceClick = (service: Service) => {
        setSelectedService(service);
        setIsDialogOpen(true);
    };

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <Header />

            {/* Animated Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden animated-dark-bg">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                    style={{ backgroundImage: 'url(/startupbuilding.webp)' }}
                />
                
                {/* Floating geometric shapes - responsive */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Floating squares - responsive sizes */}
                    <div className="absolute w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-2 sm:border-3 md:border-4 border-white/60 rotate-45 animate-spin shadow-lg" style={{ top: '15%', left: '15%', animationDuration: '8s' }} />
                    <div className="absolute w-4 h-4 sm:w-6 sm:h-6 md:w-10 md:h-10 border-2 sm:border-3 md:border-4 border-blue-300/70 rotate-45 animate-spin shadow-lg" style={{ top: '70%', right: '20%', animationDuration: '12s' }} />
                    <div className="absolute w-3 h-3 sm:w-5 sm:h-5 md:w-8 md:h-8 border-2 sm:border-2 md:border-3 border-purple-300/60 rotate-45 animate-spin" style={{ top: '50%', left: '70%', animationDuration: '10s' }} />
                    
                    {/* Floating triangles - responsive sizes */}
                    <div className="absolute w-0 h-0 border-l-4 border-r-4 border-b-8 sm:border-l-6 sm:border-r-6 sm:border-b-12 md:border-l-8 md:border-r-8 md:border-b-16 border-transparent border-b-white/50 animate-bounce drop-shadow-lg" style={{ top: '40%', left: '80%', animationDuration: '3s' }} />
                    <div className="absolute w-0 h-0 border-l-5 border-r-5 border-b-10 sm:border-l-8 sm:border-r-8 sm:border-b-16 md:border-l-10 md:border-r-10 md:border-b-20 border-transparent border-b-purple-300/60 animate-bounce drop-shadow-lg" style={{ bottom: '20%', left: '10%', animationDuration: '4s' }} />
                    <div className="absolute w-0 h-0 border-l-3 border-r-3 border-b-6 sm:border-l-4 sm:border-r-4 sm:border-b-8 md:border-l-6 md:border-r-6 md:border-b-12 border-transparent border-b-blue-300/50 animate-bounce" style={{ top: '30%', right: '30%', animationDuration: '5s' }} />
                    
                    {/* Moving lines - responsive widths */}
                    <div className="absolute w-20 sm:w-32 md:w-40 h-0.5 sm:h-0.5 md:h-1 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-pulse shadow-md" style={{ top: '25%', left: '60%' }} />
                    <div className="absolute w-16 sm:w-24 md:w-32 h-0.5 sm:h-0.5 md:h-1 bg-gradient-to-r from-transparent via-blue-300/80 to-transparent animate-pulse shadow-md" style={{ bottom: '40%', right: '10%', animationDelay: '1s' }} />
                    <div className="absolute w-14 sm:w-20 md:w-28 h-0.5 bg-gradient-to-r from-transparent via-purple-300/70 to-transparent animate-pulse" style={{ top: '60%', left: '40%', animationDelay: '2s' }} />
                    
                    {/* Additional circles - responsive sizes */}
                    <div className="absolute w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-white/40 rounded-full animate-ping" style={{ top: '80%', left: '60%', animationDuration: '2s' }} />
                    <div className="absolute w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-blue-300/50 rounded-full animate-ping" style={{ top: '20%', right: '40%', animationDuration: '3s', animationDelay: '1s' }} />
                </div>
                
                {/* Dark Overlay for Better Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
                
                {/* Animated Gradient Overlay */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-pink-900/30"
                    style={{ y: heroY, opacity: heroOpacity }}
                />
                
                {/* Floating Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 -left-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 30, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute top-40 -right-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4 sm:mb-6 text-xs sm:text-sm"
                        >
                            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-300" />
                            <span className="font-medium text-white">Expert Compliance Solutions</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4 sm:px-0"
                            style={{ fontFamily: "Satoshi, sans-serif" }}
                        >
                            Comprehensive Services for
                            <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent"> African Startups</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
                        >
                            From data protection to cybersecurity, we provide end-to-end compliance solutions designed to help your business scale with confidence.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                                onClick={() => openModal("Contact Us", "I'd like to discuss my compliance needs")}
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white/30 !text-white hover:!text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg backdrop-blur-sm w-full sm:w-auto"
                                onClick={() => {
                                    document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Explore Services
                                <ChevronDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section id="services-grid" className="py-16 sm:py-20 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 sm:px-0">
                            Our Services
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                            Choose from our comprehensive suite of compliance and advisory services
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {services.map((service, index) => (
                            <ServiceCard 
                                key={index} 
                                service={service} 
                                index={index}
                                onClick={() => handleServiceClick(service)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { value: "50+", label: "Clients Served" },
                            { value: "100%", label: "Success Rate" },
                            { value: "24/7", label: "Support Available" },
                            { value: "6", label: "Core Services" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center p-4"
                            >
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 text-xs sm:text-sm md:text-base">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection openModal={openModal} />

            {/* Service Detail Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
                    {selectedService && (
                        <>
                            <DialogHeader className="pr-8">
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                    <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${selectedService.color}`}>
                                        <selectedService.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                    </div>
                                    <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                                        {selectedService.name}
                                    </DialogTitle>
                                </div>
                                <DialogDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    {selectedService.fullDesc}
                                </DialogDescription>
                            </DialogHeader>

                            <Tabs defaultValue="features" className="mt-4 sm:mt-6">
                                <TabsList className="grid w-full grid-cols-2 h-auto">
                                    <TabsTrigger value="features" className="text-xs sm:text-sm py-2">What's Included</TabsTrigger>
                                    <TabsTrigger value="process" className="text-xs sm:text-sm py-2">Our Process</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="features" className="mt-4 sm:mt-6">
                                    <div className="grid gap-2 sm:gap-3">
                                        {selectedService.features.map((feature, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </TabsContent>
                                
                                <TabsContent value="process" className="mt-4 sm:mt-6">
                                    <div className="space-y-3 sm:space-y-4">
                                        {selectedService.process.map((step, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                            >
                                                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${selectedService.color} flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-lg`}>
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1 pt-0.5 sm:pt-1">
                                                    <p className="text-sm sm:text-base text-gray-700 font-medium">{step}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
                                <Button
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-5 sm:py-6 text-base sm:text-lg"
                                    onClick={() => {
                                        setIsDialogOpen(false);
                                        openModal("Contact Us", `I'm interested in ${selectedService.name}`);
                                    }}
                                >
                                    Get Started with This Service
                                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
}

// CTA Section Component
function CTASection({ openModal }: { openModal: (title: string, description?: string) => void }) {
    const ctaRef = useRef(null);
    const isInView = useInView(ctaRef, { once: true, amount: 0.3 });

    return (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={ctaRef} className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-gray-200 p-8 sm:p-10 md:p-12 text-center shadow-xl">
                    {/* Subtle Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50" />
                    
                    {/* Animated Gradient Orbs */}
                    <motion.div
                        className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { 
                            opacity: 1, 
                            scale: 1,
                            x: [0, 20, 0],
                            y: [0, -20, 0],
                        } : {}}
                        transition={{ 
                            opacity: { duration: 1 },
                            scale: { duration: 1 },
                            x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />
                    <motion.div
                        className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { 
                            opacity: 1, 
                            scale: 1,
                            x: [0, -30, 0],
                            y: [0, 30, 0],
                        } : {}}
                        transition={{ 
                            opacity: { duration: 1, delay: 0.2 },
                            scale: { duration: 1, delay: 0.2 },
                            x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                            y: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                                Ready to Get Started?
                            </h2>
                        </motion.div>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-0"
                        >
                            Let's discuss your compliance needs and create a customized solution for your startup.
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                                onClick={() => openModal("Contact Us", "I'd like to discuss my compliance needs")}
                            >
                                Contact Us Today
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                                onClick={() => openModal("Free Resources", "I'd like to book a free consultation")}
                            >
                                Book Free Consultation
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Service Card Component
function ServiceCard({ service, index, onClick }: { service: Service; index: number; onClick: () => void }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 cursor-pointer"
        >
            {/* Image */}
            <div className="relative h-40 sm:h-48 overflow-hidden">
                <motion.img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Icon Badge */}
                <motion.div 
                    className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${service.color} shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                >
                    <service.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {service.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                    {service.shortDesc}
                </p>
                
                <div className="flex items-center text-indigo-600 text-sm sm:text-base font-medium group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>

            {/* Gradient Overlay on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
        </motion.div>
    );
}