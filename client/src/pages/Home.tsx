import { useEffect } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ServicesHighlightSection from "@/components/sections/ServicesHighlightSection";
import ResourceHubSection from "@/components/sections/ResourceHubSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  useEffect(() => {
    // Handle hash navigation when page loads
    const hash = window.location.hash;
    if (hash) {
      // Remove the # from the hash
      const id = hash.replace("#", "");
      // Wait for the page to render
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80; // Account for fixed header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 300); // Increased timeout for better mobile rendering
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-white">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <div id="services-highlight">
          <ServicesHighlightSection />
        </div>
        <div id="resources">
          <ResourceHubSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>

        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
