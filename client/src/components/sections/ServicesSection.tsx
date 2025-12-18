import { services } from "@/data/services";
import { useState, useEffect, useRef } from "react";

export default function ServicesSection() {
    const [visibleItems, setVisibleItems] = useState(new Set());
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const images = ["/compliance.webp", "/security.jpg", "/research.jpg"];


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
        <section id="services" className="py-8 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-6">
                    <h2
                        className="font-heading mb-4"
                        style={{
                            color: "black",
                            fontSize: "16px",
                            fontWeight: "bold",
                        }}
                    >
                        HOW WE HELP OUR CLIENTS
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-5xl text-black leading-tight">
                            Let our experts hand-hold you through your tests and
                            triumphs.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {services.slice(0, 3).map((service, i) => (
                        <div
                            key={i}
                            ref={(el) => (itemRefs.current[i] = el)}
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
                                className="text-[#4b4ba3] font-semibold hover:underline"
                            >
                                Learn More →
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="text-center">
                    <button
                        onClick={() => window.location.href = '/services'}
                        className="bg-[#4b4ba3] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#3a3a8a] transition-colors"
                    >
                        View All Services
                    </button>
                </div>

                {/* Second row of cards removed as requested */}
            </div>
        </section>
    );
}
