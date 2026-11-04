import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutResourcesCta from "@/components/sections/AboutResourcesCta";
import { useModal } from "@/contexts/ModalContext";
import { useEffect, useRef, useState } from "react";
import "./AboutUs.css";

function AnimatedStatValue({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const valueRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = valueRef.current;
        if (!element) return;

        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            !("IntersectionObserver" in window)
        ) {
            setCount(value);
            return;
        }

        let frameId: number | undefined;
        const observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;

            observer.disconnect();
            const startTime = performance.now();
            const duration = 1000;

            const updateCount = (time: number) => {
                const progress = Math.min((time - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                setCount(Math.round(value * easedProgress));

                if (progress < 1) {
                    frameId = requestAnimationFrame(updateCount);
                }
            };

            frameId = requestAnimationFrame(updateCount);
        }, { threshold: 0.35 });

        observer.observe(element);

        return () => {
            observer.disconnect();
            if (frameId !== undefined) cancelAnimationFrame(frameId);
        };
    }, [value]);

    return (
        <span
            ref={valueRef}
            className="about-stat-value"
            role="img"
            aria-label={`${value}${suffix}`}
            style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(28px, 3vw, 42px)",
                fontWeight: 400,
                color: "#4b4ba3",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
            }}
        >
            {count}{suffix}
        </span>
    );
}

const eyebrow: React.CSSProperties = {
    fontSize: "11px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 700,
    color: "#a49fe7",
    marginBottom: "0",
};

const serifH2: React.CSSProperties = {
    fontFamily: "Georgia, serif",
    fontWeight: 400,
    fontSize: "clamp(32px, 4vw, 56px)",
    lineHeight: 1.09,
    letterSpacing: "-0.04em",
    margin: "16px 0 24px",
};

const wrap: React.CSSProperties = {
    width: "min(1200px, 90%)",
    margin: "auto",
};

