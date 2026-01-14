import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { trackEvent } from '@/lib/analytics';

export default function HeroSection() {
    const { openModal } = useModal();
    const scrollToAbout = () => {
        document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden animated-purple-bg py-8 sm:py-12 md:py-16 lg:py-24"
            style={{ minHeight: 'calc(100vh - 32px)', paddingTop: '150px' }}
        >
            {/* Web3 Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ overflow: 'hidden' }}>
                <div className="web3-grid" />
            </div>

            {/* Floating Nodes */}
            <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute web3-node"
                        style={{
                            top: `${25 + i * 12}%`,
                            left: `${15 + i * 10}%`,
                            animationDelay: `${i * 0.5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Connection Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ overflow: 'hidden' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute connection-line"
                        style={{
                            top: `${30 + i * 8}%`,
                            left: `${20 + i * 12}%`,
                            transform: `rotate(${i * 30}deg)`,
                            animationDelay: `${i * 0.8}s`,
                        }}
                    />
                ))}
            </div>

            {/* Subtle Particles */}
            <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
                {Array.from({ length: 35 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute subtle-particle"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Energy Waves */}
            <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute energy-wave"
                        style={{
                            top: "50%",
                            left: "50%",
                            animationDelay: `${i * 1.5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Floating Orbs */}
            <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute floating-orb"
                        style={{
                            top: `${20 + Math.random() * 60}%`,
                            left: `${10 + Math.random() * 80}%`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            <style>{`
        @keyframes node-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1) rotate(0deg); box-shadow: 0 0 15px rgba(164, 159, 231, 0.6); }
          33% { opacity: 0.9; transform: scale(1.2) rotate(120deg); box-shadow: 0 0 25px rgba(164, 159, 231, 0.9); }
          66% { opacity: 1; transform: scale(1.4) rotate(240deg); box-shadow: 0 0 30px rgba(100, 255, 200, 0.7); }
        }
        
        @keyframes line-flow {
          0% { opacity: 0.2; transform: scaleX(0) rotateZ(0deg); }
          25% { opacity: 0.6; transform: scaleX(0.5) rotateZ(90deg); }
          50% { opacity: 1; transform: scaleX(1.3) rotateZ(180deg); }
          75% { opacity: 0.8; transform: scaleX(1) rotateZ(270deg); }
          100% { opacity: 0.2; transform: scaleX(0) rotateZ(360deg); }
        }
        
        @keyframes particle-float {
          0% { opacity: 0.4; transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); }
          25% { opacity: 0.8; transform: translateY(-20px) translateX(10px) scale(1.2) rotate(90deg); }
          50% { opacity: 1; transform: translateY(-40px) translateX(-5px) scale(1.6) rotate(180deg); }
          75% { opacity: 0.7; transform: translateY(-20px) translateX(-15px) scale(1.3) rotate(270deg); }
          100% { opacity: 0.4; transform: translateY(0px) translateX(0px) scale(1) rotate(360deg); }
        }
        
        @keyframes energy-wave {
          0% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.5); }
          50% { opacity: 0.4; transform: translate(-50%, -50%) scale(2); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(4); }
        }
        
        @keyframes orb-drift {
          0%, 100% { opacity: 0.6; transform: translateY(0px) translateX(0px) scale(1); }
          33% { opacity: 0.9; transform: translateY(-25px) translateX(15px) scale(1.3); }
          66% { opacity: 0.7; transform: translateY(-10px) translateX(-20px) scale(0.8); }
        }
        
        .web3-grid {
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(164, 159, 231, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(164, 159, 231, 0.3) 1px, transparent 1px);
          background-size: 80px 80px;
          background-position: 0 0, 0 0;
        }
        
        .web3-node {
          width: 16px;
          height: 16px;
          background: radial-gradient(circle, rgba(164, 159, 231, 0.9), rgba(164, 159, 231, 0.4), transparent);
          border: 2px solid rgba(164, 159, 231, 0.7);
          border-radius: 50%;
          animation: node-pulse 3s ease-in-out infinite;
        }
        
        .connection-line {
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(164, 159, 231, 0.8), rgba(100, 255, 200, 0.6), transparent);
          animation: line-flow 4s ease-in-out infinite;
          border-radius: 1px;
        }
        
        .subtle-particle {
          width: 4px;
          height: 4px;
          background: rgba(164, 159, 231, 0.8);
          border-radius: 50%;
          animation: particle-float 4s ease-in-out infinite;
          box-shadow: 0 0 12px rgba(164, 159, 231, 0.7);
        }
        
        .energy-wave {
          width: 100px;
          height: 100px;
          border: 2px solid rgba(164, 159, 231, 0.4);
          border-radius: 50%;
          animation: energy-wave 6s ease-out infinite;
        }
        
        .floating-orb {
          width: 12px;
          height: 12px;
          background: radial-gradient(circle, rgba(100, 255, 200, 0.8), rgba(164, 159, 231, 0.4), transparent);
          border-radius: 50%;
          animation: orb-drift 7s ease-in-out infinite;
          box-shadow: 0 0 15px rgba(100, 255, 200, 0.5);
        }
        
        @keyframes fade-in-up {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        @keyframes hero-entrance {
          0% { 
            opacity: 0; 
            transform: translateY(-50px) scale(0.5) rotateX(90deg);
            text-shadow: 0 0 0 transparent;
            filter: blur(10px);
          }
          30% {
            opacity: 0.3;
            transform: translateY(-20px) scale(0.8) rotateX(45deg);
            text-shadow: 0 0 30px hsl(var(--brand-primary) / 0.8);
            filter: blur(5px);
          }
          70% {
            opacity: 0.8;
            transform: translateY(5px) scale(1.2) rotateX(-10deg);
            text-shadow: 0 0 40px hsl(var(--brand-primary) / 1), 0 0 80px hsl(var(--brand-accent) / 0.5);
            filter: blur(0px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1) rotateX(0deg);
            text-shadow: 0 0 20px hsl(var(--brand-primary) / 0.6), 0 0 40px hsl(var(--brand-accent) / 0.3);
            filter: blur(0px);
          }
        }
        
        @keyframes ken-burns {
          0% { 
            transform: scale(1) translateX(0) translateY(0);
          }
          25% {
            transform: scale(1.05) translateX(-2%) translateY(-1%);
          }
          50% {
            transform: scale(1.08) translateX(1%) translateY(-2%);
          }
          75% {
            transform: scale(1.05) translateX(-1%) translateY(1%);
          }
          100% { 
            transform: scale(1) translateX(0) translateY(0);
          }
        }
        
        @keyframes purple-gradient {
          0% {
            background: linear-gradient(45deg, #2D1B69, #663399, #4B0082);
          }
          33% {
            background: linear-gradient(45deg, #4B0082, #2D1B69, #663399);
          }
          66% {
            background: linear-gradient(45deg, #663399, #4B0082, #2D1B69);
          }
          100% {
            background: linear-gradient(45deg, #2D1B69, #663399, #4B0082);
          }
        }
        
        @keyframes bg-shift {
          0%, 100% { background: radial-gradient(ellipse at 30% 40%, #2a1a4a 0%, #1a0d33 60%, #0d0520 100%); }
          50% { background: radial-gradient(ellipse at 70% 60%, #2d1b4a 0%, #1c0f35 60%, #0f0622 100%); }
        }
        
        .animated-purple-bg {
          animation: bg-shift 8s ease-in-out infinite;
        }
        
        @keyframes text-glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(164, 159, 231, 0.3), 0 0 60px rgba(164, 159, 231, 0.2);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(164, 159, 231, 0.5), 0 0 90px rgba(164, 159, 231, 0.3);
          }
        }
        
        .text-glow-effect {
          animation: text-glow 3s ease-in-out infinite;
        }
        
        .animate-ken-burns {
          animation: ken-burns 20s ease-in-out infinite;
        }
        
        .modern-button {
          background: linear-gradient(135deg, hsl(var(--brand-primary)) 0%, hsl(var(--brand-primary) / 0.9) 100%);
          border: 1px solid hsl(var(--brand-primary) / 0.3);
          border-radius: 8px;
          box-shadow: 0 2px 8px hsl(var(--brand-primary) / 0.2), 0 1px 2px rgba(0,0,0,0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .modern-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px hsl(var(--brand-primary) / 0.3), 0 2px 4px rgba(0,0,0,0.1);
          border-color: hsl(var(--brand-primary) / 0.5);
        }
        
        .modern-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px hsl(var(--brand-primary) / 0.2);
        }
      `}</style>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 text-center">
                <h1 className="text-white tracking-tight mb-4 md:mb-6 px-2">
                    <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight md:leading-normal font-bold" style={{
                        fontFamily: "Satoshi, sans-serif",
                        textShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                    }}>
                        Solving High Stakes Challenges
                    </span>
                    <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight md:leading-normal font-bold" style={{
                        fontFamily: "Satoshi, sans-serif",
                        textShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                    }}>
                        Requires{" "}
                        <span style={{ color: "#FFD700" }}>
                            Data-Driven Precision
                        </span>
                    </span>
                </h1>

                <p className="max-w-3xl mx-auto mb-8 md:mb-12 text-white px-4 text-sm sm:text-base md:text-lg leading-relaxed" style={{
                    fontFamily: "Satoshi, sans-serif",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}>
                    We combine our robust intelligence and problem-solving
                    capacities to help organisations develop excellent
                    regulatory, compliance, and security frameworks.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-8 px-4">
                    <Button
                        className="modern-button w-full sm:w-auto px-6 md:px-8 py-3 relative overflow-hidden group text-base"
                        style={{
                            fontFamily: "Satoshi, sans-serif",
                            fontWeight: "600",
                        }}
                        onClick={() => {
                            trackEvent('cta_click', {
                                event_category: 'engagement',
                                event_label: 'Talk to Expert - Hero'
                            });
                            openModal("Talk to an Expert", "Get expert guidance for your compliance needs");
                        }}
                    >
                        <span className="relative z-10">Talk to an Expert</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    </Button>
                    
                    <Button
                        className="w-full sm:w-auto bg-white/10 border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm text-base"
                        style={{
                            fontFamily: "Satoshi, sans-serif",
                            fontWeight: "600",
                        }}
                        onClick={() => {
                            trackEvent('cta_click', {
                                event_category: 'engagement',
                                event_label: 'Get NDPA Compliant - Hero'
                            });
                            window.location.href = '/dcmi-compliance';
                        }}
                    >
                        Get NDPA Compliant
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
