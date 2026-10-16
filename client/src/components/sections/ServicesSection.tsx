import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services } from "@/data/services";

const serviceImages = [
    "/assets/images/datapro.avif",
    "/assets/images/privacyprogram.avif",
    "/compliance.webp",
    "/assets/images/startupadvisory.avif",
    "/assets/images/cybersecurity.avif",
    "/research.jpg",
];

export default function ServicesSection() {
    const featuredServices = services.slice(0, 6);

    return (
        <section id="services" className="bg-white py-20 sm:py-24 md:py-32">
            <div className="mx-auto max-w-screen-xl px-6 md:px-8">
                <div className="mb-12 flex flex-col items-center text-center md:mb-16">
                    <div className="w-full">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#4b4ba3] sm:text-sm">
                            HOW WE HELP OUR CLIENTS
                        </p>
                        <h2 className="mx-auto max-w-3xl text-balance text-3xl font-medium leading-tight text-gray-900 sm:text-4xl md:text-5xl">
                            Let our experts hand-hold you through your tests and triumphs.
                        </h2>
                    </div>
                </div>

                <Tabs
                    defaultValue="service-0"
                    orientation="vertical"
                    className="grid overflow-hidden border border-gray-200 bg-white md:grid-cols-[minmax(250px,0.9fr)_minmax(0,1.4fr)]"
                >
                    <TabsList
                        aria-label="Our services"
                        className="flex h-auto w-full flex-col items-stretch justify-start rounded-none bg-white p-0 text-left"
                    >
                        {featuredServices.map((service, index) => (
                            <TabsTrigger
                                key={service.name}
                                value={`service-${index}`}
                                className="relative flex min-h-[58px] w-full items-center justify-between gap-4 rounded-none border-b border-l-4 border-l-transparent border-gray-200 px-5 py-4 text-left text-sm font-semibold text-gray-800 shadow-none transition-colors hover:bg-gray-50 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4b4ba3] data-[state=active]:border-l-[#79aeb4] data-[state=active]:bg-[#e8f1f2] data-[state=active]:text-gray-900 data-[state=active]:shadow-none sm:text-base"
                            >
                                <span>{service.name}</span>
                                <span aria-hidden="true" className="shrink-0 text-base">↗</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {featuredServices.map((service, index) => (
                        <TabsContent
                            key={service.name}
                            value={`service-${index}`}
                            className="m-0 min-w-0 bg-[#e8f1f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4b4ba3]"
                        >
                            <div className="grid h-full min-h-[480px] grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(200px,0.85fr)]">
                                <div className="flex flex-col items-start justify-center p-6 sm:p-8 md:p-10">
                                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-[#4b4ba3]">
                                        {service.name}
                                    </p>
                                    <h3 className="mb-4 max-w-lg text-2xl font-medium leading-tight text-gray-900 sm:text-3xl md:text-4xl">
                                        {service.name}
                                    </h3>
                                    <p className="mb-6 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
                                        {service.description}
                                    </p>
                                    <a
                                        href="/services"
                                        className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#4b4ba3] transition-colors hover:text-[#3a3a8a] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4b4ba3] focus-visible:ring-offset-2"
                                    >
                                        Learn More <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                                <div className="min-h-[220px] p-4 pt-0 sm:min-h-0 sm:p-4 sm:pl-0">
                                    <img
                                        src={serviceImages[index]}
                                        alt={service.name}
                                        className="h-full min-h-[220px] w-full object-cover sm:min-h-[320px]"
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

                <div className="mt-8 text-center">
                    <a
                        href="/services"
                        className="inline-flex min-h-[48px] w-full items-center justify-center bg-[#4b4ba3] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#3a3a8a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4b4ba3] focus-visible:ring-offset-2 sm:w-auto sm:px-8"
                    >
                        View All Services
                    </a>
                </div>
            </div>
        </section>
    );
}
