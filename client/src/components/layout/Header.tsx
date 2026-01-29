import { Button } from "@/components/ui/button";
// Logo path will be used directly
import { useState, useCallback, useMemo, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";

export default function Header() {
    const { openModal } = useModal();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);

    useEffect(() => {
        setIsHomePage(window.location.pathname === '/');
    }, []);

    const navLinks = useMemo(() => [
        { label: "Home", href: "#home" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Our Training", href: "/training" },
        { label: "Our Insights", href: "/our-insights" },
        { label: "Testimonials", href: "#testimonials" },
    ], []);

    const handleNavigation = useCallback((href: string) => {
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
    }, []);



    return (
        <header className={`fixed left-0 right-0 z-50 backdrop-blur-md bg-white/95 border-b border-gray-200 shadow-sm ${isHomePage ? 'top-0' : 'top-0'}`}>
            {isHomePage && (
                <div className="relative overflow-hidden text-white py-2 text-center text-sm" style={{backgroundColor: 'rgb(30,17,56)'}}>
                    {/* Animated background */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute w-32 h-32 bg-purple-500 rounded-full blur-2xl animate-pulse" style={{left: '-10%', top: '-50%'}}></div>
                        <div className="absolute w-24 h-24 bg-blue-500 rounded-full blur-xl animate-bounce" style={{right: '-5%', top: '-30%', animationDelay: '1s'}}></div>
                    </div>
                    
                    <div className="relative animate-marquee whitespace-nowrap">
                        📊 Are You GAID-Ready? 
                        <a href="/our-insights" className="text-yellow-300 hover:text-yellow-200 underline ml-1 transition-colors">
                            Download guide →
                        </a>
                        <span className="mx-6">|</span>
                        📘 SME Compliance Guide 
                        <a href="/our-insights#sme-guide" className="text-yellow-300 hover:text-yellow-200 underline ml-1 transition-colors">
                            Download now →
                        </a>
                    </div>
                </div>
            )}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => (window.location.href = "/")}
                    >
                        <img
                            src="/assets/brand/logo.png"
                            alt="Mustarred-logo"
                            className="h-20 sm:h-22 md:h-24 lg:h-28 w-auto object-contain"
                        />
                    </div>

                    <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                        {navLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation(link.href);
                                }}
                                className="font-heading text-sm font-medium transition-colors duration-300 hover:underline underline-offset-4"
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
                            size="sm"
                            className="hidden md:inline-flex font-heading text-xs px-3 py-1.5 min-h-[36px]"
                            data-testid="button-header-contact"
                            onClick={() => openModal("Contact Us", "Get in touch with our team")}
                        >
                            Contact Us
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
                    <div className="md:hidden border-t border-border py-4">
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigation(link.href);
                                    }}
                                    className="text-base py-2.5 min-h-[44px] text-muted-foreground hover:text-foreground transition-colors text-left flex items-center"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Button
                                size="sm"
                                className="w-full mt-2 text-sm py-2.5 min-h-[48px]"
                                data-testid="button-mobile-contact"
                                onClick={() => openModal("Contact Us", "Get in touch with our team")}
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
