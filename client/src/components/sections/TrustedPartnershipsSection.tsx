import WhyChooseUsCarousel from "./WhyChooseUsCarousel";
import "./TrustedPartnershipsSection.css";

interface Partner {
  name: string;
  src: string;
  alt: string;
  href?: string;
  className?: string;
}

const PARTNERS: readonly Partner[] = [
  {
    name: "VASPA",
    src: "/assets/icons/vaspa.png",
    alt: "VASPA - Mustarred partner",
    className: "trust-partners__logo--vaspa",
  },
  {
    name: "Iwajoo",
    src: "/assets/icons/iwajoo.png",
    alt: "Iwajoo - Mustarred partner",
    className: "trust-partners__logo--iwajoo",
  },
  {
    name: "Legal Tech Bro",
    src: "/assets/icons/legaltechbro.png",
    alt: "Legal Tech Bro - Mustarred partner",
    className: "trust-partners__logo--ltb",
  },
  {
    name: "PECB",
    src: "/assets/icons/pecb-slogan-bottom-logo-800.png",
    alt: "PECB - Mustarred certified training partner",
    href: "https://pecb.com/en",
    className: "trust-partners__logo--pecb",
  },
];

// Repeating the list so the seamless marquee has plenty of width across all screens
const DISPLAY_PARTNERS = [...PARTNERS, ...PARTNERS];

export default function TrustedPartnershipsSection() {
  return (
    <section
      className="trust-partners-section"
      aria-labelledby="trusted-organizations-heading"
    >
      {/* Decorative ambient background curves matching mockup */}
      <div className="trust-partners__bg-curve trust-partners__bg-curve--left" aria-hidden="true">
        <svg viewBox="0 0 400 600" fill="none" preserveAspectRatio="none">
          <path
            d="M-50,0 C150,150 120,400 -50,600 L-100,600 L-100,0 Z"
            fill="rgba(215, 203, 248, 0.28)"
          />
        </svg>
      </div>
      <div className="trust-partners__bg-curve trust-partners__bg-curve--right" aria-hidden="true">
        <svg viewBox="0 0 400 600" fill="none" preserveAspectRatio="none">
          <path
            d="M450,0 C250,180 280,420 450,600 L500,600 L500,0 Z"
            fill="rgba(215, 203, 248, 0.28)"
          />
        </svg>
      </div>

      <div className="trust-partners__inner">
        {/* 1. Trusted Organizations Header */}
        <div className="trust-partners__header">
          <h2 id="trusted-organizations-heading" className="trust-partners__heading">
            We are trusted by <em>leading organizations</em>
          </h2>
          <p className="trust-partners__lede">
            Organizations across Africa rely on our expertise to strengthen compliance,
            data protection, and business readiness.
          </p>
        </div>

        {/* 2. Interactive 3D Client Logo Carousel */}
        <div className="trust-partners__carousel-wrap">
          <WhyChooseUsCarousel />
          <div className="trust-partners__help-link-wrap">
            <a href="/services" className="trust-partners__help-link">
              See How We Help <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* 3. Partnerships Area with Freely Moving Horizontal Marquee (No Container Box) */}
        <div className="trust-partners__partnerships" aria-labelledby="partnerships-heading">
          <div className="trust-partners__partnerships-header">
            <h3 id="partnerships-heading" className="trust-partners__partnerships-title">
              Partnerships
            </h3>
            <p className="trust-partners__partnerships-subtitle">
              Building stronger ecosystems together
            </p>
          </div>

          {/* Freely moving partner logos directly against the soft lavender background */}
          <div
            className="trust-partners__marquee"
            role="region"
            aria-label="Partner organization logos. Hover or focus to pause animation."
            tabIndex={0}
          >
            <div className="trust-partners__marquee-viewport">
              <div className="trust-partners__marquee-content">
                {/* Primary accessible list */}
                <ul className="trust-partners__marquee-group" aria-label="Partner logos">
                  {DISPLAY_PARTNERS.map((partner, index) => (
                    <li key={`p1-${partner.name}-${index}`} className="trust-partners__partner-item">
                      {partner.href ? (
                        <a
                          href={partner.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="trust-partners__partner-link"
                          aria-label={`${partner.name} - ${partner.alt}`}
                        >
                          <img
                            src={partner.src}
                            alt=""
                            className={`trust-partners__partner-logo ${partner.className || ""}`}
                            loading="lazy"
                          />
                        </a>
                      ) : (
                        <img
                          src={partner.src}
                          alt={partner.alt}
                          className={`trust-partners__partner-logo ${partner.className || ""}`}
                          loading="lazy"
                        />
                      )}
                    </li>
                  ))}
                </ul>

                {/* Duplicate decorative list for seamless infinite loop (hidden from screen readers) */}
                <ul className="trust-partners__marquee-group" aria-hidden="true">
                  {DISPLAY_PARTNERS.map((partner, index) => (
                    <li key={`p2-${partner.name}-${index}`} className="trust-partners__partner-item">
                      {partner.href ? (
                        <span className="trust-partners__partner-link">
                          <img
                            src={partner.src}
                            alt=""
                            className={`trust-partners__partner-logo ${partner.className || ""}`}
                            loading="lazy"
                          />
                        </span>
                      ) : (
                        <img
                          src={partner.src}
                          alt=""
                          className={`trust-partners__partner-logo ${partner.className || ""}`}
                          loading="lazy"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
