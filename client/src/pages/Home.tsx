import { useEffect } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BusinessRegistrationSection from "@/components/sections/BusinessRegistrationSection";
import LatestInsightsSection from "@/components/sections/LatestInsightsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import TrustedPartnershipsSection from "@/components/sections/TrustedPartnershipsSection";
import "./Home.css";

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
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="home-page min-h-screen bg-white">
      <Header />
      <main className="bg-white" style={{paddingTop: '0'}}>
        <HeroSection />
        <ServicesSection />
        <BusinessRegistrationSection />
        <LatestInsightsSection />
        <TestimonialsSection />
        <AboutSection />
        <div id="resources">
        </div>

        {/* Unified Trusted Organizations, Partnerships & Regulatory Recognition */}
        <TrustedPartnershipsSection />

        <ContactSection />
      </main>
      <Footer showNewsletter />
    </div>
  );
}
