import { Button } from "@/components/ui/button";

interface ServicesContactCtaProps {
    onContact: () => void;
}

export default function ServicesContactCta({ onContact }: ServicesContactCtaProps) {
    return (
        <section id="services-contact" aria-labelledby="services-contact-heading" className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-[#f7f8fb] px-6 py-10 text-center sm:px-10 sm:py-14">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#4b4ba3] sm:text-sm">Start a conversation</p>
                <h2 id="services-contact-heading" className="mx-auto mb-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">Ready to move your business forward?</h2>
                <p className="mx-auto mb-7 max-w-2xl text-base leading-relaxed text-gray-600">Whether you're navigating compliance, protecting data, or expanding across Africa, our team is here to help you take the next step with confidence.</p>
                <Button onClick={onContact} className="min-h-12 bg-[#4b4ba3] px-6 text-white hover:bg-[#3a3a8a]">
                    Contact Our Team
                </Button>
            </div>
        </section>
    );
}
