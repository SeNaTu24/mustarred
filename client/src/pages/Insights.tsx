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

            {/* Featured Resources - Consistent Card Layout */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            Free Resources
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Essential Compliance Guides
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Download our comprehensive guides to stay ahead of regulatory requirements
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* GAID Guide Card */}
                        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
                                <img
                                    src="/assets/images/blog/gaidCanva.png"
                                    alt="GAID Guidelines"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        Featured
                                    </span>
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        Free
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                    Are You GAID-Ready?
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm">
                                    Essential GAID 2025 Guidelines for DPOs and SMEs
                                </p>

                                {/* Features */}
                                <div className="space-y-2 mb-6 flex-grow">
                                    <div className="flex items-start text-sm text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                                        <span>Governance Registration & Principles</span>
                                    </div>
                                    <div className="flex items-start text-sm text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                                        <span>Technical & Security Measures</span>
                                    </div>
                                    <div className="flex items-start text-sm text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                                        <span>Data Subject Rights Framework</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5"
                                    onClick={() => openModal("Free Resources", "I'd like to download the GAID 2025 Guidelines")}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Guide
                                </Button>

                                <p className="text-xs text-center text-gray-500 mt-3">
                                    Join 1,000+ DPOs who downloaded this
                                </p>
                            </div>
                        </div>

                        {/* SME Guide Card */}
                        <div id="sme-guide" className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
                                <img
                                    src="/assets/images/blog/smeCanva.png"
                                    alt="SME Compliance Guide"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        Featured
                                    </span>
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        Free
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                    SME Compliance Guide
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm">
                                    Comprehensive Framework for Small & Medium Enterprises
                                </p>

                                {/* Features */}
                                <div className="space-y-2 mb-6 flex-grow">
                                    <div className="flex items-start text-sm text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                                        <span>Regulatory Requirements for SMEs</span>
                                    </div>
                                    <div className="flex items-start text-sm text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                                        <span>Compliance Checklist & Templates</span>
                                    </div>
                                    <div className="flex items-start text-sm text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                                        <span>Risk Assessment Framework</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5"
                                    onClick={() => openModal("Free Resources", "I'd like to download the SME Compliance Guide (GAID)")}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Guide
                                </Button>

                                <p className="text-xs text-center text-gray-500 mt-3">
                                    Trusted by 500+ SMEs across Africa
                                </p>
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
                                
                                <div className="p-5">
                                    <div className="mb-3">
                                        <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-xs font-medium">
                                            {post.category}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
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
                                        className="w-full py-2"
                                        onClick={() => window.location.href = `/blog/${post.id}?from=insights`}
                                    >
                                        Read More
                                        <ArrowRight className="ml-2 h-4 w-4" />
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