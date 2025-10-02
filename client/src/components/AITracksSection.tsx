import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, Brain, Shield, Cpu, Sparkles, MessageSquare } from "lucide-react";

const tracks = [
  {
    icon: Scale,
    name: "AI Ethics",
    description: "Explore moral implications, bias, and responsible AI development practices.",
    members: 450,
  },
  {
    icon: Brain,
    name: "Legal AI",
    description: "AI applications in legal tech, contract analysis, and regulatory compliance.",
    members: 380,
  },
  {
    icon: Shield,
    name: "AI Policy",
    description: "Governance frameworks, regulations, and policy-making for AI systems.",
    members: 320,
  },
  {
    icon: Cpu,
    name: "Machine Learning",
    description: "Deep learning, neural networks, and practical ML implementation.",
    members: 520,
  },
  {
    icon: Sparkles,
    name: "Generative AI",
    description: "LLMs, image generation, and creative AI applications.",
    members: 600,
  },
  {
    icon: MessageSquare,
    name: "AI Safety",
    description: "Alignment, security, and long-term safety considerations for AGI.",
    members: 280,
  },
];

export default function AITracksSection() {
  return (
    <section className="py-20 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Track</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our specialized communities and find the perfect track to accelerate
            your AI journey and connect with like-minded professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-track-${i}`}>
              <CardHeader className="gap-1 space-y-0 pb-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <track.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <Badge variant="secondary" data-testid={`badge-members-${i}`}>
                    {track.members} members
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-3">{track.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{track.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" data-testid={`button-join-track-${i}`}>
                  Join Track
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
