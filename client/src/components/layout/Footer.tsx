import logoPath from "@assets/logolatest.png";

export default function Footer() {
    const handleFooterNavigation = (href: string) => {
        if (href.startsWith("#")) {
            const id = href.replace("#", "");
            const el = document.getElementById(id);
            
            // If we're on the homepage and element exists, scroll to it
            if (el && window.location.pathname === "/") {
                el.scrollIntoView({ behavior: "smooth" });
            } else {
                // If we're on another page, go to homepage with hash
                window.location.href = `/${href}`;
            }
        } else {
            window.location.href = href;
        }
    };

    return (
        <footer className="bg-white border-t border-border py-8 mt-0">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                        <div className="flex items-center mb-4">
                            <img
                                src={logoPath}
                                alt="Mustarred"
                                className="h-24 w-auto object-contain"
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            ...for the startups that scale
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <button
                                        onClick={() => handleFooterNavigation("/")}
                                        className="hover:text-foreground transition-colors text-left"
                                    >
                                        Home
                                </button>
                            </li>
                            <li>
                                <button
                                        onClick={() => handleFooterNavigation("#about")}
                                        className="hover:text-foreground transition-colors text-left"
                                    >
                                        About Us
                                </button>
                            </li>
                            <li>
                                <button
                                        onClick={() => handleFooterNavigation("#services")}
                                        className="hover:text-foreground transition-colors text-left"
                                    >
                                        Services
                                </button>
                            </li>
                            <li>
                                <button
                                        onClick={() => handleFooterNavigation("#testimonials")}
                                        className="hover:text-foreground transition-colors text-left"
                                    >
                                        Testimonials
                                </button>
                            </li>
                            <li>
                                <button
                                        onClick={() => handleFooterNavigation("#contact")}
                                        className="hover:text-foreground transition-colors text-left"
                                    >
                                        Contact
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 mb-6">
                        <div className="flex-1">
                            <h4 className="font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                <button
                                        onClick={() => handleFooterNavigation("/blog")}
                                        className="hover:text-foreground transition-colors"
                                >
                                        Blog
                                </button>
                            </li>
                            <li>
                                <button
                                        onClick={() => handleFooterNavigation("#faq")}
                                        className="hover:text-foreground transition-colors"
                                >
                                        FAQ
                                </button>
                            </li>
                        </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Legal Disclaimer
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 border-t border-border text-center text-sm text-muted-foreground">
                    <p>
                        &copy; {new Date().getFullYear()} Mustarred. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
