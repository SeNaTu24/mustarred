import { useEffect } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import WhyChooseUsCarousel from "@/components/sections/WhyChooseUsCarousel";
import { useModal } from "@/contexts/ModalContext";

export default function Home() {
  const { openModal } = useModal();
  
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
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-white" style={{paddingTop: '0'}}>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <div id="resources">
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-black">
                Why Choose Us?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                We are trusted by leading organizations
              </p>
            </div>
            
            <div className="overflow-hidden">
              <WhyChooseUsCarousel />
            </div>
            <div className="text-center mt-8">
              <a
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4b4ba3] hover:underline"
              >
                View all our services →
              </a>
            </div>
          </div>
        </section>
        <section className="pt-12 md:pt-20 lg:pt-28 pb-10 md:pb-14 lg:pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-black">
                Partnership and Collaborations
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Building stronger ecosystems together
              </p>
            </div>
            
            <div className="flex justify-center flex-wrap gap-10 md:gap-16">
                <img
                  src="/assets/icons/iwajoo.png"
                  alt="Iwajoo - Mustarred partner"
                  className="h-8 md:h-10 w-auto object-contain"
                />
                <img
                  src="/assets/icons/legaltechbro.png"
                  alt="Legal Tech Bro - Mustarred partner"
                  className="h-8 md:h-10 w-auto object-contain"
                />
                <a href="https://pecb.com/en" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/assets/icons/pecb-slogan-bottom-logo-800.png"
                    alt="PECB - Mustarred certified training partner"
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </a>
                <img
                  src="/assets/icons/vaspa.png"
                  alt="VASPA - Mustarred partner"
                  className="h-8 md:h-10 w-auto object-contain"
                />
            </div>
          </div>
        </section>

        {/* Trusted Authorities - External Links */}
        <section className="py-8 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <p className="text-xs text-gray-500 mb-4">Certified by the NDPC as a Data Protection Compliance Organisation</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="https://ndpc.gov.ng" target="_blank" rel="noopener noreferrer" className="text-[#4b4ba3] hover:underline font-medium">NDPC — Nigeria Data Protection Commission</a>
              <a href="https://www.cac.gov.ng" target="_blank" rel="noopener noreferrer" className="text-[#4b4ba3] hover:underline font-medium">CAC — Corporate Affairs Commission</a>

            </div>
          </div>
        </section>
        <ContactSection onResourcesClick={() => openModal("Free Resources", "Access our compliance guides and templates")} />
      </main>
      <Footer />
    </div>
  );
}
