import { servicesHighlight } from "@/data/services";
const imageMap = {
    "/assets/mail.png": "/assets/images/mail.png",
    "/assets/medal.png": "/assets/images/medal.png",
    "/assets/shake.png": "/assets/images/shake.png",
};

export default function ServicesHighlightSection() {
    return (
        <section className="py-8 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        You Accelerate. We clear the path
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        We understand the African market and shape our solutions
                        around the unique realities of your business.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {servicesHighlight.map((service, i) => (
                        <div key={i} className="text-center space-y-2">
                            <img
                                src={
                                    imageMap[
                                        service.image as keyof typeof imageMap
                                    ]
                                }
                                alt={service.name}
                                className="h-24 w-24 mx-auto object-contain"
                            />
                            <h3 className="text-xl font-semibold">
                                {service.name}
                            </h3>
                            <p className="text-muted-foreground">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
