import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services } from "@/data/services";

const serviceImages = [
    "/assets/images/home-service-training.jpg",
    "/assets/images/home-service-privacy.jpg",
    "/assets/images/home-service-compliance.jpg",
    "/assets/images/home-service-startup.jpg",
    "/assets/images/home-service-cybersecurity.jpg",
    "/assets/images/home-service-research.jpg",
];

export default function ServicesSection() {
    const featuredServices = services.slice(0, 6);

    return (
        <section id="services" className="bg-white py-12 sm:py-14 md:py-16">
            <div className="mx-auto max-w-screen-xl px-6 md:px-8">
                <div className="mb-8 flex flex-col items-center text-center md:mb-10">
                    <div className="w-full">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#4B3FBC] sm:text-sm">
                            HOW WE HELP OUR CLIENTS
                        </p>
                        <h2 className="mx-auto max-w-3xl text-balance text-3xl font-semibold leading-tight text-[#171322] sm:text-4xl md:text-5xl">
                            Let our experts hand-hold you through your tests and triumphs.
                        </h2>
                    </div>
                </div>

                <Tabs
                    defaultValue="service-0"
                    orientation="vertical"
                    className="home-services-tabs grid overflow-hidden rounded-2xl border border-[#E7E3ED] bg-white md:grid-cols-[minmax(250px,0.9fr)_minmax(0,1.4fr)]"
                >
                    <TabsList
                        aria-label="Our services"
                        className="flex h-auto w-full flex-col items-stretch justify-start rounded-none bg-white p-0 text-left"
                    >
                        {featuredServices.map((service, index) => (
                            <TabsTrigger
                                key={service.name}
                                value={`service-${index}`}
                                className="relative flex min-h-[56px] w-full items-center justify-between gap-4 rounded-none border-b border-[#E7E3ED] border-l-4 border-l-transparent px-5 py-4 text-left text-sm font-medium text-[#4B4654] shadow-none transition-colors hover:bg-[#F3EFF8] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4B3FBC] data-[state=active]:border-l-[#4B3FBC] data-[state=active]:bg-[#F3EFF8] data-[state=active]:text-[#171322] data-[state=active]:shadow-none sm:text-base"
                            >
                                <span>{service.name}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {featuredServices.map((service, index) => (
                        <TabsContent
                            key={service.name}
                            value={`service-${index}`}
                            className="m-0 min-w-0 bg-[#F3EFF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4B3FBC]"
                        >
                            <div className="grid h-full min-h-[360px] grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(200px,0.85fr)]">
                                <div className="flex flex-col items-start justify-center p-6 sm:p-8 md:p-10">
                                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#4B3FBC]">
                                        {service.name}
                                    </p>
                                    <h3 className="mb-4 max-w-lg text-2xl font-semibold leading-tight text-[#171322] sm:text-3xl">
                                        {service.name}
                                    </h3>
                                    <p className="mb-6 max-w-lg text-sm leading-relaxed text-[#4B4654] sm:text-base">
                                        {service.description}
                                    </p>
                                    <a
                                        href="/services"
                                        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 font-semibold text-[#4B3FBC] transition-colors hover:text-[#3a3399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3FBC] focus-visible:ring-offset-2"
                                    >
                                        Learn More <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                                <div className="min-h-[220px] p-4 pt-0 sm:min-h-0 sm:p-4 sm:pl-0">
                                    <img
                                        src={serviceImages[index]}
                                        alt={service.name}
                                        className="h-full min-h-[220px] w-full rounded-xl object-cover sm:min-h-[320px]"
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

                <div className="mt-6 text-center">
                    <a
                        href="/services"
                        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#4B3FBC] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#3a3399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3FBC] focus-visible:ring-offset-2 sm:w-auto sm:px-8"
                    >
                        View All Services
                    </a>
                </div>
            </div>
        </section>
    );
}
