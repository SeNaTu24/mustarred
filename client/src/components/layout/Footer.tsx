import { SiX, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useLocation } from "wouter";
import MailchimpNewsletter from "@/components/MailchimpNewsletter";
import "./Footer.css";

const nav = {
    Company: [
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Our Training", href: "/training" },
        { label: "Readiness Check", href: "/ate2026" },
    ],
    Resources: [
        { label: "Our Insights", href: "/our-insights" },
        { label: "CAC Registration", href: "/cac-registration" },
        { label: "DCMI Compliance", href: "/dcmi-compliance" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Use", href: "/terms-of-service" },
    ],
};

const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/mustarred/about/", icon: <FaLinkedin size={15} /> },
    { label: "X", href: "https://x.com/mustarred", icon: <SiX size={14} /> },
    { label: "Instagram", href: "https://www.instagram.com/mustarred_africa?igsh=MW5wbW45MTltNXJudQ==", icon: <SiInstagram size={15} /> },
];

interface FooterProps {
    showNewsletter?: boolean;
}

export default function Footer({ showNewsletter }: FooterProps) {
    const [location] = useLocation();

    // Pages that already contain an in-page newsletter signup form in their main content
    const hasInPageNewsletter =
        location === "/blog" ||
        location.startsWith("/blog/") ||
        location === "/our-insights";

    // Show newsletter by default across all applicable pages,
    // avoiding duplicate forms on pages that already have one unless explicitly requested
    const displayNewsletter =
        showNewsletter !== undefined ? showNewsletter : !hasInPageNewsletter;

    return (
        <footer className={`site-footer${displayNewsletter ? " site-footer--with-newsletter" : ""}`}>
            <div className="site-footer__main">
                <div className="site-footer__brand">
                    <img
                        src="/assets/brand/logo-white.png"
                        alt="Mustarred"
                        className="site-footer__logo"
                    />
                    <p>Legal and regulatory solutions for African businesses and startups.</p>

                    <div className="site-footer__socials site-footer__socials--brand">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {Object.entries(nav).map(([title, links]) => (
                    <nav key={title} className="site-footer__column" aria-label={title}>
                        <h2>{title}</h2>
                        <ul>
                            {links.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}

                {displayNewsletter && (
                    <div className="site-footer__newsletter">
                        <h2>Stay Informed</h2>
                        <MailchimpNewsletter variant="footer" />
                    </div>
                )}
            </div>

            <div className="site-footer__bar">
                <p>© {new Date().getFullYear()} Mustarred. All rights reserved.</p>
            </div>
        </footer>
    );
}
