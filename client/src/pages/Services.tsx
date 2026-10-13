import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useModal } from "@/contexts/ModalContext";
import { serviceOfferings } from "@/data/servicesPage";
import ClientProofSection from "@/components/sections/services/ClientProofSection";
import EngagementProcess from "@/components/sections/services/EngagementProcess";
import ServicePathways from "@/components/sections/services/ServicePathways";
import ServicesCatalog from "@/components/sections/services/ServicesCatalog";
import ServicesContactCta from "@/components/sections/services/ServicesContactCta";
import ServicesHero from "@/components/sections/services/ServicesHero";

export default function Services() {
    const { openModal } = useModal();

    const openConsultation = (serviceName?: string) => {
        const description = serviceName
            ? `I'm interested in ${serviceName}. Please get in touch to discuss the next steps.`
            : "Tell us about your compliance needs and we'll help clarify a practical next step.";
        openModal("Contact Us", description);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]} />
            <main>
                <ServicesHero onContact={() => openConsultation()} />
                <ServicePathways />
                <ServicesCatalog
                    offerings={serviceOfferings}
                    onContact={(service) => openConsultation(service.name)}
                />
                <EngagementProcess />
                <ClientProofSection />
                <ServicesContactCta onContact={() => openConsultation()} />
            </main>
            <Footer />
        </div>
    );
}
