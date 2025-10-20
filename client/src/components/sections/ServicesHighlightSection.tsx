import { servicesHighlight } from "@/data/services";
import mailImage from "@assets/mail.png";
import medalImage from "@assets/medal.png";
import shakeImage from "@assets/shake.png";

const imageMap = {
    "/assets/mail.png": mailImage,
    "/assets/medal.png": medalImage,
    "/assets/shake.png": shakeImage
};

export default function ServicesHighlightSection() {
    return (
        <section className="py-8 md:py-12 bg-card/30">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Crest your industry with a trusted partner, Mustarred.
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        We understand the African business climate, and take our
                        time to get full insights into the peculiarities of our
                        client’s business.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {servicesHighlight.map((service, i) => (
                        <div key={i} className="text-center space-y-4">
                            <img 
                                src={imageMap[service.image as keyof typeof imageMap]} 
                                alt={service.name}
                                className="h-24 w-24 mx-auto object-contain"
                                style={{
                                    filter: 'hue-rotate(180deg) saturate(2) brightness(0.6) contrast(1.5)'
                                }}
                            />
                            <h3 className="text-xl font-semibold">{service.name}</h3>
                            <p className="text-muted-foreground">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
