import { useState, useCallback, useEffect } from "react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import "./TestimonialsSection.css";

function QuoteGlyph({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 19.2C0 8.6 7.4 1.4 16.6 0l2.2 4.2C12.4 5.6 9 9.6 8.6 14.8c1.6-.6 3.4-.8 5.2-.4 4.8 1 8.2 5.2 8.2 10.4 0 5.8-4.6 10.4-10.4 10.4C5.2 35.2 0 28 0 19.2zm21.8 0c0-10.6 7.4-17.8 16.6-19.2l2.2 4.2c-6.4 1.4-9.8 5.4-10.2 10.6 1.6-.6 3.4-.8 5.2-.4 4.8 1 8.2 5.2 8.2 10.4 0 5.8-4.6 10.4-10.4 10.4-6.4 0-11.6-7.2-11.6-16z" />
    </svg>
  );
}

function SwooshUnderline() {
  return (
    <svg
      className="mt-3.5 h-3 w-28 text-[#7B42F6]"
      viewBox="0 0 110 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 10.5C30 3.5 75 3 108 10"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClientBadge({
  testimonial,
  size = "md",
}: {
  testimonial: Testimonial;
  size?: "sm" | "md" | "lg" | "featured";
}) {
  const isFeatured = size === "featured" || size === "lg";

  const sizeClasses = {
    sm: "w-11 h-11 rounded-[12px] p-2",
    md: "w-12 h-12 rounded-[14px] p-2.5",
    lg: "w-28 h-28 sm:w-32 sm:h-32 rounded-[22px] sm:rounded-[26px] p-3.5 sm:p-4",
    featured:
      "w-28 h-28 sm:w-32 sm:h-32 rounded-[22px] sm:rounded-[26px] p-3.5 sm:p-4",
  }[size];

  return (
    <div
      className={`${sizeClasses} flex flex-shrink-0 items-center justify-center bg-white ${
        isFeatured
          ? "shadow-[0_14px_32px_rgba(8,3,24,0.45)] border border-white/20"
          : "shadow-sm"
      }`}
    >
      {testimonial.logo ? (
        <img
          src={testimonial.logo}
          alt={`${testimonial.author} logo`}
          className="max-h-full max-w-full object-contain select-none"
          loading="lazy"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center ${
            isFeatured ? "rounded-[16px] sm:rounded-[20px]" : "rounded-lg"
          } bg-gradient-to-tr from-[#4323A0] to-[#7B42F6] font-bold text-white shadow-inner`}
        >
          <span className={isFeatured ? "text-4xl sm:text-5xl" : "text-base"}>
            {testimonial.author.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const total = testimonials.length;
  const featured = testimonials[activeIndex];

  // Supporting cards: the other 2 testimonials in circular order
  const supporting = [
    testimonials[(activeIndex + 1) % total],
    testimonials[(activeIndex + 2) % total],
  ];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleSelect = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  // Keyboard navigation for accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  // Monitor tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.visibilityState === "hidden");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Monitor prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
      return () => mediaQuery.removeEventListener("change", handleMotionChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMotionChange);
      return () => mediaQuery.removeListener(handleMotionChange);
    }
  }, []);

  // 6-second automatic switcher (restarts automatically on activeIndex change)
  useEffect(() => {
    if (isPaused || isTabHidden || prefersReducedMotion) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, isTabHidden, prefersReducedMotion, total]);

  return (
    <section
      id="testimonials"
      className="home-testimonials-section py-16 sm:py-20 md:py-24 lg:py-28"
      aria-label="Client stories"
    >
      <div className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-7 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-12 lg:mb-14">
          <p className="mb-4 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[#BBA5F8] sm:text-sm">
            <span
              className="h-px w-8 bg-[#7B42F6] opacity-80 sm:w-10"
              aria-hidden="true"
            />
            CLIENT STORIES
            <span
              className="h-px w-8 bg-[#7B42F6] opacity-80 sm:w-10"
              aria-hidden="true"
            />
          </p>
          <h2 className="mx-auto max-w-4xl font-serif text-[clamp(2rem,3.8vw,3.25rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
            Trusted by businesses{" "}
            <em className="font-serif font-normal italic text-[#C09DFC]">
              building in Africa.
            </em>
          </h2>
          <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-sm leading-relaxed text-[#C4BCD7] sm:text-base md:text-lg">
            Hear from organisations we’ve supported with compliance, data
            protection, and security at different stages of their growth.
          </p>
        </div>

        {/* Carousel Region with Pause on Hover / Focus */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setIsPaused(false);
            }
          }}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C52FF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d0724] rounded-2xl"
        >
          {/* Testimonials Grid: Asymmetric 60/40 Split on Desktop */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.48fr_1fr] lg:gap-7 xl:gap-8">
            {/* Left: Featured Testimonial Card */}
            <div
              className="home-testimonials-card home-testimonials-featured flex flex-col justify-between overflow-hidden p-6 sm:p-8 lg:p-10"
              data-testid={`card-testimonial-featured-${activeIndex}`}
            >
              <div
                key={`featured-content-${activeIndex}`}
                className="home-testimonials-fade-transition grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1.25fr)_minmax(200px,0.95fr)] sm:gap-7 lg:gap-8 items-stretch"
              >
                {/* Quote column */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="text-[#7B42F6] mb-4 sm:mb-5">
                      <QuoteGlyph className="w-9 h-9 sm:w-11 sm:h-11 text-[#7B42F6]" />
                    </div>
                    <blockquote className="font-serif text-lg sm:text-xl lg:text-[1.65rem] font-semibold leading-[1.35] tracking-[-0.015em] text-white">
                      “{featured.quote}”
                    </blockquote>
                    <SwooshUnderline />
                  </div>

                  {/* Client Attribution */}
                  <div className="mt-8 flex items-center gap-4">
                    <ClientBadge testimonial={featured} size="md" />
                    <div>
                      <p className="text-base font-bold text-white sm:text-lg leading-tight">
                        {featured.author}
                      </p>
                      <p className="mt-1 text-xs text-[#AFA7C9] sm:text-sm">
                        {featured.position}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Decorative Composition: Stationary Rings, Centered Upright Logo, Service Badge */}
                <div className="home-testimonials-featured-visual relative min-h-[260px] sm:min-h-[340px] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  {/* Stationary ambient glowing rings */}
                  <div
                    className="home-testimonials-ambient-rings pointer-events-none absolute inset-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="h-56 w-56 sm:h-64 sm:w-64 rounded-full border border-[rgba(168,120,255,0.14)]" />
                    <div className="absolute h-40 w-40 sm:h-48 sm:w-48 rounded-full border border-[rgba(168,120,255,0.18)]" />
                    <div className="absolute h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-[radial-gradient(circle,rgba(123,66,246,0.35)_0%,transparent_70%)]" />
                  </div>

                  {/* Centered Showcase: Stationary Upright Logo Tile + Service Badge */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Centered Upright Stationary Logo Tile (No Rotation) */}
                    <div className="home-testimonials-tile-display">
                      <ClientBadge testimonial={featured} size="featured" />
                    </div>

                    {/* Prominent Service Badge */}
                    {featured.badgeLabel && (
                      <div className="home-testimonials-service-badge">
                        <span
                          className="home-testimonials-service-badge-dot"
                          aria-hidden="true"
                        />
                        <span>{featured.badgeLabel}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Supporting Testimonial Cards Stack */}
            <div className="flex flex-col gap-6 lg:gap-7 justify-between">
              {supporting.map((item, idx) => (
                <div
                  key={`supporting-${item.author}-${activeIndex}`}
                  className="home-testimonials-card home-testimonials-supporting home-testimonials-fade-transition flex flex-1 flex-col justify-between p-6 sm:p-7"
                  data-testid={`card-testimonial-supporting-${idx}`}
                >
                  <div>
                    <div className="text-[#7B42F6] mb-3">
                      <QuoteGlyph className="w-7 h-7 text-[#7B42F6]" />
                    </div>
                    <blockquote className="text-sm sm:text-base leading-relaxed text-[#F1EDF8]">
                      “{item.quote}”
                    </blockquote>
                  </div>

                  <div className="mt-6 flex items-center gap-3.5 pt-4 border-t border-[rgba(168,120,255,0.14)]">
                    <ClientBadge testimonial={item} size="sm" />
                    <div>
                      <p className="text-sm font-bold text-white sm:text-base leading-tight">
                        {item.author}
                      </p>
                      <p className="mt-0.5 text-xs text-[#AFA7C9]">
                        {item.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Footer: Centered Pagination Dots (Arrow buttons removed) */}
          <div className="mt-10 sm:mt-12 flex items-center justify-center">
            <div
              className="flex items-center gap-2.5"
              role="tablist"
              aria-label="Testimonial navigation"
            >
              {testimonials.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.author}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show testimonial ${idx + 1} of ${total}: ${item.author}`}
                    onClick={() => handleSelect(idx)}
                    className={`home-testimonials-dot focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D68FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0724] ${
                      isActive
                        ? "h-2.5 w-7 rounded-full bg-[#7B42F6] shadow-[0_0_12px_rgba(123,66,246,0.7)]"
                        : "h-2.5 w-2.5 rounded-full bg-[#37285C] hover:bg-[#6C35E8]"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
