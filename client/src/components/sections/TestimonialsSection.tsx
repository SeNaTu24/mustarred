import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-8 md:py-12 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground dark:text-blue-400">
            Some of our clients say:
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="p-8 hover-elevate" data-testid={`card-testimonial-${i}`}>
              <CardContent className="space-y-6">
                <Quote className="h-8 w-8 text-primary/20" />
                <blockquote className="text-lg leading-relaxed text-muted-foreground italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
