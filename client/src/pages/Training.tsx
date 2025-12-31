import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { courses, courseCategories } from "@/data/courses";
import * as Tabs from "@radix-ui/react-tabs";
import * as Accordion from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Award, ChevronDown, Star, ArrowRight, Play } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";

export default function Training() {
    const [selectedCategory, setSelectedCategory] = useState<
        "ai" | "data-protection" | "grc"
    >("ai");
    const { openModal } = useModal();
    
    // Counter animation states
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    
    // Animate counters on component mount
    useEffect(() => {
        const animateCounter = (setter: (value: number) => void, target: number, duration: number = 2000) => {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setter(target);
                    clearInterval(timer);
                } else {
                    setter(Math.floor(start));
                }
            }, 16);
        };
        
        // Start animations with slight delays
        setTimeout(() => animateCounter(setCount1, 500), 500);
        setTimeout(() => animateCounter(setCount2, 15), 700);
        setTimeout(() => animateCounter(setCount3, 98), 900);
    }, []);

    const filteredCourses = courses.filter(
        (course) => course.category === selectedCategory
    );

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="bg-white" style={{ paddingTop: "96px" }}>
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 bg-slate-900 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-60">
                        <img src="/pecb.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-slate-900/40"></div>
                    
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
                                <Award className="h-4 w-4" />
                                Official PECB Training Partner
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                                Professional 
                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Certifications
                                </span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                                Advance your career with globally recognized certifications in AI, Data Protection, and Governance
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                                <Button
                                    size="lg"
                                    className="bg-white text-white hover:bg-gray-100 hover:scale-105 font-semibold px-8 py-4 text-lg shadow-xl transition-all duration-300"
                                    onClick={() =>
                                        document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })
                                    }
                                >
                                    <Play className="h-5 w-5 mr-2" />
                                    Explore Courses
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-white text-white hover:bg-white hover:text-white hover:scale-105 px-8 py-4 text-lg transition-all duration-300"
                                    onClick={() => openModal("Training Information", "Get expert guidance on our certification programs")}
                                >
                                    Talk to Expert
                                </Button>
                            </div>
                            
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-2">{count1}+</div>
                                    <div className="text-gray-400 text-sm">Professionals Certified</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-2">{count2}+</div>
                                    <div className="text-gray-400 text-sm">Course Programs</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-2">{count3}%</div>
                                    <div className="text-gray-400 text-sm">Success Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Courses Section */}
                <section id="courses" className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                                Choose Your Path
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Select from our comprehensive certification programs
                            </p>
                        </div>

                        <Tabs.Root value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
                            {/* Simple Tab Navigation */}
                            <div className="flex justify-center mb-12">
                                <Tabs.List className="flex bg-gray-100 rounded-2xl p-2">
                                    {courseCategories.map((category) => (
                                        <Tabs.Trigger
                                            key={category.id}
                                            value={category.id}
                                            className="px-8 py-4 rounded-xl font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-gray-600"
                                        >
                                            {category.name}
                                        </Tabs.Trigger>
                                    ))}
                                </Tabs.List>
                            </div>

                            {courseCategories.map((category) => (
                                <Tabs.Content key={category.id} value={category.id}>
                                    <div className="space-y-8">
                                        {filteredCourses.map((course) => (
                                            <Card key={course.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                                <div className="p-8">
                                                    <div className="flex flex-col lg:flex-row gap-8">
                                                        {/* Course Info */}
                                                        <div className="flex-1">
                                                            {course.isBundle && (
                                                                <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                                                                    🔥 BUNDLE SAVE ${course.savings}
                                                                </span>
                                                            )}
                                                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                                                                {course.title}
                                                            </h3>
                                                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                                                {course.description}
                                                            </p>
                                                            
                                                            {/* Key Points */}
                                                            {course.objectives && (
                                                                <div className="mb-6">
                                                                    <h4 className="font-semibold text-gray-900 mb-3">What You'll Master:</h4>
                                                                    <div className="grid sm:grid-cols-2 gap-2">
                                                                        {course.objectives.slice(0, 4).map((obj, idx) => (
                                                                            <div key={idx} className="flex items-start gap-2">
                                                                                <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                                                                <span className="text-sm text-gray-700">{obj}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            
                                                            {/* Curriculum Toggle */}
                                                            {course.modules && (
                                                                <Accordion.Root type="single" collapsible>
                                                                    <Accordion.Item value="curriculum">
                                                                        <Accordion.Header>
                                                                            <Accordion.Trigger className="flex items-center justify-between w-full py-3 text-left font-semibold text-gray-900 hover:text-slate-700 group">
                                                                                <span>View Curriculum ({course.modules.length} modules)</span>
                                                                                <ChevronDown className="h-6 w-6 text-slate-600 transition-transform group-data-[state=open]:rotate-180" />
                                                                            </Accordion.Trigger>
                                                                        </Accordion.Header>
                                                                        <Accordion.Content className="pt-4">
                                                                            <div className="grid md:grid-cols-2 gap-4">
                                                                                {course.modules.map((module, idx) => (
                                                                                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                                                                                        <h5 className="font-medium text-gray-900 mb-2">
                                                                                            Module {idx + 1}: {module.title}
                                                                                        </h5>
                                                                                        <ul className="space-y-1">
                                                                                            {module.topics.slice(0, 3).map((topic, topicIdx) => (
                                                                                                <li key={topicIdx} className="text-sm text-gray-600 flex items-start gap-2">
                                                                                                    <span className="text-slate-400">•</span>
                                                                                                    {topic}
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </Accordion.Content>
                                                                    </Accordion.Item>
                                                                </Accordion.Root>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Price & CTA */}
                                                        <div className="lg:w-80 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6">
                                                            <div className="text-center mb-6">
                                                                <div className="text-sm text-gray-500 mb-2">Investment</div>
                                                                <div className="text-4xl font-bold text-slate-900 mb-1">
                                                                    ${course.price}
                                                                </div>
                                                                <div className="text-sm text-gray-600">One-time payment</div>
                                                            </div>
                                                            
                                                            <Button
                                                                size="lg"
                                                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 mb-4"
                                                                onClick={() => openModal("Enroll Now", course.title)}
                                                            >
                                                                Enroll Now
                                                                <ArrowRight className="h-4 w-4 ml-2" />
                                                            </Button>
                                                            
                                                            {/* Includes */}
                                                            <div className="space-y-2 text-sm">
                                                                {course.includes.slice(0, 3).map((item, idx) => (
                                                                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                                                                        <Check className="h-3 w-3 text-green-500" />
                                                                        {item}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </Tabs.Content>
                            ))}
                        </Tabs.Root>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 bg-slate-900 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Start Your Certification Journey
                        </h2>
                        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                            Join hundreds of professionals who have advanced their careers with our programs
                        </p>
                        <Button
                            size="lg"
                            className="bg-white text-slate-900 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                            onClick={() => openModal("Get Started Today", "Begin your certification journey")}
                        >
                            Get Started Today
                            <ArrowRight className="h-5 w-5 ml-2" />
                        </Button>
                    </div>
                </section>

                {/* Additional Content Section - Shown after form submission */}
                <section id="more-content" className="py-16 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4 text-gray-900">
                                Trusted by Individuals & Leading Companies
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="p-6 border border-purple-200 shadow-lg hover:shadow-purple-200/50 hover:shadow-xl transition-all duration-300 hover:border-purple-300">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4">"The PECB certification transformed my career. Highly recommended!"</p>
                                <div className="font-semibold text-gray-900">Sarah Johnson</div>
                                <div className="text-sm text-gray-500">Data Protection Officer</div>
                            </Card>
                            <Card className="p-6 border border-purple-200 shadow-lg hover:shadow-purple-200/50 hover:shadow-xl transition-all duration-300 hover:border-purple-300">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4">"Excellent instructors and comprehensive materials. Worth every penny."</p>
                                <div className="font-semibold text-gray-900">Michael Chen</div>
                                <div className="text-sm text-gray-500">AI Compliance Manager</div>
                            </Card>
                            <Card className="p-6 border border-purple-200 shadow-lg hover:shadow-purple-200/50 hover:shadow-xl transition-all duration-300 hover:border-purple-300">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4">"Got promoted within 3 months of completing the certification!"</p>
                                <div className="font-semibold text-gray-900">Emma Williams</div>
                                <div className="text-sm text-gray-500">GRC Specialist</div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
