import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-6 md:py-8 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground dark:text-blue-400">
                        Some of our clients say:
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">Swipe to see more testimonials →</p>
                </div>

                {/* Cute Slider */}
                <div className="overflow-x-auto pb-6">
                    <div className="flex gap-6 w-max mx-auto">
                        {testimonials.map((testimonial, i) => (
                            <Card
                                key={i}
                                className="w-80 md:w-96 p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 border-2 border-purple-100 hover:border-[#a49fe7] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex-shrink-0 group shadow-md"
                                data-testid={`card-testimonial-${i}`}
                            >
                                <CardContent className="space-y-3 p-0">
                                    <div className="flex items-center justify-between">
                                        <Quote className="h-6 w-6 text-[#a49fe7]/40 group-hover:text-[#a49fe7]/60 transition-colors" />
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, star) => (
                                                <div key={star} className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                            ))}
                                        </div>
                                    </div>
                                    <blockquote className="text-sm leading-relaxed text-gray-700 italic font-medium">
                                        "{testimonial.quote}"
                                    </blockquote>
                                    <div className="border-t border-gray-200 pt-3">
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {testimonial.author}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {testimonial.position}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                    {testimonials.map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    ))}
                </div>
            </div>
        </section>
    );
}
