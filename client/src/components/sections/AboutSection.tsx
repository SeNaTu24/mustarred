import { Card } from "@/components/ui/card";
import { Lock, FileCheck, Building2, Handshake } from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" className="py-16 md:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Scale confidently with the right Security
                        Certifications.
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Secure your ISO, SOC, PCI-DSS, NDPA certifications with
                        ease
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <Card className="p-8" data-testid="card-mission">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="h-8 w-8 text-primary" />
                            <h3 className="text-2xl font-semibold">
                                Data Protection and Security
                            </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Build and maintain a strong privacy framework for your business. Learn how to set up and audit privacy programs, manage ROPA and DSR processes, and conduct DPIAs, PIAs, and privacy reviews. Strengthen internal compliance through staff training and align your systems with global standards such as ISO, SOC, and HIPAA.
                        </p>
                    </Card>
                    <Card className="p-8" data-testid="card-mission">
                        <div className="flex items-center gap-3 mb-4">
                            <FileCheck className="h-8 w-8 text-primary" />
                            <h3 className="text-2xl font-semibold">
                                Regulatory Compliance and Licensing
                            </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Develop the competence to navigate licensing and regulatory frameworks with agencies such as the CBN, NCC, etc. Gain hands-on experience in AML, fraud, and transaction-screening compliance implementation and audits, with practical guidance through the remediation process. Includes internal AML/KYC training.
                        </p>
                    </Card>
                    <Card className="p-8" data-testid="card-mission">
                        <div className="flex items-center gap-3 mb-4">
                            <Building2 className="h-8 w-8 text-primary" />
                            <h3 className="text-2xl font-semibold">
                                Corporate Governance & IP
                            </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Understand how to establish and manage corporate structures that promote accountability and protect innovation. Learn about company incorporation, trademark and patent registration, board appraisal, and company secretarial best practices.
                        </p>
                    </Card>
                    <Card className="p-8" data-testid="card-mission">
                        <div className="flex items-center gap-3 mb-4">
                            <Handshake className="h-8 w-8 text-primary" />
                            <h3 className="text-2xl font-semibold">
                                Transaction Advisory
                            </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Gain insight into structuring and managing high-value business transactions. Explore mergers and acquisitions, joint ventures, and technology licensing with a focus on compliance, due diligence, and strategic alignment.
                        </p>
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
