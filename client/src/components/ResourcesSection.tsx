import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Database, Scale, Code2, Shield, Brain } from "lucide-react";

const resources = [
  {
    icon: Sparkles,
    title: "LLMs & Generative AI",
    description: "Tools and frameworks for large language models and generative AI.",
  },
  {
    icon: Database,
    title: "ML Frameworks",
    description: "Machine learning libraries, training pipelines, and deployment tools.",
  },
  {
    icon: Scale,
    title: "AI Ethics Tools",
    description: "Bias detection, fairness metrics, and responsible AI frameworks.",
  },
  {
    icon: Code2,
    title: "Legal Tech AI",
    description: "Contract analysis, legal research, and compliance automation tools.",
  },
  {
    icon: Shield,
    title: "AI Safety",
    description: "Alignment research, safety frameworks, and risk assessment tools.",
  },
  {
    icon: Brain,
    title: "AI Policy",
    description: "Governance frameworks, policy documents, and regulatory guides.",
  },
];

export default function ResourcesSection() {
  return (
    <section className="py-20 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Knowledge at Your <span className="text-primary">Fingertips</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access our curated collection of tools, frameworks, courses, and documentation
            for different AI domains and specializations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-resource-${i}`}>
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-3">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" data-testid={`button-explore-${i}`}>
                  Explore Tools
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
