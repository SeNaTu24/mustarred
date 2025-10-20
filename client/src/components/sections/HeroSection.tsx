import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import logoPath from "@assets/1646692958457.jpeg";
import heroImage from "@assets/startupbuilding.webp";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Get ahead with simple compliance";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full section background image */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.4,
        filter: 'blur(0.5px)'
      }} />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 pointer-events-none" />
      
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-8 text-center">


        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            Building a startup is hard enough
          </span>
          <br />
          <span className="text-2xl md:text-3xl font-normal text-foreground">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Crest your industry with a trusted partner, Mustarred.
          Your trusted advisor to startups on law, policy and compliance.
        </p>
        
        <div className="flex justify-center items-center mb-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-3 text-lg"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Services
          </Button>
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
