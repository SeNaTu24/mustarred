import { Card } from "@/components/ui/card";
import { Lock, FileCheck, Building2, Handshake } from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" className="py-6 md:py-8 bg-background">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Scale confidently, with the right Security
                        Certifications.
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Secure your ISO, SOC, PCI-DSS, NDPA certifications with
                        ease
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <Card className="p-8" data-testid="card-mission">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="h-8 w-8 text-primary" />
                            <h3 className="text-2xl font-semibold">
                                Data Protection and Security
                            </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Set up a privacy program for your business. Audit
                            your privacy program ROPA management DSR management
                            DPIA, PIA and Privacy Review Internal training on
                            privacy and data protection. Certifications (ISO,
                            SOC, HIPAA)
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
                            Get tailored assistance with your licensing efforts with
                            tailored assistance with your licensing efforts with
                            the CBN, NCC, etc. Comprehensive
                            AML/Fraud/transaction screening compliance
                            implementation and audit for your business and a
                            professional handholding through the remediation
                            process. Internal trainings on AML/KYC compliance.
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
                            Incorporation Trademark and patent Board Appraisal
                            Company secretarial services
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
                            Mergers and acquisitions Joint ventures Technology
                            licensing
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
