import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import logoPath from "@assets/nZDma7Ao_400x400_1759404629970.jpg";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Tracks", href: "#tracks" },
    { label: "Debates", href: "#debates" },
    { label: "Career Fair", href: "#careers" },
    { label: "FAQ", href: "#faq" },
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logoPath} alt="Legal Tech Bro" className="h-10 w-10 rounded-md" />
            <span className="font-bold text-lg hidden sm:inline">Legal Tech Bro</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button className="hidden md:inline-flex" data-testid="button-header-join">
              Join Community
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
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <Button className="w-full mt-2" data-testid="button-mobile-join">
                Join Community
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
