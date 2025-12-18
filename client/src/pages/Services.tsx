import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Users, Target, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Services() {
    const services = [
        {
            icon: Shield,
            name: "Data Protection & Security",
            description: "Comprehensive NDPR compliance and data security frameworks",
            image: "/compliance.webp",
            features: [
                "NDPR Compliance Assessment",
                "Privacy Policy Development", 
                "Data Protection Impact Assessment (DPIA)",
                "DCMI/DCPMI Registration",
                "Data Security Framework Implementation",
                "Staff Training & Awareness Programs"
            ],
            process: [
                "Initial compliance audit",
                "Gap analysis & recommendations", 
                "Policy development & implementation",
                "Staff training & certification",
                "Ongoing monitoring & support"
            ]
        },
        {
            icon: Users,
            name: "Corporate Governance & IP",
            description: "Board structures, compliance frameworks, and intellectual property protection",
            image: "/security.jpg",
            features: [
                "Board Structure & Governance Framework",
                "Corporate Compliance Programs",
                "Risk Management Systems",
                "Intellectual Property Strategy",
                "Trademark & Patent Filing",
                "Corporate Secretarial Services"
            ],
            process: [
                "Governance assessment",
                "Framework design & documentation",
                "Implementation & training",
                "Ongoing compliance monitoring",
                "Regular reviews & updates"
            ]
        },
        {
            icon: Target,
            name: "Regulatory Compliance & Licensing",
            description: "Navigate complex regulatory requirements with expert guidance",
            image: "/research.jpg",
            features: [
                "Regulatory Licensing Support",
                "Compliance Monitoring Systems",
                "Regulatory Filing & Reporting",
                "Industry-Specific Compliance",
                "Regulatory Change Management",
                "Government Relations Support"
            ],
            process: [
                "Regulatory landscape analysis",
                "License application preparation",
                "Submission & follow-up",
                "Compliance system setup",
                "Ongoing regulatory support"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[#1e1038]"></div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Our Services
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        Comprehensive compliance solutions designed to help African startups scale with confidence and regulatory certainty.
                    </p>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            End-to-end compliance solutions tailored for the unique challenges facing African startups
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                                    <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                                    <Button 
                                        className="w-full mt-auto"
                                        onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=info@mustarred.com&su=' + encodeURIComponent(service.name + ' Inquiry'), '_blank')}
                                    >
                                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Service Breakdown */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Service Details</h2>
                        <p className="text-xl text-gray-600">What's included in each service package</p>
                    </div>

                    <div className="space-y-16">
                        {services.map((service, i) => (
                            <div key={i} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-6">{service.name}</h3>
                                    
                                    <div className="mb-8">
                                        <h4 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h4>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, j) => (
                                                <li key={j} className="flex items-start">
                                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-600">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="text-xl font-semibold text-gray-900 mb-4">Our Process:</h4>
                                        <ol className="space-y-2">
                                            {service.process.map((step, j) => (
                                                <li key={j} className="flex items-start">
                                                    <span className="bg-[#a49fe7] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                                                        {j + 1}
                                                    </span>
                                                    <span className="text-gray-600">{step}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                    <Button 
                                        className="w-full"
                                        onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=info@mustarred.com&su=' + encodeURIComponent(service.name + ' Inquiry'), '_blank')}
                                    >
                                        Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                                
                                <div className={i % 2 === 1 ? 'lg:col-start-1' : ''}>
                                    <div className="rounded-xl overflow-hidden shadow-lg">
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="w-full h-80 object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Let's discuss your compliance needs and create a customized solution for your startup.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-[#1e1038] hover:bg-[#1e1038]/90"
                            onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=info@mustarred.com&su=Service Inquiry', '_blank')}
                        >
                            Contact Us Today
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => window.location.href = '/consultation'}
                        >
                            Book Free Consultation
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}