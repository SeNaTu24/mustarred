import { Button } from "@/components/ui/button";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";

export default function Header() {
    const { openModal } = useModal();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);
    const [currentPath, setCurrentPath] = useState("");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;
        setIsHomePage(path === '/');
        setCurrentPath(path);
        setScrolled(window.scrollY > 40);

        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isTransparent = isHomePage && !scrolled;

    const isActive = useCallback((href: string) => {
        if (href.startsWith("#")) return currentPath === "/";
        return currentPath === href;
    }, [currentPath]);

    const navLinks = useMemo(() => [
        { label: "Home", href: "#home" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Our Training", href: "/training" },
        { label: "Our Insights", href: "/our-insights" },
        { label: "Register in Africa", href: "/cac-registration" },
        { label: "Readiness Check", href: "/ate2026" },
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
        <header
            className={`fixed left-0 right-0 top-0 z-50 font-sans ${isTransparent ? 'text-white' : 'text-[var(--nav-foreground)]'}`}
            style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isTransparent ? 'transparent' : 'var(--nav-surface)',
                borderBottom: isTransparent
                    ? '1px solid transparent'
                    : (scrolled ? '1px solid var(--nav-border)' : '1px solid transparent'),
                boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.07)' : 'none',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
            }}
        >
            {isHomePage && (
                <div className="relative overflow-hidden bg-[#1e1138] py-2 text-center text-sm text-white">
                    {/* Animated background */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute left-[-10%] top-[-50%] h-32 w-32 animate-pulse rounded-full bg-purple-500 blur-2xl"></div>
                        <div className="absolute right-[-5%] top-[-30%] h-24 w-24 animate-bounce rounded-full bg-blue-500 blur-xl" style={{ animationDelay: '1s' }}></div>
                    </div>

                    <div className="relative animate-marquee whitespace-nowrap">
                        📊 Are You GAID-Ready?
                        <a href="/our-insights" className="ml-1 text-yellow-300 underline transition-colors hover:text-yellow-200">
                            Download guide →
                        </a>
                        <span className="mx-6">|</span>
                        📘 SME Compliance Guide
                        <a href="/our-insights#sme-guide" className="ml-1 text-yellow-300 underline transition-colors hover:text-yellow-200">
                            Download now →
                        </a>
                    </div>
                </div>
            )}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between" style={{ height: scrolled ? '60px' : '80px', transition: 'height 0.3s ease' }}>
                    <div
                        className="flex cursor-pointer items-center"
                        onClick={() => (window.location.href = "/")}
                    >
                        <img
                            src="/assets/brand/logo.png"
                            alt="Mustarred-logo"
                            style={{ height: scrolled ? '64px' : '88px', width: 'auto', objectFit: 'contain', transition: 'height 0.3s ease, filter 0.3s ease', filter: isTransparent ? 'brightness(0) invert(1)' : 'none' }}
                        />
                    </div>

                    <nav className="hidden items-center gap-1 lg:gap-2 md:flex" aria-label="Main navigation">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNavigation(link.href); }}
                                    data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                                    className={`group relative inline-block whitespace-nowrap px-[10px] py-[6px] text-[13px] transition-colors duration-200 ${
                                        active
                                            ? "font-semibold text-[var(--nav-accent)]"
                                            : `font-medium ${isTransparent ? 'text-white' : 'text-[var(--nav-foreground)]'} hover:text-[var(--nav-accent)]`
                                    }`}
                                >
                                    {link.label}
                                    <span
                                        aria-hidden="true"
                                        className={`absolute bottom-0 left-[10px] right-[10px] h-0.5 origin-left rounded-sm bg-[var(--nav-accent)] transition-transform duration-200 ${
                                            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                    />
                                </a>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            className="hidden min-h-[36px] px-3 py-1.5 font-heading text-xs md:inline-flex"
                            data-testid="button-header-contact"
                            onClick={() => openModal("Contact Us", "Get in touch with our team")}
                        >
                            Contact Us
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`${isTransparent ? 'text-white' : 'text-[var(--nav-foreground)]'} hover:text-[var(--nav-accent)] md:hidden`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            data-testid="button-mobile-menu"
                            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" aria-hidden="true" />
                            ) : (
                                <Menu className="h-5 w-5" aria-hidden="true" />
                            )}
                        </Button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="border-t border-border bg-[var(--nav-surface)] py-4 md:hidden">
                        <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavigation(link.href);
                                        }}
                                        className={`flex min-h-[44px] items-center border-l-4 py-2.5 text-left text-base transition-colors ${
                                            active
                                                ? "border-l-[var(--nav-accent)] pl-3 font-semibold text-[var(--nav-accent)]"
                                                : `border-l-transparent pl-3 font-medium ${isTransparent ? 'text-white' : 'text-[var(--nav-foreground)]'} hover:text-[var(--nav-accent)]`
                                        }`}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}
                            <Button
                                size="sm"
                                className="mt-2 min-h-[48px] w-full py-2.5 text-sm"
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
