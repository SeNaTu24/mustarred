import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Download } from "lucide-react";
import { SiX, SiLinkedin, SiInstagram } from "react-icons/si";
import MailchimpNewsletter from "@/components/MailchimpNewsletter";
import { useModal } from "@/contexts/ModalContext";

interface ContactSectionProps {
    onResourcesClick?: () => void;
}

export default function ContactSection({ onResourcesClick }: ContactSectionProps) {
    const { openModal } = useModal();
    return (
        <section id="contact" className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    <div>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Let's Connect
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground mb-6">
                            Ready to protect your business? Contact us for a
                            consultation or to learn more about how we can
                            assist you.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                    Get in Touch
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        size="lg"
                                        data-testid="button-contact"
                                        onClick={() => openModal("Contact Us", "Get in touch with our team")}
                                    >
                                        Contact Us
                                    </Button>
                                    {onResourcesClick && (
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={onResourcesClick}
                                            className="flex items-center gap-2"
                                        >
                                            <Download className="h-4 w-4" />
                                            Free Resources
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-primary" />
                                    Email
                                </h3>
                                <button
                                    onClick={() => openModal("Contact Us", "Send us an email")}
                                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                >
                                    info@mustarred.com
                                </button>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">
                                    Follow Us
                                </h3>
                                <div className="flex gap-4">
                                    {[
                                        {
                                            icon: SiX,
                                            label: "X",
                                            href: "https://x.com/mustarred",
                                        },
                                        {
                                            icon: SiLinkedin,
                                            label: "LinkedIn",
                                            href: "https://www.linkedin.com/company/mustarred/about/",
                                        },
                                        {
                                            icon: SiInstagram,
                                            label: "Instagram",
                                            href: "https://www.instagram.com/mustarred_africa?igsh=MW5wbW45MTltNXJudQ==",
                                        },
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="p-3 rounded-lg bg-card hover-elevate active-elevate-2"
                                            data-testid={`link-social-${social.label.toLowerCase()}`}
                                        >
                                            <social.icon className="h-5 w-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <MailchimpNewsletter />
                    </div>
                </div>
            </div>
        </section>
    );
}
