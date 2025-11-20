import { servicesHighlight } from "@/data/services";
import mailImage from "@assets/mail.png";
import medalImage from "@assets/medal.png";
import shakeImage from "@assets/shake.png";

const imageMap = {
    "/assets/mail.png": mailImage,
    "/assets/medal.png": medalImage,
    "/assets/shake.png": shakeImage,
};

export default function ServicesHighlightSection() {
    return (
        <section className="py-8 sm:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 px-4">
                        You Accelerate. We clear the path
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
                        We understand the African market and shape our solutions
                        around the unique realities of your business.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
                    {servicesHighlight.map((service, i) => (
                        <div key={i} className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                            <img
                                src={
                                    imageMap[
                                        service.image as keyof typeof imageMap
                                    ]
                                }
                                alt={service.name}
                                className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto object-contain"
                            />
                            <h3 className="text-lg sm:text-xl font-semibold">
                                {service.name}
                            </h3>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
