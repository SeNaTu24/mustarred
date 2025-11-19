import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";
import { useState, useEffect, useRef } from "react";

export default function ServicesSection() {
    const [visibleItems, setVisibleItems] = useState(new Set());
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const smallerTitleServices = new Set([
        "Data Protection and Security",
        "Regulatory Compliance and Licensing",
        "Corporate Governance & IP",
        "Transaction Advisory",
    ]);
    const images = ["/compliance2.webp", "/security1.jpg", "/research1.jpg"];

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 items-stretch">
                    {services.slice(0, 3).map((service, i) => (
                        <div
                            key={i}
                            ref={(el) => (itemRefs.current[i] = el)}
                            className={`relative transition-all duration-700 ease-out w-full flex flex-col items-stretch bg-white ${
                                visibleItems.has(i)
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            } ${
                                hoveredItem === i
                                    ? "shadow-[0_0_0_4px_#FFD7004D]"
                                    : "shadow-none"
                            }`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                            onMouseEnter={() => setHoveredItem(i)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div
                                className="w-full overflow-hidden"
                                style={{ height: "18rem" }}
                            >
                                <img
                                    src={images[i]}
                                    alt={service.name}
                                    className="object-cover w-full h-full block"
                                />
                            </div>
                            <div className={`p-4`}>
                                <h3
                                    className={`mb-1 text-[24px] leading-[28px] font-bold tracking-normal`}
                                >
                                    {service.name}
                                </h3>
                                <p className={`leading-normal text-[20px]`}>
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Second row of cards removed as requested */}
            </div>
        </section>
    );
}