export default function AboutUs() {
    const { openModal } = useModal();

    return (
        <div className="about-page min-h-screen">
            <Header />

            {/* Hero */}
            <section className="about-hero">
                <div style={wrap}>
                    <div className="about-hero-content">
                        <h1 className="about-hero-title">Clear guidance for doing business across Africa.</h1>
                        <p className="about-hero-description">
                            From company registration and startup advisory to data-protection programmes and regulatory compliance, we turn complex requirements into practical next steps.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story — split layout */}
            <section className="about-story" style={{ padding: "100px 0", background: "white" }}>
                <div style={wrap}>
                    {/* <div style={eyebrow}></div> */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "65px",
                            alignItems: "center",
                            marginTop: "0",
                        }}
                        className="about-split about-story-grid"
                    >
                        <div className="about-story-copy">
                            <h2 style={{ ...serifH2, color: "#142338" }}>
                                Our{" "}
                                <em
                                    style={{
                                        color: "#4b4ba3",
                                        fontStyle: "italic",
                                    }}
                                >
                                    Story.
                                </em>
                            </h2>
                            <p
                                style={{
                                    fontSize: "19px",
                                    lineHeight: 1.8,
                                    color: "#536376",
                                    maxWidth: "520px",
                                    marginBottom: "20px",
                                }}
                            >
                                Mustarred was founded on a simple belief that business compliance should not stand in the way of business growth.
                            </p>
                            <p
                                style={{
                                    fontSize: "16px",
                                    lineHeight: 1.8,
                                    color: "#536376",
                                    maxWidth: "520px",
                                    marginBottom: "20px",
                                }}
                            >
                                Across Africa, many promising businesses have the ideas, ambition and drive to make a real impact. Yet, navigating regulatory requirements, data protection and cybersecurity can be challenging, especially for businesses trying to grow and find their footing.
                            </p>
                            <p
                                style={{
                                    fontSize: "16px",
                                    lineHeight: 1.8,
                                    color: "#536376",
                                    maxWidth: "520px",
                                    marginBottom: "20px",
                                }}
                            >
                                We recognised the need for a better way. One where businesses could focus on building, innovating and growing, without being overwhelmed by the complexities of compliance.
                            </p>
                            <p
                                style={{
                                    fontSize: "16px",
                                    lineHeight: 1.8,
                                    color: "#536376",
                                    maxWidth: "520px",
                                    marginBottom: "20px",
                                }}
                            >
                                With great experience and a deep understanding of the African business landscape, our founders set out to bridge this gap.
                            </p>
                            <p
                                style={{
                                    fontSize: "16px",
                                    lineHeight: 1.8,
                                    color: "#536376",
                                    maxWidth: "520px",
                                }}
                            >
                                Today, Mustarred works with businesses to make compliance easier to understand, easier to manage and easier to integrate into everyday operations. We help organisations navigate the complexities of data protection, regulatory compliance and cybersecurity, so they can operate with confidence and build for the future.
                            </p>
                        </div>

                        {/* Stats grid */}
                        <div
                            className="about-stat-grid"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "2px",
                                background: "#e8e8f0",
                            }}
                        >
                            {[
                                { value: 500, suffix: "+", label: "Startups Guided" },
                                { value: 15, suffix: "+", label: "African Countries" },
                                { value: 98, suffix: "%", label: "Success Rate" },
                                { value: 24, suffix: "/7", label: "Support" },
                            ].map(({ value, suffix, label }) => (
                                <div
                                    key={label}
                                    className="about-stat-card"
                                    style={{
                                        background: "white",
                                        padding: "28px 24px",
                                        textAlign: "center",
                                    }}
                                >
                                    <AnimatedStatValue value={value} suffix={suffix} />
                                    <div
                                        className="about-stat-label"
                                        style={{
                                            fontSize: "12px",
                                            color: "#677383",
                                            marginTop: "8px",
                                            letterSpacing: "0.05em",
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="about-direction" style={{ padding: "100px 0", background: "#1e1038" }}>
                <div style={wrap}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "65px",
                            marginTop: "0",
                        }}
                        className="about-split about-direction-grid"
                    >
                        <div className="about-direction-card">
                            <h2 style={{ ...serifH2, color: "white" }}>
                                Our{" "}
                                <em style={{ color: "#a49fe7", fontStyle: "italic" }}>
                                    Mission.
                                </em>
                            </h2>
                            <p style={{ fontSize: "17px", lineHeight: 1.8, color: "#c5c0e8", marginBottom: "24px" }}>
                                We help African businesses navigate registration and compliance with clear advice and practical support.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px" }}>
                                {[
                                    "Simplify compliance processes",
                                    "Enable sustainable growth",
                                    "Foster innovation ecosystem",
                                ].map((item) => (
                                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#c5c0e8" }}>
                                        <span aria-hidden="true" style={{ color: "#a49fe7", fontSize: "18px" }}>•</span>{" "}{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="about-direction-card">
                            <h2 style={{ ...serifH2, color: "white" }}>
                                Our{" "}
                                <em style={{ color: "#a49fe7", fontStyle: "italic" }}>
                                    Vision.
                                </em>
                            </h2>
                            <p style={{ fontSize: "17px", lineHeight: 1.8, color: "#c5c0e8", marginBottom: "24px" }}>
                                An Africa where compliance helps businesses grow instead of holding them back.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px" }}>
                                {[
                                    "Leading advisory excellence",
                                    "Continental market leadership",
                                    "Transformative impact",
                                ].map((item) => (
                                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#c5c0e8" }}>
                                        <span aria-hidden="true" style={{ color: "#a49fe7", fontSize: "18px" }}>•</span>{" "}{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA band */}
            <section className="about-cta" style={{ padding: "85px 0", background: "white" }}>
                <div
                    style={{
                        ...wrap,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "65px",
                        alignItems: "center",
                    }}
                    className="about-split about-cta-grid"
                >
                    <div>
                        <div style={{ ...eyebrow, color: "#4b4ba3" }}>
                            The Next Conversation
                        </div>
                        <h2
                            style={{
                                ...serifH2,
                                color: "#142338",
                                margin: "16px 0 0",
                            }}
                        >
                            Ready to Transform{" "}
                            <em
                                style={{
                                    color: "#4b4ba3",
                                    fontStyle: "italic",
                                }}
                            >
                                Your Startup?
                            </em>
                        </h2>
                    </div>
                    <div>
                        <p
                            style={{
                                fontSize: "19px",
                                lineHeight: 1.8,
                                color: "#536376",
                                marginBottom: "32px",
                            }}
                        >
                            Join hundreds of African startups who trust
                            Mustarred for their compliance needs.
                        </p>
                        <AboutResourcesCta
                            onContact={() =>
                                openModal("Talk to Our Team", "Get in touch with our team to discuss your compliance needs.")
                            }
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
