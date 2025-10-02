import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Legal Tech Bro's AI Platform?",
    answer:
      "We are a premier AI community platform that brings together AI enthusiasts, legal tech professionals, and industry experts. We facilitate thought-provoking debates, provide career opportunities, and offer comprehensive resources to help you thrive in the AI space.",
  },
  {
    question: "How do I join a specific AI track?",
    answer:
      "Simply browse our AI Tracks section, find the community that matches your interests, and click 'Join Track'. You'll get access to exclusive discussions, resources, and networking opportunities within that specialization.",
  },
  {
    question: "Can I participate in AI debates?",
    answer:
      "Absolutely! We host regular AI debates on pressing topics. You can register for upcoming debates as an attendee, and experienced community members can apply to be debate participants. All past debates are also available for viewing.",
  },
  {
    question: "How does the Career Fair work?",
    answer:
      "Our AI Career Fair connects job seekers with leading companies in AI and legal tech. Browse opportunities, filter by experience level, and apply directly. Companies can also post opportunities to reach our community of talented professionals.",
  },
  {
    question: "Is this platform suitable for beginners?",
    answer:
      "Yes! We welcome everyone from beginners to experts. Our AI Tracks cater to all experience levels, and we offer resources and mentorship opportunities to help you get started in AI, regardless of your background.",
  },
  {
    question: "How can I contribute content or showcase my work?",
    answer:
      "Community members can submit their AI projects, research papers, and tools to our Gallery. We also encourage members to share resources, host workshops, and contribute to discussions across all tracks.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers. Find everything you need to know about
            joining our AI community.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} data-testid={`faq-item-${i}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
