import { Button } from "@/components/ui/button";

export default function BlogHeader() {
    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--nav-border)] bg-[var(--nav-surface)] font-sans text-[var(--nav-foreground)] shadow-sm backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex cursor-pointer items-center" onClick={() => window.location.href = '/'}>
                        <img
                            src="/assets/brand/logo.png"
                            alt="Mustarred"
                            className="h-16 w-auto object-contain"
                        />
                    </div>

                    <nav className="hidden items-center gap-1 lg:gap-2 md:flex" aria-label="Main navigation">
                        <a
                            href="/"
                            className="whitespace-nowrap px-[10px] py-[6px] text-[13px] font-medium text-[var(--nav-foreground)] transition-colors hover:text-[var(--nav-accent)]"
                        >
                            Home
                        </a>
                        <a
                            href="/blog"
                            aria-current="page"
                            className="whitespace-nowrap px-[10px] py-[6px] text-[13px] font-semibold text-[var(--nav-accent)]"
                        >
                            Blog
                        </a>
                    </nav>

                    <Button
                        size="sm"
                        className="min-h-[36px] px-3 py-1.5 font-heading text-xs"
                        onClick={() => {
                            const newWindow = window.open('https://mail.google.com/mail/?view=cm&to=info@mustarred.com', '_blank');
                            if (newWindow) newWindow.opener = null;
                        }}
                    >
                        Contact Us
                    </Button>
                </div>
            </div>
        </header>
    );
}
