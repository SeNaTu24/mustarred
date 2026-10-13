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

        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
        { label: "CAC Registration", href: "/cac-registration" },
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
        <header style={{
            position: 'fixed', left: 0, right: 0, top: 0, zIndex: 50,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.92)',
            borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
            boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.07)' : 'none',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        }}>
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
                <div className="flex items-center justify-between" style={{ height: scrolled ? '60px' : '80px', transition: 'height 0.3s ease' }}>
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => (window.location.href = "/")}
                    >
                        <img
                            src="/assets/brand/logo.png"
                            alt="Mustarred-logo"
                            style={{ height: scrolled ? '48px' : '64px', width: 'auto', objectFit: 'contain', transition: 'height 0.3s ease' }}
                        />
                    </div>

                    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                        {navLinks.map((link, i) => {
                            const active = isActive(link.href);
                            return (
                                <a
                                    key={i}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNavigation(link.href); }}
                                    data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                                    style={{ position: 'relative', display: 'inline-block', padding: '6px 10px', fontSize: '13px', fontWeight: active ? 600 : 500, color: active ? '#4b4ba3' : '#1a1a2e', whiteSpace: 'nowrap', textDecoration: 'none', transition: 'color 0.2s ease' }}
                                    onMouseEnter={e => { 
                                        const span = e.currentTarget.querySelector('span') as HTMLElement;
                                        if (!active && span) span.style.transform = 'scaleX(1)';
                                        if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#4b4ba3';
                                    }}
                                    onMouseLeave={e => { 
                                        const span = e.currentTarget.querySelector('span') as HTMLElement;
                                        if (!active && span) span.style.transform = 'scaleX(0)';
                                        if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a2e';
                                    }}
                                >
                                    {link.label}
                                    <span style={{
                                        position: 'absolute', bottom: 0, left: '10px', right: '10px',
                                        height: '2px', borderRadius: '2px',
                                        background: '#4b4ba3',
                                        transform: active ? 'scaleX(1)' : 'scaleX(0)',
                                        transformOrigin: 'left',
                                        transition: 'transform 0.25s ease',
                                    }} />
                                </a>
                            );
                        })}
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
                            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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
                                    className={`text-base py-2.5 min-h-[44px] transition-colors text-left flex items-center font-medium ${
                                        isActive(link.href)
                                            ? "text-blue-600 font-semibold border-l-4 border-blue-600 pl-3"
                                            : "text-muted-foreground hover:text-foreground pl-0"
                                    }`}
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
