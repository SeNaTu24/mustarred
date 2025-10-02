import { Card } from "@/components/ui/card";
import { Target, Eye, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building the Future of <span className="text-primary">AI Collaboration</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Legal Tech Bro is more than a platform—it's a movement to democratize AI knowledge,
            foster meaningful debates, and create opportunities for the next generation of AI professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20">
          <Card className="p-8" data-testid="card-mission">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-semibold">Our Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To build an inclusive ecosystem where AI enthusiasts, legal tech professionals,
              and industry experts can connect, debate critical issues, and discover opportunities
              that drive innovation and career growth.
            </p>
          </Card>

          <Card className="p-8" data-testid="card-vision">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-8 w-8 text-accent" />
              <h3 className="text-2xl font-semibold">Our Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To become the leading global community where AI professionals are inspired, challenged,
              and equipped to build ethical, innovative solutions that shape the future of technology
              and society.
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              title: "Community-First Approach",
              description: "We believe in the power of collective intelligence and shared knowledge.",
            },
            {
              icon: Target,
              title: "Innovation Hub",
              description: "A space where cutting-edge AI ideas meet practical implementation.",
            },
            {
              icon: Eye,
              title: "Global Network",
              description: "Connecting AI professionals and enthusiasts from around the world.",
            },
          ].map((value, i) => (
            <div key={i} className="text-center space-y-3" data-testid={`value-${i}`}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold">{value.title}</h4>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
