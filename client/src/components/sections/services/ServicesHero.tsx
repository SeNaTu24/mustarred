import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesHeroProps {
    onContact: () => void;
}

export default function ServicesHero({ onContact }: ServicesHeroProps) {
    return (
        <section className="relative isolate flex min-h-[540px] items-center overflow-hidden bg-[#160f30] py-16 sm:min-h-[580px] sm:py-20">
            <img
                src="/assets/images/aboutusimage.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 -z-20 h-full w-full max-w-none object-cover object-[64%_center]"
                decoding="async"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-r from-[#160f30]/95 via-[#160f30]/80 to-[#160f30]/45"
            />

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                    <h1 className="mb-5 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Comprehensive services for <span className="text-[#c1bdf5]">African startups</span>
                    </h1>
                    <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                        From data protection to cybersecurity, we provide end-to-end compliance solutions designed to help your business scale with confidence.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button onClick={onContact} className="min-h-12 justify-center bg-[#4b4ba3] px-6 text-white hover:bg-[#3a3a8a] sm:w-auto">
                            Talk to an expert <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                        </Button>
                        <a
                            href="#services-catalogue"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/35 px-6 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#160f30]"
                        >
                            Explore services <ChevronDown aria-hidden="true" className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
