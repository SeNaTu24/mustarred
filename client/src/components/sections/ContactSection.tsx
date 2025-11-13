import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare } from "lucide-react";
import { SiX, SiLinkedin, SiInstagram } from "react-icons/si";
import { useState } from "react";

export default function ContactSection() {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        console.log("Newsletter subscription:", email);
        setEmail("");
    };

    return (
        <section id="contact" className="py-8 md:py-12 bg-card/30">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Let's Connect
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
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
                                <Button 
                                    size="lg" 
                                    data-testid="button-contact"
                                    onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=info@mustarred.com', '_blank')}
                                >
                                    Contact Us
                                </Button>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-primary" />
                                    Email
                                </h3>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&to=info@mustarred.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    info@mustarred.com
                                </a>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">
                                    Follow Us
                                </h3>
                                <div className="flex gap-4">
                                    {[
                                        { icon: SiX, label: "X", href: "https://x.com/mustarred" },
                                        {
                                            icon: SiLinkedin,
                                            label: "LinkedIn",
                                            href: "https://www.linkedin.com/company/mustarred/about/",
                                        },
                                        {
                                            icon: SiInstagram,
                                            label: "Instagram",
                                            href: "https://www.instagram.com/mustarred__crest/",
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
                        <div className="p-8 rounded-lg bg-card">
                            <h3 className="text-2xl font-bold mb-4">
                                Subscribe to our Newsletter
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Stay ahead of the curve with the latest compliance
                                insights, regulatory updates, and expert guidance
                                delivered to your inbox.
                            </p>

                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        data-testid="input-newsletter-email"
                                    />
                                    <Button
                                        onClick={handleSubscribe}
                                        data-testid="button-subscribe"
                                    >
                                        Subscribe
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Join 10K+ business professionals who stay compliant
                                    and ahead of the curve
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
