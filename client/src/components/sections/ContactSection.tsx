import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Download, Phone } from "lucide-react";
import { SiX, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import MailchimpNewsletter from "@/components/MailchimpNewsletter";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";

const socials = [
    { label: "X", href: "https://x.com/mustarred", icon: <SiX size={18} aria-hidden="true" /> },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/mustarred/about/", icon: <FaLinkedin size={18} aria-hidden="true" /> },
    { label: "Instagram", href: "https://www.instagram.com/mustarred_africa?igsh=MW5wbW45MTltNXJudQ==", icon: <SiInstagram size={18} aria-hidden="true" /> },
];

function FollowUsButton() {
    const [open, setOpen] = useState(false);
    return (
        <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 22px",
                    borderRadius: "999px",
                    background: open ? "#4b4ba3" : "#1e1038",
                    color: "white",
                    border: "1px solid rgba(164,159,231,0.4)",
                    fontSize: "13px",
                    fontWeight: 700,
                    fontFamily: "Satoshi, sans-serif",
                    cursor: "pointer",
                    transform: open ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: open ? "0 0 18px rgba(75,75,163,0.5)" : "none",
                    transition: "all 0.25s ease",
                    letterSpacing: "0.04em",
                }}
                aria-haspopup="true"
                aria-expanded={open}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Follow Us
            </button>

            <div
                role="menu"
                style={{
                    position: "absolute",
                    top: "calc(100% + 0px)",
                    paddingTop: "14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                    padding: "10px 14px",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? "auto" : "none",
                    transition: "opacity 0.2s ease",
                    whiteSpace: "nowrap",
                    zIndex: 50,
                }}
            >
                <div style={{
                    position: "absolute", top: "-6px", left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: "12px", height: "12px",
                    background: "white",
                    boxShadow: "-2px -2px 4px rgba(0,0,0,0.06)",
                }} />
                {socials.map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        role="menuitem"
                        data-testid={`link-social-${s.label.toLowerCase()}`}
                        style={{
                            display: "flex", alignItems: "center", justifyContent: "center",
                            width: "38px", height: "38px",
                            borderRadius: "8px",
                            color: "#1e1038",
                            transition: "background 0.15s ease, color 0.15s ease",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#f0effe"; e.currentTarget.style.color = "#4b4ba3"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1e1038"; }}
                    >
                        {s.icon}
                    </a>
                ))}
            </div>
        </div>
    );
}

interface ContactSectionProps {
    onResourcesClick?: () => void;
}

export default function ContactSection({ onResourcesClick }: ContactSectionProps) {
    const { openModal } = useModal();
    return (
        <section id="contact" className="py-16 sm:py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-0">
                    <div className="lg:max-w-md">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
                            Let's Connect
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6">
                            Ready to protect your business? Contact us for a
                            consultation or to learn more about how we can
                            assist you.
                        </p>

                        <div className="space-y-4 sm:space-y-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                    Get in Touch
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        data-testid="button-contact"
                                        onClick={() => openModal("Contact Us", "Get in touch with our team")}
                                        className="w-full sm:w-auto px-4 py-2 text-sm"
                                    >
                                        Contact Us
                                    </Button>
                                    <a
                                        href="https://wa.me/2348143708860"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-sm rounded-md border border-green-500 text-green-600 hover:bg-green-50 transition-colors font-medium"
                                    >
                                        <Phone className="h-3.5 w-3.5" />
                                        WhatsApp Us
                                    </a>
                                    {onResourcesClick && (
                                        <Button
                                            variant="outline"
                                            onClick={onResourcesClick}
                                            className="flex items-center gap-2 w-full sm:w-auto px-4 py-2 text-sm"
                                        >
                                            <Download className="h-3.5 w-3.5" />
                                            Free Resources
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
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

                            <div>
                                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                                    🕒 Business Hours
                                </h3>
                                <p className="text-sm text-muted-foreground">Monday – Friday: <span className="font-medium text-gray-800">9:00 AM – 5:00 PM WAT</span></p>
                                <p className="text-xs text-muted-foreground mt-1">We respond to all enquiries within 24 hours.</p>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                                    📍 Location
                                </h3>
                                <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                                    Lagos, Nigeria<br />
                                    <a
                                        href="https://maps.google.com/?q=Lagos,Nigeria"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline text-xs mt-1 inline-block"
                                    >
                                        View on Google Maps →
                                    </a>
                                </address>
                            </div>

                                            <FollowUsButton />
                        </div>
                    </div>

                    <div className="lg:max-w-md">
                        <MailchimpNewsletter />
                    </div>
                </div>
            </div>
        </section>
    );
}
