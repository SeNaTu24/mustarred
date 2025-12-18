import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

export default function FAQSection() {
    return (
        <section id="faq" className="py-8 md:py-12 bg-white">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
                <div className="text-center mb-8">
                    <h2
                        className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight"
                        style={{
                            fontFamily: "Satoshi, sans-serif",
                        }}
                    >
                        Frequently Asked Questions
                    </h2>
                    <p
                        className="leading-relaxed text-muted-foreground"
                        style={{
                            fontFamily: "Satoshi, sans-serif",
                            fontSize: "18px",
                            fontWeight: "400",
                        }}
                    >
                        Got questions? We've got answers. Find everything you
                        need to know about our compliance services.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                        <AccordionItem
                            key={i}
                            value={`item-${i}`}
                            data-testid={`faq-item-${i}`}
                        >
                            <AccordionTrigger
                                className="text-left py-4 hover:no-underline"
                                style={{
                                    color: "hsl(var(--brand-text))",
                                    fontFamily: "Satoshi, sans-serif",
                                    fontSize: "18px",
                                    fontWeight: "400",
                                }}
                            >
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent
                                className="pb-4 leading-relaxed"
                                style={{
                                    color: "hsl(var(--brand-text))",
                                    fontFamily: "Satoshi, sans-serif",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                }}
                            >
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
