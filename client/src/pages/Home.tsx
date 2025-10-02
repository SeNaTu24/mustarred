import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AITracksSection from "@/components/AITracksSection";
import DebateEventsSection from "@/components/DebateEventsSection";
import CareerFairSection from "@/components/CareerFairSection";
import GallerySection from "@/components/GallerySection";
import ResourcesSection from "@/components/ResourcesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <div id="tracks">
          <AITracksSection />
        </div>
        <div id="debates">
          <DebateEventsSection />
        </div>
        <div id="careers">
          <CareerFairSection />
        </div>
        <GallerySection />
        <ResourcesSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
