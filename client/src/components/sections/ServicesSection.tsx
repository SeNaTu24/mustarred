import { services } from "@/data/services";
import { useState, useEffect, useRef } from "react";

export default function ServicesSection() {
    const [visibleItems, setVisibleItems] = useState(new Set());
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const images = ["/assets/images/datapro.avif", "/assets/images/privacyprogram.avif", "/compliance.webp", "/assets/images/startupadvisory.avif", "/assets/images/cybersecurity.avif", "/research.jpg"];


    useEffect(() => {
        const observers = itemRefs.current.map((ref, index) => {
            if (!ref) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => new Set([...prev, index]));
                    }
                },
                { threshold: 0.3 }
            );

            observer.observe(ref);
            return observer;
        });

        return () => {
            observers.forEach((observer) => observer?.disconnect());
        };
    }, []);

    return (
        <section id="services" className="py-6 md:py-8 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-6">
                    <h2
                        className="font-heading mb-3 md:mb-4 text-xs sm:text-sm md:text-base font-bold text-black"
                    >
                        HOW WE HELP OUR CLIENTS
                    </h2>
                    <div className="max-w-4xl mx-auto px-4">
                        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
                            Let our experts hand-hold you through your tests and
                            triumphs.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {services.slice(0, 6).map((service, i) => (
                        <div
                            key={i}
                            ref={(el) => { if (el) itemRefs.current[i] = el; }}
                            className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center ${
                                visibleItems.has(i)
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            <div className="h-48 overflow-hidden rounded-lg mb-6">
                                <img
                                    src={images[i]}
                                    alt={service.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {service.name}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {service.description}
                            </p>
                            <button
                                onClick={() => window.location.href = '/services'}
                                className="text-[#4b4ba3] font-semibold hover:underline min-h-[44px] py-2 touch-manipulation"
                            >
                                Learn More →
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="text-center">
                    <button
                        onClick={() => window.location.href = '/services'}
                        className="bg-[#4b4ba3] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#3a3a8a] transition-colors w-full sm:w-auto min-h-[48px] touch-manipulation"
                    >
                        View All Services
                    </button>
                </div>

                {/* Second row of cards removed as requested */}
            </div>
        </section>
    );
}
