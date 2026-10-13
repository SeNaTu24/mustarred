import { ArrowRight, Check } from "lucide-react";
import type { ServiceOffering } from "@/data/servicesPage";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface ServicesCatalogProps {
    offerings: ServiceOffering[];
    onContact: (service: ServiceOffering) => void;
}

function ServiceCard({ service, index, imageFirst, onContact }: {
    service: ServiceOffering;
    index: number;
    imageFirst: boolean;
    onContact: (s: ServiceOffering) => void;
}) {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const Icon = service.icon;

    return (
        <article
            ref={ref}
            id={service.slug}
            className="grid scroll-mt-28 gap-7 py-10 first:pt-0 last:pb-0 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : `translateX(${imageFirst ? "60px" : "-60px"})`,
                transition: `opacity 0.6s ease, transform 0.6s ease`,
            }}
        >
            <div className={`relative min-w-0 overflow-hidden bg-[#e8f1f2] ${imageFirst ? "md:order-2" : ""}`}>
                <img
                    src={service.image}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#4b4ba3] shadow-sm sm:left-5 sm:top-5">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
            </div>

            <div className={`min-w-0 ${imageFirst ? "md:order-1" : ""}`}>
                <h3 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-3xl">{service.name}</h3>
                <p className="mb-3 text-base font-medium text-gray-800">{service.shortDesc}</p>
                <p className="mb-7 text-sm leading-relaxed text-gray-600 sm:text-base">{service.fullDesc}</p>

                <div className="grid gap-7 sm:grid-cols-2">
                    <div>
                        <h4 className="mb-3 text-sm font-semibold text-gray-900">What's included</h4>
                        <ul className="space-y-2.5">
                            {service.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm leading-relaxed text-gray-600">
                                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#4b4ba3]" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-3 text-sm font-semibold text-gray-900">Typical steps</h4>
                        <ol className="space-y-2.5">
                            {service.process.map((step, stepIndex) => (
                                <li key={step} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f1f2] text-[10px] font-bold text-[#4b4ba3]">{stepIndex + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <Button
                    onClick={() => onContact(service)}
                    className="mt-7 min-h-11 bg-[#4b4ba3] px-5 text-white hover:bg-[#3a3a8a]"
                >
                    Talk to an expert <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </article>
    );
}

export default function ServicesCatalog({ offerings, onContact }: ServicesCatalogProps) {
    return (
        <section id="services-catalogue" aria-labelledby="services-heading" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 max-w-3xl sm:mb-16">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#4b4ba3] sm:text-sm">Our capabilities</p>
                    <h2 id="services-heading" className="mb-4 text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">Services built around the work ahead</h2>
                    <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">Explore the scope, included support, and typical steps for each service.</p>
                </div>

                <div className="divide-y divide-gray-200">
                    {offerings.map((service, index) => (
                        <ServiceCard
                            key={service.slug}
                            service={service}
                            index={index}
                            imageFirst={index % 2 === 1}
                            onContact={onContact}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
