import { Button } from "@/components/ui/button";
import logoPath from "@assets/1646692958457.jpeg";

export default function BlogHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <img
                            src={logoPath}
                            alt="Mustarred"
                            className="h-10 w-10 rounded-md border border-border shadow-sm"
                        />
                        <span className="font-bold text-lg">Mustarred</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <a
                            href="/"
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            Home
                        </a>
                        <a
                            href="/blog"
                            className="text-sm font-medium text-primary"
                        >
                            Blog
                        </a>
                    </nav>

                    <Button
                        onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=info@mustarred.com', '_blank')}
                    >
                        Contact Us
                    </Button>
                </div>
            </div>
        </header>
    );
}