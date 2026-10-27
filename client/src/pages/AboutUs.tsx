import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutResourcesCta from "@/components/sections/AboutResourcesCta";
import { useModal } from "@/contexts/ModalContext";

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
        <div className="min-h-screen" style={{backgroundColor: '#0d0520'}}>
            <Header />

            {/* Hero */}
            <section
                style={{
                    paddingTop: "220px",
                    paddingBottom: "180px",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage: "url(/assets/images/newimage.avif)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    animation: "heroFloat 12s ease-in-out infinite",
                }}
            >
                <div style={wrap}>
                    <div style={{ maxWidth: "820px" }}>
                    </div>
                </div>
            </section>

            {/* Story — split layout */}
            <section style={{ padding: "100px 0", background: "white" }}>
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
                        className="about-split"
                    >
                        <div>
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
                                Founded with a vision to democratize business
                                compliance across Africa, Mustarred emerged from
                                the recognition that regulatory complexity was
                                stifling innovation in the continent's most
                                promising startups.
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
                                Our founders, seasoned professionals with
                                decades of experience in African business
                                landscapes, witnessed countless brilliant ideas
                                fail not due to lack of merit, but due to
                                regulatory hurdles.
                            </p>
                            <p
                                style={{
                                    fontSize: "16px",
                                    lineHeight: 1.8,
                                    color: "#536376",
                                    maxWidth: "520px",
                                }}
                            >
                                Today, we stand as the bridge between ambitious
                                entrepreneurs and the complex world of
                                compliance, turning obstacles into
                                opportunities.
                            </p>
                        </div>

                        {/* Stats grid */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "2px",
                                background: "#e8e8f0",
                            }}
                        >
                            {[
                                { stat: "500+", label: "Startups Guided" },
                                { stat: "15+", label: "African Countries" },
                                { stat: "98%", label: "Success Rate" },
                                { stat: "24/7", label: "Support" },
                            ].map(({ stat, label }) => (
                                <div
                                    key={label}
                                    style={{
                                        background: "white",
                                        padding: "28px 24px",
                                        textAlign: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: "Georgia, serif",
                                            fontSize: "clamp(28px, 3vw, 42px)",
                                            fontWeight: 400,
                                            color: "#4b4ba3",
                                            letterSpacing: "-0.03em",
                                            lineHeight: 1,
                                        }}
                                    >
                                        {stat}
                                    </div>
                                    <div
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

            {/* What Guides Us */}
            <section style={{ padding: "100px 0", background: "#f7f6f2" }}>
                <div style={wrap}>
                    <div style={eyebrow}>What Guides Us</div>
                    <h2 style={{ ...serifH2, color: "#142338" }}>
                        The principles behind our work.
                    </h2>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "16px",
                        }}
                        className="about-grid"
                    >
                        {[
                            {
                                symbol: "✳",
                                title: "Integrity",
                                body: "We maintain the highest ethical standards in all our advisory services, ensuring transparent and honest guidance for every client.",
                            },
                            {
                                symbol: "◇",
                                title: "Innovation",
                                body: "We continuously evolve our methodologies to stay ahead of regulatory changes and provide cutting-edge compliance solutions.",
                            },
                            {
                                symbol: "",
                                title: "Pan-African Focus",
                                body: "Deep understanding of diverse African markets enables us to provide contextually relevant advice across the continent.",
                            },
                        ].map(({ symbol, title, body }, i) => (
                            <div
                                key={title}
                                className="about-card"
                                style={{
                                    background: "white",
                                    border: "1px solid #e1e4e6",
                                    padding: "30px",
                                    minHeight: "250px",
                                    transition:
                                        "transform .2s, border-color .2s",
                                    animationDelay: `${i * 150}ms`,
                                }}
                                onMouseEnter={(e) => {
                                    (
                                        e.currentTarget as HTMLDivElement
                                    ).style.transform = "translateY(-4px)";
                                    (
                                        e.currentTarget as HTMLDivElement
                                    ).style.borderColor = "#a49fe7";
                                }}
                                onMouseLeave={(e) => {
                                    (
                                        e.currentTarget as HTMLDivElement
                                    ).style.transform = "";
                                    (
                                        e.currentTarget as HTMLDivElement
                                    ).style.borderColor = "#e1e4e6";
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "30px",
                                        color: "#7b6fc4",
                                        marginBottom: "16px",
                                    }}
                                >
                                    {symbol}
                                </div>
                                <h3
                                    style={{
                                        fontFamily: "Georgia, serif",
                                        fontWeight: 400,
                                        fontSize: "22px",
                                        letterSpacing: "-0.03em",
                                        color: "#142338",
                                        margin: "0 0 12px",
                                    }}
                                >
                                    {title}
                                </h3>
                                <p
                                    style={{
                                        color: "#627184",
                                        lineHeight: 1.7,
                                        fontSize: "14px",
                                        margin: 0,
                                    }}
                                >
                                    {body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section style={{ padding: "100px 0", background: "#1e1038" }}>
                <div style={wrap}>
                    <div style={{ ...eyebrow, color: "#a49fe7" }}>Our Direction</div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "65px",
                            marginTop: "0",
                        }}
                        className="about-split"
                    >
                        <div>
                            <h2 style={{ ...serifH2, color: "white" }}>
                                Our{" "}
                                <em style={{ color: "#a49fe7", fontStyle: "italic" }}>
                                    Mission.
                                </em>
                            </h2>
                            <p style={{ fontSize: "17px", lineHeight: 1.8, color: "#c5c0e8", marginBottom: "24px" }}>
                                To empower African startups by simplifying
                                complex regulatory landscapes, enabling
                                entrepreneurs to focus on innovation while
                                maintaining excellence in governance.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px" }}>
                                {[
                                    "Simplify compliance processes",
                                    "Enable sustainable growth",
                                    "Foster innovation ecosystem",
                                ].map((item) => (
                                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#c5c0e8" }}>
                                        <span style={{ color: "#a49fe7", fontSize: "18px" }}>→</span>{" "}{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 style={{ ...serifH2, color: "white" }}>
                                Our{" "}
                                <em style={{ color: "#a49fe7", fontStyle: "italic" }}>
                                    Vision.
                                </em>
                            </h2>
                            <p style={{ fontSize: "17px", lineHeight: 1.8, color: "#c5c0e8", marginBottom: "24px" }}>
                                To be Africa's premier business advisory firm,
                                creating an ecosystem where compliance becomes a
                                competitive advantage for startups across the
                                continent.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px" }}>
                                {[
                                    "Leading advisory excellence",
                                    "Continental market leadership",
                                    "Transformative impact",
                                ].map((item) => (
                                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#c5c0e8" }}>
                                        <span style={{ color: "#a49fe7", fontSize: "18px" }}>→</span>{" "}{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA band */}
            <section style={{ padding: "85px 0", background: "white" }}>
                <div
                    style={{
                        ...wrap,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "65px",
                        alignItems: "center",
                    }}
                    className="about-split"
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

            <style>{`
                @keyframes heroFloat {
                    0%   { background-position: center center; }
                    25%  { background-position: 52% 48%; }
                    50%  { background-position: center 52%; }
                    75%  { background-position: 48% 50%; }
                    100% { background-position: center center; }
                }
                @media (max-width: 760px) {
                    .about-split { grid-template-columns: 1fr !important; gap: 40px !important; }
                    .about-grid { grid-template-columns: 1fr !important; }
                }
                @keyframes card-fade-up {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .about-card {
                    opacity: 0;
                    animation: card-fade-up 0.5s ease forwards;
                }
            `}</style>
        </div>
    );
}
