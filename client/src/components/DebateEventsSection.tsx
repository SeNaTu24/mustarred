import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const upcomingDebates = [
  {
    topic: "Should AI Art Be Copyrightable?",
    participants: ["Sarah Chen", "Michael Rodriguez"],
    date: "Nov 15, 2024",
    time: "2:00 PM EST",
    category: "Ethics",
  },
  {
    topic: "AGI Safety: Optimism vs Caution",
    participants: ["Dr. James Wilson", "Lisa Park"],
    date: "Nov 22, 2024",
    time: "6:00 PM EST",
    category: "Safety",
  },
  {
    topic: "Legal Liability for AI Decisions",
    participants: ["Alex Kumar", "Emma Thompson"],
    date: "Dec 1, 2024",
    time: "4:00 PM EST",
    category: "Legal",
  },
];

const pastDebates = [
  {
    topic: "The Future of Work: AI Job Displacement",
    participants: ["David Lee", "Rachel Green"],
    views: "2.5K",
    category: "Policy",
  },
  {
    topic: "Open Source vs Closed AI Models",
    participants: ["Tom Martinez", "Sophie Anderson"],
    views: "1.8K",
    category: "Development",
  },
];

export default function DebateEventsSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI <span className="text-accent">Debates</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Engage in thought-provoking discussions on the most pressing AI topics.
            Watch live debates or catch up on past conversations.
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past" data-testid="tab-past">Past Debates</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingDebates.map((debate, i) => (
                <Card key={i} className="hover-elevate" data-testid={`card-upcoming-debate-${i}`}>
                  <CardHeader className="gap-1 space-y-0">
                    <Badge className="w-fit mb-3" variant="secondary">
                      {debate.category}
                    </Badge>
                    <CardTitle className="text-lg">{debate.topic}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      {debate.participants.map((name, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {idx === 0 && <span className="text-xs text-muted-foreground">vs</span>}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {debate.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {debate.time}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" data-testid={`button-register-${i}`}>
                      Register to Attend
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid md:grid-cols-2 gap-6">
              {pastDebates.map((debate, i) => (
                <Card key={i} className="hover-elevate" data-testid={`card-past-debate-${i}`}>
                  <CardHeader className="gap-1 space-y-0">
                    <Badge className="w-fit mb-3" variant="secondary">
                      {debate.category}
                    </Badge>
                    <CardTitle className="text-lg">{debate.topic}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      {debate.participants.map((name, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {idx === 0 && <span className="text-xs text-muted-foreground">vs</span>}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Video className="h-4 w-4" />
                      {debate.views} views
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" data-testid={`button-watch-${i}`}>
                      Watch Recording
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
