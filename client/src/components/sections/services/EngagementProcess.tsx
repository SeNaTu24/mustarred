import { engagementStages } from "@/data/servicesPage";

export default function EngagementProcess() {
    return (
        <section aria-labelledby="engagement-heading" className="bg-[#e8f1f2] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 max-w-2xl sm:mb-12">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#4b4ba3] sm:text-sm">A clear way forward</p>
                    <h2 id="engagement-heading" className="text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">How we work together</h2>
                </div>
                <ol className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
                    {engagementStages.map((stage, index) => (
                        <li key={stage.number} className="relative border-t border-[#4b4ba3]/25 pt-5">
                            {index < engagementStages.length - 1 && <span aria-hidden="true" className="absolute right-0 top-[-3px] hidden h-1.5 w-1.5 rounded-full bg-[#4b4ba3] xl:block" />}
                            <p className="mb-5 text-xs font-bold tracking-[0.14em] text-[#4b4ba3]">{stage.number}</p>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">{stage.title}</h3>
                            <p className="max-w-xs text-sm leading-relaxed text-gray-600">{stage.description}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
