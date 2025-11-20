import { Button } from "@/components/ui/button";
import logoPath from "@assets/logolatest.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: "Home", href: "#home" },
        { label: "About Us", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Blog", href: "/blog" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "FAQ", href: "#faq" },
    ];

    const handleNavigation = (href: string) => {
        if (href.startsWith("/")) {
            window.location.href = href;
            setMobileMenuOpen(false);
            return;
        }

        if (href.startsWith("#")) {
            const id = href.replace("#", "");
            const el = document.getElementById(id);
            
            // If we're on the homepage and element exists, scroll to it
            if (el && window.location.pathname === "/") {
                el.scrollIntoView({ behavior: "smooth" });
            } else {
                // If we're on another page or element doesn't exist, go to homepage with hash
                window.location.href = `/${href}`;
            }
            setMobileMenuOpen(false);
            return;
        }

        window.location.href = href;
        setMobileMenuOpen(false);
    };

    const scrollToSection = (href: string) => {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        
        // If we're on the homepage and element exists, scroll to it
        if (el && window.location.pathname === "/") {
            el.scrollIntoView({ behavior: "smooth" });
        } else {
            // If we're on another page, go to homepage with hash
            window.location.href = `/${href}`;
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => (window.location.href = "/")}
                    >
                        <img
                            src={logoPath}
                            alt="Mustarred-logo"
                            className="h-14 w-auto object-contain sm:h-16 md:h-20 lg:h-24 xl:h-32"
                        />
                    </div>

                    <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
                        {navLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation(link.href);
                                }}
                                className="font-heading text-xs sm:text-sm font-medium transition-colors duration-300 hover:underline underline-offset-4 whitespace-nowrap"
                                data-testid={`nav-${link.label
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Button
                            className="hidden md:inline-flex font-heading text-xs px-2 py-1"
                            data-testid="button-header-contact"
                            onClick={() => scrollToSection("#contact")}
                        >
                            Contact
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            data-testid="button-mobile-menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-border py-4">
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigation(link.href);
                                    }}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left py-1"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Button
                                className="w-full mt-3 text-sm"
                                data-testid="button-mobile-contact"
                                onClick={() => scrollToSection("#contact")}
                            >
                                Contact Us
                            </Button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
