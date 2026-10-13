import { ArrowDownRight } from "lucide-react";
import { servicePathways } from "@/data/servicesPage";

const serviceLabels: Record<string, string> = {
    "data-protection-training": "Training",
    "privacy-programme": "Privacy programme",
    "regulatory-product-compliance": "Regulatory compliance",
    "policy-research": "Policies & research",
    "startup-advisory": "Startup advisory",
    "cybersecurity-services": "Cybersecurity",
};

export default function ServicePathways() {
    return (
        <section aria-labelledby="pathways-heading" className="bg-[#f7f8fb] py-14 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 max-w-2xl sm:mb-10">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#4b4ba3] sm:text-sm">Find your starting point</p>
                    <h2 id="pathways-heading" className="text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">What do you need help with?</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {servicePathways.map((pathway) => (
                        <article key={pathway.number} className="flex h-full flex-col border border-gray-200 bg-white p-6 transition-colors hover:border-[#4b4ba3]/40 sm:p-7">
                            <p className="mb-7 text-sm font-semibold tracking-[0.12em] text-[#4b4ba3]">{pathway.number}</p>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">{pathway.title}</h3>
                            <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">{pathway.description}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {pathway.serviceSlugs.map((slug) => (
                                    <a
                                        key={slug}
                                        href={`#${slug}`}
                                        className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-[#4b4ba3] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4b4ba3] focus-visible:ring-offset-2"
                                    >
                                        {serviceLabels[slug]} <ArrowDownRight aria-hidden="true" className="h-3.5 w-3.5" />
                                    </a>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
