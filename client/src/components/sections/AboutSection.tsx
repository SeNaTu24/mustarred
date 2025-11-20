import { Card } from "@/components/ui/card";
import { Lock, FileCheck, Building2, Handshake } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function AboutSection() {
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

    const cardRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const observers = cardRefs.current.map((ref, index) => {
            if (!ref) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setVisibleCards(
                                (prev) => new Set([...prev, index])
                            );
                        }, index * 200);
                    }
                },
                { threshold: 0.2 }
            );

            observer.observe(ref);
            return observer;
        });

        return () => {
            observers.forEach((observer) => observer?.disconnect());
        };
    }, []);

    return (
        <section id="about" className="pt-8 pb-12 sm:pt-12 sm:pb-16 bg-white">
            <style>{`
                @keyframes gradient-shift {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                
                @keyframes float-orb {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translate(10px, -10px) scale(1.1);
                        opacity: 0.5;
                    }
                }
                
                .animated-purple-bg {
                    background: linear-gradient(
                        135deg,
                        #2a1a4a 0%,
                        #1a0d33 25%,
                        #0d0520 50%,
                        #1a0d33 75%,
                        #2a1a4a 100%
                    );
                    background-size: 200% 200%;
                    animation: gradient-shift 8s ease infinite;
                }
                
                .floating-orb {
                    animation: float-orb 4s ease-in-out infinite;
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 px-4">
                        Scale confidently with the right Security
                        Certifications.
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                        Secure your ISO, SOC, PCI-DSS, NDPA certifications with
                        ease
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-12">
                    <Card
                        ref={(el) => {
                            if (el) cardRefs.current[0] = el;
                        }}
                        className={`overflow-hidden transition-all duration-700 transform min-h-[400px] sm:h-64 ${
                            visibleCards.has(0)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                        data-testid="card-mission"
                    >
                        <div className="flex flex-col sm:flex-row h-full">
                            <div className="p-6 sm:p-8 lg:p-12 w-full sm:w-1/2 flex items-center relative overflow-hidden group animated-purple-bg">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-4 right-4 w-20 h-20 sm:w-32 sm:h-32 bg-purple-400/10 rounded-full blur-3xl floating-orb" />
                                <div className="flex flex-col items-start gap-2 w-full relative z-10">
                                    <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                                        <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-white group-hover:drop-shadow-lg transition-all duration-300" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold leading-tight w-full text-white">
                                        Data Protection and Security
                                    </h3>
                                </div>
                            </div>
                            <div className="p-4 sm:p-6 w-full sm:w-1/2 bg-white">
                                <div className="leading-relaxed space-y-2 sm:space-y-3 text-sm sm:text-base font-light text-black">
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Build and maintain a strong privacy
                                        framework for your business.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Learn how to set up and audit privacy
                                        programs.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Manage ROPA and DSR processes, and
                                        conduct DPIAs, PIAs, and privacy
                                        reviews.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Strengthen internal compliance through
                                        staff training.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Align your systems with global
                                        standards such as ISO, SOC, and HIPAA.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card
                        ref={(el) => {
                            if (el) cardRefs.current[1] = el;
                        }}
                        className={`overflow-hidden transition-all duration-700 transform min-h-[400px] sm:h-64 ${
                            visibleCards.has(1)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                        data-testid="card-mission"
                    >
                        <div className="flex flex-col-reverse sm:flex-row h-full">
                            <div className="p-4 sm:p-6 w-full sm:w-1/2 bg-white">
                                <div className="leading-relaxed space-y-2 sm:space-y-3 text-sm sm:text-base font-light text-black">
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Develop competence to navigate
                                        licensing and regulatory frameworks.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Work with agencies such as CBN,
                                        NCC, etc.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Gain hands-on experience in AML,
                                        fraud, and transaction-screening
                                        compliance.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Implementation and audits with
                                        practical guidance through remediation.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Includes internal AML/KYC training.
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 sm:p-8 lg:p-12 w-full sm:w-1/2 flex items-center relative overflow-hidden group animated-purple-bg">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div
                                    className="absolute bottom-4 left-4 w-20 h-20 sm:w-32 sm:h-32 bg-purple-400/10 rounded-full blur-3xl floating-orb"
                                    style={{ animationDelay: "1s" }}
                                />
                                <div className="flex flex-col items-start gap-2 w-full relative z-10">
                                    <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                                        <FileCheck className="h-6 w-6 sm:h-8 sm:w-8 text-white group-hover:drop-shadow-lg transition-all duration-300" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold leading-tight w-full text-white">
                                        Regulatory Compliance and Licensing
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card
                        ref={(el) => {
                            if (el) cardRefs.current[2] = el;
                        }}
                        className={`overflow-hidden transition-all duration-700 transform min-h-[400px] sm:h-64 ${
                            visibleCards.has(2)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                        data-testid="card-mission"
                    >
                        <div className="flex flex-col sm:flex-row h-full">
                            <div className="p-6 sm:p-8 lg:p-12 w-full sm:w-1/2 flex items-center relative overflow-hidden group animated-purple-bg">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div
                                    className="absolute top-4 left-4 w-20 h-20 sm:w-32 sm:h-32 bg-purple-400/10 rounded-full blur-3xl floating-orb"
                                    style={{ animationDelay: "2s" }}
                                />
                                <div className="flex flex-col items-start gap-2 w-full relative z-10">
                                    <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                                        <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-white group-hover:drop-shadow-lg transition-all duration-300" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold leading-tight w-full text-white">
                                        Corporate Governance & IP
                                    </h3>
                                </div>
                            </div>
                            <div className="p-4 sm:p-6 w-full sm:w-1/2 bg-white">
                                <div className="leading-relaxed space-y-2 sm:space-y-3 text-sm sm:text-base font-light text-black">
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Establish and manage corporate
                                        structures that promote accountability.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Protect innovation through proper
                                        structuring.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Learn about company incorporation
                                        processes.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Trademark and patent registration
                                        guidance.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Board appraisal and company
                                        secretarial best practices.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card
                        ref={(el) => {
                            if (el) cardRefs.current[3] = el;
                        }}
                        className={`overflow-hidden transition-all duration-700 transform min-h-[400px] sm:h-64 ${
                            visibleCards.has(3)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                        data-testid="card-mission"
                    >
                        <div className="flex flex-col-reverse sm:flex-row h-full">
                            <div className="p-4 sm:p-6 w-full sm:w-1/2 bg-white">
                                <div className="leading-relaxed space-y-2 sm:space-y-3 text-sm sm:text-base font-light text-black">
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Gain insight into structuring and
                                        managing high-value business
                                        transactions.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Explore mergers and acquisitions
                                        opportunities.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Navigate joint ventures and technology
                                        licensing.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Focus on compliance and due diligence
                                        processes.
                                    </span>
                                    <span
                                        style={{
                                            textIndent: "-1em",
                                            paddingLeft: "1em",
                                            display: "block",
                                        }}
                                    >
                                        → Ensure strategic alignment in all
                                        transactions.
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 sm:p-8 lg:p-12 w-full sm:w-1/2 flex items-center relative overflow-hidden group animated-purple-bg">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div
                                    className="absolute bottom-4 right-4 w-20 h-20 sm:w-32 sm:h-32 bg-purple-400/10 rounded-full blur-3xl floating-orb"
                                    style={{ animationDelay: "3s" }}
                                />
                                <div className="flex flex-col items-start gap-2 w-full relative z-10">
                                    <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                                        <Handshake className="h-6 w-6 sm:h-8 sm:w-8 text-white group-hover:drop-shadow-lg transition-all duration-300" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold leading-tight w-full text-white">
                                        Transaction Advisory
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* <Card className="p-8" data-testid="card-vision">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="h-8 w-8 text-accent" />
                            <h3 className="text-2xl font-semibold">
                                Our Vision
                            </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            To become the leading global community where AI
                            professionals are inspired, challenged, and equipped
                            to build ethical, innovative solutions that shape
                            the future of technology and society.
                        </p>
                    </Card> */}
                </div>
            </div>
        </section>
    );
}
