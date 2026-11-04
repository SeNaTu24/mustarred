import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone } from "lucide-react";
import MailchimpNewsletter from "@/components/MailchimpNewsletter";
import { useModal } from "@/contexts/ModalContext";

interface ContactSectionProps {
    onResourcesClick?: () => void;
}

export default function ContactSection({ onResourcesClick }: ContactSectionProps) {
    const { openModal } = useModal();

    return (
        <section id="contact" className="home-contact-section py-10 sm:py-12 md:py-14 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="home-contact-layout">
                    <div className="home-contact-details">
                        <div className="home-contact-actions">
                            <h3 className="home-contact-heading" tabIndex={0}>
                                <span className="home-contact-trigger">
                                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                    Get in Touch
                                    <span className="home-contact-indicator" aria-hidden="true">+</span>
                                </span>
                            </h3>
                            <div
                                id="home-contact-options"
                                className="home-contact-reveal"
                            >
                                <div className="home-contact-action-buttons">
                                    <Button
                                        data-testid="button-contact"
                                        onClick={() => openModal("Contact Us", "Get in touch with our team")}
                                        className="home-contact-primary"
                                    >
                                        Contact Us
                                    </Button>
                                    <a
                                        href="https://wa.me/2348143708860"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="home-contact-secondary"
                                    >
                                        <Phone className="h-3.5 w-3.5" />
                                        WhatsApp Us
                                    </a>
                                    {onResourcesClick && (
                                        <Button
                                            variant="outline"
                                            onClick={onResourcesClick}
                                            className="home-contact-secondary"
                                        >
                                            Free Resources
                                        </Button>
                                    )}
                                </div>

                                <div className="home-contact-email">
                                    <h3>
                                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                        Email
                                    </h3>
                                    <button
                                        onClick={() => openModal("Contact Us", "Send us an email")}
                                        className="text-base text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                    >
                                        info@mustarred.com
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="home-contact-newsletter">
                        <MailchimpNewsletter />
                    </div>
                </div>
            </div>
        </section>
    );
}
