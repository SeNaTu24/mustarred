import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Download, ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/contexts/ModalContext";
import { blogPosts } from "@/data/blog-posts";
import { useState } from "react";

export default function Insights() {
    const { openModal } = useModal();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-background">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                        Our Insights and Updates
                    </h1>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
                        Stay informed with expert insights on compliance, regulations, and governance best practices for African businesses.
                    </p>

                    {/* Search */}
                    <div className="max-w-xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Resource Spotlight */}
            <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    Featured Resource
                                </span>
                                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    Free Download
                                </span>
                            </div>
                            
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                                Are You GAID-Ready?
                            </h2>
                            
                            <p className="text-lg md:text-xl text-gray-700 mb-6">
                                Essential GAID 2025 Guidelines for DPOS and SMES
                            </p>

                            <div className="mb-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-3">
                                    What's Inside:
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                        <span>Definition of Acronyms</span>
                                    </li>
                                    <li className="flex items-start text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                        <span>Introduction & Governance Registration</span>
                                    </li>
                                    <li className="flex items-start text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                        <span>Core Processing Principles & Lawful Bases</span>
                                    </li>
                                    <li className="flex items-start text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                        <span>Technical & Operational Measures</span>
                                    </li>
                                    <li className="flex items-start text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                        <span>Transparency & Data Subject Rights</span>
                                    </li>
                                </ul>
                            </div>

                            <Button
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 w-full sm:w-auto"
                                onClick={() => openModal("Free Resources", "I'd like to download the GAID 2025 Guidelines")}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download Free Guide
                            </Button>
                        </div>

                        <div className="relative order-1 lg:order-2">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="/assets/images/blog/gaidImage.PNG"
                                    alt="GAID Guidelines"
                                    className="w-full h-64 md:h-96 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Insights */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Latest Insights
                    </h2>
                    
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {filteredPosts.map((post, i) => (
                            <div 
                                key={i}
                                className="break-inside-avoid bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                <div 
                                    className="h-48 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${post.image})`,
                                    }}
                                ></div>
                                
                                <div className="p-4">
                                    <div className="mb-2">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                            {post.category}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {post.title}
                                    </h3>
                                    
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {new Date(post.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => window.location.href = `/blog/${post.id}?from=insights`}
                                    >
                                        Read More
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}