import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="home-testimonials-section bg-white py-10 md:py-12">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="mb-6 text-center md:mb-8">
                    <h2 className="mb-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                        Some of our clients say:
                    </h2>
                    <p className="text-sm text-gray-600">Swipe to see more testimonials</p>
                </div>

                <div className="overflow-x-auto px-1 pb-4">
                    <div className="mx-auto flex w-max items-stretch gap-5 md:gap-6">
                        {testimonials.map((testimonial, i) => (
                            <Card
                                key={i}
                                className="home-testimonial-card w-80 flex-shrink-0 rounded-2xl p-6 md:w-[22rem]"
                                data-testid={`card-testimonial-${i}`}
                            >
                                <CardContent className="flex h-full flex-col space-y-0 p-0">
                                    <div className="home-testimonial-quote-mark">
                                        <Quote className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <blockquote className="home-testimonial-quote">
                                        “{testimonial.quote}”
                                    </blockquote>
                                    <div className="home-testimonial-author">
                                        <p className="font-semibold text-sm">
                                            {testimonial.author}
                                        </p>
                                        <p className="text-xs">
                                            {testimonial.position}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
