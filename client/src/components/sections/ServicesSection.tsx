import {
  GraduationCap,
  ShieldCheck,
  Briefcase,
  TrendingUp,
  Lock,
  FileText,
  type LucideIcon,
} from "lucide-react";
import "./ServicesSection.css";

interface ServiceCardData {
  name: string;
  description: string;
  image: string;
  href: string;
  icon: LucideIcon;
}

const topRowServices: ServiceCardData[] = [
  {
    name: "Training for Data Protection & Privacy",
    description: "Build practical, in-demand data protection skills for your team.",
    image: "/assets/images/home-service-training.jpg",
    href: "/training",
    icon: GraduationCap,
  },
  {
    name: "Privacy Programme Implementation",
    description: "Design and implement a privacy programme that meets industry standards.",
    image: "/assets/images/home-service-privacy.jpg",
    href: "/services#privacy-programme",
    icon: ShieldCheck,
  },
];

const bottomRowServices: ServiceCardData[] = [
  {
    name: "Regulatory and Product Compliance",
    description: "Avoid compliance risks and bring products to market with confidence.",
    image: "/assets/images/home-service-compliance.jpg",
    href: "/services#regulatory-product-compliance",
    icon: Briefcase,
  },
  {
    name: "Startup Advisory",
    description: "Get the right regulatory, privacy, and governance support to grow and scale.",
    image: "/assets/images/home-service-startup.jpg",
    href: "/services#startup-advisory",
    icon: TrendingUp,
  },
  {
    name: "Cybersecurity Services",
    description: "Strengthen your security posture, reduce risk, and protect your business.",
    image: "/assets/images/home-service-cybersecurity.jpg",
    href: "/services#cybersecurity-services",
    icon: Lock,
  },
  {
    name: "Policy & Research Services",
    description: "Access expert research, policy analysis, and insights for better decisions.",
    image: "/assets/images/home-service-research.jpg",
    href: "/services#policy-research",
    icon: FileText,
  },
];

function ServicePanel({
  service,
  isLarge = false,
  priority = false,
}: {
  service: ServiceCardData;
  isLarge?: boolean;
  priority?: boolean;
}) {
  return (
    <a
      href={service.href}
      className={`home-service-panel group ${
        isLarge ? "home-service-panel--large" : "home-service-panel--small"
      }`}
      aria-label={`${service.name} - Explore Service`}
    >
      {/* Background Image */}
      <div className="home-service-panel__bg" aria-hidden="true">
        <img
          src={service.image}
          alt=""
          className="home-service-panel__img"
          loading={priority ? "eager" : "lazy"}
        />
      </div>

      {/* Dark midnight-purple gradient overlay */}
      <div className="home-service-panel__overlay" aria-hidden="true" />

      {/* Content */}
      <div className="home-service-panel__content">
        {/* Bottom: Text & Button */}
        <div className="home-service-panel__bottom">
          <h3
            className={`home-service-panel__title ${
              isLarge
                ? "home-service-panel__title--large"
                : "home-service-panel__title--small"
            }`}
          >
            {service.name}
          </h3>
          <p
            className={`home-service-panel__desc ${
              isLarge
                ? "home-service-panel__desc--large"
                : "home-service-panel__desc--small"
            }`}
          >
            {service.description}
          </p>
          <span className="home-service-panel__btn">
            Explore Service <span aria-hidden="true" className="home-service-panel__btn-arrow">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="home-services-section py-16 sm:py-20 md:py-24 lg:py-28"
      aria-labelledby="services-heading"
    >
      <div className="relative z-10 mx-auto max-w-[1380px] px-5 sm:px-7 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-12 lg:mb-14">
          <p className="mb-4 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-[#4B3FBC] sm:text-sm">
            <span className="h-px w-10 bg-[#6C35E8]" aria-hidden="true" />
            OUR SERVICES
            <span className="h-px w-10 bg-[#6C35E8]" aria-hidden="true" />
          </p>
          <h2
            id="services-heading"
            className="mx-auto max-w-6xl font-serif text-[clamp(2.1rem,4vw,3.25rem)] font-semibold leading-[1.14] tracking-[-0.03em] text-[#171322]"
          >
            Comprehensive services for{" "}
            <em className="font-serif font-normal italic text-[#6532D8]">African startups.</em>
          </h2>
          <p className="mx-auto mt-4 sm:mt-5 max-w-3xl text-sm leading-relaxed text-[#29243A] sm:text-base md:text-lg">
            Expert guidance across compliance, privacy, cybersecurity, and business advisory.
          </p>
        </div>

        {/* Mosaic Grid: Row 1 (2 Large Panels) */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-7 xl:mb-7">
          {topRowServices.map((service, index) => (
            <ServicePanel
              key={service.name}
              service={service}
              isLarge
              priority={index < 2}
            />
          ))}
        </div>

        {/* Mosaic Grid: Row 2 (4 Smaller Panels) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {bottomRowServices.map((service) => (
            <ServicePanel
              key={service.name}
              service={service}
              isLarge={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}