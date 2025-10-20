import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";

export default function ServicesSection() {
    return (
        <section id="services" className="py-8 md:py-12 bg-background">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Our Offerings
                    </h2>
                    <div className="max-w-4xl mx-auto space-y-4">
                        <p className="text-xl font-semibold text-primary">
                            Solution and performance oriented
                        </p>
                        <p className="text-lg text-muted-foreground">
                            Mustarred was built to provide deep expertise in compliance that are extremely dynamic, and changing daily.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            We offer integrated marketing solutions with unique services and deliverables tailored to unlock full-funnel growth for your startup, brand or business.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <Card key={i} className="p-6 hover-elevate">
                            <CardContent className="space-y-4 p-0">
                                <div className="p-3 rounded-lg bg-primary/10 w-fit">
                                    <service.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">{service.name}</h3>
                                <p className="text-muted-foreground">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}