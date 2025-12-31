import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLocation } from "wouter";
import {
    Shield,
    Users,
    Target,
    CheckCircle,
    ArrowRight,
    Globe,
    Lightbulb,
    TrendingUp,
} from "lucide-react";

export default function AboutUs() {
    const [, setLocation] = useLocation();

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Banner */}
            <section className="relative bg-[#1e1038] pt-32 pb-20">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-5xl font-bold text-white mb-6">
                        About Mustarred
                    </h1>
                    <p className="text-xl md:text-2xl text-white/95 leading-relaxed">
                        Transforming African startups through expert compliance
                        guidance
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                Our Story
                            </h2>
                            <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                                <p>
                                    Founded with a vision to democratize
                                    business compliance across Africa, Mustarred
                                    emerged from the recognition that regulatory
                                    complexity was stifling innovation in the
                                    continent's most promising startups.
                                </p>
                                <p>
                                    Our founders, seasoned professionals with
                                    decades of experience in African business
                                    landscapes, witnessed countless brilliant
                                    ideas fail not due to lack of merit, but due
                                    to regulatory hurdles.
                                </p>
                                <p>
                                    Today, we stand as the bridge between
                                    ambitious entrepreneurs and the complex
                                    world of compliance, turning obstacles into
                                    opportunities.
                                </p>
                            </div>
                        </div>
                        <div className="relative w-full">
                            <div className="bg-gradient-to-br from-[#a49fe7]/20 to-[#4b4ba3]/20 rounded-3xl p-16 w-full">
                                <div className="grid grid-cols-2 gap-12">
                                    <div className="text-center">
                                        <div className="text-3xl md:text-5xl font-black text-[#4b4ba3] mb-4">
                                            500+
                                        </div>
                                        <div className="text-lg md:text-xl font-semibold text-gray-700">
                                            Startups Guided
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl md:text-5xl font-black text-[#4b4ba3] mb-4">
                                            15+
                                        </div>
                                        <div className="text-lg md:text-xl font-semibold text-gray-700">
                                            African Countries
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl md:text-5xl font-black text-[#4b4ba3] mb-4">
                                            98%
                                        </div>
                                        <div className="text-lg md:text-xl font-semibold text-gray-700">
                                            Success Rate
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl md:text-5xl font-black text-[#4b4ba3] mb-4">
                                            24/7
                                        </div>
                                        <div className="text-lg md:text-xl font-semibold text-gray-700">
                                            Support
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 bg-[#f5f5fa]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-[#a49fe7] rounded-lg flex items-center justify-center mb-6">
                                <Shield className="h-7 w-7 text-white" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                                Integrity
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                We maintain the highest ethical standards in all
                                our advisory services, ensuring transparent and
                                honest guidance for every client.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-[#4b4ba3] rounded-lg flex items-center justify-center mb-6">
                                <Lightbulb className="h-7 w-7 text-white" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                                Innovation
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                We continuously evolve our methodologies to stay
                                ahead of regulatory changes and provide
                                cutting-edge compliance solutions.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-[#a49fe7] rounded-lg flex items-center justify-center mb-6">
                                <Globe className="h-7 w-7 text-white" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                                Pan-African Focus
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Deep understanding of diverse African markets
                                enables us to provide contextually relevant
                                advice across the continent.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Cards */}
            <section className="py-12 md:py-20 lg:py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        <div className="relative">
                            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-[#a49fe7] to-[#4b4ba3] rounded-xl md:rounded-2xl opacity-10"></div>
                            <div className="relative bg-white border border-gray-100 rounded-lg md:rounded-xl p-6 md:p-8 lg:p-10">
                                <div className="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#a49fe7] rounded-lg flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                                        <Target className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                        Our Mission
                                    </h2>
                                </div>
                                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                                    To empower African startups by simplifying
                                    complex regulatory landscapes, enabling
                                    entrepreneurs to focus on innovation while
                                    maintaining excellence in governance.
                                </p>
                                <div className="space-y-2 md:space-y-3">
                                    <div className="flex items-start text-gray-600">
                                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#a49fe7] mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm md:text-base">
                                            Simplify compliance processes
                                        </span>
                                    </div>
                                    <div className="flex items-start text-gray-600">
                                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#a49fe7] mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm md:text-base">
                                            Enable sustainable growth
                                        </span>
                                    </div>
                                    <div className="flex items-start text-gray-600">
                                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#a49fe7] mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm md:text-base">
                                            Foster innovation ecosystem
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-[#4b4ba3] to-[#a49fe7] rounded-xl md:rounded-2xl opacity-10"></div>
                            <div className="relative bg-white border border-gray-100 rounded-lg md:rounded-xl p-6 md:p-8 lg:p-10">
                                <div className="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#4b4ba3] rounded-lg flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                                        <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                        Our Vision
                                    </h2>
                                </div>
                                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                                    To be Africa's premier business advisory
                                    firm, creating an ecosystem where compliance
                                    becomes a competitive advantage for startups
                                    across the continent.
                                </p>
                                <div className="space-y-2 md:space-y-3">
                                    <div className="flex items-start text-gray-600">
                                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#4b4ba3] mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm md:text-base">
                                            Leading advisory excellence
                                        </span>
                                    </div>
                                    <div className="flex items-start text-gray-600">
                                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#4b4ba3] mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm md:text-base">
                                            Continental market leadership
                                        </span>
                                    </div>
                                    <div className="flex items-start text-gray-600">
                                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#4b4ba3] mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm md:text-base">
                                            Transformative impact
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 md:py-20 lg:py-24 bg-[#1e1038]">
                <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
                        Why Startups Choose Mustarred
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-12 lg:mb-16 max-w-3xl mx-auto px-4">
                        We understand the unique challenges facing African
                        entrepreneurs
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        <div className="text-center px-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                                Expert Team
                            </h3>
                            <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                Seasoned professionals with deep African market
                                knowledge
                            </p>
                        </div>

                        <div className="text-center px-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <Shield className="h-6 w-6 md:h-8 md:w-8 text-white" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                                Proven Track Record
                            </h3>
                            <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                500+ successful compliance implementations
                            </p>
                        </div>

                        <div className="text-center px-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <Globe className="h-6 w-6 md:h-8 md:w-8 text-white" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                                Continental Reach
                            </h3>
                            <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                Active in 15+ African countries with local
                                expertise
                            </p>
                        </div>

                        <div className="text-center px-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-white" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                                Growth Focused
                            </h3>
                            <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                Compliance strategies that enable rapid scaling
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16 lg:py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-4">
                        Ready to Transform Your Startup?
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 md:mb-10 px-4 leading-relaxed">
                        Join hundreds of African startups who trust Mustarred
                        for their compliance needs
                    </p>
                    <div className="flex justify-center px-4">
                        <button
                            onClick={() => setLocation("/dcmi-compliance")}
                            className="w-full sm:w-auto bg-[#1e1038] hover:bg-[#4b4ba3] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm md:text-base"
                        >
                            Get Started Today
                            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
