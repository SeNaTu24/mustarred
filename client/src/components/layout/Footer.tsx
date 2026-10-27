import { SiX, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useModal } from "@/contexts/ModalContext";

const nav = {
    Company: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Our Training", href: "/training" },
    ],
    Resources: [
        { label: "Our Insights", href: "/our-insights" },
        { label: "CAC Registration", href: "/cac-registration" },
        { label: "DCMI Compliance", href: "/dcmi-compliance" },
        { label: "Readiness Check", href: "/ate2026" },
    ],
    Legal: [
        { label: "Privacy Notice", href: "/privacy-policy" },
        { label: "Terms of Use", href: "/terms-of-service" },
    ],
};

const socials = [
    { label: "X", href: "https://x.com/mustarred", icon: <SiX size={16} /> },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/mustarred/about/", icon: <FaLinkedin size={16} /> },
    { label: "Instagram", href: "https://www.instagram.com/mustarred_africa?igsh=MW5wbW45MTltNXJudQ==", icon: <SiInstagram size={16} /> },
];

export default function Footer() {
    const { openModal } = useModal();

    return (
        <footer style={{ backgroundColor: '#0d0520', color: 'white' }}>
            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-20">
                <div className="grid grid-cols-2 md:grid-cols-[2.5fr_1fr_1fr_1fr] gap-12 md:gap-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <img
                            src="/assets/brand/logo.png"
                            alt="Mustarred"
                            className="h-24 w-auto object-contain brightness-0 invert mb-6"
                        />
                        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', lineHeight: 1.7, maxWidth: '260px' }}>
                            Legal compliance made simple for African businesses and startups.
                        </p>
                        <button
                            onClick={() => openModal("Contact Us", "Get in touch with our team")}
                            style={{
                                marginTop: '24px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                background: '#4b4ba3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            Get in Touch
                        </button>
                    </div>

                    {/* Nav columns */}
                    {Object.entries(nav).map(([title, links]) => (
                        <div key={title}>
                            <h4 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
                                {title}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {links.map(link => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', textDecoration: 'none', transition: 'color 0.2s' }}
                                            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>
                        © {new Date().getFullYear()} Mustarred. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {socials.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: '34px', height: '34px',
                                    borderRadius: '6px',
                                    color: 'rgba(255,255,255,0.5)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
