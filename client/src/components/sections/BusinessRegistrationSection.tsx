import { Globe } from "lucide-react";
import { Link } from "wouter";
import { useModal } from "@/contexts/ModalContext";
import "./BusinessRegistrationSection.css";

// Accurate vector SVG national flags
function NigeriaFlag() {
  return (
    <svg viewBox="0 0 36 26" className="home-registration__flag" aria-hidden="true">
      <defs>
        <clipPath id="flag-clip-ng">
          <rect width="36" height="26" rx="6" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-clip-ng)">
        <rect width="12" height="26" fill="#008751" />
        <rect x="12" width="12" height="26" fill="#FFFFFF" />
        <rect x="24" width="12" height="26" fill="#008751" />
      </g>
    </svg>
  );
}

function GhanaFlag() {
  return (
    <svg viewBox="0 0 36 26" className="home-registration__flag" aria-hidden="true">
      <defs>
        <clipPath id="flag-clip-gh">
          <rect width="36" height="26" rx="6" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-clip-gh)">
        <rect width="36" height="8.67" fill="#EF3340" />
        <rect y="8.67" width="36" height="8.66" fill="#FFD100" />
        <rect y="17.33" width="36" height="8.67" fill="#009739" />
        {/* Black 5-pointed star centered at (18, 13) */}
        <polygon
          points="18,9.5 19.3,12.2 22.3,12.4 20,14.4 20.7,17.3 18,15.7 15.3,17.3 16,14.4 13.7,12.4 16.7,12.2"
          fill="#000000"
        />
      </g>
    </svg>
  );
}

function KenyaFlag() {
  return (
    <svg viewBox="0 0 36 26" className="home-registration__flag" aria-hidden="true">
      <defs>
        <clipPath id="flag-clip-ke">
          <rect width="36" height="26" rx="6" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-clip-ke)">
        <rect width="36" height="7.5" fill="#000000" />
        <rect y="7.5" width="36" height="1.5" fill="#FFFFFF" />
        <rect y="9" width="36" height="8" fill="#BB0000" />
        <rect y="17" width="36" height="1.5" fill="#FFFFFF" />
        <rect y="18.5" width="36" height="7.5" fill="#006600" />
        {/* Maasai shield and spears */}
        <line x1="12" y1="6" x2="24" y2="20" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="24" y1="6" x2="12" y2="20" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="18" cy="13" rx="3.5" ry="7" fill="#BB0000" stroke="#000000" strokeWidth="0.8" />
        <ellipse cx="18" cy="13" rx="1.4" ry="7" fill="#FFFFFF" />
        <circle cx="18" cy="13" r="1.1" fill="#000000" />
      </g>
    </svg>
  );
}

function CoteDIvoireFlag() {
  return (
    <svg viewBox="0 0 36 26" className="home-registration__flag" aria-hidden="true">
      <defs>
        <clipPath id="flag-clip-ci">
          <rect width="36" height="26" rx="6" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-clip-ci)">
        <rect width="12" height="26" fill="#FF8200" />
        <rect x="12" width="12" height="26" fill="#FFFFFF" />
        <rect x="24" width="12" height="26" fill="#009E60" />
      </g>
    </svg>
  );
}

// Flowing lavender background wave shape inside each card
function CardDecorativeShape() {
  return (
    <span className="home-registration__card-shape" aria-hidden="true">
      <svg viewBox="0 0 160 100" fill="none" preserveAspectRatio="none">
        <path d="M40 0 C75 35 110 65 160 85 L160 0 Z" fill="rgba(224, 216, 248, 0.4)" />
        <path d="M85 0 C110 30 135 55 160 70 L160 0 Z" fill="rgba(235, 228, 252, 0.3)" />
      </svg>
    </span>
  );
}

interface JurisdictionCard {
  id: string;
  name: string;
  tagline: string;
  href?: string;
  isConsultation?: boolean;
  flag: React.ReactNode;
}

