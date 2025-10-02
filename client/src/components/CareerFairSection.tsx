import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Briefcase } from "lucide-react";

const opportunities = [
  {
    company: "TechCorp AI",
    role: "Machine Learning Engineer",
    location: "Remote",
    level: "Mid-Level",
    type: "Full-time",
  },
  {
    company: "LegalTech Solutions",
    role: "AI Legal Analyst",
    location: "New York, NY",
    level: "Senior",
    type: "Full-time",
  },
  {
    company: "Ethics AI Institute",
    role: "AI Ethics Researcher",
    location: "Remote",
    level: "Junior",
    type: "Contract",
  },
  {
    company: "DataMind Corp",
    role: "AI Product Manager",
    location: "San Francisco, CA",
    level: "Mid-Level",
    type: "Full-time",
  },
  {
    company: "SafeAI Labs",
    role: "AI Safety Engineer",
    location: "London, UK",
    level: "Senior",
    type: "Full-time",
  },
  {
    company: "GenAI Startups",
    role: "LLM Developer",
    location: "Remote",
    level: "Mid-Level",
    type: "Full-time",
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Junior":
      return "bg-chart-3/10 text-chart-3";
    case "Mid-Level":
      return "bg-chart-1/10 text-chart-1";
    case "Senior":
      return "bg-chart-2/10 text-chart-2";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export default function CareerFairSection() {
  return (
    <section className="py-20 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI Career <span className="text-primary">Fair</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover exciting opportunities in AI, machine learning, and legal tech.
            Connect with leading companies and advance your career.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" size="sm" data-testid="filter-all">All Roles</Button>
            <Button variant="outline" size="sm" data-testid="filter-junior">Junior</Button>
            <Button variant="outline" size="sm" data-testid="filter-mid">Mid-Level</Button>
            <Button variant="outline" size="sm" data-testid="filter-senior">Senior</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {opportunities.map((job, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-job-${i}`}>
              <CardHeader className="gap-1 space-y-0 pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{job.company}</span>
                </div>
                <CardTitle className="text-lg">{job.role}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={getLevelColor(job.level)} data-testid={`badge-level-${i}`}>
                    {job.level}
                  </Badge>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" data-testid={`button-apply-${i}`}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" data-testid="button-post-opportunity">
            <Briefcase className="h-5 w-5 mr-2" />
            Post an Opportunity
          </Button>
        </div>
      </div>
    </section>
  );
}
