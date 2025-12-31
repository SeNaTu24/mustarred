import { useEffect } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
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
      <main className="bg-white" style={{paddingTop: '96px'}}>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <div id="resources">
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>

        {/* Why Choose Us Section */}
        <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-3 md:mb-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 md:mb-2 text-black">
                Why Choose us?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                We are trusted by leading organizations
              </p>
            </div>
            
            <div className="overflow-hidden">
              <div className="flex animate-scroll-reverse gap-8 sm:gap-10 md:gap-12">
                <img
                  src="/assets/icons/cleva-logo2.svg"
                  alt="Cleva"
                  className="h-8 sm:h-10 md:h-12 w-20 sm:w-24 md:w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/fincra.png"
                  alt="Fincra"
                  className="h-8 sm:h-10 md:h-12 w-20 sm:w-24 md:w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/heala_logo.svg"
                  alt="Heala"
                  className="h-8 sm:h-10 md:h-12 w-20 sm:w-24 md:w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/renmoney.jpeg"
                  alt="Renmoney"
                  className="h-8 sm:h-10 md:h-12 w-20 sm:w-24 md:w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/enta_afrika.jpg"
                  alt="Enta Afrika"
                  className="h-8 sm:h-10 md:h-12 w-20 sm:w-24 md:w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/radease.png"
                  alt="Radease"
                  className="h-8 sm:h-10 md:h-12 w-20 sm:w-24 md:w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/roqqu.png"
                  alt="Roqqu"
                  className="h-8 sm:h-10 md:h-12 w-20 sm:w-24 md:w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/oa_logo.png"
                  alt="OA Logo"
                  className="h-8 sm:h-10 md:h-12 w-20 sm:w-24 md:w-32 object-contain flex-shrink-0"
                />
                {/* Duplicate for seamless loop */}
                <img
                  src="/assets/icons/cleva-logo2.svg"
                  alt="Cleva"
                  className="h-12 w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/fincra.png"
                  alt="Fincra"
                  className="h-12 w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/heala_logo.svg"
                  alt="Heala"
                  className="h-12 w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/renmoney.jpeg"
                  alt="Renmoney"
                  className="h-12 w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/enta_afrika.jpg"
                  alt="Enta Afrika"
                  className="h-12 w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/radease.png"
                  alt="Radease"
                  className="h-12 w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/roqqu.png"
                  alt="Roqqu"
                  className="h-12 w-32 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/oa_logo.png"
                  alt="OA Logo"
                  className="h-12 w-32 object-contain flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partnership and Collaborations Section */}
        <section className="pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-3 md:mb-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 md:mb-2 text-black">
                Partnership and Collaborations
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Building stronger ecosystems together
              </p>
            </div>
            
            <div className="overflow-hidden">
              <div className="flex animate-scroll gap-8 sm:gap-10 md:gap-12">
                <img
                  src="/assets/icons/heala_logo.svg"
                  alt="Heala"
                  className="h-6 sm:h-7 md:h-8 w-16 sm:w-18 md:w-20 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/iwajoo.png"
                  alt="Iwajoo"
                  className="h-6 sm:h-7 md:h-8 w-16 sm:w-18 md:w-20 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/legaltechbro.png"
                  alt="Legal Tech Bro"
                  className="h-6 sm:h-7 md:h-8 w-16 sm:w-18 md:w-20 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/pecb-slogan-bottom-logo-800.png"
                  alt="PECB"
                  className="h-6 sm:h-7 md:h-8 w-16 sm:w-18 md:w-20 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/vaspa.png"
                  alt="VASPA"
                  className="h-6 sm:h-7 md:h-8 w-16 sm:w-18 md:w-20 object-contain flex-shrink-0"
                />
                {/* Duplicate for seamless loop */}
                <img
                  src="/assets/icons/heala_logo.svg"
                  alt="Heala"
                  className="h-8 w-20 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/iwajoo.png"
                  alt="Iwajoo"
                  className="h-8 w-20 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/legaltechbro.png"
                  alt="Legal Tech Bro"
                  className="h-8 w-20 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/pecb-slogan-bottom-logo-800.png"
                  alt="PECB"
                  className="h-8 w-20 object-contain flex-shrink-0"
                />
                <img
                  src="/assets/icons/vaspa.png"
                  alt="VASPA"
                  className="h-8 w-20 object-contain flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </section>

        <ContactSection onResourcesClick={() => openModal("Free Resources", "Access our compliance guides and templates")} />
      </main>
      <Footer />
    </div>
  );
}
