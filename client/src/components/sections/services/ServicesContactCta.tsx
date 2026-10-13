import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesContactCtaProps {
    onContact: () => void;
}

export default function ServicesContactCta({ onContact }: ServicesContactCtaProps) {
    return (
        <section id="services-contact" aria-labelledby="services-contact-heading" className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-5xl border border-gray-200 bg-[#f7f8fb] px-6 py-10 text-center sm:px-10 sm:py-14">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#4b4ba3] sm:text-sm">Start a conversation</p>
                <h2 id="services-contact-heading" className="mx-auto mb-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">Ready to get started?</h2>
                <p className="mx-auto mb-7 max-w-2xl text-base leading-relaxed text-gray-600">Tell us what your business is working through. We’ll help clarify the right next step.</p>
                <Button onClick={onContact} className="min-h-12 bg-[#4b4ba3] px-6 text-white hover:bg-[#3a3a8a]">
                    Contact our team <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </section>
    );
}
