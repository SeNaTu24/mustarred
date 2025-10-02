import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import logoPath from "@assets/nZDma7Ao_400x400_1759404629970.jpg";

export default function HeroSection() {
  const codeSnippets = [
    "import { ai } from 'future'",
    "const debate = await ethics.discuss()",
    "function transform() { return innovation }",
    "class LegalAI { analyze(case) {} }",
    "export default Intelligence",
    "if (curious) { join() }",
    "const community = new Network()",
    "async debate(topic) => insights",
  ];

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {codeSnippets.map((snippet, i) => (
          <div
            key={i}
            className="absolute font-mono text-xs md:text-sm text-primary/40 whitespace-nowrap"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {snippet}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translate(-100px, -100px) rotate(5deg); opacity: 0; }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 text-center">
        <img
          src={logoPath}
          alt="Legal Tech Bro"
          className="h-16 md:h-20 mx-auto mb-8 rounded-lg"
        />

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Intelligence
          </span>
          <br />
          <span className="text-foreground">Meets Community</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Join Legal Tech Bro's premier AI community platform. Engage in thought-provoking debates,
          discover career opportunities, and connect with the brightest minds in artificial intelligence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button size="lg" data-testid="button-join-community" className="text-base">
            Join Community
          </Button>
          <Button
            size="lg"
            variant="outline"
            data-testid="button-explore-debates"
            className="text-base backdrop-blur-sm"
          >
            Explore Debates
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {[
            { value: "2K+", label: "Active Members" },
            { value: "50+", label: "AI Debates Hosted" },
            { value: "100+", label: "Career Opportunities" },
            { value: "30+", label: "Resources" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollToAbout}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground hover-elevate active-elevate-2 p-2 rounded-full"
          aria-label="Scroll to content"
          data-testid="button-scroll-down"
        >
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