const JURISDICTIONS: readonly JurisdictionCard[] = [
  {
    id: "nigeria",
    name: "Nigeria",
    tagline: "Register via CAC e-portal · Private Limited, Business Name & more",
    href: "/cac-registration?country=nigeria",
    flag: <NigeriaFlag />,
  },
  {
    id: "ghana",
    name: "Ghana",
    tagline: "Register via ORC · Companies Act, 2019 (Act 992)",
    href: "/cac-registration?country=ghana",
    flag: <GhanaFlag />,
  },
  {
    id: "kenya",
    name: "Kenya",
    tagline: "Register via BRS eCitizen · Business Registration Service",
    href: "/cac-registration?country=kenya",
    flag: <KenyaFlag />,
  },
  {
    id: "cote-divoire",
    name: "Côte d’Ivoire",
    tagline: "Register via GUCE · Company incorporation (SARL, SA) & related services",
    isConsultation: true,
    flag: <CoteDIvoireFlag />,
  },
];

export default function BusinessRegistrationSection() {
  const { openModal } = useModal();

  return (
    <section className="home-registration" aria-labelledby="business-registration-heading">
      <div className="home-registration__inner">
        {/* 
          Official illustrated globe image placed prominently on the right, 
          extending from the header area down behind the upper cards 
        */}
        <div className="home-registration__art" aria-hidden="true">
          <img
            src="/assets/images/registration-globe.png"
            alt=""
            className="home-registration__globe-img"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Header area with heading and lede */}
        <div className="home-registration__header">
          <div className="home-registration__copy">
            <h2 id="business-registration-heading">
              Register your business across <span>Africa &amp; beyond.</span>
            </h2>
            <p className="home-registration__lede">
              From company incorporation to regulatory requirements, we help businesses navigate registration across multiple jurisdictions.
            </p>
          </div>
        </div>

        {/* 2x2 Country Cards Grid */}
        <ul className="home-registration__grid">
          {JURISDICTIONS.map((country) => (
            <li key={country.id}>
              {country.isConsultation ? (
                <button
                  type="button"
                  className="home-registration__card home-registration__card--action"
                  onClick={() =>
                    openModal(
                      "Business Registration — Côte d’Ivoire",
                      "Get in touch with our team regarding company incorporation in Côte d’Ivoire via GUCE (SARL, SA & related services)."
                    )
                  }
                  aria-label={`${country.name} registration: ${country.tagline} (Speak with our team)`}
                >
                  <CardDecorativeShape />
                  <span className="home-registration__flag-wrap">
                    {country.flag}
                  </span>
                  <span className="home-registration__details">
                    <span className="home-registration__name">{country.name}</span>
                    <span className="home-registration__tagline">{country.tagline}</span>
                  </span>
                </button>
              ) : (
                <Link
                  href={country.href || "/cac-registration"}
                  className="home-registration__card"
                  aria-label={`${country.name} registration: ${country.tagline}`}
                >
                  <CardDecorativeShape />
                  <span className="home-registration__flag-wrap">
                    {country.flag}
                  </span>
                  <span className="home-registration__details">
                    <span className="home-registration__name">{country.name}</span>
                    <span className="home-registration__tagline">{country.tagline}</span>
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Bottom row: Other jurisdictions + Explore Registration */}
        <div className="home-registration__footer">
          <p className="home-registration__note">
            <Globe aria-hidden="true" />
            <span>
              Other jurisdictions?{" "}
              <button
                type="button"
                onClick={() =>
                  openModal(
                    "Other Jurisdictions",
                    "Tell us about the jurisdiction you're interested in registering your business in."
                  )
                }
              >
                Speak with our team.
              </button>
            </span>
          </p>
          <Link href="/cac-registration" className="home-registration__cta">
            Explore Registration
          </Link>
        </div>
      </div>
    </section>
  );
}
