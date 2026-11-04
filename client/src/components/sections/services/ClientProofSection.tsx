import { testimonials } from "@/data/testimonials";
import { clientLogos } from "@/data/servicesPage";
import "./ClientProofSection.css";

export default function ClientProofSection() {
    return (
        <section aria-labelledby="client-proof-heading" className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center sm:mb-10">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#4b4ba3] sm:text-sm">Client relationships</p>
                    <h2 id="client-proof-heading" className="text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">Trusted by leading organizations</h2>
                </div>
                <div className="service-client-logo-window mb-14">
                    <ul aria-label="Mustarred clients" className="service-client-logo-track">
                        {[...clientLogos, ...clientLogos].map((client, index) => (
                            <li
                                key={`${client.name}-${index}`}
                                className="service-client-logo flex min-h-[84px] items-center justify-center p-4 sm:min-h-[92px]"
                                aria-hidden={index >= clientLogos.length}
                            >
                                <img src={client.src} alt={`${client.name} client logo`} loading="lazy" decoding="async" className="max-h-10 w-full object-contain sm:max-h-12" />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {testimonials.slice(0, 3).map((testimonial) => (
                        <figure key={testimonial.author} className="flex h-full flex-col border-l-2 border-[#79aeb4] bg-[#f7f8fb] p-5 sm:p-6">
                            <blockquote className="flex-1 text-sm leading-relaxed text-gray-700 sm:text-base">“{testimonial.quote}”</blockquote>
                            <figcaption className="mt-5 border-t border-gray-200 pt-4">
                                <p className="text-sm font-semibold text-gray-900">{testimonial.author}</p>
                                <p className="mt-1 text-xs text-gray-500">{testimonial.position}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
