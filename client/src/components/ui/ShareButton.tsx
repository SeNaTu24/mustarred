import { useState } from "react";

const socials = [
    {
        label: "X (Twitter)",
        href: "https://twitter.com/mustarred",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: "Facebook",
        href: "https://facebook.com/mustarred",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/company/mustarred",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
];

export default function ShareButton() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Pill button */}
            <button
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 22px",
                    borderRadius: "999px",
                    background: hovered ? "#4b4ba3" : "#1e1038",
                    color: "white",
                    border: "1px solid rgba(164,159,231,0.4)",
                    fontSize: "13px",
                    fontWeight: 700,
                    fontFamily: "Satoshi, sans-serif",
                    cursor: "pointer",
                    transform: hovered ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: hovered ? "0 0 18px rgba(75,75,163,0.55)" : "none",
                    transition: "all 0.25s ease",
                    letterSpacing: "0.04em",
                }}
                aria-haspopup="true"
                aria-expanded={hovered}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" aria-hidden="true">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Follow us
            </button>

            {/* Popup */}
            <div
                style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                    padding: "10px 14px",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    opacity: hovered ? 1 : 0,
                    pointerEvents: hovered ? "auto" : "none",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                    transformOrigin: "top center",
                    whiteSpace: "nowrap",
                    zIndex: 50,
                }}
                role="menu"
            >
                {/* Arrow */}
                <div style={{
                    position: "absolute",
                    top: "-6px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: "12px",
                    height: "12px",
                    background: "white",
                    boxShadow: "-2px -2px 4px rgba(0,0,0,0.06)",
                }} />
                {socials.map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        role="menuitem"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px",
                            color: "#1e1038",
                            background: "transparent",
                            transition: "background 0.15s ease, color 0.15s ease",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = "#f0effe";
                            (e.currentTarget as HTMLAnchorElement).style.color = "#4b4ba3";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                            (e.currentTarget as HTMLAnchorElement).style.color = "#1e1038";
                        }}
                    >
                        {s.icon}
                    </a>
                ))}
            </div>
        </div>
    );
}
