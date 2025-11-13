import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText } from "lucide-react";
import { complianceTools } from "@/data/resources";

export default function ResourceHubSection() {
  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">Resource</span> <span className="text-primary">Hub</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access the latest regulatory news, compliance tools, and resources to keep your business informed and compliant.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {complianceTools.map((tool, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-compliance-tool-${i}`}>
              <CardHeader className="gap-1 space-y-0">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="w-fit" variant="secondary">
                    {tool.category}
                  </Badge>
                  <Badge className="w-fit" variant="outline">
                    {tool.type}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{tool.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  data-testid={`button-download-${i}`}
                  onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=info@mustarred.com&su=Request: ' + tool.name, '_blank')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Request Resource
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
