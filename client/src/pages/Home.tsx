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
  return (
    <div className="min-h-screen">
      <Header />
      <main>
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
