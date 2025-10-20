import logoPath from "@assets/logolatest.png";

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border py-8">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                    <div>
                        <div className="flex items-center mb-4">
                            <img
                                src={logoPath}
                                alt="Mustarred"
                                className="h-24 w-auto object-contain"
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Providing strategic solutions to help scale African
                            startups.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="hover:text-foreground transition-colors text-left"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        window.location.href = '/';
                                        setTimeout(() => {
                                            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    className="hover:text-foreground transition-colors text-left"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        window.location.href = '/';
                                        setTimeout(() => {
                                            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    className="hover:text-foreground transition-colors text-left"
                                >
                                    Services
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        window.location.href = '/';
                                        setTimeout(() => {
                                            document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    className="hover:text-foreground transition-colors text-left"
                                >
                                    Testimonials
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        window.location.href = '/';
                                        setTimeout(() => {
                                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    className="hover:text-foreground transition-colors text-left"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#faq"
                                    className="hover:text-foreground transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                        </ul>
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
