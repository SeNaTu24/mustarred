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
    if (href.startsWith('/')) {
      window.location.href = href;
    } else {
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
            <img src={logoPath} alt="Mustarred-logo" className="h-32 w-auto object-contain" />
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleNavigation(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button 
              className="hidden md:inline-flex" 
              data-testid="button-header-contact"
              onClick={() => scrollToSection('#contact')}
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
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => handleNavigation(link.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <Button 
                className="w-full mt-2" 
                data-testid="button-mobile-contact"
                onClick={() => scrollToSection('#contact')}
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
